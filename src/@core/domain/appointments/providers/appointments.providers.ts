import { Appointment } from "../entities/appointment.entity";

export const AppointmentProvider = [
    {
        provide: 'APPOINTMENT_REPOSITORY',
        useValue: Appointment
    }
]