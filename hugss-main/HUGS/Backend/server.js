
import { response } from 'express';
import bcrypt from 'bcrypt';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pg from 'pg';
import Razorpay from "razorpay";
import crypto from 'crypto';
// const express = require('express')
// const dotenv = require('dotenv')
// const cors = require('cors')
// const bcrypt = require('bcrypt')

dotenv.config()
const app = express()
// const pg = require('pg')
const { Pool } = pg;
app.use(express.json());
app.use(cors());
//DB connection

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
})

pool.connect().then(() => {
  console.log(" DB Connected");
}).catch((err) => {
  console.log(err);
})

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.Key_id,
  key_secret: process.env.Key_secret,
});


// Save contact form submission
app.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO contact (name, email, subject, message, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *",
      [name, email, subject, message]
    );
    res.json({ message: "Contact form submitted successfully", contact: result.rows[0] });
  } catch (error) {
    console.log("Contact form submission error:", error);
    res.status(500).json({ error: "Failed to submit contact form" });
  }
});

// Get all contact submissions
app.get("/contact", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contact ORDER BY created_at DESC");
    res.json({ contact: result.rows });
  } catch (error) {
    console.log("Fetch contact error:", error);
    res.status(500).json({ error: "Failed to fetch contact submissions" });
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashpassword = await bcrypt.hash(password, 10);

    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashpassword]);

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);

  }
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1", [username]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "User not found" })
    }


    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    res.json({ message: "Login successful ", user: { id: user.id, username: user.username } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });

  }
})


app.get("/bookings", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM bookings ORDER BY date DESC, time DESC");
    res.json({ bookings: result.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});


// Get total users ever registered
app.get("/dashboard/active-clients", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) AS total_users FROM users");
    res.json({ activeClients: parseInt(result.rows[0].total_users) });
  } catch (error) {
    console.log("Active clients fetch error:", error);
    res.status(500).json({ error: "Failed to fetch active clients" });
  }
});

// Get pending bookings count
app.get("/dashboard/pending", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) AS pending_count FROM bookings WHERE LOWER(statuss) = 'pending'");
    res.json({ pending: parseInt(result.rows[0].pending_count) });
  } catch (error) {
    console.log("Pending bookings fetch error:", error);
    res.status(500).json({ error: "Failed to fetch pending bookings" });
  }
});

app.post("/book", async (req, res) => {
  const {
    fullName,
    phoneNumber,
    email,
    statuss,
    doctor,
    language,
    concern,
    date,
    time,
    couponCode,
  } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO bookings (fullName, phoneNumber, email, statuss, doctor, language, concern, date, time, couponCode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [fullName, phoneNumber, email, statuss, doctor, language, concern, date, time, couponCode]
    );

    res.json({ message: "Booking successful", booking: result.rows[0] });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Booking failed" });
  }
});

// Feedback endpoints
app.post("/feedback", async (req, res) => {
  const { name, phone, message, rating } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO feedback (name, phone, message, rating, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *",
      [name, phone, message, rating]
    );

    res.json({ message: "Feedback submitted successfully", feedback: result.rows[0] });
  } catch (error) {
    console.log("Feedback submission error:", error);
    res.status(500).json({ error: "Failed to submit feedback" });
  }
});

app.get("/feedback", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM feedback ORDER BY created_at DESC");
    res.json({ feedback: result.rows });
  } catch (error) {
    console.log("Fetch feedback error:", error);
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
});

