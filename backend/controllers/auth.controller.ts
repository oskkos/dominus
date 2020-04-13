import { Request, Response } from 'express';
import { compareSync } from 'bcrypt';
import { getByUserName } from '../dao/user.dao';
import { signToken } from '../middlewares/auth.jwt';

export default async function signin(req: Request, res: Response): Promise<Response> {
  const user = await getByUserName(req.body.username);
  if (!user) {
    return res.status(404).send({
      accessToken: null,
      message: 'User not found.',
    });
  }
  if (!req.body.password) {
    return res.status(401).send({
      accessToken: null,
      message: 'Password missing.',
    });
  }
  if (!compareSync(req.body.password, user.cryptedPassword)) {
    return res.status(401).send({
      accessToken: null,
      message: 'Invalid Password!',
    });
  }
  return res.status(200).send({
    id: user.id,
    username: user.username,
    accessToken: signToken(user),
  });
}
