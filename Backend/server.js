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
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL, // only allow this URL
  credentials: true
}));

// Routes
app.use('/api/payment', paymentRoutes);
app.use('/contact', contactRoutes);
app.use('/dashboard', dashboardRoutes);

// Admin listing for payments (keeps compatibility with previous frontend expectations)
app.get('/payments', getPayments);

// Mount additional routes so frontend URLs (e.g. /bookings, /book, /register, /login, /feedback)
// resolve without requiring a separate /api prefix.
app.use('/', bookingRoutes);
app.use('/', authRoutes);
app.use('/', feedbackRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
