import { razorpay } from '../utils/razorpay.js';
import crypto from 'crypto';
import { createPaymentOrder, updatePaymentStatus, getPaymentByOrderId, getAllPayments } from '../models/paymentModel.js';
import { updateBookingStatus } from '../models/bookingModel.js';

export const createOrder = async (req, res) => {
  try {
    let { amount, currency = "INR", receipt, phoneNumber, date, time } = req.body;
    // amount is already in paise from frontend
    const options = { amount, currency, receipt };
    const order = await razorpay.orders.create(options);

    // Save order to DB with correct amount and booking reference
    await createPaymentOrder(order.id, amount, currency, "created", phoneNumber, date, time);

    res.json(order);
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await getAllPayments();
    res.json({ payments });
  } catch (err) {
    console.error('Failed to fetch payments:', err);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
};

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.Key_secret)
    .update(body.toString())
    .digest("hex");

  // Find the payment record to get phoneNumber, date, time for booking update
  const payment = await getPaymentByOrderId(razorpay_order_id);

  if (expectedSignature === razorpay_signature) {
    await updatePaymentStatus(razorpay_order_id, razorpay_payment_id, "paid");
    // Also update the booking status to 'success'
    if (payment) {
      await updateBookingStatus(payment.phonenumber, payment.date, payment.time, "success");
    }
    res.json({ success: true });
  } else {
    // Mark as failed if signature invalid
    await updatePaymentStatus(razorpay_order_id, null, "failed");
    // Also update the booking status to 'failed'
    if (payment) {
      await updateBookingStatus(payment.phonenumber, payment.date, payment.time, "failed");
    }
    res.status(400).json({ success: false, error: "Invalid signature" });
  }
};
