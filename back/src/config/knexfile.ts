import type { Knex } from "knex";
import knex from "knex";
import { ENV } from "./constant";

const config: Knex.Config = {
  client: ENV.DB_CLIENT,
  connection: {
    host: ENV.DB_HOST,
    user: ENV.DB_USER,
    password: ENV.DB_PASS,
    database: ENV.DB_NAME,
    port: ENV.DB_PORT,
  },
};

export const connection = knex(config);
