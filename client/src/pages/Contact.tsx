import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const apiBaseUrl = 'INSERT_BACKEND_ENDPOINT/api';
      const response = await axios.post(`${apiBaseUrl}/messages`, {
        name,
        email,
        subject,
        message,
      });

      if (response.status === 201) {
        setSuccess('Message sent successfully!');
        // Clear form
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      }
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            We’re here to help with general inquiries, editorial support, and more.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row gap-8 px-6 sm:px-10 py-10 flex-1">
        {/* Left Column: Info & Support Details */}
        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">
            General Inquiries
          </h2>
          <p className="text-gray-600 mt-4">
            For questions about journals, subscriptions, or corporate relations, 
            please reach out by phone, email, or using our online form.
          </p>

          <div className="mt-6 space-y-4">
            {/* Example phone/email UI — adjust as needed */}
            <div className="flex items-center">
              <strong className="material-icons text-blue-500 mr-3">Phone (WhatsApp)</strong>
              <p className="text-gray-600">+44 747 347 3757</p>
            </div>
            <div className="flex items-center">
              <strong className="material-icons text-blue-500 mr-3">Phone</strong>
              <p className="text-gray-600">+218 91 791 1391</p>
            </div>
            <div className="flex items-center">
              <strong className="material-icons text-blue-500 mr-3">Email</strong>
              <p className="text-gray-600">info@opensciencepress.com</p>
            </div>
          </div>

          {/* Office Locations */}
          <h2 className="text-2xl font-semibold text-gray-800 mt-8">
            Office Locations
          </h2>
          
          <div className="mt-4 grid-cols-1 items-center">
            <strong className="material-icons text-blue-500 mr-3">Location</strong>
            <p className="text-gray-600">LG Floor</p>
            <p className="text-gray-600">8 Shepherds Bush Road</p>
            <p className="text-gray-600">London W6 7PJ</p>
            <p className="text-gray-600">United Kingdom</p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">Send a Message</h2>
          <p className="text-gray-600 mt-4">
            Use the form below, and we’ll get back to you as soon as possible.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                required
                placeholder="Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Subject</label>
              <input
                type="text"
                required
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea
                required
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          {error && (
            <p className="mt-4 text-center text-red-600 font-semibold">
              {error}
            </p>
          )}
          {success && (
            <p className="mt-4 text-center text-green-600 font-semibold">
              {success}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
