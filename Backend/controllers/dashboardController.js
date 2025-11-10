import { getTotalRevenue } from '../models/paymentModel.js';
import { getAllBookings } from '../models/bookingModel.js';

export const getRevenue = async (req, res) => {
  try {
    // Only sum successful payments
    const totalPaise = await getTotalRevenue();
    // Convert paise to rupees
    const totalRupees = parseInt(totalPaise, 10) / 100;
    res.json({ revenue: totalRupees });
  } catch (error) {
    console.log("Revenue fetch error:", error);
    res.status(500).json({ error: "Failed to fetch revenue" });
  }
};

export const getActiveClients = async (req, res) => {
  try {
    const bookings = await getAllBookings();
    const successful = bookings.filter(b => b.status === 'success' || b.status === 'paid');
    const unique = new Set(successful.map(b => b.phoneNumber || b.phonenumber || b.email || b.fullname || b.fullName));
    res.json({ activeClients: unique.size });
  } catch (error) {
    console.error('Failed to compute active clients:', error);
    res.status(500).json({ error: 'Failed to compute active clients' });
  }
};

export const getPending = async (req, res) => {
  try {
    const bookings = await getAllBookings();
    const pending = bookings.filter(b => !(b.status === 'success' || b.status === 'paid'));
    res.json({ pending: pending.length });
  } catch (error) {
    console.error('Failed to compute pending bookings:', error);
    res.status(500).json({ error: 'Failed to compute pending bookings' });
  }
};
