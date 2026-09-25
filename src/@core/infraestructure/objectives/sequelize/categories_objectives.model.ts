import { STRING } from 'sequelize';
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
}