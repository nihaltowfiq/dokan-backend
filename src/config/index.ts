import * as dotenv from 'dotenv';
dotenv.config();

import appConfig from './app.config';
import authConfig from './auth.config';
import databaseConfig from './database.config';

const config = {
  app: appConfig,
  database: databaseConfig,
  auth: authConfig,
};

export default config;
