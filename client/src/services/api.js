import axios from 'axios';

// Use deployed backend URL in production, fallback to localhost in development
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
});

// Auth
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

// Document Upload
export const uploadDocument = (formData, token) =>
  API.post('/docs/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });

// Fetch All Docs
export const fetchDocuments = (token) =>
  API.get('/docs', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Sign Document
export const signDocument = (id, token) =>
  API.post(`/docs/sign/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
