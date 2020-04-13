import {Pool} from 'pg';
import {dbConfig} from '../config/db.config';

const pool = new Pool({
  user: dbConfig.USER,
  host: dbConfig.HOST,
  database: dbConfig.DB,
  password: dbConfig.PASSWORD,
  port: dbConfig.PORT,
})
type QueryParams = ReadonlyArray<string|number>
export async function query<T, U extends ReadonlyArray<any> = QueryParams>(text: string, params: U) {
  const start = Date.now()
  return pool.query<T>(text, [...params])
    .then((res) => {
      const duration = Date.now() - start
      console.log('executed query', {text, duration, rows: res.rowCount})
      return res;
    })
    .catch((err) => {
      console.log('query failed', {text}, err);
      throw err;
    });
}
export async function getSingle<T, U extends ReadonlyArray<any> = QueryParams>(text: string, params: U) {
  const res = await query<T>(text, params);
  if (res.rowCount > 1) {
    throw new Error(`executed query ${text}, expected one match at most but got ${res.rowCount}`)
  }
  if (res.rowCount === 0) {
    return null
  }
  return res.rows[0]
}

  /*
  getClient: (callback) => {
    pool.connect((err, client, done) => {
      callback(err, client, done)
    })
  }
  */
