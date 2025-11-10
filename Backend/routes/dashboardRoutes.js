import express from 'express';
import { getRevenue, getActiveClients, getPending } from '../controllers/dashboardController.js';

const router = express.Router();

// Get total revenue
router.get("/revenue", getRevenue);
// Active clients (derived from bookings)
router.get('/active-clients', getActiveClients);
// Pending bookings count
router.get('/pending', getPending);

export default router;
