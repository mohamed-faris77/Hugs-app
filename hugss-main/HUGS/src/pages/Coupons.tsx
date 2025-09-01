import { Tag, Percent, Users, GraduationCap } from 'lucide-react';

export default function Coupons() {
  const discounts = [
    {
      title: 'Student Basic',
      discount: '20%',
      code: 'STUDENT20',
      description: 'Valid for all students with .edu email',
      icon: GraduationCap,
    },
    {
      title: 'Group Sessions',
      discount: '30%',
      code: 'GROUP30',
      description: 'For group counseling sessions (3+ people)',
      icon: Users,
    },
    {
      title: 'First Time',
      discount: '25%',
      code: 'FIRST25',
      description: 'For your first counseling session',
      icon: Tag,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Student Discounts</h1>
        <p className="mt-4 text-lg text-gray-600">
          Special offers for students and first-time clients
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {discounts.map((discount) => (
          <div
            key={discount.code}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <discount.icon className="h-8 w-8 text-purple-600" />
                <div className="flex items-center">
                  <Percent className="h-5 w-5 text-purple-600" />
                  <span className="ml-1 text-2xl font-bold text-purple-600">
                    {discount.discount}
                  </span>
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {discount.title}
              </h3>
              <p className="mt-2 text-gray-600">{discount.description}</p>
              <div className="mt-4">
                <div className="inline-flex items-center px-4 py-2 bg-purple-50 rounded-md">
                  <span className="text-sm font-medium text-purple-700">
                    Code: {discount.code}
                  </span>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Apply Discount
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-purple-700 rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-12 text-center text-white">
          <h2 className="text-2xl font-bold">Need More Information?</h2>
          <p className="mt-4 text-purple-100">
            Contact our support team for additional student discount options
          </p>
          <div className="mt-8">
            <a
              href="mailto:support@mindfulcare.com"
              className="inline-block bg-white text-purple-700 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}