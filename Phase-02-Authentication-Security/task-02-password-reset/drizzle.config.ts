import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const dbUrl = process.env.DATABASE_URL!

export default defineConfig({
  out: './drizzle',
  schema: './src/database/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: dbUrl,
  },
});
