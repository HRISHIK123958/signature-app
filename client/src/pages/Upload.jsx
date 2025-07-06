import React, { useState } from 'react';
import { uploadDocument } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Upload({ auth }) {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) return setMessage('All fields are required');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('pdf', file);

    try {
      const token = localStorage.getItem('token');
      await uploadDocument(formData, token);
      setMessage('✅ Upload successful! Redirecting...');
      
      setTimeout(() => {
        navigate('/dashboard'); // 👈 Redirect to Dashboard after success
      }, 1000); // 1 second delay so user sees the message
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || '❌ Upload failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg space-y-6 border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">📄 Upload PDF Document</h2>

        <div>
          <label className="block mb-1 text-gray-600 font-medium">Document Title</label>
          <input
            type="text"
            placeholder="e.g., Project Proposal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-600 font-medium">Select PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full file:rounded-md file:border-0 file:bg-blue-600 file:text-white file:px-4 file:py-2 file:cursor-pointer hover:file:bg-blue-700 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:brightness-110 transition"
        >
          🚀 Upload
        </button>

        {message && (
          <motion.p
            className={`text-center text-sm font-medium ${
              message.includes('successful') ? 'text-green-600' : 'text-red-500'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {message}
          </motion.p>
        )}
      </motion.form>
    </div>
  );
}
