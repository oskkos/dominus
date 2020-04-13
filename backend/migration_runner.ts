import { createDb, migrate } from 'postgres-migrations';
import { dbConfig } from './config/db.config';

async function migrationRunner(): Promise<void> {
  const conf = {
    database: dbConfig.DB,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    host: dbConfig.HOST,
    port: dbConfig.PORT,
  };

  await createDb(dbConfig.DB, {
    ...conf,
    defaultDatabase: 'postgres', // defaults to "postgres"
  });
  await migrate(conf, './migrations');
}
migrationRunner();
