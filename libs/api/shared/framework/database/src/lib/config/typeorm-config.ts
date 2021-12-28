import dotenv from 'dotenv';
import path from 'path';

const rootPath = path.normalize(__dirname + '/../../../../../../../../');
const envPath = path.normalize(rootPath + 'apps/api/.env');
const migrationsPath = path.normalize(__dirname + '../migrations');

dotenv.config({ path: envPath });

export default {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['**/*.entity.ts'],
  cli: {
    migrationsDir: migrationsPath,
  },
};
