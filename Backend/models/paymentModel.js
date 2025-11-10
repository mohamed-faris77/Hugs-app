import { pool } from '../config/database.js';

export const createPaymentOrder = async (orderId, amount, currency, status, phoneNumber, date, time) => {
  const query = `
    INSERT INTO payments (order_id, amount, currency, status, phonenumber, date, time)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const values = [orderId, amount, currency, status, phoneNumber, date, time];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const updatePaymentStatus = async (orderId, paymentId, status) => {
  const query = `
    UPDATE payments
    SET payment_id = $1, status = $2
    WHERE order_id = $3
    RETURNING *
  `;
  const values = [paymentId, status, orderId];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getPaymentByOrderId = async (orderId) => {
  const query = 'SELECT * FROM payments WHERE order_id = $1';
  const result = await pool.query(query, [orderId]);
  return result.rows[0];
};

export const getTotalRevenue = async () => {
  const query = "SELECT COALESCE(SUM(amount), 0) AS total_paise FROM payments WHERE status = 'paid'";
  const result = await pool.query(query);
  return result.rows[0].total_paise;
};

export const getAllPayments = async () => {
  const query = `
    SELECT * FROM payments
    ORDER BY created_at DESC NULLS LAST
  `;
  const result = await pool.query(query);
  return result.rows;
};
