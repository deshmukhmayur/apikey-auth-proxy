import { config } from 'dotenv-safe';

config();

export const {
  NODE_ENV = 'development',
  PORT = '8080',
  MONGODB_URI = 'mongodb://localhost:27017/auth-proxy',
  API_TOKEN_PREFIX = 'apik',
  ROUTE_CONFIG_PATH = 'config.yaml',
} = process.env;

export const ENABLE_API_KEY_AUTH = process.env.ENABLE_API_KEY_AUTH === 'true';
