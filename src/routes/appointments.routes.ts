import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (req, res) => {
  const appointments = appointmentsRepository.all();
  return res.json(appointments);
});

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;
  const parseDate = startOfHour(parseISO(date));
  const findAppointmentSomeTime = appointmentsRepository.findByDate(parseDate);
  if (findAppointmentSomeTime) {
    return res
      .status(400)
      .json({ message: 'This appointment is already booked!' });
  }
  const appointment = appointmentsRepository.create(provider, parseDate);

  return res.json(appointment);
});

export default appointmentsRouter;
