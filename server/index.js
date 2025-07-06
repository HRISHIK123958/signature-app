const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// ✅ Clean CORS config
app.use(cors({
  origin: 'https://docusi.netlify.app', // ✅ Only the final deployed Netlify domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ✅ Body parser and static files
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// ✅ Routes
const protectedRoutes = require('./routes/protected');
const authRoutes = require('./routes/auth');
const docsRoutes = require('./routes/docs');

app.use('/api', protectedRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/docs', docsRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
