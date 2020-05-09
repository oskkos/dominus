import { compareSync } from 'bcrypt';
import { getByUserName } from '../dao/user.dao';
import { signToken } from '../middlewares/auth.jwt';
import { User } from '../models/User';
import { Token } from '../models/Auth';

export default async function signin(input: User): Promise<Token> {
  const user = await getByUserName(input.username);
  if (!user) {
    throw new Error('404:User not found.');
  }
  if (!input.password) {
    throw new Error('401:Password missing.');
  }
  if (!compareSync(input.password, user.cryptedPassword)) {
    throw new Error('401:Invalid password.');
  }
  return {
    id: user.id,
    username: user.username,
    accessToken: signToken(user),
  };
}
