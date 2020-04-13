export interface User {
  id: number;
  username: string;
}
export interface UserWithCryptedPassword extends User{
  cryptedPassword: string;
}
