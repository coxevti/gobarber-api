import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import User from '../entities/User';
import multerConfig from '../configs/multer';
import AppError from '../errors/AppError';

interface Request {
  userId: string;
  filenameAvatar: string;
}

class AvatarUserService {
  public async execute({ userId, filenameAvatar }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(userId);
    if (!user) {
      throw new AppError('Unknown user', 401);
    }
    if (user.avatar) {
      const filenamePath = path.join(multerConfig.directoryUpload, user.avatar);
      fs.access(filenamePath, async err => {
        if (err) {
          return;
        }
        await fs.promises.unlink(filenamePath);
      });
    }
    user.avatar = filenameAvatar;
    await userRepository.save(user);
    return user;
  }
}

export default AvatarUserService;
