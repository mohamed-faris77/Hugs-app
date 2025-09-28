// PhonePe integration file commented out
// console.log('[PhonePe] phonepe.js loaded');
// import express from 'express';
// import axios from 'axios';
// import crypto from 'crypto';
// import dotenv from 'dotenv';
// dotenv.config();

// const router = express.Router();



// PhonePe credentials from environment variables
// const PHONEPE_MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
// const PHONEPE_MERCHANT_KEY = process.env.PHONEPE_MERCHANT_KEY;
// const PHONEPE_CLIENT_ID = process.env.PHONEPE_CLIENT_ID;
// const PHONEPE_CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET;
// const PHONEPE_CLIENT_VERSION = process.env.PHONEPE_CLIENT_VERSION || "1.0";
// const PHONEPE_BASE_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
// console.log("[PhonePe] Merchant ID:", PHONEPE_MERCHANT_ID);
// console.log("[PhonePe] Merchant Key (first 6 chars):", PHONEPE_MERCHANT_KEY ? PHONEPE_MERCHANT_KEY.slice(0, 6) + '...' : undefined);
// console.log("[PhonePe] Client ID:", PHONEPE_CLIENT_ID);

// let phonepeAccessToken = null;
// let phonepeTokenExpiry = null;

// Endpoint to fetch PhonePe OAuth token
// router.post('/api/phonepe/token', async (req, res) => {
//   try {
//     const requestHeaders = {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     };
//     const requestBodyJson = {
//       client_id: PHONEPE_CLIENT_ID,
//       client_secret: PHONEPE_CLIENT_SECRET,
//       client_version: PHONEPE_CLIENT_VERSION,
//       grant_type: 'client_credentials'
//     };
//     const requestBody = new URLSearchParams(requestBodyJson).toString();
//     const options = {
//       method: 'POST',
//       url: PHONEPE_BASE_URL + '/v1/oauth/token',
//       headers: requestHeaders,
//       data: requestBody
//     };
//     const response = await axios.request(options);
//     phonepeAccessToken = response.data.access_token;
//     phonepeTokenExpiry = response.data.expires_at;
//     res.json(response.data);
//   } catch (err) {
//     console.error('[PhonePe] TOKEN ERROR:', err.response?.data || err);
//     res.status(500).json({ error: 'PhonePe token fetch failed', details: err.response?.data || String(err) });
//   }
// });

// Initiate PhonePe payment
// router.post('/api/phonepe/initiate', async (req, res) => {
//   console.log('[PhonePe] /api/phonepe/initiate called');
//   try {
//     const { amount, phoneNumber, date, time } = req.body;
//     const transactionId = `TXN_${Date.now()}`;
//     const payload = {
//       merchantId: PHONEPE_MERCHANT_ID,
//       merchantTransactionId: transactionId,
//       merchantUserId: phoneNumber,
//       amount: amount, // in paise
//       redirectUrl: "http://localhost:5173/payment-success",
//       redirectMode: "POST",
//       mobileNumber: phoneNumber,
//       paymentInstrument: {
//         type: "UPI_INTENT"
//       }
//     };
//     const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64');
//     const xVerify = crypto.createHash('sha256')
//       .update(payloadBase64 + "/pg/v1/pay" + PHONEPE_MERCHANT_KEY)
//       .digest('hex') + '###1';
//     const response = await axios.post(
//       PHONEPE_BASE_URL + "/pg/v1/pay",
//       { request: payloadBase64 },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'X-VERIFY': xVerify,
//           'X-MERCHANT-ID': PHONEPE_MERCHANT_ID
//         }
//       }
//     );
//     res.json(response.data);
//   } catch (err) {
//     console.error('[PhonePe] ERROR:', err.response?.data || err);
//     res.status(500).json({ error: 'PhonePe payment initiation failed', details: err.response?.data || String(err) });
//   }
// });

// export default router;
