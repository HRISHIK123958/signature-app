// server/index.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();

// ✅ CORS config to allow Netlify frontend
app.use(
  cors({
    origin: [
      'https://docusi.netlify.app', // your Netlify custom domain (if added)
      'https://686a4e23adb0e68f3cd412e9--docusi.netlify.app', // Netlify preview URL
    ],
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Routes
const authRoutes = require('./routes/auth');
const docsRoutes = require('./routes/docs');
const protectedRoutes = require('./routes/protected');

app.use('/api/auth', authRoutes);
app.use('/api/docs', docsRoutes);
app.use('/api', protectedRoutes);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
