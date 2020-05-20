import { Pool, QueryResult } from 'pg';
import { getLogger } from '../middlewares/logger';

const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  db: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
};
const logger = getLogger();
const pool = new Pool(dbConfig);
type QueryParams = ReadonlyArray<string|number>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function query<T, U extends ReadonlyArray<any> = QueryParams>(
  text: string, params: U,
): Promise<QueryResult<T>> {
  const start = Date.now();
  return pool.query<T>(text, [...params])
    .then((res) => {
      const duration = Date.now() - start;
      logger.debug(`Executed query ${text} with params [${params.join(', ')}] in ${duration}ms. ${res.rowCount} rows found`);
      return res;
    })
    .catch((err) => {
      logger.error(`Query ${text} with params [${params.join(', ')}] failed`, [err]);
      throw err;
    });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getSingle<T, U extends ReadonlyArray<any> = QueryParams>(
  text: string, params: U,
): Promise<T | null> {
  const res = await query<T>(text, params);
  if (res.rowCount > 1) {
    throw new Error(`executed query ${text}, expected one match at most but got ${res.rowCount}`);
  }
  if (res.rowCount === 0) {
    return null;
  }
  return res.rows[0];
}
