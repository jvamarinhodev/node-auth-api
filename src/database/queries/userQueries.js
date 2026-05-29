import pool from '../conection.js';

export const saveUser = async (name, email, passwordHash) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password ) VALUES ($1, $2, $3) RETURNING id`,
    [name, email, passwordHash]
  );

  return result.rows[0].id;
};
