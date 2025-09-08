import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, DollarSign, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface JobOpportunity {
  id: number;
  title: string;
  department: string;
  type: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

const jobOpportunities: JobOpportunity[] = [
  {
    id: 1,
    title: "Senior Counselor",
    department: "Student Counseling",
    type: "Full-time",
    location: "On-site",
    salary: "$65,000 - $85,000",
    description: "We are seeking an experienced counselor to provide mental health support to our student community. You will work with students facing various challenges including anxiety, depression, and academic stress.",
    requirements: [
      "Master's degree in Counseling Psychology or related field",
      "Licensed counselor (LPC, LMHC, or equivalent)",
      "3+ years of experience in student counseling",
      "Strong communication and interpersonal skills"
    ],
    benefits: [
      "Competitive salary and benefits package",
      "Professional development opportunities",
      "Flexible work schedule",
      "Supportive team environment"
    ]
  },
  {
    id: 2,
    title: "Mental Health Therapist",
    department: "Mental Health Services",
    type: "Full-time",
    location: "Hybrid",
    salary: "$60,000 - $80,000",
    description: "Join our team as a mental health therapist specializing in cognitive behavioral therapy and mindfulness practices. You will help students develop effective coping strategies and improve their mental well-being.",
    requirements: [
      "Ph.D. or Psy.D. in Clinical Psychology",
      "Licensed therapist (LP, LMFT, or equivalent)",
      "Experience with CBT and mindfulness techniques",
      "Ability to work with diverse student populations"
    ],
    benefits: [
      "Comprehensive health insurance",
      "Retirement plan with employer match",
      "Paid time off and holidays",
      "Continuing education stipend"
    ]
  },
  {
    id: 3,
    title: "Wellness Coordinator",
    department: "Student Support Services",
    type: "Part-time",
    location: "On-site",
    salary: "$40,000 - $55,000",
    description: "As a Wellness Coordinator, you will organize wellness programs, workshops, and events to promote mental health awareness and provide support services to students.",
    requirements: [
      "Bachelor's degree in Psychology, Social Work, or related field",
      "2+ years of experience in wellness or student services",
      "Strong organizational and event planning skills",
      "Passion for student wellness initiatives"
    ],
    benefits: [
      "Flexible part-time schedule",
      "Professional development opportunities",
      "Collaborative team environment",
      "Opportunity to make a meaningful impact"
    ]
  }
];

export default function JoinTeam() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-purple/5 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-primary dark:text-white mb-4">Join Our Team</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're passionate about supporting student mental health and well-being. Join our dedicated team of professionals
            who are making a real difference in students' lives every day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Why Join HUGS?</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Users className="h-6 w-6 text-primary dark:text-purple-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Supportive Community</h3>
                  <p className="text-gray-600 dark:text-gray-300">Work with a team of passionate professionals dedicated to student mental health.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-6 w-6 text-primary dark:text-purple-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Work-Life Balance</h3>
                  <p className="text-gray-600 dark:text-gray-300">Flexible schedules and comprehensive benefits to support your well-being.</p>
                </div>
              </div>
              <div className="flex items-start">
                <DollarSign className="h-6 w-6 text-primary dark:text-purple-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Competitive Compensation</h3>
                  <p className="text-gray-600 dark:text-gray-300">Attractive salary packages with opportunities for growth and advancement.</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-primary dark:text-purple-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Meaningful Impact</h3>
                  <p className="text-gray-600 dark:text-gray-300">Make a real difference in the lives of students during critical times.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Our Values</h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-primary dark:text-purple-400 mr-2">•</span>
                Compassionate care for every student
              </li>
              <li className="flex items-start">
                <span className="text-primary dark:text-purple-400 mr-2">•</span>
                Evidence-based practices and continuous learning
              </li>
              <li className="flex items-start">
                <span className="text-primary dark:text-purple-400 mr-2">•</span>
                Cultural sensitivity and inclusivity
              </li>
              <li className="flex items-start">
                <span className="text-primary dark:text-purple-400 mr-2">•</span>
                Collaboration and teamwork
              </li>
              <li className="flex items-start">
                <span className="text-primary dark:text-purple-400 mr-2">•</span>
                Innovation in mental health support
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-primary dark:text-white text-center mb-8">Current Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobOpportunities.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="bg-primary p-4">
                  <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                  <p className="text-purple-100">{job.department}</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 text-primary dark:text-purple-400 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{job.type}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 text-primary dark:text-purple-400 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{job.location}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <DollarSign className="h-4 w-4 text-primary dark:text-purple-400 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{job.salary}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{job.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-primary dark:text-purple-400 mb-2">Requirements:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      {job.requirements.map((req, idx) => (
                        <li key={idx}>• {req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-primary dark:text-purple-400 mb-2">Benefits:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      {job.benefits.map((benefit, idx) => (
                        <li key={idx}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors duration-300"
                  >
                    Apply Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Ready to Make a Difference?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            If you don't see a position that matches your skills but are passionate about student mental health,
            we'd still love to hear from you. Send us your resume and cover letter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primary-dark transition-colors duration-300"
              onClick={() => window.location.href = 'mailto:careers@hugs.com?subject=Resume Submission'}
            >
              <Mail className="h-5 w-5 inline mr-2" />
              Send Resume
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primary-dark transition-colors duration-300"
              onClick={() => navigate('/contact')}
            >
              <Phone className="h-5 w-5 inline mr-2" />
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

