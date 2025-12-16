// perpustakaan_frontend/src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, // Agar cookie refresh token tetap terkirim
});

// 👇 INTERCEPTOR PENTING: Sisipkan Token ke Header
api.interceptors.request.use((config) => {
  // Ambil token dari LocalStorage
  // Pastikan nama key-nya konsisten ('token' atau 'accessToken')
  const token = localStorage.getItem('token'); 
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 👇 INTERCEPTOR RESPONSE: Handle jika Token Expired (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Jika error 401 (Unauthorized) dan bukan di halaman login
    if (error.response && error.response.status === 401) {
      console.warn('Sesi habis, redirect ke login...');
      localStorage.removeItem('token'); // Hapus token lama
      window.location.href = '/login';  // Tendang ke login
    }
    return Promise.reject(error);
  }
);

export default api;