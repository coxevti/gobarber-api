import { getRepository } from 'typeorm';
import User from '../entities/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const checkEmailExists = await userRepository.findOne({
      where: { email },
    });
    if (checkEmailExists) {
      throw new Error('This email address already registered');
    }
    const user = userRepository.create({
      name,
      email,
      password,
    });
    await userRepository.save(user);
    return user;
  }
}

export default CreateUserService;
