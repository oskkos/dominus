require('dotenv').config();

/* eslint-disable import/first */
import 'reflect-metadata';
import { ValidateError } from 'tsoa';
import { createConnection, getConnectionOptions } from 'typeorm';
import swaggerUi from 'swagger-ui-express';
import express, { Response, Request, NextFunction } from 'express';
import log4js from 'log4js';
import { join } from 'path';
import { RegisterRoutes } from '../routes';
import { TypeORMLogger } from './middlewares/TypeORMLogger';
import { getLogger } from './middlewares/logger';
import { decodeToken, getToken } from './middlewares/auth.jwt';

import bodyParser = require('body-parser');
import cors = require('cors');
import { AuthToken } from './models/Auth';
import { User } from './models/User';

function configureLogger(token: AuthToken | null): void {
  log4js.configure({
    appenders: {
      out: {
        type: 'stdout',
        layout: {
          type: 'pattern',
          pattern: '%[%d{ISO8601} [%p] [%c] [%x{user}] %m%]',
          tokens: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            user: (): User => (token ? token.username : '_system'),
          },
        },
      },
    },
    categories: {
      default: { appenders: ['out'], level: 'trace', enableCallStack: true },
    },
  });
}

configureLogger(null);

getConnectionOptions().then((connectionOptions) => {
  createConnection({
    ...connectionOptions,
    entities: [join(__dirname, 'entities', '*.{ts,js}')],
    logger: new TypeORMLogger(),
  }).then(() => {
    const logger = getLogger();
    const app = express();

    const corsOptions = { origin: 'http://localhost:3000' };
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

    app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) =>
      res.send(swaggerUi.generateHTML(await import('../swagger.json'))),
    );
    RegisterRoutes(app);

    app.use((_req, res) => {
      res.status(404).send({
        message: 'Not Found',
      });
    });

    /* eslint-disable consistent-return */
    app.use(
      (
        err: unknown,
        req: Request,
        res: Response,
        next: NextFunction,
      ): Response | void => {
        if (err instanceof ValidateError) {
          logger.warn(`Caught Validation Error for ${req.path}:`, err.fields);
          return res.status(422).json({
            message: 'Validation Failed',
            details: err?.fields,
          });
        }
        if (err instanceof Error) {
          logger.error('Internal Sever Error', err);
          return res.status(500).json({
            message: 'Internal Server Error',
            details: err.toString(),
          });
        }

        next();
      },
    );
    /* eslint-enable consistent-return */

    // set port, listen for requests
    const PORT = process.env.PORT || 7000;
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}.`);
    });
  });
});
