import { useState } from 'react';
import { Star, Send, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function Feedback() {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    message: '',
    category: 'general',
    anonymous: false,
  });
  const [feedbackList, setFeedbackList] = useState([]); // Store all feedback
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newFeedback = {
        ...feedback,
        rating,
        id: Date.now(), // Unique identifier
      };
      setFeedbackList([...feedbackList, newFeedback]); // Add to feedback list
      setSubmitted(true);
      toast.success('Thank you for your feedback!');
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again.');
    }
  };

  const categories = [
    { value: 'general', label: 'General Experience' },
    { value: 'counselor', label: 'Counselor Feedback' },
    { value: 'website', label: 'Website Experience' },
    { value: 'suggestion', label: 'Suggestions' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 animate-gradient-x"
    >
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1
            className="text-3xl font-bold text-primary"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Feedback Portal
          </motion.h1>
          <p className="mt-4 text-lg text-gray-600">
            Share your experience and read feedback from others.
          </p>
        </div>

        {/* Display Feedback */}
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-primary mb-4">All Feedback</h2>
          {feedbackList.length === 0 ? (
            <p className="text-gray-600">No feedback submitted yet. Be the first!</p>
          ) : (
            <ul className="space-y-4">
              {feedbackList.map((item) => (
                <li key={item.id} className="bg-gray-100 p-4 rounded-md">
                  <p className="text-gray-800">
                    <strong>{item.anonymous ? 'Anonymous' : item.name || 'Anonymous'}</strong> 
                    {` rated ${item.rating} stars`}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p className="mt-2 text-gray-700">{item.message}</p>
                </li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* Feedback Form */}
        {!submitted ? (
          <motion.div
            className="bg-white rounded-lg shadow-xl p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Overall Rating
                </label>
                <div className="flex items-center mt-2 space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (hover || rating)
                            ? 'text-secondary fill-secondary'
                            : 'text-gray-300'
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={feedback.category}
                  onChange={(e) => setFeedback({ ...feedback, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Feedback
                </label>
                <textarea
                  required
                  value={feedback.message}
                  onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="Share your experience with us..."
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={feedback.anonymous}
                  onChange={(e) => setFeedback({ ...feedback, anonymous: e.target.checked })}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                  Submit anonymously
                </label>
              </div>

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
            className="text-center bg-white rounded-lg shadow-xl p-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6"
            >
              <ThumbsUp className="h-8 w-8 text-green-600" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Thank You for Your Feedback!
            </h2>
            <p className="text-gray-600 mb-8">
              Your feedback helps us improve our services for everyone.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSubmitted(false)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-primary/10 hover:bg-primary/20"
            >
              Submit Another Response
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
