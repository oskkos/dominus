import { Logger, QueryRunner } from 'typeorm';
import { getLogger } from '../middlewares/logger';

const logger = getLogger('TypeORM');
export class TypeORMLogger implements Logger {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  log(level: 'log' | 'info' | 'warn', message: unknown, _queryRunner?: QueryRunner): void {
    if (level === 'log') {
      logger.debug(message);
    } else {
      logger[level](message);
    }
  }

  logMigration(message: string, _queryRunner?: QueryRunner): void {
    logger.info('migration', message);
  }

  logQuery(query: string, parameters?: unknown[], _queryRunner?: QueryRunner): void {
    logger.trace(`${query}${parameters ? `. Params: [${parameters.join(', ')}]` : ''}`);
  }

  logQueryError(
    error: string, query: string, parameters?: unknown[], _queryRunner?: QueryRunner,
  ): void {
    logger.error(`Received error ${error} while performing query: ${query}`, parameters ?? []);
  }

  logQuerySlow(
    time: number, query: string, parameters?: unknown[], _queryRunner?: QueryRunner,
  ): void {
    logger.warn(`Slow (${time} ms) query: ${query}: `, parameters ?? []);
  }

  logSchemaBuild(message: string, _queryRunner?: QueryRunner): void {
    logger.info('Schema modified.', message);
  }
}
