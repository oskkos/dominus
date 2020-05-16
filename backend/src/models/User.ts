export interface AuthUser {
  username: string;
  password: string;
}
export interface User {
  id: number;
  username: string;
}
export interface UserWithCryptedPassword extends User{
  cryptedPassword: string;
}
