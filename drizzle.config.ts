import { defineConfig } from "drizzle-kit";
import { cwd } from 'node:process';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(cwd());

export default defineConfig({
  out: './migrations',
  dialect: 'turso',
  schema: './src/db/schema',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
})
