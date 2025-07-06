const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// ✅ Use proper CORS setup before any routes
app.use(cors({
  origin: ['https://docusi.netlify.app', 'https://686a5705f7db23db98135bae--docusi.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

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
