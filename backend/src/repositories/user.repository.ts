import { getConnection } from 'typeorm';
import { UserWithCryptedPassword, User } from '../models/User';
import { User as EntityUser } from '../entities/User';
import { EventLog } from '../entities/EventLog';

export async function openById(id: number): Promise<User> {
  const userRepository = getConnection().getRepository(EntityUser);
  const user = await userRepository.findOne({ id });
  if (user) {
    return { id: user.id, username: user.username };
  }
  throw new Error(`User open failed with id: ${id}`);
}
export async function getByUserName(
  username: string,
): Promise<UserWithCryptedPassword | null> {
  const userRepository = getConnection().getRepository(EntityUser);
  const user = await userRepository.findOne({ username });
  if (!user) {
    return null;
  }
  return {
    id: user.id,
    username: user.username,
    cryptedPassword: user.cryptedPassword,
  };
}

export async function addUser(
  username: string,
  password: string,
  name: string,
): Promise<EntityUser> {
  return getConnection().transaction(async (transactionalEntityManager) => {
    const user = await transactionalEntityManager.save(
      new EntityUser(username, password, name),
    );
    await transactionalEntityManager.save(
      EventLog.UserAdded(user.id, { username, password: '*****', name }),
    );
    return user;
  });
}

export async function changePassword(
  id: number,
  password: string,
): Promise<void> {
  const userRepository = getConnection().getRepository(EntityUser);
  const user = await userRepository.findOne({ id });
  if (!user) {
    throw new Error(`User open failed with id: ${id}`);
  }
  return getConnection().transaction(async (transactionalEntityManager) => {
    user.password = password;
    await transactionalEntityManager.save(user);
    await transactionalEntityManager.save(
      EventLog.UserPasswordChanged(user.id, { password: '*****' }),
    );
  });
}
