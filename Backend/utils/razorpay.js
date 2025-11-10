import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Razorpay instance
export const razorpay = new Razorpay({
  key_id: process.env.Key_id,
  key_secret: process.env.Key_secret,
});

export default razorpay;
