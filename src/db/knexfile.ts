/* eslint-disable no-undef */
// /* eslint-disable no-undef */
import { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT) || 5432,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
      directory: './dist/db/migrations',
    },
    seeds: {
      directory: './dist/db/seeds',
    },
  },
};

export default config;

//---------------

// import { Knex } from 'knex';
// import dotenv from 'dotenv';
// import path from 'path';

// dotenv.config();

// const config: { [key: string]: Knex.Config } = {
//   development: {
//     client: 'pg',
//     connection: {
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       port: Number(process.env.DB_PORT),
//     },
//     migrations: {
//       tableName: 'knex_migrations',
//       directory: path.resolve(__dirname, 'src', 'db', 'migrations'),
//     },
//     seeds: {
//       directory: path.resolve(__dirname, 'src', 'db', 'seeds'),
//     },
//   },
//   production: {
//     client: 'pg',
//     connection: {
//       connectionString: process.env.DATABASE_URL,
//       ssl: {
//         rejectUnauthorized: false,
//       },
//     },
//     migrations: {
//       tableName: 'knex_migrations',
//       directory: path.resolve(__dirname, 'src', 'db', 'migrations'),
//     },
//     seeds: {
//       directory: path.resolve(__dirname, 'src', 'db', 'seeds'),
//     },
//   },
// };

// export default config;

//----------------------------------------------------
