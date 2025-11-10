// Database status check script
// Usage: node scripts/dbStatusCheck.js

import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the Backend directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Important for Supabase / cloud databases
  },
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
