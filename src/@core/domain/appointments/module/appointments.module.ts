import { Module } from '@nestjs/common';
import { AppointmentsService } from '../services/appointments.service';
import { AppointmentsController } from '../controllers/appointments.controller';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
