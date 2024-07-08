/* eslint-disable no-undef */
import { Knex } from 'knex';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg', // Specify 'pg' for PostgreSQL
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: 5432,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.resolve(__dirname, 'src', 'db', 'migrations'), // Adjust as per your project structure
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'db', 'seeds'), // Adjust as per your project structure
    },
  },
  // Add similar configuration for 'production' and other environments
};

export default config;
