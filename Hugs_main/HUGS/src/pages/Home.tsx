import React from 'react';
import { Users, Video, Shield, Award } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-animated text-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Professional Counseling for a Better Tomorrow
              </h1>
              <p className="mt-4 text-lg text-purple-100">
                Expert guidance and support for students and individuals. Start your journey to mental wellness today.
              </p>
              <div className="mt-8">
                <a
                  href="/booking"
                  className="inline-block bg-white text-teal-700 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
                >
                  Book a Session
                </a>
              </div>
            </div>
            <div className="hidden lg:block fade-in">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Counseling Session"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-sand Beige dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center fade-in">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Choose Us</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              We provide comprehensive support tailored to your needs
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="feature-card hover:shadow-xl">
              <Users className="h-12 w-12 text-purple-600" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Expert Counselors</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">
                Licensed professionals with years of experience
              </p>
            </div>

            <div className="feature-card hover:shadow-xl">
              <Video className="h-12 w-12 text-purple-600" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Online Sessions</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">
                Convenient video counseling from anywhere
              </p>
            </div>

            <div className="feature-card hover:shadow-xl">
              <Shield className="h-12 w-12 text-purple-600" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Confidential</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">
                Your privacy is our top priority
              </p>
            </div>

            <div className="feature-card hover:shadow-xl">
              <Award className="h-12 w-12 text-purple-600" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Student Discounts</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">
                Special rates for students
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-animated text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold fade-in">Ready to Take the First Step?</h2>
          <p className="mt-4 text-lg text-purple-100 fade-in">
            Book your session today and start your journey to better mental health
          </p>
          <div className="mt-8">
            <a
              href="/booking"
              className="inline-block bg-white text-teal-700 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Keyframes for animation */}
      <style>
        {`
          .bg-gradient-animated {
            background: linear-gradient(90deg, #34d399, #6a0dad, #34d399, #6a0dad);
            background-size: 300% 300%;
            animation: gradientMove 8s ease infinite;
          }

          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .fade-in {
            animation: fadeIn 1s ease-out;
          }

          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          .feature-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
    </div>
  );
}
