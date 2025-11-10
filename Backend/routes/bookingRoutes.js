import express from 'express';
import { createBookingHandler, getBookings, updateBookingHandler } from '../controllers/bookingController.js';

const router = express.Router();

// Booking routes
router.post('/book', createBookingHandler);
router.get('/bookings', getBookings);
router.patch('/book', updateBookingHandler);

export default router;
