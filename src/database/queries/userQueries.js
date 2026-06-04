import pool from '../conection.js';

export const saveUser = async (name, email, passwordHash) => {
  const result = await pool.query(`INSERT INTO users (name, email, password ) VALUES ($1, $2, $3) RETURNING id`, [
    name,
    email,
    passwordHash,
  ]);

  return result.rows[0].id;
};

export const searchEmail = async (email) => {
  const result = await pool.query(`SELECT id, password FROM users WHERE email = $1`, [email]);
  return result.rows[0];
};

export const saveRefreshToken = async (refreshToken, userID) => {
  const result = await pool.query(`UPDATE users SET refreshToken = $1 WHERE id = $2`, [refreshToken, userID]);
  return result;
};

export const getAllUsers = async () => {
  const result = await pool.query(`SELECT id, name, email, FROM users`);
  return result;
};
