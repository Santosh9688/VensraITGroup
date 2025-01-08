// src/config/api.js
const API_URL = process.env.NODE_ENV === 'production'
    ? 'https://vensraitgroup.onrender.com'  // Production backend URL
    : 'http://localhost:5000';              // Development backend URL

export default API_URL;