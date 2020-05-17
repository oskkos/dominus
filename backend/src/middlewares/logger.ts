import log4js from 'log4js';
import { User } from '../models/User';

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
          user: (): User => globalThis?.user?.username ?? '_system',
        },
      },
    },
  },
  categories: { default: { appenders: ['out'], level: 'trace' } },
});

// eslint-disable-next-line import/prefer-default-export
export function getLogger(loggerName: string): log4js.Logger {
  const l = log4js.getLogger(loggerName);
  l.level = 'trace';
  return l;
}
