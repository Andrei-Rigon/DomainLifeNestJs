import { Module } from '@nestjs/common';
import { AppointmentsService } from '../services/appointments.service';
import { AppointmentsController } from '../controllers/appointments.controller';
import { AppointmentProvider } from '../providers/appointments.providers';
import { SequelizeModule } from '@nestjs/sequelize';
import { Appointment } from '../entities/appointment.entity';

@Module({
  imports: [SequelizeModule.forFeature([Appointment])],
  controllers: [AppointmentsController],
  providers: [
    AppointmentsService,
    ...AppointmentProvider,
  ],
})
export class AppointmentsModule {}
