import { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './dev.sqlite3', // Replace with your SQLite database file path
  },
  useNullAsDefault: true,
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/db/migrations',
  },
  seeds: {
    directory: './src/db/seeds',
  },
};

export default config;
