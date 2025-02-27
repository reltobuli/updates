import React from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  ShieldCheck,
  BarChart4,
} from 'lucide-react';
import { Link } from 'react-router-dom';


const AI: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero / Intro Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8  bg-gradient-to-br from-blue-100 to-gray-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-500 mb-6"
          >
            Dedicated AI-Assisted Open Journal System
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Harnessing the power of AI to streamline journal production, 
            enhance research discoverability, and support faster publication 
            while preserving academic integrity.
          </motion.p>
        </div>
      </section>

      {/* Content Section with Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Overview of AI Capabilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              
              className="bg-white p-8 rounded-lg shadow-md flex flex-col"
            >
              <div className="flex items-center mb-4">
                <Cpu className="h-10 w-10 text-blue-600 mr-3" />
                <h2 className="text-xl font-bold">1. Overview of AI-Journal System</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Our AI-driven platform streamlines production:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong> User-friendly submission process</strong></li>
                <li><strong> Plagirism and deepfake checks</strong></li>
                <li><strong> Unbiased selection of peer reviewers</strong></li>
                <li><strong>Language editing:</strong> Identifies clarity and consistency problems for a refined manuscript.</li>
                <li><strong>Formatting:</strong> Ensures citations, figures, references, and layout stay consistent.</li>
              </ul>
              <p className="text-gray-700 mb-4">
                This approach delivers cost-effective and faster turnaround times. 
               
              </p>
              {/* A little spacer at the bottom to ensure uniform card height if needed */}
              <div className="mt-auto" />
            </motion.div>

            {/* Card 2: Maintaining Quality and Integrity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-md flex flex-col"
            >
              <div className="flex items-center mb-4">
                <ShieldCheck className="h-10 w-10 text-blue-600 mr-3" />
                <h2 className="text-xl font-bold">2. Maintaining Quality and Integrity</h2>
              </div>
              <p className="text-gray-700 mb-4">
                While AI significantly accelerates production tasks, it never replaces 
                professional editorial judgment. Our system is designed to <strong>augment </strong> 
                rather than override human expertise.
              </p>
              <p className="text-gray-700 mb-4">
                We’ve instituted checks and balances throughout the editorial pipeline 
                to avoid over-reliance on automated tools. Final decisions always rest 
                with our expert editors and peer reviewers, ensuring:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Academic and ethical compliance</li>
                <li>Scientific rigor and reproducibility</li>
                <li>Transparency and fairness in publishing</li>
              </ul>
              <div className="mt-auto" />
            </motion.div>

            {/* Card 3: Future Enhancements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-md flex flex-col"
            >
              <div className="flex items-center mb-4">
                <BarChart4 className="h-10 w-10 text-blue-600 mr-3" />
                <h2 className="text-xl font-bold">3. Future Enhancements</h2>
              </div>
              <p className="text-gray-700 mb-4">
                We continuously refine our platform to offer advanced analytics, 
                more sophisticated semantic search, and personalized content recommendations. 
                Upcoming features include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li><strong>Deeper data-driven insights:</strong> Helping researchers, libraries, 
                  and partner institutions track trends and impact.</li>
                <li><strong>Adaptive content recommendations:</strong> Curated reading lists 
                  based on user preferences, research interests, and citations.</li>
              </ul>
              <p className="text-gray-700">
                We aim to empower readers, authors, and institutions with cutting-edge 
                tools that improve the entire research cycle—discovery, collaboration, 
                and dissemination.
              </p>
              <div className="mt-auto" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Optional CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Experience the Future of Research Publishing
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Embrace AI-driven solutions without compromising on quality and integrity.
            </p>
            <Link to="/pick-submission">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 
                transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Publish Now
            </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AI;
