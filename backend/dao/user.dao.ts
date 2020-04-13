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

export async function getById(id: number): Promise<User | null> {
  const userRow = await getSingle<UserRow>('SELECT * FROM users WHERE id = $1', [id]);
  return userRow ? toUser(userRow) : null;
}
export async function getByUserName(username: string): Promise<UserWithCryptedPassword | null> {
  const userRow = await getSingle<UserRow>('SELECT * FROM users WHERE username = $1', [username]);
  return userRow ? toUserWithPW(userRow) : null;
}
