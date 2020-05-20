import { openById, addUser as addUserIntoRepo } from '../repositories/user.repository';
import { User } from '../models/User';

export async function openUser(id: number): Promise<User> {
  return openById(id);
}
export async function addUserService(
  username: string, password: string, name: string,
): Promise<void> {
  await addUserIntoRepo(username, password, name);
}
