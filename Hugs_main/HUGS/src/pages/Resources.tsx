import { Download, BookOpen, Video, FileText } from 'lucide-react';

export default function Resources() {
  const resources = [
    {
      title: 'Pre-Session Questionnaire',
      description: 'Help us understand your needs better before your first session.',
      type: 'PDF',
      icon: FileText,
      link: '#'
    },
    {
      title: 'Stress Management Guide',
      description: 'Practical techniques for managing academic stress.',
      type: 'PDF',
      icon: BookOpen,
      link: '#'
    },
    {
      title: 'Mindfulness Meditation',
      description: 'Guided meditation video for relaxation and focus.',
      type: 'Video',
      icon: Video,
      link: '#'
    }
  ];

  const categories = [
    {
      title: 'Academic Success',
      resources: ['Study Tips Guide', 'Time Management Worksheet', 'Goal Setting Template']
    },
    {
      title: 'Mental Wellness',
      resources: ['Anxiety Workbook', 'Mood Tracking Journal', 'Relaxation Techniques']
    },
    {
      title: 'Relationships',
      resources: ['Communication Skills Guide', 'Boundary Setting Worksheet', 'Conflict Resolution Tips']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Resources</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Helpful materials to support your mental health journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {resources.map((resource) => (
          <div key={resource.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <resource.icon className="h-8 w-8 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{resource.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{resource.description}</p>
            <a
              href={resource.link}
              className="inline-flex items-center text-purple-600 hover:text-purple-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download {resource.type}
            </a>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div key={category.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{category.title}</h3>
            <ul className="space-y-3">
              {category.resources.map((resource) => (
                <li key={resource} className="flex items-center text-gray-600 dark:text-gray-300">
                  <span className="h-1.5 w-1.5 bg-purple-600 rounded-full mr-2"></span>
                  <a href="#" className="hover:text-purple-600">{resource}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-purple-50 dark:bg-gray-700 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Need Personalized Support?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Our counselors are here to help you with your specific needs
        </p>
        <a
          href="/booking"
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700"
        >
          Book a Session
        </a>
      </div>
    </div>
  );
}