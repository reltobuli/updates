import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import {
  CheckCircle2,
  Bot,
  Users,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

const ProductionAndEditorialProcess: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero / Intro Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 inset-0 bg-gradient-to-br from-blue-100 to-gray-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-500 mb-6"
          >
            Production and Editorial Process
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            A streamlined, AI-assisted workflow ensuring scientific integrity, 
            rigorous peer review, and timely publication.
          </motion.p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* Rigorous Editorial Oversight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center mb-6">
              <CheckCircle2 className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold">1. Rigorous Editorial Oversight</h2>
            </div>
            <div className="ml-11 space-y-6 text-gray-700">
              <div>
                <h3 className="font-semibold mb-2">
                  Overview of peer-review systems and editorial standards
                </h3>
                <p className="leading-relaxed">
                  We implement a double-blind review process to avoid potential biases based
                  on the author's identity, affiliation, gender, or other personal characteristics, thereby ensuring scientific accuracy, reproducibility, and overall quality.
                </p>
              </div>
              <div>
                
                <p className="leading-relaxed">
                  Once articles are approved by each journal’s editorial board, our in-house 
                  production staff coordinates copyediting, layout design, and final checks.
                </p>
              </div>
            </div>
          </motion.div>

          {/* AI-Driven Efficiency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center mb-6">
              <Bot className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold">2. AI-Driven Efficiency</h2>
            </div>
            <div className="ml-11 space-y-6 text-gray-700">
              <div>
                <h3 className="font-semibold mb-2">
                  How do AI tools handle proofreading, formatting checks, and layout tasks?
                </h3>
                <p className="leading-relaxed">
                  We implement cutting-edge AI technology to make the publishing process both faster 
                  and more affordable while protecting the integrity and quality of your scientific contents. 
                  Our AI tools detect inconsistencies in language, reference mismatches, and 
                  formatting errors, allowing editors to focus solely on content quality. This 
                  ultimately speeds up the process.
                </p>
              </div>
              <div>
                <p className="leading-relaxed">
                  Human expertise remains central to final editorial decisions, 
                  ensuring that while AI accelerates the workflow, it doesn’t override 
                  the nuanced judgment of seasoned professionals.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Faster Turnaround</h3>
                <p className="leading-relaxed">
                  Streamlined tasks let editorial staff focus on content quality—not clerical work!
                  On average, we cut total production time by 50% compared to traditional publishing companies.
                </p>
                <p className="leading-relaxed mt-2">
                  <strong>First decision:</strong> Typically within days of submission<br/>
                  <strong>Initial review:</strong> Within 4 weeks<br/>
                  <strong>Online publication:</strong> Within 30-90 days from receiving final reviewer comments
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quality Checks and Integrity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center mb-6">
              <ShieldCheck className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold">3. Quality Checks and Integrity</h2>
            </div>
            <div className="ml-11 space-y-6 text-gray-700">
              <p className="leading-relaxed">
                Each journal is thoroughly vetted for scientific accuracy and ethical compliance. 
                Our comprehensive process, aided by AI, flags potential concerns, 
                but the editors ultimately have the final word.
              </p>
            </div>
          </motion.div>

          {/* Human Oversight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center mb-6">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold">4. Human Oversight</h2>
            </div>
            <div className="ml-11 space-y-6 text-gray-700">
              <p className="leading-relaxed"> 
                Every article undergoes final scrutiny by senior editor(s) to ensure compliance with 
                journal guidelines and scientific standards.
              </p>
            </div>
          </motion.div>

          {/* Conflict Resolution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center mb-6">
              <AlertCircle className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold">5. Conflict Resolution</h2>
            </div>
            <div className="ml-11 space-y-6 text-gray-700">
              <p className="leading-relaxed">
                Clear terms and conditions are in place for retractions, corrections, and appeals. 
                Our editorial board conducts cross-checks for potential issues like 
                plagiarism, data inconsistencies, or ethical breaches.
              </p>
             
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Optional CTA Section (similar style as Home) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Learn More About Our Review & Publication
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Discover how our AI-driven solutions maintain rigor and speed in research publication.
            </p>
            <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 
                transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Contact Us
            </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductionAndEditorialProcess;
