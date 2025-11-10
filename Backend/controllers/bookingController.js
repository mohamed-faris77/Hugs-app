import { createBooking, getAllBookings, updateBooking } from '../models/bookingModel.js';

export const createBookingHandler = async (req, res) => {
  const bookingData = req.body;

  try {
    const booking = await createBooking(bookingData);
    res.json({ message: "Booking successful", booking });
  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).json({ error: "Booking failed" });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await getAllBookings();
    res.json({ bookings });
  } catch (error) {
    console.error("Fetch bookings error:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

export const updateBookingHandler = async (req, res) => {
  const updateData = req.body;

  try {
    const booking = await updateBooking(updateData);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found for update" });
    }
    res.json({ message: "Booking updated successfully", booking });
  } catch (error) {
    console.error("Booking update error:", error);
    res.status(500).json({ error: "Booking update failed" });
  }
};
