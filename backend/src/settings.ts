import dotenv from 'dotenv';

function loadFromEnv(varName: string): string {
  const envVar = process.env[varName];
  if (!envVar) {
    throw new Error(`Missing ${varName} in vars!`);
  }
  return envVar;
}

dotenv.config();

export const HASH_ID_SALT = loadFromEnv('HASH_ID_SALT');

export const JWT_KEY = loadFromEnv('JWT_KEY');

export const MONGO_PASSWORD = loadFromEnv('MONGO_PASSWORD');

export const MONGO_USERNAME = loadFromEnv('MONGO_USERNAME');

export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
