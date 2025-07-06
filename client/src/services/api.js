import axios from 'axios';

// ✅ Only one instance
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
});

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

export const uploadDocument = (formData, token) =>
  API.post('/docs/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchDocuments = (token) =>
  API.get('/docs', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const signDocument = (id, token) =>
  API.post(`/docs/sign/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
