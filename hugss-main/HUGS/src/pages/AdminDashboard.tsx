import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Users, DollarSign, Clock, MessageSquare, Star } from 'lucide-react';

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        // Fetch bookings
        const bookingsRes = await axios.get('http://localhost:5000/bookings');
        setAppointments(bookingsRes.data.bookings || []);

        // Fetch feedback from API
        try {
          const feedbackRes = await axios.get('http://localhost:5000/feedback');
          setFeedback(feedbackRes.data.feedback || []);
        } catch (feedbackError) {
          console.log('Feedback fetch error:', feedbackError);
          // If API fails, try localStorage as fallback
          const storedFeedback = localStorage.getItem('feedback_submissions');
          if (storedFeedback) {
            setFeedback(JSON.parse(storedFeedback));
          }
        }
      } catch (err: any) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Total Appointments</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">156</h3>
            </div>
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Active Clients</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">89</h3>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">$12,480</h3>
            </div>
            <DollarSign className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Pending</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">23</h3>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Total Feedback</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{feedback.length}</h3>
            </div>
            <MessageSquare className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-gray-600">
          <nav className="flex -mb-px">
            <button
              onClick={() => setSelectedTab('appointments')}
              className={`px-6 py-3 text-sm font-medium ${selectedTab === 'appointments' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              Appointments
            </button>
            <button
              onClick={() => setSelectedTab('payments')}
              className={`px-6 py-3 text-sm font-medium ${selectedTab === 'payments' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              Payments
            </button>
            <button
              onClick={() => setSelectedTab('feedback')}
              className={`px-6 py-3 text-sm font-medium ${selectedTab === 'feedback' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              Feedback
            </button>
          </nav>
        </div>

            <div className="p-6">
              {selectedTab === 'appointments' ? (
                <div className="overflow-x-auto">
                  {loading ? (
                    <div className="text-center py-8">Loading...</div>
                  ) : error ? (
                    <div className="text-center text-red-500 py-8">{error}</div>
                  ) : (
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Client</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Phone</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Email</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Language</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Concern</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Time</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Coupon</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                        {appointments.map((booking: any) => (
                          <tr key={booking.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">{booking.fullname || booking.fullName}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{booking.phonenumber || booking.phoneNumber}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{booking.email}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{booking.statuss}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{booking.language}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{booking.concern}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{booking.date}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{booking.time}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{booking.couponcode || booking.couponCode}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ) : selectedTab === 'feedback' ? (
                <div className="overflow-x-auto">
                  {loading ? (
                    <div className="text-center py-8">Loading...</div>
                  ) : error ? (
                    <div className="text-center text-red-500 py-8">{error}</div>
                  ) : feedback.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 text-lg">No feedback data yet.</div>
                  ) : (
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Phone</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Message</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Rating</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                        {feedback.map((item: any, index: number) => (
                          <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.name}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{item.phone}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{item.message}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{item.rating}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400 text-lg">No payments data yet.</div>
              )}
            </div>
      </div>
    </div>
  );
}