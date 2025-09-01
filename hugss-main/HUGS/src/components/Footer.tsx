import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export default function Footer() {
  const { isDarkMode } = useThemeStore();

  return (
    <footer className={`${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-900 text-white'}`}>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-purple-400" />
              <span className="text-lg font-bold">HUGS</span>
            </div>
            <p className="mt-2 text-gray-400">
              Professional counseling services for students and individuals.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>contact@mindfulcare.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>123 Counseling St, City</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h3>
            <div className="mt-4 space-y-2">
              <p><a href="/booking" className="text-gray-400 hover:text-white">Book a Session</a></p>
              <p><a href="/coupons" className="text-gray-400 hover:text-white">Student Discounts</a></p>
              <p><a href="/resources" className="text-gray-400 hover:text-white">Resources</a></p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Hours</h3>
            <div className="mt-4 space-y-2 text-gray-400">
              <p>Monday - Friday: 9am - 7pm</p>
              <p>Saturday: 10am - 4pm</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} MindfulCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}