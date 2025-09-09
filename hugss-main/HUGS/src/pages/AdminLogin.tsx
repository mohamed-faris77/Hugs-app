import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../store/authStore';

export default function AdminLogin() {
  const [activeTab, setActiveTab] = useState<'admin' | 'doctor'>('admin');
  const [password, setPassword] = useState('');
  const [doctorUsername, setDoctorUsername] = useState('');
  const [doctorPassword, setDoctorPassword] = useState('');
  const [error, setError] = useState('');
  const [doctorError, setDoctorError] = useState('');
  const navigate = useNavigate();

  const login = useAuthStore(state => state.login);
  const isUserLoggedIn = useAuthStore(state => state.isUserLoggedIn);
  const doctorLogin = useAuthStore(state => state.doctorLogin);

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUserLoggedIn) {
      setError('Please logout the user before admin login.');
      return;
    }
    if (login(password)) {
      navigate('/admin');
    } else {
      setError('Invalid password');
    }
  };

  // login handler for multiple doctors
  const handleDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Dr. Sarah login id & pass
    if (doctorUsername === 'sarah' && doctorPassword === 'sarah100') {
      doctorLogin('sarah');
      navigate('/doctor');
      return;
    }
    // Dr. Michael login id & pass
    if (doctorUsername === 'michael' && doctorPassword === 'michael100') {
      doctorLogin('michael');
      navigate('/doctor');
      return;
    }
    // Dr. Emily login id & pass
    if (doctorUsername === 'emily' && doctorPassword === 'emily100') {
      doctorLogin('emily');
      navigate('/doctor');
      return;
    }
    setDoctorError('Invalid username or password');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Toggle Tabs */}
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 rounded-l-lg font-semibold transition-colors ${activeTab === 'admin' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            onClick={() => setActiveTab('admin')}
            type="button"
          >
            Admin Login
          </button>
          <button
            className={`flex-1 py-2 rounded-r-lg font-semibold transition-colors ${activeTab === 'doctor' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            onClick={() => setActiveTab('doctor')}
            type="button"
          >
            Doctor Login
          </button>
        </div>

        {/* Admin Login Form */}
        {activeTab === 'admin' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Admin Login</h2>
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded hover:bg-primary-dark disabled:opacity-50"
              >
                Login
              </button>
            </form>
          </>
        )}

        {/* Doctor Login Form */}
        {activeTab === 'doctor' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Doctor Login</h2>
            <form onSubmit={handleDoctorSubmit} className="space-y-4">
              <input
                type="text"
                value={doctorUsername}
                onChange={e => setDoctorUsername(e.target.value)}
                placeholder="Enter doctor username"
                className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
                autoComplete="username"
              />
              <input
                type="password"
                value={doctorPassword}
                onChange={e => setDoctorPassword(e.target.value)}
                placeholder="Enter doctor password"
                className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
                autoComplete="current-password"
              />
              {doctorError && <div className="text-red-500 text-sm">{doctorError}</div>}
              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded hover:bg-primary-dark disabled:opacity-50"
              >
                Login
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
