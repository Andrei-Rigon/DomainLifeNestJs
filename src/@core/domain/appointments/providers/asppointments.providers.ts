import { Appointment } from "../entities/appointment.entity";

export const AppointmentProvider = [
    {
        provide: 'APPOINTMENT_REPOSITORY',
        userValue: Appointment
    }
]