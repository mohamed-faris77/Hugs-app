import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, Phone } from 'lucide-react';
import { toast } from 'react-toastify';

const UPI_APPS = [
  { id: 'gpay', name: 'Google Pay', icon: '🔵' },
  { id: 'phonepe', name: 'PhonePe', icon: '💜' },
  { id: 'paytm', name: 'Paytm', icon: '🔷' },
];

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData;
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    upiId: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/payment-success', { 
        state: { 
          bookingData,
          paymentMethod,
          transactionId: Math.random().toString(36).substring(7)
        }
      });
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    }
  };

  if (!bookingData) {
    navigate('/booking');
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Payment Details</h1>
          <Lock className="h-6 w-6 text-purple-600" />
        </div>

        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Booking Summary</h2>
          <div className="space-y-2 text-gray-600">
            <p>Date: {bookingData.date}</p>
            <p>Time: {bookingData.time}</p>
            <p>Duration: 60 minutes</p>
            <p className="text-lg font-semibold text-purple-600">Total: Rs 100</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Select Payment Method</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`p-4 border rounded-lg flex items-center justify-center ${
                paymentMethod === 'card' ? 'border-purple-600 bg-purple-50' : 'border-gray-200'
              }`}
            >
              <CreditCard className="h-5 w-5 mr-2" />
              <span>Card Payment</span>
            </button>
            <button
              onClick={() => setPaymentMethod('upi')}
              className={`p-4 border rounded-lg flex items-center justify-center ${
                paymentMethod === 'upi' ? 'border-purple-600 bg-purple-50' : 'border-gray-200'
              }`}
            >
              <Phone className="h-5 w-5 mr-2" />
              <span>UPI Payment</span>
            </button>
          </div>
        </div>

        {paymentMethod === 'card' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="cardNumber"
                  required
                  value={paymentData.cardNumber}
                  onChange={handleInputChange}
                  className="input-field pl-10"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  required
                  value={paymentData.expiryDate}
                  onChange={handleInputChange}
                  className="mt-1 input-field"
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  required
                  value={paymentData.cvv}
                  onChange={handleInputChange}
                  className="mt-1 input-field"
                  placeholder="123"
                  maxLength={3}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cardholder Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={paymentData.name}
                onChange={handleInputChange}
                className="mt-1 input-field"
                placeholder="Enter cardholder name"
              />
            </div>

            <button type="submit" className="w-full btn-primary">
              Pay Now
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {UPI_APPS.map(app => (
                <button
                  key={app.id}
                  onClick={() => {
                    // Handle UPI app selection
                    toast.info(`Redirecting to ${app.name}...`);
                  }}
                  className="p-4 border rounded-lg text-center hover:border-purple-600 hover:bg-purple-50"
                >
                  <span className="text-2xl mb-2 block">{app.icon}</span>
                  <span className="text-sm">{app.name}</span>
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                UPI ID (Optional)
              </label>
              <input
                type="text"
                name="upiId"
                value={paymentData.upiId}
                onChange={handleInputChange}
                className="mt-1 input-field"
                placeholder="yourname@upi"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full btn-primary"
            >
              Pay with UPI
            </button>
          </div>
        )}

        <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
          <Lock className="h-4 w-4 mr-2" />
          <span>Your payment is secured with SSL encryption</span>
        </div>
      </div>
    </div>
  );
}