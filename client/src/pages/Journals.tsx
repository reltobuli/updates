import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Journals = () => {
  const journals = [
    {
      title: 'Journal of the Best Available Evidence in Medicine',
      scope: 'Promoting Excellence in Global Medical Research and Innovation',
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=1094&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      state: 'active',
      learnmore: '/JBAEM'
    },
    {
      title: 'Engineering Sustainability and Green Technologies (ESGT) Journal',
      scope: 'Advancing Innovation and Excellence in Engineering Research',
      image: 'https://plus.unsplash.com/premium_photo-1663100465979-7d42b0f37bbc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      state: 'coming_soon',
      learnmore: '/'
    },
    {
      title: 'International University Journal- Humanities',
      scope: 'Advancing Research in Social Sciences and Humanities',
      image: 'https://plus.unsplash.com/premium_photo-1679429321023-dff2ea455b0c?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      state: 'coming_soon',
      learnmore: '/'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 inset-0 bg-gradient-to-br from-blue-100 to-gray-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-500 mb-6"
          >
            Our Journals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
             A leading platform for open access and peer-reviewed innovative research encompassing 
              diverse academic fields. We strive to bridge the gaps 
              between disciplines and inspire transformative global solutions.
          </motion.p>
        </div>
      </section>



      {/* Journals Grid */}
      <section className="py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {journals.map((journal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={journal.image}
                    alt={journal.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{journal.title}</h3>
                  <p className="text-gray-600 mb-4">{journal.scope}</p>
                  <div className="flex items-center mb-4">
                  </div>
                  <div className="border-t pt-4">
                    {journal.state === 'active' ? (
                      <div className='flex flex-col gap-4'>
                         <Link to={journal.learnmore}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="bg-white-300 text-black px-8 py-3 rounded-lg hover:bg-gray-200 
                            transition-colors duration-200 shadow-lg hover:shadow-xl w-full"
                        >
                          About the Journal
                        </motion.button>
                      </Link>
                      <Link to="/pick-submission">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 
                            transition-colors duration-200 shadow-lg hover:shadow-xl w-full"
                        >
                          Submit Now
                        </motion.button>
                      </Link>
                     
                      </div>
                    ) : (
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="mt-4 text-blue-600 font-medium flex items-center space-x-2"
                      >
                        <span>Coming Soon</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Journals;