import React, { useState } from 'react';
import axios from 'axios';

const JobApplicationForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [resumeLink, setResumeLink] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'INSERT_BACKEND_ENDPOINT/api/job-applications',
        {
          fullName,
          email,
          position,
          resumeLink,
          coverLetter,
        }
      );
      if (response.status === 201) {
        setMessage('Job application submitted!');
        setFullName('');
        setEmail('');
        setPosition('');
        setResumeLink('');
        setCoverLetter('');
      }
    } catch (error) {
      setMessage('Error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Job Application</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
            <label className="block text-gray-700 font-medium">Position</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Resume Link</label>
            <input
              type="url"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={resumeLink}
              onChange={(e) => setResumeLink(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Cover Letter
            </label>
            <textarea
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700"
          >
            Submit Application
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

export default JobApplicationForm;
