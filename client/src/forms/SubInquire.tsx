import React, { useState } from 'react';
import axios from 'axios';

const SubInquire: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('');
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
      const response = await axios.post(`${apiBaseUrl}/inquiries`, {
        name,
        email,
        interest,
        message,
      });

      if (response.status === 201) {
        setSuccess('Inquiry sent successfully!');
        setName('');
        setEmail('');
        setInterest('');
        setMessage('');
      }
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to send inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-white text-center">
            Pre-Submission Inquiry
          </h1>
          <p className="text-white text-center mt-2">
            Tell us about your vision and we'll help you get started
          </p>
        </div>
      </section>

      {/* Form Section */}
      <div className="flex-1 flex justify-center items-center px-6 py-12">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                required
                placeholder="Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Interest</label>
              <select
                required
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select your interest</option>
                <option value="Journals">Journals</option>
                <option value="Books">Books</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                required
                placeholder="Tell us about your manuscript..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
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

export default SubInquire;
