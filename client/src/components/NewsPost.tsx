import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight, Edit, Trash2, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface NewsItem {
  _id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  link: string;
  isBlogPost: boolean;
}

const News = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5030/api/news');
        setNewsItems(response.data);
      } catch (err) {
        setError('Failed to load news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-blue-50 text-blue-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    const token = localStorage.getItem("adminToken");

    if (!token) {
      setError("Unauthorized: Admin login required.");
      navigate("/admin/login");
      return;
    }

    try {
      await axios.delete(`http://localhost:5030/api/news/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted item from the state
      setNewsItems(newsItems.filter((item) => item._id !== id));
      alert("News item deleted successfully!");
    } catch (err) {
      alert("Failed to delete post");
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-news/${id}`);
  };

  const handleAddNewPost = () => {
    navigate('/add-news'); // Redirect to the "Add New Post" page
  };

  return (
    <div className="min-h-screen">
      {/* Add New Post Button */}
      <section className="py-10 px-6 sm:px-8 lg:px-10 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-7xl mx-auto text-right">
          <motion.button
            onClick={handleAddNewPost}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            <PlusCircle className="w-5 h-5 mr-2 inline" />
            Add New Post
          </motion.button>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 px-6 sm:px-8 lg:px-10 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {newsItems.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-xl overflow-hidden transition-transform transform hover:scale-105"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4 text-gray-600">
                  <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-6">{item.description}</p>

                {/* Edit and Delete Buttons */}
                <div className="flex justify-between items-center pt-4 mt-4 border-t">
                  <motion.button
                    onClick={() => handleEdit(item._id)}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                  >
                    <Edit className="w-5 h-5 mr-2 inline" />
                    Edit
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(item._id)}
                    className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition"
                  >
                    <Trash2 className="w-5 h-5 mr-2 inline" />
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {newsItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              No news items available at the moment.
            </p>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default News;
