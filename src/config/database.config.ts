import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT||'5432'),
  userName: process.env.DATABASE_USER_NAME,
  password: process.env.DATABASE_PASSWORD,
  databaseName: process.env.DATABASE_NAME,
}));
