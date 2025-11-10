import bcrypt from 'bcrypt';
import pool from '../config/database.js';

export const createUser = async (username, password) => {
  const hashpassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
    [username, hashpassword]
  );
  return result.rows[0];
};

export const findUserByUsername = async (username) => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  return result.rows[0];
};

export const getTotalUsers = async () => {
  const result = await pool.query("SELECT COUNT(*) AS total_users FROM users");
  return parseInt(result.rows[0].total_users);
};
