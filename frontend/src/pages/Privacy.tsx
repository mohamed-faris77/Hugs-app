import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Privacy & Confidentiality</h1>
        <p className="mt-4 text-lg text-gray-600">
          Your privacy is our top priority. Learn how we protect your information.
        </p>
      </div>

      <div className="space-y-8">
        <section className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-purple-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Data Protection</h2>
          </div>
          <p className="text-gray-600 mb-4">
            We implement industry-standard security measures to protect your personal information:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>End-to-end encryption for all communications</li>
            <li>Secure, HIPAA-compliant video sessions</li>
            <li>Regular security audits and updates</li>
            <li>Strict access controls for staff members</li>
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Lock className="h-6 w-6 text-purple-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Confidentiality</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Our counselors are bound by professional ethics and legal requirements to maintain client confidentiality:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Session content remains strictly confidential</li>
            <li>Information shared only with explicit consent</li>
            <li>Secure storage of session notes and records</li>
            <li>Clear protocols for emergency situations</li>
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Eye className="h-6 w-6 text-purple-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Your Rights</h2>
          </div>
          <p className="text-gray-600 mb-4">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Access your personal information</li>
            <li>Request corrections to your data</li>
            <li>Withdraw consent at any time</li>
            <li>File a complaint about privacy concerns</li>
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <FileText className="h-6 w-6 text-purple-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Documentation</h2>
          </div>
          <p className="text-gray-600 mb-4">
            We maintain transparent policies regarding:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Record keeping and retention</li>
            <li>Information sharing protocols</li>
            <li>Data breach notification procedures</li>
            <li>Privacy policy updates and changes</li>
          </ul>
        </section>
      </div>

      <div className="mt-12 bg-purple-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Questions About Privacy?</h2>
        <p className="text-gray-600 mb-4">
          If you have any questions or concerns about our privacy practices, please don't hesitate to contact us.
        </p>
        <a
          href="/contact"
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700"
        >
          Contact Privacy Officer
        </a>
      </div>
    </div>
  );
}