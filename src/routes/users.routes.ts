import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import storageMulter from '../configs/multer';

const usersRouter = Router();
const upload = multer(storageMulter);

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email, password });
    delete user.password;
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  (req, res) => {
    return res.json(req.file);
  },
);

export default usersRouter;
