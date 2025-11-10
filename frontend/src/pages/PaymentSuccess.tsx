import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Check, Edit, Send } from 'lucide-react'; // Replaced WhatsApp with Send

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData, paymentMethod, transactionId } = location.state || {};


  const bookingSavedRef = useRef(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    if (!bookingData) {
      navigate('/');
      return;
    }
    // Use a unique key for this booking (phone+date+time)
    const bookingKey = `booking_saved_${bookingData.phone}_${bookingData.date}_${bookingData.time}`;
    const alreadySaved = sessionStorage.getItem(bookingKey);
    if (!alreadySaved && !bookingSavedRef.current) {
      bookingSavedRef.current = true;
      axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/book`, {
        fullName: bookingData.name,
        phoneNumber: bookingData.phone,
        email: bookingData.email,
        statuss: bookingData.currentStatus,
        doctor: bookingData.doctor,
        language: bookingData.language,
        concern: bookingData.problem,
        date: bookingData.date,
        time: bookingData.time,
        couponCode: bookingData.couponCode
      })
        .then(() => {
          sessionStorage.setItem(bookingKey, 'true');
        })
        .catch((err) => setSaveError(err.response?.data?.error || 'Booking save failed'));
    }
  }, [bookingData, navigate]);


  if (!bookingData) return null; // Prevent rendering without valid data
  if (saveError) {
    return <div className="text-center text-red-500 py-8">{saveError}</div>;
  }

  const doctorWhatsApp = '+1234567890'; // Replace with actual WhatsApp number
  const whatsappMessage = encodeURIComponent(
    `Hi, I've booked a session for ${bookingData.date} at ${bookingData.time}. Transaction ID: ${transactionId}`
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>

        {/* Title and Message */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Your counseling session has been booked successfully.
        </p>

        {/* Booking Details */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Booking Details</h2>
          <div className="space-y-3 text-left text-gray-700 dark:text-gray-200">
            <p><strong>Date:</strong> {bookingData.date}</p>
            <p><strong>Time:</strong> {bookingData.time}</p>
            <p><strong>Duration:</strong> 60 minutes</p>
            <p><strong>Payment Method:</strong> {paymentMethod === 'card' ? 'Card Payment' : 'UPI Payment'}</p>
            <p><strong>Transaction ID:</strong> {transactionId}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* WhatsApp Contact */}
          <a
            href={`https://wa.me/${doctorWhatsApp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
          >
            <Send className="h-5 w-5 mr-2" /> {/* Replaced WhatsApp icon */}
            Contact Doctor
          </a>

          {/* Modify Booking */}
          <Link
            to="/booking"
            state={{ bookingData }}
            className="flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <Edit className="h-5 w-5 mr-2" />
            Modify Booking
          </Link>
        </div>

        {/* Additional Links */}
        <div className="space-y-4">
          <Link
            to="/resources"
            className="block text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
          >
            View Pre-session Resources
          </Link>
          <Link
            to="/"
            className="block text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100"
          >
            Return to Home
          </Link>
        </div>

        {/* Confirmation Message */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            A confirmation email has been sent to your email address with all the details.
            You can also save this page for your reference.
          </p>
        </div>
      </div>
    </div>
  );
}
