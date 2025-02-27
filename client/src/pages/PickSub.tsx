import { motion } from 'framer-motion';
const PickSub = () => {
  const submissionSections = [
    {
      id: 1,
      title: "Publish an Article",
      status:'Submit Now',
      image:
        "https://abagond.wordpress.com/wp-content/uploads/2023/03/maxims-of-ptahhotep.jpg",
      link: "/advice",
    },
    {
      id: 2,
      title: "Publish a Journal",
      status:'Pre-Submission Inquiry',
      image:
        "https://i.ibb.co/k2YJ5MWp/be3ef41b-410f-43f0-97ff-8252f25d9673.png",
      link: "/sub-inquire",
    },
    {
      id: 3,
      title: "Publish a Book",
      status:'Pre-Submission Inquiry',
      image:
        "https://plus.unsplash.com/premium_photo-1661438261224-167b82f3b871?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/sub-inquire",
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
          Submissions
          </motion.h1>
        
        </div>
      </section>
      

      {/* Careers Grid */}
      <div className="grid gap-8 px-6 sm:px-10 py-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-1">
        {submissionSections.map((section) => (
          <div
            key={section.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg h-[350px] hover:scale-105 transition-transform duration-200"
          >
            {/* Image */}
            <img
              src={section.image}
              alt={section.title}
              className="w-full h-48 object-cover"
            />
            {/* Content */}
            <div className="p-6 flex flex-col items-center space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 text-center">
                {section.title}
              </h2>
              

              {/* Join Link Button */}
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                onClick={() => window.location.href = section.link}
              >
                {section.status}
              </button>
              
            </div>
          </div>
        ))}
        
      </div>
       {/* Optional CTA Section */}
      
    </div>
  );
};

export default PickSub;
