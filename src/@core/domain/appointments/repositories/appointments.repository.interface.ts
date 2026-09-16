import { FindOptions, UpdateOptions } from "sequelize";
import { CreateAppointmentDto } from "../dto/create-appointment.dto";
import { Appointment } from "../entities/appointment.entity";

export interface AppointmentRepositoryInterface {
  findOne(query: FindOptions): Promise<Appointment>;
  findAll(query?: FindOptions): Promise<Appointment[]>;
  create(user: CreateAppointmentDto): Promise<Appointment>;
  update(values: any, query: UpdateOptions): Promise<Appointment>;
  destroy(query: UpdateOptions): Promise<Appointment>;
}
