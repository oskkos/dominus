import { Request, Response, NextFunction } from 'express';
import {
  decode, sign, verify, VerifyErrors,
} from 'jsonwebtoken';
import { secret } from '../config/auth.config';
import * as Auth from '../models/Auth';
import { User } from '../models/User';

export function verifyToken(req: Request, res: Response, next: NextFunction): Response {
  const token = req.headers['x-access-token'] as string | undefined;

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  verify(token, secret, (err: VerifyErrors | null, decoded?: {}) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    if (decoded) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      req.userId = (decoded as Auth.Token).id;
    }
    next();
    return res;
  });
  return res;
}
export function decodeToken(req: Request): Auth.Token | null {
  const token = req.headers['x-access-token'] as string | undefined;

  if (!token) {
    return null;
  }
  return decode(token) as Auth.Token;
}
export function signToken(user: User): string {
  const payload: Auth.Token = { id: user.id, username: user.username };
  return sign(payload, secret, { expiresIn: 86400 /* 24 hours */ });
}
