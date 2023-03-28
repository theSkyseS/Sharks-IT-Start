import pg = require("pg");

const pool = new pg.Pool();

export function query(text: string, params: Array<unknown>) {
  return pool.query(text, params);
}
