import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditNews = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  const [newsItem, setNewsItem] = useState({
    title: '',
    description: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch news data by ID
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`http://localhost:5030/api/news/${id}`);
        setNewsItem(response.data);
      } catch (err) {
        setError('Failed to load news');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewsItem({ ...newsItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken"); 
    console.log("Admin Token:", token); 
  
    if (!token) {
      alert("Unauthorized: No token found. Please log in as admin.");
      navigate("/admin/login");
      return;
    }
  
    try {
      const response = await axios.put(
        `http://localhost:5030/api/news/${id}`,
        newsItem,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Update response:", response.data);
      alert("News updated successfully!");
      navigate("/DashboardPage");
    } catch (err: any) {
      console.error("Error response:", err.response);
      alert("Failed to update news: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit News</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <label className="block font-medium mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={newsItem.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />

        {/* Description */}
        <label className="block font-medium mb-2">Description</label>
        <textarea
          name="description"
          value={newsItem.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />

        {/* Image URL */}
        <label className="block font-medium mb-2">Image URL</label>
        <input
          type="text"
          name="image"
          value={newsItem.image}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditNews;