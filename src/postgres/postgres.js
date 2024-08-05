import { Pool } from "pg";
import { databaseConfig } from "../config/database.config.js";

const pool = new Pool({
  user: databaseConfig.user,
  password: databaseConfig.password,
  host: databaseConfig.host,
  port: databaseConfig.port,
  database: databaseConfig.database,
});

export async function fetchData(query, ...params) {
  const client = await pool.connect();

  try {
    const { rows } = await client(query, params?.length ? params : []);
    return rows
  } catch (error) {
    console.log("db error", error)
  } finally {
    client.release()
  }
}
