import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const Careers = () => {
  const careerSections = [
    {
      id: 1,
      title: "Job Openings",
      description:
        "We are looking for talented individuals to join our editorial team, production coordinators, AI specialists, and more.",
      responsibilities: [
        "Positions available for editorial staff, production coordinators, and AI specialists.",
        "Seeking Production Coordinator: minimum 3 years’ experience in academic publishing, familiarity with AI tools.",
      ],
      image:
        "https://plus.unsplash.com/premium_photo-1682432517956-9c3c4f26ec0b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "#",
    },
    {
      id: 2,
      title: "Internships & Fellowships",
      description:
        "Opportunities for early-career scientists or publishing professionals to gain hands-on experience in journal production and curation.",
      responsibilities: [
        "Work alongside seasoned editors and production teams.",
        "Contribute to the curation and review of scientific manuscripts.",
        "Get valuable insights into publishing workflows and AI-driven processes.",
      ],
      image:
        "https://plus.unsplash.com/premium_photo-1677553954005-9ea7baf70ce5?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "#",
    },
    {
      id: 3,
      title: "Editorial Board & Reviewer Roles",
      description:
        "Join our network of experienced researchers shaping the future of scientific publishing.",
      responsibilities: [
        "Guidelines for Application: Submit your CV, cover letter, and publication record to apply.",
        "Recognition & Incentives: Track and showcase your peer-review contributions via Publons and ORCID.",
        "Help maintain quality and integrity in scientific research by reviewing articles in your field.",
      ],
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "#",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 inset-0 bg-gradient-to-br from-blue-100 to-gray-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-500 mb-6"
          >
            Careers & Opportunities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Join our team and contribute to advancing scientific publishing with
            AI-driven innovation.
          </motion.p>
        </div>
      </section>
      

      {/* Careers Grid */}
      <div className="grid gap-8 px-6 sm:px-10 py-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-1">
        {careerSections.map((section) => (
          <div
            key={section.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg hover:scale-105 transition-transform duration-200"
          >
            {/* Image */}
            <img
              src={section.image}
              alt={section.title}
              className="w-full h-48 object-cover"
            />
            {/* Content */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {section.title}
              </h2>
              <p className="text-gray-600 mt-4">{section.description}</p>

              {/* Responsibilities / Highlights */}
              <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                {section.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              {/* Join Link Button */}
              
            </div>
          </div>
        ))}
        
      </div>
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
            <p className="text-lg text-gray-600 mb-8">
            We’re always looking for innovative professionals, dedicated scientists,
          and curious minds who want to make a difference in scientific publishing.
          Whether you’re an industry veteran or just starting your career, we welcome
          you to explore the roles above and grow with us.
            </p>
            <Link to = "/job-application">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 
                transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Join Our Team
            </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
