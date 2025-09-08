import { motion } from 'framer-motion';
import { Mail, Phone, Globe, Award, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import FAQ from './FAQ';

interface FacultyMember {
  id: number;
  name: string;
  title: string;
  department: string;
  image: string;
  specialties: string[];
  education: string[];
  contact: {
    email: string;
    phone: string;
  };
  bio: string;
}

const facultyMembers: FacultyMember[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Senior Counselor",
    department: "Student Counseling",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specialties: ["Anxiety & Depression", "Academic Stress", "Career Guidance"],
    education: [
      "Ph.D. in Clinical Psychology, Stanford University",
      "M.A. in Counseling Psychology, UCLA"
    ],
    contact: {
      email: "sarah.johnson@hugs.com",
      phone: "(555) 123-4567"
    },
    bio: "Dr. Johnson has over 15 years of experience in student counseling, specializing in helping students navigate academic stress and personal challenges."
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    title: "Lead Therapist",
    department: "Mental Health Services",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specialties: ["Cognitive Behavioral Therapy", "Mindfulness", "Group Therapy"],
    education: [
      "Ph.D. in Psychology, Harvard University",
      "M.S. in Clinical Psychology, Columbia University"
    ],
    contact: {
      email: "michael.chen@hugs.com",
      phone: "(555) 234-5678"
    },
    bio: "Dr. Chen is an expert in cognitive behavioral therapy and mindfulness practices, helping students develop effective coping strategies."
  },
  {
    id: 3,
    name: "Dr. Emily Williams",
    title: "Wellness Coordinator",
    department: "Student Support Services",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specialties: ["Stress Management", "Relationship Counseling", "Life Coaching"],
    education: [
      "Ph.D. in Counseling Psychology, Yale University",
      "M.A. in Social Work, University of Michigan"
    ],
    contact: {
      email: "emily.williams@hugs.com",
      phone: "(555) 345-6789"
    },
    bio: "Dr. Williams focuses on holistic wellness approaches, helping students maintain balance in their academic and personal lives."
  }
];

export default function Faculty() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-purple/5 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-primary dark:text-white mb-4">Our Faculty</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Meet our team of experienced counselors and mental health professionals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultyMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-sm opacity-90">{member.title}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h4 className="text-primary dark:text-purple-400 font-semibold mb-2 flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Specialties
                  </h4>
                  <ul className="space-y-1">
                    {member.specialties.map((specialty, idx) => (
                      <li key={idx} className="text-gray-600 dark:text-gray-300 text-sm">
                        • {specialty}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="text-primary dark:text-purple-400 font-semibold mb-2 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Education
                  </h4>
                  <ul className="space-y-1">
                    {member.education.map((edu, idx) => (
                      <li key={idx} className="text-gray-600 dark:text-gray-300 text-sm">
                        • {edu}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t dark:border-gray-600 pt-4 mt-4">
                  <div className="flex items-center mb-2">
                    <Mail className="h-5 w-5 text-primary dark:text-purple-400 mr-2" />
                    <a href={`mailto:${member.contact.email}`} className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-purple-400">
                      {member.contact.email}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary dark:text-purple-400 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{member.contact.phone}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors duration-300"
                >
                  Book Session
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Join Our Team</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We're always looking for passionate mental health professionals to join our team.
            If you're interested in making a difference in students' lives, we'd love to hear from you.
          </p>
          <Link to="/join-team">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white px-8 py-3 rounded-md hover:bg-purple-700 transition-colors duration-300"
            >
              View Opportunities
            </motion.button>
          </Link>
        </motion.div>
      </div>
      <div>
        <FAQ/>
      </div>
    </div>
  );
}