import { getById } from '../dao/user.dao';
import { User } from '../models/User';

export default async function getUser(id: number): Promise<User | null> {
  return getById(id);
}
