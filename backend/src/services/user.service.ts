import { getById } from '../repositories/user.repository';
import { User } from '../models/User';

export default async function getUser(id: number): Promise<User | null> {
  return getById(id);
}
