import { pool } from '../config/database.js';

// Create a new booking
export const createBooking = async (bookingData) => {
  const { fullName, email, phoneNumber, date, time, doctor, status = 'pending' } = bookingData;
  const query = `
    INSERT INTO bookings (fullName, email, phoneNumber, date, time, doctor, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const values = [fullName, email, phoneNumber, date, time, doctor, status];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Update booking status (kept for compatibility)
export const updateBookingStatus = async (phoneNumber, date, time, status) => {
  const query = `
    UPDATE bookings
    SET status = $1
    WHERE phoneNumber = $2 AND date = $3 AND time = $4
    RETURNING *
  `;
  const values = [status, phoneNumber, date, time];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Generic update function expected by controller (alias to updateBookingStatus)
export const updateBooking = async (updateData) => {
  // Expecting an object with phoneNumber, date, time and status
  const { phoneNumber, date, time, status } = updateData;
  return await updateBookingStatus(phoneNumber, date, time, status);
};

// Get recent bookings with optional limit
export const getBookings = async (limit = 10) => {
  const query = `
    SELECT fullName, phoneNumber, status, date, time, doctor
    FROM bookings
    ORDER BY date DESC, time DESC
    LIMIT $1
  `;
  const result = await pool.query(query, [limit]);
  return result.rows;
};

// Get all bookings (controller uses this name)
export const getAllBookings = async () => {
  const query = `
    SELECT * FROM bookings
    ORDER BY date DESC, time DESC
  `;
  const result = await pool.query(query);
  return result.rows;
};
