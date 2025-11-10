
import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userLogin = useAuthStore(state => state.userLogin);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (localStorage.getItem('isAdmin') === 'true') {
      setError('Please logout the admin before user login.');
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/login`, { username, password });
      if (res.data && res.data.user) {
        localStorage.setItem('username', res.data.user.username);
        window.dispatchEvent(new Event('usernameChanged'));
        userLogin();
        const redirect = localStorage.getItem('redirectAfterLogin');
        if (redirect) {
          localStorage.removeItem('redirectAfterLogin');
          navigate(redirect);
        } else {
          navigate('/');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded hover:bg-primary-dark disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600 dark:text-gray-300">Don't have an account?</span>
          <button
            className="ml-2 text-primary hover:underline"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
