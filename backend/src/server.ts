// import authController from './controllers/auth.routes';
// import userController from './controllers/user.routes';

require('dotenv').config();

/* eslint-disable import/first */
import swaggerUi from 'swagger-ui-express';
import express, { Response, Request } from 'express';
import { RegisterRoutes } from '../routes';
import { configureLogger, getLogger } from './middlewares/logger';
import { decodeToken, getToken } from './middlewares/auth.jwt';

import bodyParser = require('body-parser');
import cors = require('cors');

const logger = getLogger();
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, _res, next) => {
  const token = getToken(req);
  configureLogger(token ? decodeToken(token) : null);
  next();
});
// simple route
app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to dominus.' });
});

app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => res.send(
  swaggerUi.generateHTML(await import('../swagger.json')),
));
RegisterRoutes(app);


// set port, listen for requests
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  configureLogger(null);
  logger.info(`Server is running on port ${PORT}.`);
});
