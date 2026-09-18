import { Inject, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import type { AppointmentRepositoryInterface } from '../repositories/appointments.repository.interface';

@Injectable()
export class AppointmentsService {
  
constructor(
  @Inject('APPOINTMENT_REPOSITORY')
  private readonly appoinmentsRepository: AppointmentRepositoryInterface,
) {}

  create(createAppointmentDto: CreateAppointmentDto) {
    return this.appoinmentsRepository.create(createAppointmentDto);
  }

  findAll() {
    return this.appoinmentsRepository.findAll();
  }

  findOne(id: number) {
    return this.appoinmentsRepository.findOne({
      where: {
        id
      }
    })
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return this.appoinmentsRepository.update(updateAppointmentDto,
      ({
      where: {
        id
      }
    })
    );
  }

  remove(id: number) {
    return this.appoinmentsRepository.destroy({
      where: {
        id
      }
    })
  }
}
