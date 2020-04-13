import {Request, Response} from 'express';
import {getById} from '../dao/user.dao';
import {decode} from 'jsonwebtoken';

export async function getSelf(req: Request, res: Response) {
  // @ts-ignore
  const token = decode(req.headers['x-access-token']);
  console.log(token);
  const user = await getById(token.id);
  res.status(200).send(user);
}
