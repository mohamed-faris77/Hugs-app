import { useState, useEffect } from 'react';
import { Send, User, Phone, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useThemeStore } from '../store/themeStore';

export default function Feedback() {
  const { isDarkMode } = useThemeStore();
  const [feedback, setFeedback] = useState({
    name: '',
    phone: '',
    message: '',
    rating: '',
  });
  const [submitted, setSubmitted] = useState(false);
  interface FeedbackItem {
    name: string;
    message: string;
    rating: string;
  }
  const [allFeedback, setAllFeedback] = useState<FeedbackItem[]>([]);

  // Autofill name from localStorage username
  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || '';
    setFeedback(prev => ({ ...prev, name: storedUsername }));
    // Listen for username changes (e.g., login/logout)
    const handleUsernameChange = () => {
      const updatedUsername = localStorage.getItem('username') || '';
      setFeedback(prev => ({ ...prev, name: updatedUsername }));
    };
    window.addEventListener('usernameChanged', handleUsernameChange);
    window.addEventListener('storage', handleUsernameChange);
    return () => {
      window.removeEventListener('usernameChanged', handleUsernameChange);
      window.removeEventListener('storage', handleUsernameChange);
    };
  }, []);

  // Fetch all feedbacks for display
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch('http://localhost:5000/feedback');
        if (res.ok) {
          const data = await res.json();
          setAllFeedback(data.feedback || []);
        }
      } catch (e) { }
    };
    fetchFeedback();
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Feedback submitted:', data);

        // Store in localStorage as backup for admin dashboard
        const existingFeedback = localStorage.getItem('feedback_submissions');
        const feedbackList = existingFeedback ? JSON.parse(existingFeedback) : [];
        feedbackList.push({
          ...feedback,
          id: Date.now(),
          created_at: new Date().toISOString()
        });
        localStorage.setItem('feedback_submissions', JSON.stringify(feedbackList));

        setSubmitted(true);
        toast.success('Thank you for your feedback!');
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      toast.error('Failed to submit feedback. Please try again.');
    }
  };



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen ${isDarkMode ? 'dark:bg-gray-900' : 'bg-gradient-to-br from-primary/5 to-secondary/5 animate-gradient-x'}`}
    >
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1
            className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-primary'}`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Feedback Portal
          </motion.h1>
          <p className={`mt-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Share your experience.
          </p>
        </div>



        {/* Feedback Form */}
        {!submitted ? (
          <motion.div
            className={`rounded-lg shadow-xl p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <User className="h-4 w-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={feedback.name}
                  onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                  className={`mt-1 block w-full h-12 px-4 py-3 rounded-md shadow-sm focus:ring-primary focus:border-primary text-base ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'border-gray-300 text-gray-900'
                    }`}
                  placeholder="Enter your full name"
                  readOnly={!!localStorage.getItem('username')}
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Phone className="h-4 w-4 inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="number"
                  required
                  value={feedback.phone}
                  onChange={(e) => setFeedback({ ...feedback, phone: e.target.value })}
                  className={`mt-1 block w-full h-12 px-4 py-3 rounded-md shadow-sm focus:ring-primary focus:border-primary text-base ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'border-gray-300 text-gray-900'
                    }`}
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <MessageSquare className="h-4 w-4 inline mr-2" />
                  Your Message *
                </label>
                <textarea
                  required
                  value={feedback.message}
                  onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                  rows={4}
                  className={`mt-1 block w-full px-4 py-3 rounded-md shadow-sm focus:ring-primary focus:border-primary text-base resize-none ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'border-gray-300 text-gray-900'
                    }`}
                  placeholder="Share your feedback with us..."
                />
              </div>

              {/* Rating with 5-Point Emoji Scale */}
              <div>
                <label className={`block text-sm font-medium mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  How was your experience?
                </label>
                <div className="flex items-center justify-center space-x-4">
                  {[
                    { emoji: '😍', value: 'very_happy', label: 'Very Happy' },
                    { emoji: '😁', value: 'happy', label: 'Happy' },
                    { emoji: '😐', value: 'neutral', label: 'Neutral' },
                    { emoji: '🙁', value: 'unhappy', label: 'Unhappy' },
                    { emoji: '😓', value: 'very_unhappy', label: 'Very Unhappy' }
                  ].map((option) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setFeedback({ ...feedback, rating: option.value })}
                      className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${feedback.rating === option.value
                        ? 'border-primary bg-primary/10'
                        : isDarkMode
                          ? 'border-gray-600 hover:border-gray-500'
                          : 'border-gray-300 hover:border-gray-400'
                        }`}
                    >
                      <span className="text-3xl mb-1">{option.emoji}</span>
                      <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {option.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <Send className="h-5 w-5 mr-2" />
                Submit Feedback
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-center rounded-lg shadow-xl p-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
            >
              <span className="text-4xl">✅</span>
            </motion.div>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Thank You for Your Feedback!
            </h2>
            <p className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Your feedback helps us improve our services for everyone.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSubmitted(false)}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md ${isDarkMode
                ? 'text-primary bg-primary/20 hover:bg-primary/30'
                : 'text-primary bg-primary/10 hover:bg-primary/20'
                }`}
            >
              Submit Another Response
            </motion.button>
          </motion.div>
        )}
        {/* Show all feedbacks below the form */}
        <div className="mt-12">
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Recent Feedback</h2>
          {allFeedback.length === 0 ? (
            <div className="text-gray-400 text-center">No feedback yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Message</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Rating</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                  {allFeedback.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{item.message}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{item.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
