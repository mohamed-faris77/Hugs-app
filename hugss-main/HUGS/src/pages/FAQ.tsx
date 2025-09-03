import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What should I expect in my first session?',
      answer: 'Your first session will be an initial consultation where we\'ll discuss your concerns, goals, and background. This helps us understand your needs and develop a personalized treatment plan. The session is casual and confidential, allowing you to share at your own comfort level.'
    },
    {
      question: 'How long are the sessions?',
      answer: 'Standard sessions are 60 minutes long. We find this duration allows enough time to explore issues in depth while maintaining focus and effectiveness.'
    },
    {
      question: 'Is online counseling as effective as in-person?',
      answer: 'Research shows that online counseling can be just as effective as in-person therapy for many issues. It offers additional benefits of convenience, accessibility, and comfort of receiving support from your preferred location.'
    },
    {
      question: 'How do I prepare for an online session?',
      answer: 'Find a quiet, private space with a stable internet connection. Test your camera and microphone beforehand. Have a glass of water nearby and any notes you\'d like to discuss. Ensure your device is charged and you won\'t be disturbed during the session.'
    },
    {
      question: 'Is my information confidential?',
      answer: 'Yes, absolutely. We adhere to strict confidentiality standards. Your personal information and session content are protected by professional ethics and privacy laws. We use secure, encrypted platforms for online sessions.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept credit/debit cards and various UPI payment options including Google Pay, PhonePe, and Paytm. Special student discounts are available with a valid student ID.'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Find answers to common questions about our counseling services
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <button
              className="w-full px-6 py-4 flex items-center justify-between focus:outline-none"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="text-left font-medium text-gray-900 dark:text-white">{faq.question}</span>
              {openIndex === index ? (
                <Minus className="h-5 w-5 text-purple-600" />
              ) : (
                <Plus className="h-5 w-5 text-purple-600" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4">
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-purple-50 dark:bg-gray-700 rounded-lg p-6 text-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Still have questions?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          We're here to help. Contact us for more information.
        </p>
        <a
          href="/contact"
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
