import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Migration } from 'typeorm/browser';

export default new DataSource({
  type: 'postgres',
  port: Number(process.env.DATABASE_PORT ?? 5432),
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER_NAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  entities: ['src/**/*.entity.ts'],
  migrations: ['src/Migrations/*.ts'],

  synchronize: false,
  migrationsRun: false,

  migrationsTableName: 'migrations',
});