app.get("/feedback/stats", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*) as total_feedback,
        AVG(CASE
          WHEN rating = 'happy' THEN 5
          WHEN rating = 'normal' THEN 3
          WHEN rating = 'sad' THEN 1
          ELSE 0
        END) as average_rating,
        COUNT(CASE WHEN rating = 'happy' THEN 1 END) as happy_count,
        COUNT(CASE WHEN rating = 'normal' THEN 1 END) as normal_count,
        COUNT(CASE WHEN rating = 'sad' THEN 1 END) as sad_count
      FROM feedback
    `);

    const stats = result.rows[0];
    res.json({
      totalFeedback: parseInt(stats.total_feedback),
      averageRating: parseFloat(stats.average_rating || 0).toFixed(1),
      ratingBreakdown: {
        happy: parseInt(stats.happy_count),
        normal: parseInt(stats.normal_count),
        sad: parseInt(stats.sad_count)
      }
    });
  } catch (error) {
    console.log("Feedback stats error:", error);
    res.status(500).json({ error: "Failed to fetch feedback statistics" });
  }
});





// Test endpoint for feedback API
app.get("/test-feedback", async (req, res) => {
  console.log(" Testing Feedback API Endpoints...");

  const testFeedback = {
    name: "Test User",
    phone: "+1234567890",
    message: "This is a test feedback message.",
    rating: "happy"
  };

  try {
    // Test 1: Insert test feedback
    console.log(" Testing feedback insertion...");
    const insertResult = await pool.query(
      "INSERT INTO feedback (name, phone, message, rating, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *",
      [testFeedback.name, testFeedback.phone, testFeedback.message, testFeedback.rating]
    );
    console.log(" Test feedback inserted:", insertResult.rows[0]);

    // Test 2: Fetch all feedback
    console.log(" Testing feedback retrieval...");
    const fetchResult = await pool.query("SELECT * FROM feedback ORDER BY created_at DESC LIMIT 5");
    console.log(` Retrieved ${fetchResult.rows.length} feedback entries`);

    // Test 3: Get feedback statistics
    console.log("Testing feedback statistics...");
    const statsResult = await pool.query(`
      SELECT
        COUNT(*) as total_feedback,
        AVG(CASE
          WHEN rating = 'happy' THEN 5
          WHEN rating = 'normal' THEN 3
          WHEN rating = 'sad' THEN 1
          ELSE 0
        END) as average_rating,
        COUNT(CASE WHEN rating = 'happy' THEN 1 END) as happy_count,
        COUNT(CASE WHEN rating = 'normal' THEN 1 END) as normal_count,
        COUNT(CASE WHEN rating = 'sad' THEN 1 END) as sad_count
      FROM feedback
    `);

    const stats = statsResult.rows[0];
    console.log(" Feedback Statistics:", {
      totalFeedback: parseInt(stats.total_feedback),
      averageRating: parseFloat(stats.average_rating || 0).toFixed(1),
      ratingBreakdown: {
        happy: parseInt(stats.happy_count),
        normal: parseInt(stats.normal_count),
        sad: parseInt(stats.sad_count)
      }
    });

    res.json({
      message: "Feedback API test completed successfully",
      testResults: {
        inserted: insertResult.rows[0],
        totalEntries: fetchResult.rows.length,
        statistics: {
          totalFeedback: parseInt(stats.total_feedback),
          averageRating: parseFloat(stats.average_rating || 0).toFixed(1),
          ratingBreakdown: {
            happy: parseInt(stats.happy_count),
            normal: parseInt(stats.normal_count),
            sad: parseInt(stats.sad_count)
          }
        }
      }
    });

  } catch (error) {
    console.log(" Test failed:", error);
    res.status(500).json({
      error: "Feedback API test failed",
      details: error.message
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
    endpoints: {
      feedback: {
        POST: "/feedback - Submit feedback",
        GET: "/feedback - Get all feedback",
        GET_STATS: "/feedback/stats - Get feedback statistics"
      },
      test: {
        GET: "/test-feedback - Run feedback API tests"
      }
    }
  });
});

// ✅ Create Razorpay Order
app.post("/api/create-order", async (req, res) => {
  try {
    let { amount, currency = "INR", receipt } = req.body;
    // amount is already in paise from frontend
    const options = { amount, currency, receipt };
    const order = await razorpay.orders.create(options);

    // Save order to DB with correct amount
    await pool.query(
      "INSERT INTO payments (order_id, amount, currency, status) VALUES ($1, $2, $3, $4)",
      [order.id, amount, currency, "created"]
    );

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ✅ Verify Payment Signature
app.post("/api/verify-payment", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.Key_secret)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    await pool.query(
      "UPDATE payments SET payment_id=$1, status=$2 WHERE order_id=$3",
      [razorpay_payment_id, "paid", razorpay_order_id]
    );
    res.json({ success: true });
  } else {
    // Mark as failed if signature invalid
    await pool.query(
      "UPDATE payments SET status=$1 WHERE order_id=$2",
      ["failed", razorpay_order_id]
    );
    res.status(400).json({ success: false, error: "Invalid signature" });
  }
});



app.listen(5000, () => {
  console.log("🚀 Server is running on port 5000");
})
