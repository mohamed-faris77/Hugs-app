import { useState } from 'react';
import { Calendar, Clock, Video, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { motion } from 'framer-motion';

interface BookingForm {
  name: string;
  phone: string;
  email: string;
  language: string;
  problem: string;
  currentStatus: string;
  date: string;
  time: string;
  couponCode: string;
}

const languages = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'mandarin', label: 'Mandarin' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'french', label: 'French' }
];

const problems = [
  { value: 'academic', label: 'Academic Stress' },
  { value: 'anxiety', label: 'Anxiety' },
  { value: 'depression', label: 'Depression' },
  { value: 'relationships', label: 'Relationship Issues' },
  { value: 'career', label: 'Career Guidance' },
  { value: 'other', label: 'Other' }
];

const statusOptions = [
  { value: 'student', label: 'Student' },
  { value: 'employed', label: 'Employed' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'other', label: 'Other' }
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM',
  '02:00 PM', '03:00 PM', '04:00 PM'
];

const validCoupons = {
  'STUDENT20': 20,
  'NEW10': 10,
  'SPECIAL25': 25
};

export default function Booking() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BookingForm>({
    name: '',
    phone: '',
    email: '',
    language: '',
    problem: '',
    currentStatus: '',
    date: '',
    time: '',
    couponCode: ''
  });

  const [discount, setDiscount] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Validation for name (only letters and spaces)
    if (name === 'name' && !/^[A-Za-z\s]*$/.test(value)) {
      return;
    }
    
    // Validation for phone (only numbers)
    if (name === 'phone' && !/^\d*$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const validateCoupon = () => {
    const couponDiscount = validCoupons[formData.couponCode as keyof typeof validCoupons];
    if (couponDiscount) {
      setDiscount(couponDiscount);
    } else {
      setDiscount(0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/payment', { 
      state: { 
        bookingData: formData,
        discount: discount 
      } 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl font-bold text-primary">Book Your Session</h1>
          <p className="mt-4 text-lg text-gray-600">
            Fill in your details to schedule a video counseling session
          </p>

          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 input-field"
                  placeholder="Enter your full name"
                  pattern="[A-Za-z\s]+"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 input-field"
                  placeholder="Enter your phone number"
                  pattern="\d+"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 input-field"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Status *
                </label>
                <Select
                  options={statusOptions}
                  onChange={(option) => setFormData({ ...formData, currentStatus: option?.value || '' })}
                  className="mt-1"
                  placeholder="Select your current status"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Preferred Language *
                </label>
                <Select
                  options={languages}
                  onChange={(option) => setFormData({ ...formData, language: option?.value || '' })}
                  className="mt-1"
                  placeholder="Select your preferred language"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  What would you like to discuss? *
                </label>
                <Select
                  options={problems}
                  onChange={(option) => setFormData({ ...formData, problem: option?.value || '' })}
                  className="mt-1"
                  placeholder="Select your concern"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Date *
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleInputChange}
                  className="mt-1 input-field"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Time *
                </label>
                <div className="mt-1 grid grid-cols-2 gap-4">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setFormData({ ...formData, time })}
                      className={`flex items-center justify-center px-4 py-2 border rounded-md ${
                        formData.time === time
                          ? 'bg-primary text-white border-primary'
                          : 'border-gray-300 text-gray-700 hover:border-primary'
                      }`}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="couponCode"
                    value={formData.couponCode}
                    onChange={handleInputChange}
                    className="mt-1 input-field"
                    placeholder="Enter coupon code"
                  />
                  <button
                    type="button"
                    onClick={validateCoupon}
                    className="mt-1 px-4 py-2 bg-secondary text-primary rounded-md"
                  >
                    Apply
                  </button>
                </div>
                {discount > 0 && (
                  <p className="text-green-600 mt-2">
                    {discount}% discount applied!
                  </p>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-medium text-gray-900">Session Details</h3>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Video className="h-5 w-5 mr-2" />
                    <span>60-minute video session</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <CreditCard className="h-5 w-5 mr-2" />
                    <span>
                      {discount > 0 
                        ? <span>
                            <span className="line-through">Rs 100</span>
                            {' '}${80 - (80 * discount / 100)}
                          </span>
                        : '100'} per session
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>

        <div className="hidden lg:block">
          <motion.img
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Counseling"
            className="rounded-lg shadow-xl"
          />
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">What to Expect</h3>
            <ul className="mt-4 space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-primary">•</span>
                <span>Professional and confidential environment</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-primary">•</span>
                <span>Licensed and experienced counselors</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-primary">•</span>
                <span>Secure video platform</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-primary">•</span>
                <span>Follow-up resources and support</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 bg-primary/10 rounded-lg p-6">
            <h3 className="text-lg font-medium text-primary">Our Team</h3>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-gray-600">Professional Counselors</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">1000+</p>
                <p className="text-gray-600">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}