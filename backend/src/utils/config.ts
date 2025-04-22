import dotenv from 'dotenv';
import _ from 'lodash';

dotenv.config(); 
const configFromEnv = process.env;
if (configFromEnv.NODE_ENV) {
  configFromEnv.NODE_ENV = configFromEnv.NODE_ENV.split('.')[0];
}

function getEnvValue(key: string): string | undefined;
function getEnvValue(key: string, fallback: string): string;
function getEnvValue(key: string, fallback?: string): string | undefined {
  const value = configFromEnv[key];
  return value === undefined || value === '' ? fallback : value;
}
const appConfig = {
  MODE: configFromEnv.NODE_ENV === 'production' ? 'production' : 'development',
  HOST: getEnvValue('HOST', '0.0.0.0'),
  HTTP_PORT: getEnvValue('HTTP_PORT', '10100'),
  MONGO_URI: getEnvValue('MONGO_URI', 'mongodb://localhost:4306'),
  MONGO_DB_NAME_PREFIX: getEnvValue('MONGO_DB_NAME_PREFIX', ''),
  CORS_ORIGIN: getEnvValue('CORS_ORIGIN'),
  LOG_LEVEL_FILE: getEnvValue('LOG_LEVEL_FILE'),
  LOG_LEVEL_CONSOLE: getEnvValue('LOG_LEVEL_CONSOLE'),
  API_VERSION: getEnvValue('API_VERSION','v1')
};



export {
  getEnvValue,
  appConfig
};
