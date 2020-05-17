// import authController from './controllers/auth.routes';
// import userController from './controllers/user.routes';

import swaggerUi from 'swagger-ui-express';
import express, { Response, Request } from 'express';
import { RegisterRoutes } from '../routes';
import { getLogger } from './middlewares/logger';

import bodyParser = require('body-parser');
import cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

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
  const logger = getLogger('server');
  logger.trace(`Server is running on port ${PORT}.`);
  logger.debug(`Server is running on port ${PORT}.`);
  logger.info(`Server is running on port ${PORT}.`);
  logger.warn(`Server is running on port ${PORT}.`);
  logger.error(`Server is running on port ${PORT}.`);
});