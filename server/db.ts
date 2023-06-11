import { Pool } from "pg";
import dotenv from "dotenv";

process.env.NODE_ENV == "dev"
  ? dotenv.config({ path: "./configs/dev.env" })
  : dotenv.config();

console.log({
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASS,
  host: process.env.PG_HOST,
  port: +process.env.PG_PORT!,
  database: process.env.PG_DB,
});

export const pool = new Pool({
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASS,
  host: process.env.PG_HOST,
  port: +process.env.PG_PORT!,
  database: process.env.PG_DB,
});
