/**
 * Describes a user in a dominus
 *
 *
 * @tsoaModel
 * @example {
 *   "id": 82,
 *   "username": "oskkos"
 * }
 */
export interface User {
  /**
   * @isInt Integer
   */
  id: number;
  username: string;
  name: string;
}
export interface UserWithCryptedPassword extends User {
  cryptedPassword: string;
}
