
import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userLogin = useAuthStore(state => state.userLogin);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/register`, { username, password });
      if (res.data && res.data.message) {
        setSuccess('Registration successful! You can now sign in.');
        userLogin();
        const redirect = localStorage.getItem('redirectAfterLogin');
        if (redirect) {
          localStorage.removeItem('redirectAfterLogin');
          setTimeout(() => navigate(redirect), 1500);
        } else {
          setTimeout(() => navigate('/'), 1500);
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Sign Up</h2>
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
          {success && <div className="text-green-500 text-sm">{success}</div>}
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded hover:bg-primary-dark disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600 dark:text-gray-300">Already have an account?</span>
          <button
            className="ml-2 text-primary hover:underline"
            onClick={() => navigate('/signin')}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
