import { getSingle } from './index';
import { UserWithCryptedPassword, User } from '../models/User';

interface UserRow {
  id: number;
  username: string;
  password: string;
}

function toUser(row: UserRow): User {
  return {
    id: row.id,
    username: row.username,
  };
}
function toUserWithPW(row: UserRow): UserWithCryptedPassword {
  return {
    id: row.id,
    username: row.username,
    cryptedPassword: row.password,
  };
}

export async function openById(id: number): Promise<User> {
  const userRow = await getSingle<UserRow>('SELECT * FROM users WHERE id = $1', [id]);
  if (userRow) {
    return toUser(userRow);
  }
  throw new Error(`User open failed with id: ${id}`);
}
export async function getByUserName(username: string): Promise<UserWithCryptedPassword | null> {
  const userRow = await getSingle<UserRow>('SELECT * FROM users WHERE username = $1', [username]);
  return userRow ? toUserWithPW(userRow) : null;
}
