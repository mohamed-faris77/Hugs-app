import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Import database configuration
import './config/database.js';

// Import routes
import paymentRoutes from './routes/paymentRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import authRoutes from './routes/authRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import { getPayments } from './controllers/paymentController.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json());

// ✅ Safe, production-grade CORS setup
const allowedOrigins = [
  'https://hugsapp.vercel.app', // production frontend
  'http://localhost:5173',      // local development
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ✅ Routes
app.use('/api/payment', paymentRoutes);
app.use('/contact', contactRoutes);
app.use('/dashboard', dashboardRoutes);
app.get('/payments', getPayments);
app.use('/', bookingRoutes);
app.use('/', authRoutes);
app.use('/', feedbackRoutes);

// ✅ Error handling middleware
app.use(errorHandler);

// ✅ Listen on Render’s assigned port
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
});
