import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import axios from 'axios';
import { Calendar, Clock, Video, CreditCard } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Select from 'react-select';
import { motion } from 'framer-motion';

interface BookingForm {
  name: string;
  phone: string;
  email: string;
  language: string;
  problem: string;
  currentStatus: string;
  doctor: string;
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
  'GROUP30': 30,
  'FIRST25': 25
};

// Helper to fetch total users (happy customers)
const fetchTotalUsers = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/dashboard/active-clients`);
    return res.data.activeClients || 0;
  } catch {
    return 0;
  }
};

const createSelectStyles = (isDarkMode: boolean) => ({
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: isDarkMode ? '#374151' : '#ffffff',
    borderColor: state.isFocused ? '#8b5cf6' : (isDarkMode ? '#4b5563' : '#d1d5db'),
    color: isDarkMode ? 'white' : '#374151',
    borderRadius: '0.375rem',
    borderWidth: '1px',
    minHeight: '2.5rem',
    fontSize: '0.875rem',
    '&:hover': {
      borderColor: '#8b5cf6',
    },
    boxShadow: state.isFocused ? '0 0 0 1px #8b5cf6' : 'none',
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: isDarkMode ? '#374151' : '#ffffff',
    border: `1px solid ${isDarkMode ? '#4b5563' : '#d1d5db'}`,
    borderRadius: '0.375rem',
    marginTop: '0.25rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    zIndex: 9999,
  }),
  menuList: (provided: any) => ({
    ...provided,
    padding: '0.25rem',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#8b5cf6'
      : state.isFocused
        ? (isDarkMode ? '#4b5563' : '#f3f4f6')
        : (isDarkMode ? '#374151' : '#ffffff'),
    color: state.isSelected ? 'white' : (isDarkMode ? 'white' : '#374151'),
    cursor: 'pointer',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    '&:hover': {
      backgroundColor: isDarkMode ? '#4b5563' : '#f3f4f6',
    },
    '&:active': {
      backgroundColor: '#8b5cf6',
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: isDarkMode ? 'white' : '#374151',
    fontSize: '0.875rem',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: isDarkMode ? '#9ca3af' : '#6b7280',
    fontSize: '0.875rem',
  }),
  input: (provided: any) => ({
    ...provided,
    color: isDarkMode ? 'white' : '#374151',
    fontSize: '0.875rem',
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    backgroundColor: isDarkMode ? '#4b5563' : '#d1d5db',
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? '#8b5cf6' : (isDarkMode ? '#9ca3af' : '#6b7280'),
    '&:hover': {
      color: '#8b5cf6',
    },
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    color: isDarkMode ? '#9ca3af' : '#6b7280',
    '&:hover': {
      color: isDarkMode ? '#6b7280' : '#374151',
    },
  }),
});

export default function Booking() {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  //  dynamic team count
  // const [teamCount, setTeamCount] = useState<number>(3);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);


  useEffect(() => {
    let isMounted = true;
    const poll = async () => {
      const users = await fetchTotalUsers();
      if (isMounted) setTotalUsers(users);
    };
    poll(); // initial fetch
    pollingRef.current = setInterval(poll, 10000);
    return () => {
      isMounted = false;
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);
  const { isUserLoggedIn } = useAuthStore();
  const { isDarkMode } = useThemeStore();
  const isActuallyLoggedIn = isUserLoggedIn && !!localStorage.getItem('username');
  const navigate = useNavigate();
  const location = useLocation();
  const customSelectStyles = createSelectStyles(isDarkMode);
  const [formData, setFormData] = useState<BookingForm>({
    name: '',
    phone: '',
    email: '',
    language: '',
    problem: '',
    currentStatus: '',
    doctor: '',
    date: '',
    time: '',
    couponCode: ''
  });

  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);
  // Store original keys for PATCH
  const [originalKeys, setOriginalKeys] = useState<{ phone: string; date: string; time: string } | null>(null);

  useEffect(() => {
    if (location.state && location.state.bookingData) {
      setFormData({ ...location.state.bookingData });
      setIsEditMode(true);
      setOriginalKeys({
        phone: location.state.bookingData.phone,
        date: location.state.bookingData.date,
        time: location.state.bookingData.time
      });
    } else {
      setIsEditMode(false);
      setOriginalKeys(null);
    }
  }, [location.state]);

  const doctorOptions = [
    { value: 'Dr. Sarah Johnson', label: 'Dr. Sarah Johnson' },
    { value: 'Dr. Michael Chen', label: 'Dr. Michael Chen' },
    { value: 'Dr. Emily Williams', label: 'Dr. Emily Williams' },
  ];

  const [discount, setDiscount] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);

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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits.';
    if (!formData.language) newErrors.language = 'Language is required.';
    if (!formData.problem) newErrors.problem = 'Problem is required.';
    if (!formData.currentStatus) newErrors.currentStatus = 'Status is required.';
    if (!formData.doctor) newErrors.doctor = 'Doctor is required.';
    if (!formData.date) newErrors.date = 'Date is required.';
    if (!formData.time) newErrors.time = 'Time is required.';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    if (!isActuallyLoggedIn) {
      setShowAuthModal(true);
      setSubmitSuccess('');
      return;
    }
    if (isEditMode && originalKeys) {
      try {
        const res = await axios.patch(`${import.meta.env.VITE_BACKEND_BASE_URL}/book`, {
          fullName: formData.name,
          phoneNumber: formData.phone,
          email: formData.email,
          statuss: formData.currentStatus,
          doctor: formData.doctor,
          language: formData.language,
          concern: formData.problem,
          date: formData.date,
          time: formData.time,
          couponCode: formData.couponCode,
          originalPhoneNumber: originalKeys.phone,
          originalDate: originalKeys.date,
          originalTime: originalKeys.time
        });
        setSubmitSuccess('Booking updated successfully!');
        setIsEditMode(false);
        setOriginalKeys(null);
      } catch (err: any) {
        setSubmitError(err.response?.data?.error || 'Failed to update booking');
      }
    } else {
      navigate('/payment', { state: { bookingData: formData, discount } });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900 min-h-screen"
    >

      {/* Auth Modal for unauthenticated users */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Sign In Required</h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">Please sign in or register to continue booking.</p>
            <div className="flex gap-4 justify-center">
              <button
                className="bg-primary text-white px-4 py-2 rounded"
                onClick={() => { setShowAuthModal(false); localStorage.setItem('redirectAfterLogin', '/booking'); navigate('/signin'); }}
              >
                Sign In
              </button>
              <button
                className="bg-secondary text-primary px-4 py-2 rounded border border-primary"
                onClick={() => { setShowAuthModal(false); localStorage.setItem('redirectAfterLogin', '/booking'); navigate('/signup'); }}
              >
                Register
              </button>
            </div>
            <button
              className="mt-6 text-gray-500 dark:text-gray-400 underline"
              onClick={() => setShowAuthModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl font-bold text-primary dark:text-white">Book Your Session</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Fill in your details to schedule a video counseling session
          </p>

          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  placeholder="Enter your full name"
                  pattern="[A-Za-z\s]+"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  placeholder="Enter your phone number"
                  pattern="\d+"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Current Status *
                </label>
                <Select
                  options={statusOptions}
                  value={statusOptions.find(opt => opt.value === formData.currentStatus) || null}
                  onChange={(option) => setFormData({ ...formData, currentStatus: option?.value || '' })}
                  className="mt-1"
                  placeholder="Select your current status"
                  styles={customSelectStyles}
                />
                {errors.currentStatus && <p className="text-red-500 text-xs mt-1">{errors.currentStatus}</p>}
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Doctor *
                </label>
                <Select
                  options={doctorOptions}
                  value={doctorOptions.find(opt => opt.value === formData.doctor) || null}
                  onChange={(option) => setFormData({ ...formData, doctor: option?.value || '' })}
                  className="mt-1"
                  placeholder="Select a doctor"
                  styles={customSelectStyles}
                />
                {errors.doctor && <p className="text-red-500 text-xs mt-1">{errors.doctor}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Preferred Language *
                </label>
                <Select
                  options={languages}
                  value={languages.find(opt => opt.value === formData.language) || null}
                  onChange={(option) => setFormData({ ...formData, language: option?.value || '' })}
                  className="mt-1"
                  placeholder="Select your preferred language"
                  styles={customSelectStyles}
                />
                {errors.language && <p className="text-red-500 text-xs mt-1">{errors.language}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  What would you like to discuss? *
                </label>
                <Select
                  options={problems}
                  value={problems.find(opt => opt.value === formData.problem) || null}
                  onChange={(option) => setFormData({ ...formData, problem: option?.value || '' })}
                  className="mt-1"
                  placeholder="Select your concern"
                  styles={customSelectStyles}
                />
                {errors.problem && <p className="text-red-500 text-xs mt-1">{errors.problem}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Date *
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleInputChange}
                  className="mt-1 input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Time *
                </label>
                <div className="mt-1 grid grid-cols-2 gap-4">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setFormData({ ...formData, time })}
                      className={`flex items-center justify-center px-4 py-2 border rounded-md dark:border-gray-600 dark:text-gray-300 dark:hover:border-purple-400 ${formData.time === time
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 text-gray-700 hover:border-primary dark:bg-gray-700 dark:text-gray-300'
                        }${formData.time === time ? ' ring-2 ring-primary' : ''}`}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      {time}
                    </button>
                  ))}
                </div>
                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="couponCode"
                    value={formData.couponCode}
                    onChange={handleInputChange}
                    className="mt-1 input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="Enter coupon code"
                  />
                  <button
                    type="button"
                    onClick={validateCoupon}
                    className="mt-1 px-4 py-2 bg-secondary text-primary rounded-md hover:bg-purple-600"
                  >
                    Apply
                  </button>
                </div>
                {discount > 0 && (
                  <p className="text-green-600 dark:text-green-400 mt-2">
                    {discount}% discount applied!
                  </p>
                )}
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Session Details</h3>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Video className="h-5 w-5 mr-2 text-primary" />
                    <span>60-minute video session</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <CreditCard className="h-5 w-5 mr-2 text-primary" />
                    <span>
                      {discount > 0
                        ? <span>
                          <span className="line-through dark:text-gray-400">Rs 100</span>
                          {' '}Rs {Math.round(100 * (1 - discount / 100))}
                        </span>
                        : '100'} per session
                    </span>
                  </div>
                </div>
              </div>

              {submitError && <p className="text-red-500 text-sm mb-2">{submitError}</p>}
              {submitSuccess && <p className="text-green-500 text-sm mb-2">{submitSuccess}</p>}
              <button
                type="submit"
                className="w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                {isEditMode ? 'Update Booking' : 'Proceed to Payment'}
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
          <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">What to Expect</h3>
            <ul className="mt-4 space-y-3 text-gray-600 dark:text-gray-300">
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

          <div className="mt-8 bg-primary/10 dark:bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-medium text-primary dark:text-white">Our Team</h3>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary dark:text-white">3</p>
                <p className="text-gray-600 dark:text-gray-300">Professional Counselors</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary dark:text-white">{totalUsers}</p>
                <p className="text-gray-600 dark:text-gray-300">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}