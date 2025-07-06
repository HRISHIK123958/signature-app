import React, { useState } from 'react';
import { uploadDocument } from '../services/api';

export default function Upload({ auth }) {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) return setMessage('All fields are required');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('pdf', file);

    try {
      const token = localStorage.getItem('token');
      await uploadDocument(formData, token);
      setMessage('Upload successful');
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || 'Upload failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Upload a PDF Document</h2>
        <input
          type="text"
          placeholder="Document Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-2"
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Upload
        </button>
        {message && <p className="text-center text-sm text-gray-700">{message}</p>}
      </form>
    </div>
  );
}
