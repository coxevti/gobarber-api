import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../entities/User';

interface Request {
  email: string;
  password: string;
}

class CreateSessionService {
  public async execute({ email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new Error('The email or password you entered is incorrect.');
    }
    const checkPassword = await compare(password, user.password);
    if (!checkPassword) {
      throw new Error('The email or password you entered is incorrect.');
    }
    return user;
  }
}

export default CreateSessionService;
