//data base debugging 
//learned today -11
//not necessary for running the code

import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

async function checkStatus() {
  try {
    const payments = await pool.query(
      `SELECT order_id, amount, status, phonenumber, date, time FROM payments ORDER BY date DESC, time DESC LIMIT 5`
    );
    const bookings = await pool.query(
      `SELECT fullName, phoneNumber, status, date, time FROM bookings ORDER BY date DESC, time DESC LIMIT 5`
    );
    console.log('--- Latest Payments ---');
    payments.rows.forEach(row => console.log(row));
    console.log('\n--- Latest Bookings ---');
    bookings.rows.forEach(row => console.log(row));
    process.exit(0);
  } catch (err) {
    console.error('Error querying database:', err);
    process.exit(1);
  }
}

checkStatus();
