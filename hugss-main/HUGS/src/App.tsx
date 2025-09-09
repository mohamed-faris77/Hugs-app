import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
import Coupons from './pages/Coupons';
import AdminDashboard from './pages/AdminDashboard';
import TherapyApproaches from './pages/TherapyApproaches';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Resources from './pages/Resources';
import Privacy from './pages/Privacy';
import Faculty from './pages/Faculty';
import Feedback from './pages/Feedback';
import JoinTeam from './pages/JoinTeam';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { useThemeStore } from './store/themeStore';
import { useAuthStore } from './store/authStore';
import AdminLogin from './pages/AdminLogin';
import AppointmentDetails from './pages/AppointmentDetails';
import DoctorDashboard from './pages/DoctorDashboard';

function App() {
  const { isDarkMode, setTheme } = useThemeStore();
  const { isAdmin } = useAuthStore();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme-storage');
    if (storedTheme) {
      const parsed = JSON.parse(storedTheme);
      if (parsed.state && typeof parsed.state.isDarkMode === 'boolean') {
        setTheme(parsed.state.isDarkMode);
        if (parsed.state.isDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }
  }, [setTheme]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/coupons" element={<Coupons />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/appointment-details" element={<AppointmentDetails />} />
            <Route path="/therapy-approaches" element={<TherapyApproaches />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/join-team' element={<JoinTeam />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;