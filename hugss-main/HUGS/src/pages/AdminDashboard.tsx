import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Users, DollarSign, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get('http://localhost:5000/bookings');
        setAppointments(res.data.bookings || []);
      } catch (err: any) {
        setError('Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Appointments</p>
              <h3 className="text-2xl font-bold">156</h3>
            </div>
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Active Clients</p>
              <h3 className="text-2xl font-bold">89</h3>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Revenue</p>
              <h3 className="text-2xl font-bold">$12,480</h3>
            </div>
            <DollarSign className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Pending</p>
              <h3 className="text-2xl font-bold">23</h3>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setSelectedTab('appointments')}
              className={`px-6 py-3 text-sm font-medium ${selectedTab === 'appointments' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Appointments
            </button>
            <button
              onClick={() => setSelectedTab('payments')}
              className={`px-6 py-3 text-sm font-medium ${selectedTab === 'payments' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Payments
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
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Client</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Phone</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Language</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Concern</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Time</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Coupon</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointments.map((booking: any) => (
                      <tr key={booking.id} className="hover:bg-gray-100">
                        <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{booking.fullname || booking.fullName}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-700">{booking.phonenumber || booking.phoneNumber}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-700">{booking.email}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-700">{booking.statuss}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-700">{booking.language}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-700">{booking.concern}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-700">{booking.date}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-700">{booking.time}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-700">{booking.couponcode || booking.couponCode}</td>
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