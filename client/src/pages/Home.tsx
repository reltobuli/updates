import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain,
  MessageSquareText ,
  BadgeCheck,
  BrainCircuit,
  BookOpenCheck,
  BookUp2,
} from 'lucide-react';
import { ArrowRight } from "lucide-react";
const Home = () => {

  return (
    <div className="min-h-screen">
    
      {/* New Hero Section */}

      <section className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-blue-50">
          {/* Background Gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-gray-200"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDQ4YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnptMC0xMmMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6IiBzdHJva2U9IiNEREQiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-5"></div>

          {/* Main Content Container */}
          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              
              {/* Text Content - Left Side */}
              <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-blue-500 leading-tight">
                  AI-Powered Scientific Publishing
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                  Revolutionizing academic publishing with cutting-edge AI technology and traditional scholarly
                  standards.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
                  <Link to={"/pick-submission"} className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
                    Publish Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link to={"/prod"} className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-blue-900 bg-white border border-gray-300 hover:bg-gray-50 transition-colors duration-200 shadow-md hover:shadow-lg">
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Animated Brain Icon - Right Side */}
              <div className="w-full lg:w-1/2 flex justify-center items-center">
                <style>{`
                  @keyframes radialExpand {
                    0% {
                      transform: scale(0.95);
                      opacity: 0.4;
                    }
                    50% {
                      transform: scale(1.05);
                      opacity: 0.8;
                    }
                    100% {
                      transform: scale(0.95);
                      opacity: 0.4;
                    }
                  }
                  @keyframes radialPulse {
                    0% {
                      stroke-width: 1;
                      stroke-opacity: 0.4;
                    }
                    50% {
                      stroke-width: 2;
                      stroke-opacity: 0.8;
                    }
                    100% {
                      stroke-width: 1;
                      stroke-opacity: 0.4;
                    }
                  }
                `}</style>
                <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] transform lg:translate-x-0">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      d="M100,10 C120,10 140,20 150,40 C160,60 160,80 150,100 C140,120 120,130 100,130 C80,130 60,120 50,100 C40,80 40,60 50,40 C60,20 80,10 100,10 Z"
                      className="text-blue-200 origin-center [animation:radialExpand_3s_ease-in-out_infinite,radialPulse_3s_ease-in-out_infinite]"
                    />
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      d="M100,30 C115,30 130,40 135,55 C140,70 140,85 135,100 C130,115 115,125 100,125 C85,125 70,115 65,100 C60,85 60,70 65,55 C70,40 85,30 100,30 Z"
                      className="text-blue-300 origin-center [animation:radialExpand_3s_ease-in-out_infinite_0.5s,radialPulse_3s_ease-in-out_infinite_0.5s]"
                    />
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      d="M100,50 C110,50 120,55 125,65 C130,75 130,85 125,95 C120,105 110,110 100,110 C90,110 80,105 75,95 C70,85 70,75 75,65 C80,55 90,50 100,50 Z"
                      className="text-blue-400 origin-center [animation:radialExpand_3s_ease-in-out_infinite_1s,radialPulse_3s_ease-in-out_infinite_1s]"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 text-blue-500" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-8xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Open Science Press?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <Brain className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-4">AI Integration</h3>
              <p className="text-gray-600 leading-relaxed">
                At Open Science Press, we harness AI to redefine the standard of scientific publishing, 
                making the publishing process both faster and more affordable while protecting the 
                integrity and quality of your scientific content.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <BrainCircuit className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Quality and Integrity</h3>
              <p className="text-gray-600 leading-relaxed">
                Every submission undergoes a rigorous double-blind peer review process,
                ensuring transparency, fairness, and the highest standards of academic integrity.
              </p>
            </motion.div>




            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <MessageSquareText  className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Keeping Your Manuscript Alive</h3>
              <p className="text-gray-600 leading-relaxed">
              Research doesn’t end at publication—it starts the conversation!
               Our real-time peer review model enables instant engagement and ongoing
                expert evaluation allowing scientists to submit a post-publication peer review anytime.              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 to-gray-200 shadow-[inset_0px_10px_10px_#cccccc,inset_-10px_-10px_54px_#f4f4f4]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                value: (
                  <BookOpenCheck className="h-12 w-12 text-blue-400 mb-4 justify-self-center" />
                ),
                label: 'User-friendly submission and follow-up of manuscripts.',
              },
              {
                value: (
                  <BadgeCheck className="h-12 w-12 text-blue-400 mb-4 justify-self-center" />
                ),
                label: 'Experience the future of publishing with journals affiliated with academic institutions.',
              },
              {
                value: (
                  <BookUp2 className="h-12 w-12 text-blue-400 mb-4 justify-self-center" />
                ),
                label: 'Streamlined journal process management.',
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center">{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Publish?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join the future of scientific publishing today.
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

export default Home;
