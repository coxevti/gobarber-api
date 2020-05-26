import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import AvatarUserService from '../services/AvatarUserService';
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
    return res.status(error.statusCode).json({ error: error.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const avatarUserService = new AvatarUserService();
      const user = await avatarUserService.execute({
        userId: req.user.id,
        filenameAvatar: req.file.filename,
      });
      delete user.password;
      return res.json(user);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  },
);

export default usersRouter;
