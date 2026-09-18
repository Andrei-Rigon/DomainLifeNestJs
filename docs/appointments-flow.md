# Fluxo do módulo `appointments`

Este documento explica, passo a passo, como uma requisição HTTP percorre o backend
(NestJS + Sequelize + Postgres) até chegar/voltar do banco de dados no módulo de
agendamentos (`appointments`).

## 1. Onde cada peça mora

```
src/
├── main.ts                                          # bootstrap da aplicação
├── app.module.ts                                     # módulo raiz (conexão com o banco)
└── @core/
    ├── domain/appointments/
    │   ├── module/appointments.module.ts             # amarra tudo do módulo
    │   ├── controllers/appointments.controller.ts     # rotas HTTP
    │   ├── dto/
    │   │   ├── create-appointment.dto.ts              # validação de entrada (criar)
    │   │   └── update-appointment.dto.ts               # validação de entrada (editar)
    │   ├── services/appointments.service.ts            # regra de negócio
    │   ├── repositories/appointments.repository.interface.ts  # contrato do repositório
    │   ├── providers/appointments.providers.ts          # injeção de dependência
    │   └── entities/appointment.entity.ts                # re-exporta o model
    └── infraestructure/appointments/sequelize/
        └── appointment.model.ts                         # model Sequelize (tabela real)
```

A ideia (inspirada em DDD/Clean Architecture) é separar **domínio** (regra de negócio,
contratos) de **infraestrutura** (como os dados são de fato persistidos). Na prática,
hoje o "repositório" é implementado ligando o contrato direto no model do Sequelize —
ver seção 6.

## 2. Bootstrap da aplicação (`main.ts`)

Antes de qualquer requisição chegar, a aplicação é montada assim:

1. `NestFactory.create(AppModule)` — instancia toda a árvore de módulos (raiz →
   `AppointmentsModule` → controller/service/provider).
2. `app.enableCors({ origin: true })` — libera CORS para qualquer origem (útil em
   desenvolvimento, já que o frontend pode estar em `localhost` ou em outro IP da rede).
3. `app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))` —
   registra um pipe **global**. Isso significa que **toda** rota da aplicação, antes de
   executar o handler do controller, passa o `body`/`query` recebido pelas classes DTO
   (`class-validator`):
   - `whitelist: true` → qualquer campo que não esteja declarado no DTO é descartado.
   - `transform: true` → o payload cru (JSON) é convertido para uma instância real da
     classe do DTO (com os tipos certos), não só um objeto genérico.
4. `app.listen(process.env.PORT ?? 3000, '0.0.0.0')` — sobe o servidor HTTP escutando
   em todas as interfaces de rede na porta 3000.

## 3. Conexão com o banco (`app.module.ts`)

O módulo raiz registra duas coisas relevantes antes do módulo de agendamentos:

- `ConfigModule.forRoot({ isGlobal: true })` — lê o `.env` e deixa `ConfigService`
  disponível em qualquer lugar da aplicação.
- `SequelizeModule.forRootAsync(...)` — abre a conexão com o Postgres usando as
  variáveis `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE` do `.env`.
  - `autoLoadModels: true` → qualquer model registrado via `SequelizeModule.forFeature`
    em algum módulo é automaticamente reconhecido pela conexão.
  - `synchronize: true` → o Sequelize cria/ajusta as tabelas para bater com as
    classes `@Table`/`@Column` automaticamente. É prático em dev, mas **não deve ir
    para produção** (pode alterar/apagar colunas sem controle de migração).

## 4. `AppointmentsModule`: amarrando as peças

```ts
@Module({
  imports: [SequelizeModule.forFeature([Appointment])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, ...AppointmentProvider],
})
```

- `SequelizeModule.forFeature([Appointment])` registra o model `Appointment` nesta
  conexão específica, permitindo injetá-lo em outras classes do módulo.
- `AppointmentProvider` cria o token `APPOINTMENT_REPOSITORY` (ver seção 6).
- Esse módulo é importado dentro de `AppModule`, o que o torna acessível pelo Nest.

## 5. O caminho de uma requisição, endpoint por endpoint

Todas as rotas vivem sob o prefixo `/appointments` (`@Controller('appointments')`).

