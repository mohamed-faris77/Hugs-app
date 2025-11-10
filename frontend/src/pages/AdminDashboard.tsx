// Contact details modal component
function ContactModal({ open, onClose, contact }: { open: boolean, onClose: () => void, contact: any }) {
  if (!open || !contact) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Contact Message Details</h2>
        <div className="mb-2"><span className="font-semibold">Name:</span> {contact.name}</div>
        <div className="mb-2"><span className="font-semibold">Email:</span> {contact.email}</div>
        <div className="mb-2"><span className="font-semibold">Subject:</span> {contact.subject}</div>
        <div className="mb-2"><span className="font-semibold">Message:</span> {contact.message}</div>
        <div className="mb-2"><span className="font-semibold">Date:</span> {contact.created_at ? new Date(contact.created_at).toLocaleString() : ''}</div>
        <button onClick={onClose} className="mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Close</button>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Users, DollarSign, Clock, MessageSquare } from 'lucide-react';

// Feedback details modal component
function FeedbackModal({ open, onClose, feedback }: { open: boolean, onClose: () => void, feedback: any }) {
  if (!open || !feedback) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Feedback Details</h2>
        <div className="mb-2"><span className="font-semibold">Name:</span> {feedback.name}</div>
        <div className="mb-2"><span className="font-semibold">Phone:</span> {feedback.phone}</div>
        <div className="mb-2"><span className="font-semibold">Message:</span> {feedback.message}</div>
        <div className="mb-2"><span className="font-semibold">Rating:</span> {feedback.rating}</div>
        <button onClick={onClose} className="mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Close</button>
      </div>
    </div>
  );
}


export default function AdminDashboard() {
  const [viewContact, setViewContact] = useState<any | null>(null);
  const [selectedTab, setSelectedTab] = useState('appointments');
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [contact, setContact] = useState([]);
  const [activeClients, setActiveClients] = useState<number | null>(null);
  const [pendingCount, setPendingCount] = useState<number | null>(null);
  const [revenue, setRevenue] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewFeedback, setViewFeedback] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        // Fetch bookings (primary source for appointments and derived dashboard metrics)
        const bookingsRes = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/bookings`);
        const bookings = bookingsRes.data.bookings || [];
        setAppointments(bookings);

        // Fetch payments (backend exposes GET /payments)
        try {
          const paymentsRes = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/payments`);
          setPayments(paymentsRes.data.payments || []);
        } catch (paymentsError) {
          console.log('Payments fetch error:', paymentsError);
          setPayments([]);
        }

        // Fetch feedback from API (this endpoint exists)
        try {
          const feedbackRes = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/feedback`);
          setFeedback(feedbackRes.data.feedback || []);
        } catch (feedbackError) {
          console.log('Feedback fetch error:', feedbackError);
          const storedFeedback = localStorage.getItem('feedback_submissions');
          if (storedFeedback) {
            setFeedback(JSON.parse(storedFeedback));
          }
        }

        // Fetch contact submissions (backend exposes GET /contact)
        try {
          const contactRes = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/contact`);
          setContact(contactRes.data.contact || []);
        } catch (contactError) {
          console.log('Contact fetch error:', contactError);
          setContact([]);
        }

        // Derive active clients and pending counts from bookings (backend doesn't provide these endpoints).
        try {
          const successful = bookings.filter((b: any) => b.status === 'success' || b.status === 'paid');
          const uniqueActive = new Set(successful.map((b: any) => b.phoneNumber || b.phonenumber || b.email || b.fullName));
          setActiveClients(uniqueActive.size);

          const pending = bookings.filter((b: any) => !(b.status === 'success' || b.status === 'paid'));
          setPendingCount(pending.length);
        } catch (deriveErr) {
          setActiveClients(null);
          setPendingCount(null);
        }

        // Fetch revenue (this endpoint exists in backend)
        try {
          const revenueRes = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/dashboard/revenue`);
          setRevenue(revenueRes.data.revenue);
        } catch (err) {
          setRevenue(null);
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
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{appointments.length}</h3>
            </div>
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Active Clients</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {activeClients !== null ? activeClients : '—'}
              </h3>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {revenue !== null ? `₹${revenue}` : '—'}
              </h3>
            </div>
            <DollarSign className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Pending</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {pendingCount !== null ? pendingCount : '—'}
              </h3>
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
            <button
              onClick={() => setSelectedTab('contact')}
              className={`px-6 py-3 text-sm font-medium ${selectedTab === 'contact' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              Contact
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
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Username</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Doctor</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Payment Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">View</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                    {appointments.map((booking: any) => (
                      <tr key={booking.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">{booking.fullName || booking.fullname}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{booking.doctor || 'N/A'}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">
                          {/* Show payment status by matching booking to payment */}
                          {(() => {
                            const paymentsArr: any[] = payments as any[];
                            const match = paymentsArr.find((p) => {
                              return (
                                p.phoneNumber === booking.phoneNumber &&
                                p.amount &&
                                booking.date &&
                                booking.time &&
                                p.status &&
                                (p.status === 'paid' || p.status === 'failed')
                              );
                            });
                            if (match && match.status === 'paid') return <span className="text-green-600">Successful</span>;
                            if (match && match.status === 'failed') return <span className="text-red-600">Failed</span>;
                            return <span className="text-gray-400">Failed</span>;
                          })()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button
                            className="text-purple-600 hover:underline cursor-pointer bg-transparent border-none outline-none"
                            onClick={() => navigate('/appointment-details', { state: { appointment: booking } })}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ) : selectedTab === 'payments' ? (
            <div className="overflow-x-auto">
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : error ? (
                <div className="text-center text-red-500 py-8">{error}</div>
              ) : payments.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-lg">No payments data yet.</div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Order ID</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Amount (₹)</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Created At</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                    {payments.map((payment: any, idx: number) => (
                      <tr key={payment.id || idx} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="px-4 py-3 whitespace-nowrap text-gray-900 dark:text-white">{payment.order_id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{(payment.amount / 100).toFixed(2)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{payment.status}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{payment.created_at ? new Date(payment.created_at).toLocaleString() : '-'}</td>
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
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">View</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                    {feedback.map((item: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{item.phone}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{item.message}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{item.rating}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button
                            className="text-purple-600 hover:underline cursor-pointer bg-transparent border-none outline-none"
                            onClick={() => setViewFeedback(item)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ) : selectedTab === 'contact' ? (
            <div className="overflow-x-auto">
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : error ? (
                <div className="text-center text-red-500 py-8">{error}</div>
              ) : contact.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-lg">No contact submissions yet.</div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Subject</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">View</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                    {contact.map((item: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{item.email}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{item.subject}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{item.created_at ? new Date(item.created_at).toLocaleString() : ''}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button
                            className="text-purple-600 hover:underline cursor-pointer bg-transparent border-none outline-none"
                            onClick={() => setViewContact(item)}
                          >
                            View Message
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <ContactModal open={!!viewContact} onClose={() => setViewContact(null)} contact={viewContact} />
                </table>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 text-lg">No payments data yet.</div>
          )}
        </div>
      </div>
      <FeedbackModal open={!!viewFeedback} onClose={() => setViewFeedback(null)} feedback={viewFeedback} />
    </div>
  );
}