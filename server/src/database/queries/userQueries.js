import pool from '../connection.js';
// modify the users table
export const saveUser = async (name, email, passwordHash) => {
  const result = await pool.query(`INSERT INTO users (name, email, password ) VALUES ($1, $2, $3) RETURNING id`, [
    name,
    email,
    passwordHash,
  ]);

  return result.rows[0].id;
};
// modify the users table
export const searchEmail = async (email) => {
  const result = await pool.query(`SELECT id, password FROM users WHERE email = $1`, [email]);
  return result.rows[0];
};
//modify the refresh_tokens table
export const saveRefreshToken = async (userID, refreshToken, expiresAt) => {
  const result = await pool.query(
    `INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3) RETURNING id`,
    [userID, refreshToken, expiresAt]
  );
  return result.rows[0].id;
};

export const getAllUsers = async () => {
  const result = await pool.query(`SELECT id, name, email FROM users`);
  return result.rows;
};

export const getUserByRefreshToken = async (refreshToken) => {
  const result = await pool.query('SELECT * FROM users WHERE refresh_token = $1', [refreshToken]);
  return result.rows;
};

export const postLogout = async (refreshToken) => {
  const result = await pool.query(`UPDATE users SET refreshToken = NULL WHERE refresh_token = $1 `, [refreshToken]);
  return result.rows;
};
