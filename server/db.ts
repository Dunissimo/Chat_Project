import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  password: "123125",
  host: "localhost",
  port: 5432,
  database: "chat",
});
