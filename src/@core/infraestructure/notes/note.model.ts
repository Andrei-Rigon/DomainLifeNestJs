import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: 'notes',
  timestamps: true, // created_at / updated_at
  paranoid: true, // soft delete -> deleted_at
  underscored: true, // usa snake_case nas colunas (created_at, deleted_at, etc.)
})
export class Notes extends Model<Notes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  titulo!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  descricao!: string | null;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  cor!: string | null;
}
