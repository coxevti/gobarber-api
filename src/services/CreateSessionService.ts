import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../entities/User';
import authConfig from '../configs/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
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
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, { subject: user.id, expiresIn });
    return { user, token };
  }
}

export default CreateSessionService;
