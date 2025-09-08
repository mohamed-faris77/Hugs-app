import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../store/authStore';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = useAuthStore(state => state.login);
  const isUserLoggedIn = useAuthStore(state => state.isUserLoggedIn);
  const handleSubmit = (e: React.FormEvent) => {
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
      </div>
    </div>
  );
}
