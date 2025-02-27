import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react';

interface NewsItem {
  _id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  link: string;
  isBlogPost: boolean;
  blogContent?: string;
}

const NewsManagement = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [error, setError] = useState('');
  const [newNews, setNewNews] = useState({
    title: '',
    date: 'Coming Soon',
    description: '',
    image: '',
    link: '#',
    isBlogPost: false,
    blogContent: '',
    hasSpecificDate: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get('INSERT_BACKEND_ENDPOINT/api/news');
      setNewsItems(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error fetching news');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this news item?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`INSERT_BACKEND_ENDPOINT/api/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNews();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error deleting news item');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    try {
      const newsData = {
        ...newNews,
        date: newNews.hasSpecificDate ? newNews.date : 'Coming Soon'
      };

      if (editingItem) {
        await axios.put(`INSERT_BACKEND_ENDPOINT/api/news/${editingItem._id}`, newsData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('INSERT_BACKEND_ENDPOINT/api/news', newsData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      setEditingItem(null);
      setNewNews({
        title: '',
        date: 'Coming Soon',
        description: '',
        image: '',
        link: '#',
        isBlogPost: false,
        blogContent: '',
        hasSpecificDate: false
      });
      fetchNews();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error saving news item');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/panel')}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">News Management</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {/* News List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Current News Items</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {newsItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.isBlogPost 
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.isBlogPost ? 'Blog Post' : 'News'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => {
                          setEditingItem(item);
                          setNewNews({
                            ...item,
                            blogContent: item.blogContent || '',
                            hasSpecificDate: item.date !== 'Coming Soon'
                          });
                        }}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Form */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {editingItem ? 'Edit News Item' : 'Add New News Item'}
            </h2>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={newNews.title}
                    onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      id="hasSpecificDate"
                      checked={newNews.hasSpecificDate}
                      onChange={(e) => {
                        setNewNews({ 
                          ...newNews, 
                          hasSpecificDate: e.target.checked,
                          date: e.target.checked ? newNews.date : 'Coming Soon'
                        })
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="hasSpecificDate" className="text-sm font-medium text-gray-700">
                      Set specific date
                    </label>
                  </div>
                  {newNews.hasSpecificDate ? (
                    <input
                      type="date"
                      value={newNews.date}
                      onChange={(e) => setNewNews({ ...newNews, date: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <input
                      type="text"
                      value={newNews.date}
                      disabled
                      className="w-full p-2 border border-gray-200 rounded-md bg-gray-50 text-gray-500"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newNews.description}
                  onChange={(e) => setNewNews({ ...newNews, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={newNews.image}
                  onChange={(e) => setNewNews({ ...newNews, image: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isBlogPost"
                  checked={newNews.isBlogPost}
                  onChange={(e) => setNewNews({ ...newNews, isBlogPost: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isBlogPost" className="text-sm font-medium text-gray-700">
                  This is a blog post
                </label>
              </div>

              {newNews.isBlogPost && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blog Content</label>
                  <ReactQuill
                    value={newNews.blogContent}
                    onChange={(content) => setNewNews({ ...newNews, blogContent: content })}
                    className="bg-white"
                  />
                </div>
              )}

              <div className="flex justify-end space-x-4">
                {editingItem && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem(null);
                      setNewNews({
                        title: '',
                        date: 'Coming Soon',
                        description: '',
                        image: '',
                        link: '#',
                        isBlogPost: false,
                        blogContent: '',
                        hasSpecificDate: false
                      });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {editingItem ? 'Update' : 'Add'} News Item
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsManagement; 