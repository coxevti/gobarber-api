import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../configs/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { authorization } = request.headers;
  if (!authorization) {
    throw new AppError('No token provided!', 401);
  }
  const [, token] = authorization.split(' ');
  try {
    const { sub } = verify(token, authConfig.jwt.secret) as TokenPayload;
    request.user = { id: sub };
    return next();
  } catch {
    throw new AppError('Unauthorized!', 401);
  }
}
