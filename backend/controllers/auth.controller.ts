import {Request, Response} from 'express';
import {getByUserName} from '../dao/user.dao';
import {sign} from 'jsonwebtoken';
import {secret} from '../config/auth.config';
import {compareSync} from 'bcrypt';

export async function signin(req: Request, res: Response) {
  const user = await getByUserName(req.body.username)
  if (!user) {
    return res.status(404).send({
      accessToken: null,
      message: "User not found."
    });
  }
  if (!req.body.password) {
    return res.status(401).send({
      accessToken: null,
      message: "Password missing."
    });
  }
  if (!compareSync(req.body.password, user.password_crypted)) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!"
    });
  }
  return res.status(200).send({
    id: user.id,
    username: user.username,
    accessToken: sign({id: user.id}, secret, {expiresIn: 86400 /*24 hours*/ }),
  });
}
