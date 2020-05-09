/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - id
 *          - username
 *        properties:
 *          id:
 *            type: number
 *          username:
 *            type: string
 *          password:
 *            type: string
 *        example:
 *           id: 1
 *           username: foobar
 *           password: 2feRW4asd#22q
 */
export interface User {
  id: number;
  username: string;
  password?: string;
}
export interface UserWithCryptedPassword extends User{
  cryptedPassword: string;
}
