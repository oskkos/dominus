import { signin } from "../controllers/auth.controller";
import {Express} from 'express';

export function authRoutes(app: Express) {
  app.post("/api/auth/signin", signin);
}
