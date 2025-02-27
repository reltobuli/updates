import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';


// Define the interface for the post
interface Post {
  _id: string;
  title: string;
  date: string;
  image: string;
  blogContent: string;
}

const NewsPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null); // Use the Post interface
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`INSERT_BACKEND_ENDPOINT/api/news/${id}`);
        setPost(response.data);
      } catch (err) {
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!post) return <div>No post found</div>;

  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className=" bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
      <motion.div whileHover={{ scale: 1.05 }} className="max-w-3xl mx-auto">
        <img src={post.image} alt={post.title} className="w-full h-96 object-cover rounded-lg mb-8" />
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 text-sm mb-8">{post.date}</p>
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.blogContent }}
        />
      </motion.div>
    </motion.div>
  );
};

export default NewsPost; 