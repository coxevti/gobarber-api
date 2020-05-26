import { Router } from 'express';
import CreateSessionService from '../services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const createSessionService = new CreateSessionService();
    const { user, token } = await createSessionService.execute({
      email,
      password,
    });
    delete user.password;
    return res.json({ user, token });
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
});

export default sessionsRouter;
