import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

/**
 * Model do Sequelize (sequelize-typescript) espelhando a tabela `appointments`
 * criada pela migration do Laravel:
 *
 *   $table->id();
 *   $table->string('titulo');
 *   $table->string('descricao')->nullable();
 *   $table->date('data_evento');
 *   $table->time('hora_evento')->nullable();
 *   $table->datetime('data_hora_evento')->nullable();
 *   $table->string('localizacao')->nullable();
 *   $table->timestamps();
 *   $table->softDeletes();
 */
@Table({
  tableName: 'appointments',
  timestamps: true, // created_at / updated_at
  paranoid: true, // soft delete -> deleted_at
  underscored: true, // usa snake_case nas colunas (created_at, deleted_at, etc.)
})
export class Appointment extends Model<Appointment> {
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
    type: DataType.DATEONLY,
    allowNull: false,
  })
  data_evento!: string;

  @Column({
    type: DataType.TIME,
    allowNull: true,
  })
  hora_evento!: string | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  data_hora_evento!: Date | null;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  localizacao!: string | null;
}
