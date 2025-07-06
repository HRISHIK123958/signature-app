import React, { useState } from 'react';
import { register } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User'
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(form);
      toast.success('🎉 Registration successful! Redirecting to login...', {
        position: 'top-center',
        autoClose: 2000,
      });
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-pink-100 to-yellow-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md"
      >
        <ToastContainer />
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          🎉 Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-700 font-medium mb-1">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your Name"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 font-medium mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-700 font-medium mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm text-gray-700 font-medium mb-1">Role</label>
            <select
              id="role"
              name="role"
              onChange={handleChange}
              value={form.role}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold py-3 rounded-lg shadow-md hover:brightness-110 transition"
          >
            ✍️ Register
          </button>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-center text-red-500"
            >
              {error}
            </motion.p>
          )}

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:underline font-medium">
              Login here
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
