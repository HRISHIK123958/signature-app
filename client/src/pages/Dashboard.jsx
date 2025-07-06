import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchDocuments, signDocument } from '../services/api';
import { motion } from 'framer-motion';

export default function Dashboard({ auth, setAuth }) {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [filter, setFilter] = useState('all');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(null);
    navigate('/login');
  };

  const handleSign = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await signDocument(id, token);
      alert(res.data.message || 'Signed successfully!');
      const updated = await fetchDocuments(token);
      setDocuments(updated.data);
    } catch (err) {
      console.error('Sign failed:', err);
      alert(err.response?.data?.error || 'Failed to sign document');
    }
  };

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetchDocuments(token);
        setDocuments(res.data);
      } catch (err) {
        console.error('Failed to fetch documents', err);
      }
    };
    if (auth) loadDocuments();
  }, [auth]);

  if (!auth) {
    navigate('/login');
    return null;
  }

  const filteredDocs = documents.filter((doc) => {
    if (filter === 'signed') return doc.signed;
    if (filter === 'unsigned') return !doc.signed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-2xl rounded-3xl p-10 text-center mb-10 border-l-8 border-purple-400"
        >
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Hello, {auth.name} 🌟</h1>
          <span className="inline-block bg-purple-200 text-purple-900 text-sm font-bold px-5 py-1 rounded-full">
            Role: {auth.role}
          </span>
          <div className="flex justify-center gap-6 mt-6">
            <Link
              to="/upload"
              className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 transition text-white font-bold py-2 px-6 rounded-lg shadow-lg"
            >
              📤 Upload Document
            </Link>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg"
            >
              🚪 Logout
            </button>
          </div>
        </motion.div>

        <div className="flex justify-center gap-6 mb-8">
          {['all', 'signed', 'unsigned'].map((btn) => (
            <button
              key={btn}
              onClick={() => setFilter(btn)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition duration-300 shadow-md ${
                filter === btn
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {btn.charAt(0).toUpperCase() + btn.slice(1)}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow-2xl rounded-3xl p-8 border-t-8 border-yellow-300"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">📑 Your Documents</h2>
          {filteredDocs.length === 0 ? (
            <p className="text-gray-500 text-base">No documents found for this filter.</p>
          ) : (
            <ul className="space-y-6">
              {filteredDocs.map((doc) => (
                <motion.li
                  key={doc._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gradient-to-br from-white via-gray-50 to-gray-100 hover:shadow-xl transition rounded-2xl p-6 border border-gray-200"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex-1">
                      <p className="text-xl font-semibold text-gray-800">📄 {doc.title}</p>
                      <p className="text-sm text-gray-500">
                        🕒 Uploaded: {new Date(doc.createdAt).toLocaleString()}
                      </p>

                      {doc.signed ? (
                        <>
                          <p className="text-sm text-green-600 mt-2">
                            ✅ Signed on {new Date(doc.signedAt).toLocaleString()} by{' '}
                            {doc.signedBy?.name || 'Unknown'}
                          </p>
                          <a
                            href={`https://signature-app-h7lz.onrender.com/api/uploads/${doc.filename}`}
                            download
                            className="text-sm mt-1 inline-block text-blue-600 underline hover:text-blue-800"
                          >
                            📥 Download Signed PDF
                          </a>
                        </>
                      ) : (
                        <>
                          <p className="text-sm text-yellow-600 mt-2">⏳ Not signed yet</p>
                          {auth.role === 'Admin' && (
                            <button
                              onClick={() => handleSign(doc._id)}
                              className="mt-2 bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded-full text-sm font-semibold shadow"
                            >
                              ✍️ Sign
                            </button>
                          )}
                        </>
                      )}
                    </div>

                    <iframe
                      src={`http://localhost:5000/uploads/${doc.filename}`}
                      title="PDF Preview"
                      className="w-full md:w-64 h-52 mt-4 md:mt-0 border rounded-xl shadow-md"
                    />
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </div>
  );
}
