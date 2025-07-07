const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express(); // ✅ Initialize app before use()

// Middleware
app.use(cors());
app.use(express.json());
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const protectedRoutes = require('./routes/protected');
const authRoutes = require('./routes/auth');
const docsRoutes = require('./routes/docs'); // ✅ Move this after app init

app.use('/api', protectedRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/docs', docsRoutes); // ✅ Safe to use now

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
