import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

try {
  const client = await pool.connect();

  console.log('Connection successful');

  client.release();
} catch (err) {
  console.log('Error connecting:', err);
}

export default pool;
