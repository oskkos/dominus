import { Express, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import signin from '../controllers/auth.controller';
import { User } from '../models/User';
import { Token } from '../models/Auth';

interface ErrorResponse {
  accessToken: null;
  message: string;
}

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */


/**
 * @swagger
 * path:
 *  /api/auth/signin:
 *    post:
 *      summary: Sign-in
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: Access token
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Token'
 */
export default function authRoutes(app: Express): void {
  app.post('/api/auth/signin', async (req: Request<ParamsDictionary, Token, User>, res: Response<Token|ErrorResponse>) => {
    try {
      const token = await signin(req.body);
      res.status(200).send(token);
    } catch (e) {
      res.status(e.message.split(':')[0]).send({ accessToken: null, message: e.message.split(':')[1] });
    }
  });
}
