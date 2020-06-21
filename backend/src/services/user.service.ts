import { compareSync } from 'bcrypt';
import * as UserRepo from '../repositories/user.repository';
import { User } from '../models/User';

export async function openUser(id: number): Promise<User> {
  return UserRepo.openById(id);
}

export async function addUser(
  username: string,
  password: string,
  name: string,
): Promise<void> {
  await UserRepo.addUser(username, password, name);
}

export async function changePassword(
  userId: number,
  oldPwd: string,
  newPwd: string,
): Promise<void> {
  // FIXME: Two calls to repo, is it really necessary?
  const u = await UserRepo.openById(userId);
  const user = await UserRepo.getByUserName(u.username);

  if (!user) {
    throw new Error('User open failed');
  }
  if (!compareSync(oldPwd, user.cryptedPassword)) {
    throw new Error('Invalid old password.');
  }
  await UserRepo.changePassword(userId, newPwd);
}
