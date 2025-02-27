import React from 'react';
import { motion } from 'framer-motion';

import {
  AlertCircle,
} from 'lucide-react';

const Advice: React.FC = () => {
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
            Pre-Submission Notice
          </motion.h1>
         
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
              <AlertCircle className="flex-shrink-0 h-10 w-10 text-blue-600 mr-3" />
              <h3 className=" leading-relaxed font-semibold mb-2">
                  Open Science Press is a publisher with interest in supporting high quality peer-reviewed scientific publications, journals, and books according to the guidelines of the Committee on Publication Ethics (COPE) and International Committee of Medical Journal Editors (ICMJE).
                </h3>
                
            </div>
            
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center mb-6">
              <AlertCircle className="flex-shrink-0 h-10 w-10 text-blue-600 mr-3" />
              <h3 className=" leading-relaxed font-semibold mb-2">
              By submitting, you confirm that all content is original, not copied or plagiarized, and that you hold the rights to publish it. Any plagiarism or copyright violations may result in rejection, retraction, or further action by the publisher.                </h3>
            </div>
            
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center mb-6">
              <AlertCircle className="flex-shrink-0 h-10 w-10 text-blue-600 mr-3" />
              <h3 className=" leading-relaxed font-semibold mb-2">
              Our Platinum Open Access journals{<strong className='font-bold'> guarantee </strong>}neither authors nor readers pay any fees.
                </h3>
            </div>
            
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center mb-6">
              <AlertCircle className="flex-shrink-0 h-10 w-10 text-blue-600 mr-3" />
              <h3 className=" leading-relaxed font-semibold mb-2">
                Non-scientific scholarly work may be considered for a publication, subject to a pre-submission approval. Submission doesn't guarantee publication.
                </h3>
            </div>
            
          </motion.div>
          
       
        </div>
        <div className="flex justify-center pt-8">
         <button onClick={() => window.location.href = '/manuscript-submission'} className='bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 transition-colors'>Proceed with submission</button>
        
        </div>

      </section>
      
    
    </div>
  );
};

export default Advice;
