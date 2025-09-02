import { response } from 'express';
import bcrypt from 'bcrypt';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pg from 'pg';
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

app.post("/book", async (req, res) => {
  const {
    fullName,
    phoneNumber,
    email,
    statuss,
    language,
    concern,
    date,
    time,
    couponCode, } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO bookings (fullName, phoneNumber, email, statuss, language, concern, date, time, couponCode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [fullName, phoneNumber, email, statuss, language, concern, date, time, couponCode]
    );

    res.json({ message: "Booking successful", booking: result.rows[0] });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Booking failed" });
  }
})





app.listen(5000, () => {
  console.log("Server is running");
})