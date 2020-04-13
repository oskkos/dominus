import { Request, Response } from 'express';
import { getById } from '../dao/user.dao';
import { decodeToken } from '../middlewares/auth.jwt';

export default async function getSelf(req: Request, res: Response): Promise<void> {
  const token = decodeToken(req);
  if (!token) {
    return;
  }

  const user = await getById(token.id);
  res.status(200).send(user);
}
