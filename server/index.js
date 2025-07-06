const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express(); // ✅ Step 1: Initialize app

// ✅ Step 2: Add CORS middleware BEFORE routes
app.use(cors({
  origin: [
    'https://docusi.netlify.app',
    'https://686a58b1deea217cb5beb051--docusi.netlify.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.options('*', cors());
// ✅ Step 3: Body parser and static files
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// ✅ Step 4: Routes
const protectedRoutes = require('./routes/protected');
const authRoutes = require('./routes/auth');
const docsRoutes = require('./routes/docs');

app.use('/api', protectedRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/docs', docsRoutes);

// ✅ Step 5: Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Step 6: Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
