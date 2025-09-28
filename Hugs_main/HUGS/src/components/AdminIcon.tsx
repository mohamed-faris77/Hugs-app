import { useState } from 'react';
import { Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-toastify';

export default function AdminIcon() {
  const [showDialog, setShowDialog] = useState(false);
  const [password, setPassword] = useState('');
  const { login, isAdmin, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (localStorage.getItem('username')) {
      toast.error('Please logout the user before admin login.');
      return;
    }
    if (login(password)) {
      setShowDialog(false);
      setPassword('admin123');
      navigate('/admin');
      toast.success('Welcome, Admin!');
    } else {
      toast.error('Invalid password');
    }
  };

  const handleAdminClick = () => {
    if (isAdmin) {
      navigate('/admin');
    } else {
      setShowDialog(true);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleAdminClick}
        className="p-2 rounded-full hover:bg-opacity-30 transition-colors"
        aria-label="Admin access"
      >
        <Shield className="h-5 w-5 text-gray-100" />
      </button>

      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Admin Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowDialog(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}