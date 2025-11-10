

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreditCard, Lock } from "lucide-react";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import axios from "axios";

// UPI_APPS array commented out
// const UPI_APPS: { id: string; name: string; icon: string }[] = [
//   { id: "gpay", name: "Google Pay", icon: "🔵" },
//   { id: "phonepe", name: "PhonePe", icon: "💜" },
//   { id: "paytm", name: "Paytm", icon: "🔷" },
// ];

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData;
  const discount = location.state?.discount || 0;
  const { isUserLoggedIn, isAdmin } = useAuthStore();

  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card");
  const [loading, setLoading] = useState(false);

  // Restrict access
  if (!bookingData) {
    navigate("/booking");
    return null;
  }
  if (!isUserLoggedIn && !isAdmin) {
    navigate("/signin");
    return null;
  }

  // Calculate discounted amount (in paise)
  const baseAmount = 100; // Rs 100
  const discountedAmount = Math.round(baseAmount * (1 - discount / 100));
  const amountInPaise = discountedAmount * 100;

  const handleCardPayment = async () => {
    try {
      setLoading(true);

      // Ask backend to create an order with discounted amount
      const { data } = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/payment/create-order`, {
        amount: amountInPaise, // in paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        phoneNumber: bookingData.phone,
        date: bookingData.date,
        time: bookingData.time,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // frontend key (safe)
        amount: data.amount,
        currency: data.currency,
        name: "My Booking App",
        description: "Booking Payment",
        order_id: data.id, // from backend
        handler: async function (response: any) {
          try {
            // Call backend to verify payment
            await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/payment/verify-payment`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              phoneNumber: bookingData.phone,
              date: bookingData.date,
              time: bookingData.time,
              amount: amountInPaise
            });
            toast.success("Payment Successful");
            // Navigate to success page
            navigate("/payment-success", {
              state: {
                bookingData,
                paymentMethod,
                transactionId: response.razorpay_payment_id,
              },
            });
          } catch (err) {
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#7e22ce",
        },
        method: {
          netbanking: true,
          card: true,
          upi: true, // Enable UPI
          wallet: true,
        },
      };

      // Debug: ensure key is present before opening checkout
      if (!options.key) {
        console.error('Razorpay key missing: import.meta.env.VITE_RAZORPAY_KEY_ID is', import.meta.env.VITE_RAZORPAY_KEY_ID);
        toast.error('Payment initialization error: missing Razorpay key. Check frontend env configuration.');
        setLoading(false);
        return;
      }

      // Open Razorpay modal
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  // PhonePe UPI payment integration (commented out)
  // const PHONEPE_MERCHANT_ID = import.meta.env.VITE_PHONEPE_MERCHANT_ID || "TEST-M23A2WT7NNW46_25091";
  // const PHONEPE_SECRET_KEY = import.meta.env.VITE_PHONEPE_SECRET_KEY || "NjQ4MDU3YWItZGRhYi00Yjc3LWE1MmUtZDM3Mzg5M2Q5YWYy";

  // const handleUpiPayment = async () => {
  //   setLoading(true);
  //   try {
  //     const { data } = await axios.post("`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/phonepe/initiate`", {
  //       amount: amountInPaise,
  //       phoneNumber: bookingData.phone,
  //       date: bookingData.date,
  //       time: bookingData.time,
  //     });
  //     // PhonePe returns a redirect URL in data.data.instrumentResponse.redirectInfo.url
  //     const redirectUrl = data?.data?.instrumentResponse?.redirectInfo?.url;
  //     if (redirectUrl) {
  //       window.location.href = redirectUrl;
  //     } else {
  //       toast.error("Failed to get PhonePe payment URL.");
  //     }
  //   } catch (err) {
  //     toast.error("PhonePe payment initiation failed.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Details</h1>
          <Lock className="h-6 w-6 text-purple-600" />
        </div>

        {/* Booking Summary */}
        <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Booking Summary
          </h2>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p>Date: {bookingData.date}</p>
            <p>Time: {bookingData.time}</p>
            <p>Duration: 60 minutes</p>
            <p className="text-lg font-semibold text-purple-600">Total: Rs {discountedAmount}</p>
          </div>
        </div>

        {/* Payment Method Toggle (commented out) */}
        {/**
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Select Payment Method
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setPaymentMethod("card")}
              className={`p-4 border rounded-lg flex items-center justify-center transition-colors
                ${paymentMethod === "card"
                  ? "border-purple-600 bg-purple-50 dark:bg-purple-900 dark:border-purple-400"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                }
                text-gray-900 dark:text-white`}
            >
              <CreditCard className="h-5 w-5 mr-2" />
              <span>Card Payment</span>
            </button>
            <button
              onClick={() => setPaymentMethod("upi")}
              className={`p-4 border rounded-lg flex items-center justify-center transition-colors
                ${paymentMethod === "upi"
                  ? "border-purple-600 bg-purple-50 dark:bg-purple-900 dark:border-purple-400"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                }
                text-gray-900 dark:text-white`}
            >
              <Phone className="h-5 w-5 mr-2" />
              <span>UPI Payment</span>
            </button>
          </div>
        </div>
        */}

        {/* Card/UPI payment forms (commented out) */}
        {/**
        {paymentMethod === "card" ? (
          <button onClick={handlePayment} disabled={loading} className="w-full btn-primary">
            {loading ? "Processing..." : "Pay Now"}
          </button>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {UPI_APPS.map((app: { id: string; name: string; icon: string }) => (
                <button
                  key={app.id}
                  type="button"
                  className="p-4 border rounded-lg text-center border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <span className="text-2xl mb-2 block">{app.icon}</span>
                  <span className="text-sm">{app.name}</span>
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="yourname@upi"
              className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button onClick={handlePayment} disabled={loading} className="w-full btn-primary">
              {loading ? "Processing..." : "Pay with UPI"}
            </button>
          </div>
        )}
        */}


        {/* Card and UPI payment buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleCardPayment}
            disabled={loading}
            className="w-full btn-primary"
          >
            {loading ? "Processing..." : "Proceed with Card"}
          </button>
          {/* UPI button commented out */}
          {/* <button
            onClick={handleUpiPayment}
            disabled={loading}
            className="w-full btn-secondary border border-purple-600 text-purple-700 dark:text-purple-300"
          >
            Proceed with UPI
          </button> */}
        </div>

        <div className="mt-6 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          <Lock className="h-4 w-4 mr-2" />
          <span>Your payment is secured with SSL encryption</span>
        </div>
      </div>
    </div>
  );
}