import 'dotenv'
import { defineConfig } from 'drizzle-kit';

const dburl = process.env.DATABASE_URL  
 
export default defineConfig({
  out: './drizzle',
  schema: './src/database/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: dburl ?? "postgresql://myuser:mysecretpassword@localhost:5432/mydatabase",
  },
});
 