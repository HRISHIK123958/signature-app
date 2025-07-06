import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login({ setAuth }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login(form);
      localStorage.setItem('token', res.data.token);
      setAuth(res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">🔐 Login to SignDoc</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:brightness-110 text-white font-semibold py-3 rounded-lg transition shadow"
          >
            🚀 Login
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
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
