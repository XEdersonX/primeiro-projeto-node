import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment'; // Chamando a entidade

// Data Transfer Object
interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  // Incializar o valor da variavel;
  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    ); // find utilizando para percorrer o array

    return findAppointment || null;
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment); // Adicionar no array

    return appointment;
  }
}

export default AppointmentsRepository;
