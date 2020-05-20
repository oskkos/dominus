import log4js from 'log4js';
import { User } from '../models/User';
import { AuthToken } from '../models/Auth';

import caller = require('caller');

export function configureLogger(token: AuthToken | null): void {
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
    categories: { default: { appenders: ['out'], level: 'trace', enableCallStack: true } },
  });
}

export function getLogger(loggerName?: string, level = 'trace'): log4js.Logger {
  const category = loggerName || caller().split('\\src\\')[1];
  if (!category) {
    throw new Error('Logger name couldn\'t be resolved');
  }
  const l = log4js.getLogger(category);
  l.level = level;
  return l;
}
