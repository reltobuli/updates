import { motion } from 'framer-motion';
import { Brain, Target, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: 'S. Maier, MBA, MPhil, FRGS',
      role: 'Executive Assistant',
      bio: '',
      image: '/'
    },
    {
      name: 'Professor R. El Oakley, MBBS, FRCS, MD',
      role: 'CEO and Publishing Editor',
      bio: '',
      image: '/'
    }
  ];

  const values = [
    {
      icon: Brain,
      title: 'Innovation',
      description: 'Pioneering AI-driven solutions in academic publishing'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Maintaining rigorous standards in scientific communication'
    },
    {
      icon: Award,
      title: 'Integrity',
      description: 'Upholding ethical practices and transparency'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Mission Section */}
      <section className="bg-gradient-to-br from-blue-100 to-gray-200 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-500 mb-6"
          >
            About
          </motion.h1>
          
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-6">Our Mission</h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed italic mb-6">
              Our mission is to distribute high-quality, open access, peer-reviewed novel scientific 
              knowledge with agility and efficiency by leveraging AI tools to facilitate submission and 
              journal process management while upholding the highest ethical standards.
            </p>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Experience the future of publishing with credible scientific contents affiliated with universities, 
              professional societies, and other academic institutions. 
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center flex flex-col justify-center h-full"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-6">Our Vision</h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed italic">
                We strive to become a global leader in scientific publishing, bridging 
                the gap between cutting-edge research and real-world impact
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-md text-center"
              >
                <value.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 to-gray-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-blue-500 mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600">Driving innovation in scientific publishing</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-blue-500">
                      {member.name.split(' ')[0][0]}{member.name.split(' ')[1][0]}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-lg font-medium text-blue-500 mb-4">{member.role}</p>
                  {member.bio && (
                    <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-blue-600 text-white rounded-lg p-12"
          >
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Be part of the future of scientific publishing. We're always looking for
              talented individuals to join our team.
            </p>
            <Link to='/careers'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold
                hover:bg-blue-50 transition-colors duration-200"
            >
              View Opportunities
            </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;