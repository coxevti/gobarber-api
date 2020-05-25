import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../configs/auth';

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
    throw new Error('No token provided!');
  }
  const [, token] = authorization.split(' ');
  try {
    const { sub } = verify(token, authConfig.jwt.secret) as TokenPayload;
    request.user = { id: sub };
    return next();
  } catch {
    throw new Error('Unauthorized!');
  }
}
