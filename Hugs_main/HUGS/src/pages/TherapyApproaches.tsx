import { BookOpen, Brain, Heart, Users } from 'lucide-react';

export default function TherapyApproaches() {
  const approaches = [
    {
      title: 'Cognitive Behavioral Therapy (CBT)',
      description: 'A goal-oriented approach that helps identify and change negative thought patterns and behaviors.',
      icon: Brain,
      benefits: ['Anxiety & Depression', 'Stress Management', 'Academic Performance']
    },
    {
      title: 'Solution-Focused Therapy',
      description: 'Focuses on finding solutions to current challenges rather than analyzing past problems.',
      icon: BookOpen,
      benefits: ['Goal Setting', 'Problem Solving', 'Quick Results']
    },
    {
      title: 'Mindfulness-Based Therapy',
      description: 'Combines meditation and behavioral techniques to reduce stress and anxiety.',
      icon: Heart,
      benefits: ['Stress Reduction', 'Emotional Balance', 'Better Focus']
    },
    {
      title: 'Group Therapy',
      description: 'Peer support and shared experiences in a safe, facilitated environment.',
      icon: Users,
      benefits: ['Peer Support', 'Social Skills', 'Shared Learning']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Our Therapy Approaches</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          We use evidence-based therapeutic approaches tailored to your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {approaches.map((approach) => (
          <div key={approach.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <approach.icon className="h-8 w-8 text-purple-600" />
              <h2 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">{approach.title}</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{approach.description}</p>
            <div className="border-t dark:border-gray-600 pt-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Benefits:</h3>
              <ul className="space-y-2">
                {approach.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center text-gray-600 dark:text-gray-300">
                    <span className="h-1.5 w-1.5 bg-purple-600 rounded-full mr-2"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-purple-50 dark:bg-gray-700 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Personalized Approach
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Our therapists are trained in multiple approaches and will work with you to find the most effective treatment plan for your specific needs. We believe in a holistic approach that considers your unique circumstances, goals, and preferences.
        </p>
        <div className="mt-6">
          <a
            href="/booking"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700"
          >
            Schedule a Consultation
          </a>
        </div>
      </div>
    </div>
  );
}