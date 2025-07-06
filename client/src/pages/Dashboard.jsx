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
    <div className="min-h-screen bg-gradient-to-r from-sky-100 via-blue-100 to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-2xl p-8 text-center mb-8"
        >
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {auth.name}</h1>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-4 py-1 rounded-full">
            Role: {auth.role}
          </span>
          <div className="flex justify-center gap-4 mt-6">
            <Link
              to="/upload"
              className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 px-6 rounded-md shadow"
            >
              Upload Document
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 transition text-white font-semibold py-2 px-6 rounded-md shadow"
            >
              Logout
            </button>
          </div>
        </motion.div>

        <div className="flex justify-center gap-4 mb-6">
          {['all', 'signed', 'unsigned'].map((btn) => (
            <button
              key={btn}
              onClick={() => setFilter(btn)}
              className={`px-4 py-2 rounded-full shadow-sm ${
                filter === btn
                  ? 'bg-indigo-600 text-white'
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
          className="bg-white shadow-xl rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Documents</h2>
          {filteredDocs.length === 0 ? (
            <p className="text-gray-500 text-sm">No documents found for this filter.</p>
          ) : (
            <ul className="space-y-6">
              {filteredDocs.map((doc) => (
                <motion.li
                  key={doc._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gray-50 hover:bg-gray-100 transition shadow rounded-lg p-4"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex-1">
                      <p className="text-lg font-medium text-gray-800">{doc.title}</p>
                      <p className="text-sm text-gray-500">
                        Uploaded: {new Date(doc.createdAt).toLocaleString()}
                      </p>

                      {doc.signed ? (
                        <>
                          <p className="text-sm text-green-600 mt-1">
                            ✅ Signed on {new Date(doc.signedAt).toLocaleString()} by{' '}
                            {doc.signedBy?.name || 'Unknown'}
                          </p>
                          <a
                            href={`http://localhost:5000/uploads/${doc.filename}`}
                            download
                            className="text-sm mt-1 inline-block text-blue-600 underline"
                          >
                            Download Signed PDF
                          </a>
                        </>
                      ) : (
                        <>
                          <p className="text-sm text-yellow-600 mt-1">⏳ Not signed yet</p>
                          {auth.role === 'Admin' && (
                            <button
                              onClick={() => handleSign(doc._id)}
                              className="mt-2 bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded text-sm shadow-sm"
                            >
                              Sign
                            </button>
                          )}
                        </>
                      )}
                    </div>

                    <iframe
                      src={`http://localhost:5000/uploads/${doc.filename}`}
                      title="PDF Preview"
                      className="w-full md:w-64 h-48 mt-4 md:mt-0 border rounded-md shadow"
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
