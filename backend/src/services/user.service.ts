import { openById } from '../repositories/user.repository';
import { User } from '../models/User';

export default async function openUser(id: number): Promise<User> {
  return openById(id);
}
