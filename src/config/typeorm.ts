import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

import { join } from 'path';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}`,
  port: `${process.env.DATABASE_PORT}`,
  username: `${process.env.DATABASE_USERNAME}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  entities: ['dist/entity/**/*{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],

//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   migrations: [join(__dirname, '/../../', 'database/migrations/**/*{.ts,.js}')],
  logging: true,
  migrationsRun: false,
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);