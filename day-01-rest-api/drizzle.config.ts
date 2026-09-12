import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const dburl = process.env.DATABASE_URL ?? "postgresql://myuser:mysecretpassword@localhost:5432/mydatabase" 
 
export default defineConfig({
  out: './drizzle',
  schema: './src/database/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: dburl,
  },
});
 