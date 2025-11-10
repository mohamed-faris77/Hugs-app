


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Clock } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const DOCTOR_MAP: Record<string, string> = {
  sarah: 'Dr. Sarah Johnson',
  michael: 'Dr. Michael Chen',
  emily: 'Dr. Emily Williams',
};


export default function DoctorDashboard() {
  const [selectedTab, setSelectedTab] = useState('appointments');
  const [appointments, setAppointments] = useState<any[]>([]);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Zustand auth store
  const isDoctor = useAuthStore(state => state.isDoctor);
  const doctorUsername = useAuthStore(state => state.doctorUsername);

  useEffect(() => {
    if (!isDoctor || !doctorUsername) {
      navigate('/admin-login');
      return;
    }
    setLoading(true);
    axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/bookings`)
      .then(res => {
        const all = res.data.bookings || [];
        // Use doctorUsername for filtering
        const doctorDisplayName = DOCTOR_MAP[doctorUsername] || doctorUsername;
        const filtered = all.filter((a: any) => a.doctor && a.doctor.toLowerCase() === doctorDisplayName.toLowerCase());
        setAppointments(filtered);
        setPendingCount(filtered.filter((a: any) => a.statuss && a.statuss.toLowerCase() === 'pending').length);
      })
      .catch(() => setError('Failed to fetch appointments'))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [isDoctor, doctorUsername, navigate]);

  const doctorDisplayName = doctorUsername ? (DOCTOR_MAP[doctorUsername] || doctorUsername) : '';
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{doctorDisplayName} Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
              <p className="text-gray-500 dark:text-gray-400">Pending</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{pendingCount}</h3>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
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
          </nav>
        </div>
        <div className="p-6">
          {selectedTab === 'appointments' ? (
            <div className="overflow-x-auto">
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : error ? (
                <div className="text-center text-red-500 py-8">{error}</div>
              ) : appointments.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-lg">No appointments yet.</div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Patient Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Time</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">View</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                    {appointments.map((a: any, idx: number) => (
                      <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">{a.fullName || a.fullname}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{a.date}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{a.time}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{a.statuss}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button
                            className="text-purple-600 hover:underline cursor-pointer bg-transparent border-none outline-none"
                            onClick={() => navigate('/appointment-details', { state: { appointment: a } })}
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
          ) : null}
        </div>
      </div>
    </div>
  );
}
