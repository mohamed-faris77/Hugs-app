import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import AdminIcon from './AdminIcon';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin, logout, userLogout, isDoctor, doctorUsername, doctorLogout } = useAuthStore();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
    const handleUsernameChange = () => {
      setUsername(localStorage.getItem('username'));
    };
    window.addEventListener('storage', handleUsernameChange);
    window.addEventListener('usernameChanged', handleUsernameChange);
    return () => {
      window.removeEventListener('storage', handleUsernameChange);
      window.removeEventListener('usernameChanged', handleUsernameChange);
    };
  }, []);

  const isLoggedIn = !!username && !isDoctor;
  return (
    <nav className="bg-primary shadow-lg sticky top-0 z-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center"
              >
                <Heart className="h-8 w-8 text-white mr-2" />
                <span className="text-xl font-bold text-white">HUGS</span>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAdmin ? (
              // Admin view - only theme toggle and logout
              <>
                <ThemeToggle />
                <button
                  className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-dark text-sm"
                  onClick={() => {
                    logout();
                    window.location.href = '/';
                  }}
                >
                  Logout
                </button>
              </>
            ) : isDoctor ? (
              // Doctor view - only theme toggle and logout
              <>
                <ThemeToggle />
                <button
                  className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-dark text-sm"
                  onClick={() => {
                    doctorLogout();
                    window.location.href = '/';
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              // User or guest view
              <>
                <Link to="/" className="text-white hover:text-secondary px-3 py-2 transition-colors">
                  Home
                </Link>
                <Link to="/booking" className="text-white hover:text-secondary px-3 py-2 transition-colors">
                  Book Session
                </Link>
                <Link to="/faculty" className="text-white hover:text-secondary px-3 py-2 transition-colors">
                  Our Faculty
                </Link>
                <Link to="/therapy-approaches" className="text-white hover:text-secondary px-3 py-2 transition-colors">
                  Approaches
                </Link>
                {isLoggedIn && (
                  <>
                    <Link to="/resources" className="text-white hover:text-secondary px-3 py-2 transition-colors">
                      Resources
                    </Link>
                    {/* <Link to="/faq" className="text-white hover:text-secondary px-3 py-2 transition-colors">
                      FAQ
                    </Link> */}
                    <Link to="/contact" className="text-white hover:text-secondary px-3 py-2 transition-colors">
                      Contact
                    </Link>
                    <Link to="/feedback" className="text-white hover:text-secondary px-3 py-2 transition-colors">
                      Feedback
                    </Link>
                  </>
                )}
                {!isLoggedIn && (
                  <Link to="/signin" className="text-white hover:text-secondary px-3 py-2 transition-colors">
                    Sign In
                  </Link>
                )}
                {isLoggedIn && (
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">{username}</span>
                    <span className="inline-block w-8 h-8 rounded-full bg-primary-dark flex items-center justify-center">
                      {/* Tailwind profile icon */}
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                      </svg>
                    </span>
                    <button
                      className="ml-2 px-2 py-1 bg-secondary text-white rounded hover:bg-secondary-dark text-sm"
                      onClick={() => {
                        localStorage.removeItem('username');
                        userLogout();
                        window.location.href = '/';
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
                <ThemeToggle />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-secondary"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isDoctor ? (
                // Doctor mobile view - only theme toggle and logout
                <>
                  <ThemeToggle />
                  <button
                    className="block w-full text-left px-3 py-2 text-white hover:text-secondary"
                    onClick={() => {
                      doctorLogout();
                      window.location.href = '/';
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : isAdmin ? (
                // Admin mobile view - only logout option
                <>
                  <ThemeToggle />
                  <button
                    className="block w-full text-left px-3 py-2 text-white hover:text-secondary"
                    onClick={() => {
                      logout();
                      window.location.href = '/';
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                // User or guest mobile view
                <>
                  <Link to="/" className="block px-3 py-2 text-white hover:text-secondary" onClick={() => setIsOpen(false)}>Home</Link>
                  <Link to="/booking" className="block px-3 py-2 text-white hover:text-secondary" onClick={() => setIsOpen(false)}>Book Session</Link>
                  <Link to="/faculty" className="block px-3 py-2 text-white hover:text-secondary" onClick={() => setIsOpen(false)}>Our Faculty</Link>
                  <Link to="/therapy-approaches" className="block px-3 py-2 text-white hover:text-secondary" onClick={() => setIsOpen(false)}>Approaches</Link>
                  {isLoggedIn && (
                    <>
                      <Link to="/resources" className="block px-3 py-2 text-white hover:text-secondary" onClick={() => setIsOpen(false)}>Resources</Link>
                      {/* <Link to="/faq" className="block px-3 py-2 text-white hover:text-secondary" onClick={() => setIsOpen(false)}>FAQ</Link> */}
                      <Link to="/contact" className="block px-3 py-2 text-white hover:text-secondary" onClick={() => setIsOpen(false)}>Contact</Link>
                      <Link to="/feedback" className="block px-3 py-2 text-white hover:text-secondary" onClick={() => setIsOpen(false)}>Feedback</Link>
                    </>
                  )}
                  {!isLoggedIn && (
                    <Link to="/signin" className="block px-3 py-2 text-white hover:text-secondary" onClick={() => setIsOpen(false)}>Sign In</Link>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