### `POST /appointments` — criar agendamento

1. Body chega como JSON.
2. O `ValidationPipe` global instancia `CreateAppointmentDto` e valida:
   - `titulo`: string obrigatória (`@IsString`, `@IsNotEmpty`).
   - `descricao`: string opcional.
   - `data_evento`: string de data obrigatória (`@IsDateString`, formato ISO `YYYY-MM-DD`).
   - `hora_evento`: opcional, precisa casar com `HH:mm` ou `HH:mm:ss` (`@Matches`).
   - `localizacao`: string opcional.
   - Qualquer campo extra enviado é removido (`whitelist`).
   - Se algo for inválido, o Nest já responde `400 Bad Request` automaticamente —
     o controller nunca chega a ser chamado.
3. `AppointmentsController.create()` recebe o DTO validado e delega para
   `AppointmentsService.create(dto)`.
4. `AppointmentsService.create()` chama `appoinmentsRepository.create(dto)` — sem
   nenhuma regra de negócio extra hoje, é uma passagem direta.
5. Como o "repositório" injetado é o próprio model Sequelize (`Appointment`), isso na
   prática executa `Appointment.create(dto)`, que gera um `INSERT` na tabela
   `appointments` no Postgres.
6. O registro criado (já com `id`, `created_at`, etc.) é devolvido pela cadeia
   service → controller → Nest, que serializa para JSON na resposta (`201 Created`
   por padrão do método `@Post()`... na prática o Nest usa `201` só se você não
   retornar nada customizado; aqui como o objeto é retornado direto, a resposta é o
   JSON do registro criado).

### `GET /appointments?start=YYYY-MM-DD&end=YYYY-MM-DD` — listar

1. `start` e `end` são lidos da query string (`@Query('start')`, `@Query('end')`),
   ambos opcionais.
2. `AppointmentsController.findAll()` chama `AppointmentsService.findAll(start, end)`.
3. O service monta um `FindOptions` do Sequelize:
   - Se `start` **e** `end` foram informados, filtra `data_evento` entre os dois
     (`Op.between`).
   - Se não, não filtra nada (retorna todos os registros, incluindo os
     "soft-deleted"? não — ver seção 7 sobre `paranoid`).
   - Sempre ordena por `data_evento` e depois `hora_evento`, ambos ascendente.
4. Isso executa um `SELECT ... WHERE data_evento BETWEEN :start AND :end ORDER BY
   data_evento ASC, hora_evento ASC` (ou sem `WHERE` se não houver range).
5. Retorna a lista de agendamentos como array JSON.

> É esse endpoint que o frontend usa para carregar a grade do mês/semana/dia da
> agenda, passando o intervalo de datas visível.

### `GET /appointments/:id` — buscar um

1. `id` vem da URL como string e é convertido para número (`+id`) no controller.
2. `AppointmentsService.findOne(id)` chama `findOne({ where: { id } })`, que gera um
   `SELECT ... WHERE id = :id LIMIT 1`.
3. Se não existir nenhum registro, o Sequelize retorna `null` e isso é devolvido como
   corpo da resposta (a rota **não** lança `404` — ver "Pontos de atenção").

### `PATCH /appointments/:id` — atualizar

1. Body passa pelo `ValidationPipe` como `UpdateAppointmentDto`, que é um
   `PartialType(CreateAppointmentDto)` — ou seja, os mesmos campos do DTO de criação,
   porém todos opcionais (só valida o que foi enviado).
2. `AppointmentsService.update(id, dto)` chama
   `appoinmentsRepository.update(dto, { where: { id } })`.
3. Isso executa `Appointment.update(dto, { where: { id } })` do Sequelize, que gera um
   `UPDATE appointments SET ... WHERE id = :id`.
4. O retorno do Sequelize aqui é `[quantidadeDeLinhasAfetadas]` (não o registro
   atualizado) — é assim que o `update` estático do Sequelize funciona.

### `DELETE /appointments/:id` — remover

1. `AppointmentsService.remove(id)` chama `appoinmentsRepository.destroy({ where: { id } })`.
2. Isso executa `Appointment.destroy({ where: { id } })`.
3. Como o model tem `paranoid: true` (ver seção 7), isso **não** apaga a linha
   fisicamente: faz um `UPDATE appointments SET deleted_at = NOW() WHERE id = :id`
   (soft delete).

