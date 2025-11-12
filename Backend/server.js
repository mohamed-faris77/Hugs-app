import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// ✅ Load environment variables early
dotenv.config();

// ✅ Import database connection (your config handles retries + IPv4 fix)
import './config/database.js';

// ✅ Import routes
import paymentRoutes from './routes/paymentRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import authRoutes from './routes/authRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import { getPayments } from './controllers/paymentController.js';

// ✅ Import middleware
import { errorHandler } from './middleware/errorHandler.js';

// ✅ Initialize Express app
const app = express();

// ✅ JSON body parsing
app.use(express.json());

// ✅ Define allowed origins (CORS)
const allowedOrigins = [
  'https://hugsapp.vercel.app', // your production frontend on Vercel
  'http://localhost:5173',      // for local development
];

// ✅ CORS middleware (must come before routes)
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g., mobile apps or tools)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.warn(`❌ CORS blocked for origin: ${origin}`);
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ✅ Optional preflight handler (improves stability)
app.options('*', cors());

// ✅ Main routes
app.use('/api/payment', paymentRoutes);
app.use('/contact', contactRoutes);
app.use('/dashboard', dashboardRoutes);
app.get('/payments', getPayments);
app.use('/', bookingRoutes);
app.use('/', authRoutes);
app.use('/', feedbackRoutes);

// ✅ Root endpoint check (useful for Render health checks)
app.get('/', (req, res) => {
  res.json({ message: 'HUGS Backend API is running 🚀' });
});

// ✅ Error handling middleware (keep last)
app.use(errorHandler);

// ✅ Listen on Render’s dynamic port (must use 0.0.0.0)
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
});
