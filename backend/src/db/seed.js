import pg from 'pg';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

async function seed() {
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

    const seedSQL = readFileSync(join(__dirname, '001_seed_data.sql'), 'utf-8');
    await client.query(seedSQL);
    console.log('Seed data inserted successfully');

    await client.end();
    console.log('Done');
  } catch (error) {
    console.error('Seed error:', error.message);
    await client.end();
    process.exit(1);
  }
}

seed();
