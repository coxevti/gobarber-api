import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}
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
      .json({ message: "There's already a schedule at that time" });
  }
  const appointment = {
    id: uuid(),
    provider,
    date: parseDate,
  };
  appointments.push(appointment);

  return res.json(appointment);
});

export default appointmentsRouter;
