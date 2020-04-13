import {getSingle} from './index';

interface UserRow {
  id: number;
  username: string;
  password: string;
}
interface UserDao {
  id: number;
  username: string;
  password_crypted: string
}

export async function getById(id: number) {
  const userRow = await getSingle<UserRow>('SELECT * FROM users WHERE id = $1', [id]);
  return userRow ? toUser(userRow): null;
}
export async function getByUserName(username: string) {
  const userRow = await getSingle<UserRow>('SELECT * FROM users WHERE username = $1', [username]);
  return userRow ? toUser(userRow): null;
}

function toUser(row: UserRow): UserDao {
  return {
    id: row.id,
    username: row.username,
    password_crypted: row.password,
  };
}
