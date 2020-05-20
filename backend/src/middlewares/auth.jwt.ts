import { Request } from 'express';
import {
  decode,
  sign, verify, VerifyErrors,
} from 'jsonwebtoken';
import { User } from '../models/User';
import { getLogger } from './logger';
import { AuthToken } from '../models/Auth';

const secret = process.env.JWT_SECRET_KEY as string;

export const getToken = (request: Request): string => request.body.token || request.query.token || request.headers['x-access-token'];
export const decodeToken = (token: string): AuthToken => decode(token) as AuthToken;
export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[],
): Promise<unknown> {
  if (securityName !== 'apiKey') {
    throw new Error(`Unsupported securityName:${securityName}`);
  }
  const token = getToken(request);

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
        resolve(decoded);
        getLogger().trace(`User ${(decoded as AuthToken).username} authenticated`);
      }
    });
  });
}

export function signToken(user: User): string {
  const payload: Omit<AuthToken, 'accessToken'> = { id: user.id, username: user.username };
  return sign(payload, secret, { expiresIn: 86400 /* 24 hours */ });
}
