import { Express } from 'express';
import signin from '../controllers/auth.controller';

export default function authRoutes(app: Express): void {
  app.post('/api/auth/signin', signin);
}
