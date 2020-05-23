import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../entities/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;
  const parseDate = startOfHour(parseISO(date));
  const findAppointmentSomeTime = appointments.find(appointment =>
    isEqual(appointment.date, parseDate),
  );
  if (findAppointmentSomeTime) {
    return res
      .status(400)
      .json({ message: 'This appointment is already booked!' });
  }
  const appointment = new Appointment(provider, parseDate);
  appointments.push(appointment);

  return res.json(appointment);
});

export default appointmentsRouter;
