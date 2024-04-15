import { DataSource } from 'typeorm';
import { join } from 'path';

export const connectionSource = new DataSource({
  type: 'postgres',
  host: 'localhost', //process.env.DATABASE_HOST,
  port: 5432, //parseInt(process.env.DATABASE_PORT, 10),
  username: 'postgres', //process.env.DATABASE_USERNAME,
  password: 'password', //process.env.DATABASE_PASSWORD,
  database: 'gymtrainer_db', //process.env.DATABASE_NAME,
  logging: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [join(__dirname, '/../../', 'database/migrations/**/*{.ts,.js}')],
  synchronize: false,
  migrationsRun: false,
});
