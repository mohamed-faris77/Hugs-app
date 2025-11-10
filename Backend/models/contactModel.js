import { pool } from '../config/database.js';

export const createContact = async (name, email, subject, message) => {
  const query = `
    INSERT INTO contact (name, email, subject, message, created_at)
    VALUES ($1, $2, $3, $4, NOW())
    RETURNING *
  `;
  const values = [name, email, subject, message];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAllContacts = async () => {
  const query = `
    SELECT * FROM contact
    ORDER BY created_at DESC
  `;
  const result = await pool.query(query);
  return result.rows;
};
