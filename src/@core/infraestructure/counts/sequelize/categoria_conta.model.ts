import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: 'categoria_conta',
  timestamps: true, // created_at / updated_at
  paranoid: true, // soft delete -> deleted_at
  underscored: true, // usa snake_case nas colunas (created_at, deleted_at, etc.)
})
export class CategoriaConta extends Model<CategoriaConta> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare nome: string;

}
