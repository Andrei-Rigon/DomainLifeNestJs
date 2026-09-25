import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Default,
} from 'sequelize-typescript';

@Table({
    tableName: 'objectives',
    timestamps: true, // created_at / updated_at
    paranoid: true, // soft delete -> deleted_at
    underscored: true, // usa snake_case nas colunas (created_at, deleted_at, etc.)
})
export class Objectives extends Model<Objectives> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    declare id: number

    @Column({ type: DataType.STRING(255), allowNull: false, })
    titulo!: string

    @Column({ type: DataType.STRING(255), allowNull: true, })
    descricao!: string | null

    @Column({ type: DataType.DATE, allowNull: true, })
    prazo!: Date | null

    @Column({ type: DataType.DECIMAL(10,4), allowNull: true, })
    valor_guardado!: number | null

    @Column({ type: DataType.DECIMAL(10,4), allowNull: true, })
    valor_objetivo!: number | null

    @Column({ type: DataType.INTEGER(), allowNull: true, })
    porcentagem!: number | null

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false,})
    checked!: boolean

    @Column({ type: DataType.STRING(255), allowNull: true, })
    prioridade!: string | null

    @Column({ type: DataType.BIGINT, allowNull: false, })
    id_categoria!: number

}