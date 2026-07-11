import pg from 'pg';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

async function migrate() {
  const client = new pg.Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    const migrationSQL = readFileSync(join(__dirname, '001_create_tables.sql'), 'utf-8');
    await client.query(migrationSQL);
    console.log('Migrations executed successfully');

    await client.end();
    console.log('Done');
  } catch (error) {
    console.error('Migration error:', error.message);
    await client.end();
    process.exit(1);
  }
}

migrate();
