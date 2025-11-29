import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/mydb.sqlite"
    },
    migrations: {
      directory: "./src/migrations"
    },
    useNullAsDefault: true
  }
};

export default config;
