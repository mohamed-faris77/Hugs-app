import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

import axios from 'axios';
import { toast } from 'react-toastify';

export default function Contact() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Autofill name from localStorage username
  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || '';
    setFormData(prev => ({ ...prev, name: storedUsername }));
    // Listen for username changes (e.g., login/logout)
    const handleUsernameChange = () => {
      const updatedUsername = localStorage.getItem('username') || '';
      setFormData(prev => ({ ...prev, name: updatedUsername }));
    };
    window.addEventListener('usernameChanged', handleUsernameChange);
    window.addEventListener('storage', handleUsernameChange);
    return () => {
      window.removeEventListener('usernameChanged', handleUsernameChange);
      window.removeEventListener('storage', handleUsernameChange);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/contact`, formData);
      if (res.data && res.data.message) {
        toast.success('Message sent successfully!');
        setFormData(prev => ({ ...prev, subject: '', message: '' }));
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Us</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Get in touch with our team for support and inquiries
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-purple-600 mr-3" />
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">Phone</p>
                  <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-purple-600 mr-3" />
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">Email</p>
                  <p className="text-gray-600 dark:text-gray-300">support@mindfulcare.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-purple-600 mr-3" />
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">Address</p>
                  <p className="text-gray-600 dark:text-gray-300">123 Counseling St, City, State 12345</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Emergency Support</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you're experiencing a mental health emergency, please contact:
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Emergency Services: 911</li>
              <li>Crisis Helpline: 1-800-273-8255</li>
              <li>Text Crisis Line: Text HOME to 741741</li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                autoComplete="name"
                readOnly={!!localStorage.getItem('username')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700"
            >
              <Send className="h-5 w-5 mr-2" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}