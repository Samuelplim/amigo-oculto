import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: __dirname + '/mydb.sqlite',
    },
    migrations: {
      directory: __dirname + '/migrations'
    },
    useNullAsDefault: true,
  },
};

export default config;