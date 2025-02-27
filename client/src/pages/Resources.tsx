import { motion } from 'framer-motion';
import { BookOpen, Users, Edit, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
const Resources = () => {
  const categories = [
    {
      title: 'Author Resources',
      icon: BookOpen,
      resources: [
        {
          title: 'Manuscript Submission Guidelines',
          description: 'Complete guide to preparing and submitting your manuscript',
          downloadLink: '#'
        },
        {
          title: 'LaTeX Templates',
          description: 'Professional templates for different journal formats',
          downloadLink: '#'
        },
        {
          title: 'Writing Tips',
          description: 'Expert advice on scientific writing and paper structure',
          downloadLink: '#'
        }
      ]
    },
    {
      title: 'Reviewer Resources',
      icon: Users,
      resources: [
        {
          title: 'Peer Review Guidelines',
          description: 'Best practices for conducting thorough peer reviews',
          downloadLink: '#'
        },
        {
          title: 'AI Review Assistant Guide',
          description: 'How to use our AI-powered review tools effectively',
          downloadLink: '#'
        },
        {
          title: 'Ethics in Peer Review',
          description: 'Understanding reviewer responsibilities and ethical considerations',
          downloadLink: '#'
        }
      ]
    },
    {
      title: 'Editorial Resources',
      icon: Edit,
      resources: [
        {
          title: 'Editorial Policies',
          description: 'Comprehensive guide to our editorial processes',
          downloadLink: '#'
        },
        {
          title: 'Style Guide',
          description: 'Detailed style and formatting requirements',
          downloadLink: '#'
        },
        {
          title: 'Publication Ethics',
          description: 'Guidelines for maintaining publication integrity',
          downloadLink: '#'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-white to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Resources</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to succeed in your publication journey with
              Open Science Press.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <div className="flex items-center mb-6">
                  <category.icon className="h-8 w-8 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold">{category.title}</h2>
                </div>
                <div className="space-y-6">
                  {category.resources.map((resource, resourceIndex) => (
                    <motion.div
                      key={resource.title}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: (categoryIndex + resourceIndex) * 0.1 }}
                      viewport={{ once: true }}
                      className="border-b pb-4 last:border-b-0"
                    >
                      <h3 className="font-medium mb-2">{resource.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {resource.description}
                      </p>
                      <motion.a
                        href={resource.downloadLink}
                        whileHover={{ x: 5 }}
                        className="inline-flex items-center text-blue-600 text-sm font-medium"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Resource
                      </motion.a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-12"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Publish?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Start your publication journey with Open Science Press today.
            </p>
            <Link to="/waitlist">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold
                hover:bg-blue-700 transition-colors duration-200"
            >
              Join Waitlist
            </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Resources;