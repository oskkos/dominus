import {Express} from 'express';
import {verifyToken} from '../middlewares/auth.jwt';
import {getSelf} from '../controllers/user.controller';

export function userRoutes(app: Express) {
  app.use(function(_req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/user/self",
    [verifyToken],
    getSelf
  );
}
