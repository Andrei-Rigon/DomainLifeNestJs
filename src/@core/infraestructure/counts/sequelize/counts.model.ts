import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: 'counts',
  timestamps: true, // created_at / updated_at
  paranoid: true, // soft delete -> deleted_at
  underscored: true, // usa snake_case nas colunas (created_at, deleted_at, etc.)
})
export class Counts extends Model<Counts> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare nome: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  declare descricao: string | null;

  @Column({
    type: DataType.DECIMAL(10,2),
    allowNull: true,
  })
  declare valor_esperado: number | null;

  @Column({
    type: DataType.DECIMAL(10,2),
    allowNull: true,
  })
  declare valor_pago: number | null;

  @Column({
    type: DataType.ENUM('Recorrente', 'Conta', 'Assinatura'),
    allowNull: false,
  })
  declare tipo: string;

  @Column({
    type: DataType.INTEGER(),
    allowNull: true,
  })
  declare qtde_parceladas: number | null;

  @Column({
    type: DataType.INTEGER(),
    allowNull: true,
  })
  declare id_categoriaCount: number | null;

  @ForeignKey(() => CategoriaConta)   
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare id_categoria_conta: number | null;

  @BelongsTo(() => CategoriaConta)
  declare categoria?: CategoriaConta;
  }
