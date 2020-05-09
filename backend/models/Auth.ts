/**
 * @swagger
 *  components:
 *    schemas:
 *      Token:
 *        type: object
 *        required:
 *          - id
 *          - username
 *        properties:
 *          id:
 *            type: number
 *          username:
 *            type: string
 *          accessToken:
 *            type: string
 *        example:
 *           id: 1
 *           username: foobar
 *           accessToken: asdf
 */
export interface Token {
  id: number;
  username: string;
  accessToken?: string;
}
