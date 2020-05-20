import { createConnection } from 'typeorm';
import { UserWithCryptedPassword, User } from '../models/User';
import { User as EntityUser } from '../entities/User';

export async function openById(id: number): Promise<User> {
  const connection = await createConnection();
  const userRepository = connection.getRepository(EntityUser);
  const user = await userRepository.findOne({ id });
  connection.close();
  if (user) {
    return { id: user.id, username: user.username };
  }
  throw new Error(`User open failed with id: ${id}`);
}
export async function getByUserName(username: string): Promise<UserWithCryptedPassword | null> {
  const connection = await createConnection();
  const userRepository = connection.getRepository(EntityUser);
  const user = await userRepository.findOne({ username });
  connection.close();
  if (!user) {
    return null;
  }
  return {
    id: user.id,
    username: user.username,
    cryptedPassword: user.cryptedPassword,
  };
}

export async function addUser(username: string, password: string, name: string): Promise<void> {
  const connection = await createConnection();
  const userRepository = connection.getRepository(EntityUser);
  const user = new EntityUser(username, password, name);
  await userRepository.save(user);
  connection.close();
}
