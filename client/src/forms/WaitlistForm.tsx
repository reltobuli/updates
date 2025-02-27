import React, { useState } from 'react';
import axios from 'axios';

const WaitlistForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [researchInterest, setResearchInterest] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('INSERT_BACKEND_ENDPOINT/api/waitlist', {
        name,
        email,
        researchInterest,
      });
      if (response.status === 201) {
        setMessage('Successfully joined the waitlist!');
        setName('');
        setEmail('');
        setResearchInterest('');
      }
    } catch (error) {
      setMessage('Error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Join Our Waitlist</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Research Interest
            </label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={researchInterest}
              onChange={(e) => setResearchInterest(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700"
          >
            Join Waitlist
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-gray-700 font-semibold">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default WaitlistForm;
