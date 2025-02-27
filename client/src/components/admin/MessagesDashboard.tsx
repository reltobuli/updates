import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  interest: string;
  message: string;
  createdAt: string;
}

const MessagesDashboard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [activeTab, setActiveTab] = useState<'messages' | 'inquiries'>('messages');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          setError('Authentication required');
          setLoading(false);
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const apiBaseUrl = 'INSERT_BACKEND_ENDPOINT/api';
        const [messagesRes, inquiriesRes] = await Promise.all([
          axios.get(`${apiBaseUrl}/messages`, config),
          axios.get(`${apiBaseUrl}/inquiries`, config)
        ]);
        
        setMessages(messagesRes.data);
        setInquiries(inquiriesRes.data);
        setLoading(false);
      } catch (err: any) {
        setError('Failed to fetch messages');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string, type: 'message' | 'inquiry') => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('Authentication required');
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const apiBaseUrl = 'INSERT_BACKEND_ENDPOINT/api';
      await axios.delete(`${apiBaseUrl}/${type}s/${id}`, config);
      if (type === 'message') {
        setMessages(messages.filter(msg => msg._id !== id));
      } else {
        setInquiries(inquiries.filter(inq => inq._id !== id));
      }
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'messages'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('messages')}
        >
          Messages ({messages.length})
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'inquiries'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('inquiries')}
        >
          Inquiries ({inquiries.length})
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === 'messages' ? (
          messages.map((message) => (
            <motion.div
              key={message._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{message.subject}</h3>
                  <p className="text-sm text-gray-600">
                    From: {message.name} ({message.email})
                  </p>
                  <p className="mt-2">{message.message}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(message._id, 'message')}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          inquiries.map((inquiry) => (
            <motion.div
              key={inquiry._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{inquiry.interest}</h3>
                  <p className="text-sm text-gray-600">
                    From: {inquiry.name} ({inquiry.email})
                  </p>
                  <p className="mt-2">{inquiry.message}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(inquiry.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(inquiry._id, 'inquiry')}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))
        )}

        {activeTab === 'messages' && messages.length === 0 && (
          <p className="text-center text-gray-500">No messages found</p>
        )}
        {activeTab === 'inquiries' && inquiries.length === 0 && (
          <p className="text-center text-gray-500">No inquiries found</p>
        )}
      </div>
    </div>
  );
};

export default MessagesDashboard;
