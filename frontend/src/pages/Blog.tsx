import { Calendar, User, ArrowRight } from 'lucide-react';

export default function Blog() {
  const posts = [
    {
      title: 'Managing Academic Stress: A Student\'s Guide',
      excerpt: 'Learn effective strategies to balance your academic workload and maintain mental well-being...',
      author: 'Dr. Sarah Johnson',
      date: 'March 15, 2024',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Building Healthy Relationships in College',
      excerpt: 'Tips for navigating relationships, setting boundaries, and maintaining connections...',
      author: 'Dr. Michael Chen',
      date: 'March 10, 2024',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Mindfulness Techniques for Better Focus',
      excerpt: 'Simple mindfulness practices you can incorporate into your daily routine...',
      author: 'Dr. Emily Williams',
      date: 'March 5, 2024',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Mental Health Blog</h1>
        <p className="mt-4 text-lg text-gray-600">
          Insights and advice from our mental health professionals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.title} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <User className="h-4 w-4 mr-1" />
                <span className="mr-4">{post.author}</span>
                <Calendar className="h-4 w-4 mr-1" />
                <span>{post.date}</span>
              </div>
              <a
                href="#"
                className="inline-flex items-center text-purple-600 hover:text-purple-700"
                aria-label="Read more about the post"
              >
                Read More
                <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 bg-purple-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 mb-6">
          Get the latest mental health tips and resources delivered to your inbox
        </p>
        <form className="max-w-md mx-auto">
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              required
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
