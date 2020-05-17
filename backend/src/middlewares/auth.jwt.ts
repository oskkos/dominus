import { Request } from 'express';
import {
  sign, verify, VerifyErrors,
} from 'jsonwebtoken';
import { secret } from '../config/auth.config';
import * as Auth from '../models/Auth';
import { User } from '../models/User';

export function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[],
): Promise<unknown> {
  if (securityName !== 'apiKey') {
    throw new Error(`Unsupported securityName:${securityName}`);
  }
  const token = request.body.token
    || request.query.token
    || request.headers['x-access-token'];

  return new Promise((resolve, reject) => {
    if (!token) {
      reject(new Error('No token provided'));
    }
    verify(token, secret, (err: VerifyErrors | null, decoded?: {}) => {
      if (err) {
        reject(err);
      } else {
        // Check if JWT contains all required scopes
        (scopes ?? []).forEach((scope) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          if (!decoded || !decoded.scopes.includes(scope)) {
            reject(new Error('JWT does not contain required scope.'));
          }
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        request.userId = (decoded as Auth.Token).id;
        resolve(decoded);
      }
    });
  });
}

export function signToken(user: User): string {
  const payload: Omit<Auth.Token, 'accessToken'> = { id: user.id, username: user.username };
  return sign(payload, secret, { expiresIn: 86400 /* 24 hours */ });
}
