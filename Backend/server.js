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
app.use(
  cors({
    origin: process.env.FRONTEND_URL || '*', // Allow your frontend domain
    credentials: true,
  })
);

// Routes
app.use('/api/payment', paymentRoutes);
app.use('/contact', contactRoutes);
app.use('/dashboard', dashboardRoutes);
app.get('/payments', getPayments);
app.use('/', bookingRoutes);
app.use('/', authRoutes);
app.use('/', feedbackRoutes);

// Error handling middleware
app.use(errorHandler);

// app.listen(port, () => {
//   console.log(`🚀 Server is running on port ${port}`);
// });


// ✅ IMPORTANT: Export the app instead of app.listen()
export default app;