## 6. O "repositório": interface + injeção de dependência

Esse é o ponto mais particular da arquitetura atual. A ideia de um repositório é
existir uma **interface** (`AppointmentRepositoryInterface`) que o `Service` conhece,
sem saber qual é a implementação real por trás — isso permitiria, por exemplo, trocar
Sequelize por outro ORM sem tocar no service.

Na prática, hoje isso é feito assim:

```ts
// appointments.providers.ts
export const AppointmentProvider = [
  { provide: 'APPOINTMENT_REPOSITORY', useValue: Appointment },
];
```

Ou seja: o token `APPOINTMENT_REPOSITORY` é resolvido usando **o próprio model
Sequelize** (`Appointment`) como se fosse a implementação do repositório. Isso só
funciona porque os métodos estáticos do Sequelize (`findAll`, `findOne`, `create`,
`update`, `destroy`) têm assinatura parecida com a interface declarada. Não existe uma
classe `AppointmentsRepository` de fato escrita — o "repositório" é o model.

No `AppointmentsService`, a injeção acontece via:

```ts
constructor(
  @Inject('APPOINTMENT_REPOSITORY')
  private readonly appoinmentsRepository: AppointmentRepositoryInterface,
) {}
```

## 7. O model/entidade (`appointment.model.ts`)

- `@Table({ tableName: 'appointments', timestamps: true, paranoid: true, underscored: true })`
  - `timestamps: true` → colunas `created_at` e `updated_at` automáticas.
  - `paranoid: true` → soft delete: em vez de `DELETE`, o Sequelize marca
    `deleted_at` e passa a **ignorar automaticamente** linhas com `deleted_at`
    preenchido em qualquer `SELECT` (inclusive no `findAll`/`findOne` do fluxo acima),
    a não ser que se peça explicitamente (`paranoid: false` na query).
  - `underscored: true` → as colunas no Postgres usam `snake_case`
    (`data_evento`, `created_at`, etc.) mesmo que a propriedade no TypeScript seja
    a mesma grafia.
- Campos: `id` (bigint, PK, autoincrement), `titulo` (obrigatório), `descricao`,
  `data_evento` (date, obrigatório), `hora_evento` (time, opcional),
  `data_hora_evento` (datetime, opcional, hoje não é preenchido por nenhum fluxo),
  `localizacao` (opcional).

O arquivo `entities/appointment.entity.ts` apenas faz
`export * from '.../appointment.model'` — é o jeito da camada de "domínio" apontar
para a classe real que vive na camada de "infraestrutura", sem o resto do domínio
precisar importar direto do caminho de infraestrutura.

## 8. Resumo visual do caminho de uma requisição

```
Cliente (frontend)
   │  HTTP request (POST/GET/PATCH/DELETE /appointments)
   ▼
main.ts → ValidationPipe global (valida/limpa/transforma o payload usando o DTO)
   ▼
AppointmentsController (recebe a requisição já validada, extrai params/query/body)
   ▼
AppointmentsService (monta as opções de busca/filtro, sem regra de negócio extra hoje)
   ▼
APPOINTMENT_REPOSITORY  (= o model Sequelize `Appointment`)
   ▼
Sequelize → gera SQL → Postgres (tabela `appointments`)
   ▼
resultado sobe de volta: Model/array/[linhasAfetadas] → Service → Controller → JSON
```

## 9. Pontos de atenção (estado atual, não é "errado", só vale saber)

- `findOne`, `update` e `destroy` não verificam se o registro existe antes de agir;
  se o `id` não existir, a API responde `200 OK` com corpo vazio/`null` em vez de
  `404 Not Found`.
- `update` retorna a contagem de linhas afetadas do Sequelize, não o registro
  atualizado.
- Não há autenticação/autorização em nenhuma rota — qualquer cliente que alcance a
  API pode ler/criar/editar/apagar agendamentos.
- `synchronize: true` é conveniente em desenvolvimento, mas não deve ser usado em
  produção (arriscado para o schema do banco).
