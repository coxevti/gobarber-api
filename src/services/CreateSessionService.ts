import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../entities/User';

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
    const token = sign(
      {},
      '220de20c0f928f20282338a09cdfdc0db9e3f88ec7bda96ffb2adbfd9d6498c8',
      { subject: user.id, expiresIn: '1d' },
    );
    return { user, token };
  }
}

export default CreateSessionService;
