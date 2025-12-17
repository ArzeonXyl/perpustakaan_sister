import { useState } from "react";
// 👇 Pastikan path ini sesuai dengan lokasi file api.js kamu
import api from "../services/api"; 
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_BASE_URL } from '@/utils/config';

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Kirim request login
      const res = await api.post("/login", { email, password });

      console.log("Login Success:", res.data);

      // 2. Ambil data dari response backend
      // Backend mengirim: { token, role, user, redirect, message }
      const { token, role, user, redirect } = res.data;

      // 3. 🚨 SIMPAN TOKEN (Wajib untuk User Frontend)
      // Ini yang akan dibaca oleh interceptor di services/api.js
      if (token) {
        localStorage.setItem("token", token);
      }

      // 4. Simpan data user lainnya (Opsional, buat UI/Profile)
      if (user) {
        localStorage.setItem("userRole", role);
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userEmail", user.email);
      }

      // 5. Redirect User sesuai Role/Response
      // Alert sukses bisa dihapus jika ingin langsung pindah
      // alert("Login Berhasil!");

      if (redirect) {
        navigate(redirect);
      } else {
        // Fallback redirect manual jika backend tidak kirim properti 'redirect'
        switch (role) {
          case "admin":
            // Jika admin login di frontend user, arahkan ke dashboard admin
            // Pastikan URL-nya benar (biasanya beda port atau path)
            window.location.replace = `${BACKEND_BASE_URL}/admin`;
            return;
          case "peminjam":
            navigate("/dashboard"); // Atau halaman histori
            break;
          default:
            navigate("/");
        }
      }

    } catch (err) {
      console.error("Login error:", err);
      const errorMsg = err.response?.data?.error || "Terjadi kesalahan saat login";
      alert(errorMsg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Login ke RumaBaca</h2>

        {/* Email */}
        <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
            id="email"
            type="email"
            placeholder="Masukkan email Anda"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </div>

        {/* Password */}
        <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <div className="relative">
            <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password Anda"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            </div>
        </div>

        {/* Tombol Login */}
        <button
            type="submit"
            className="w-full bg-blue-700 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
        >
            Login
        </button>

        {/* Tombol Kembali */}
        <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full py-3 mt-3 text-gray-600 hover:text-gray-800 text-sm"
        >
            Kembali ke Beranda
        </button>

        {/* Link Register */}
        <p className="mt-6 text-center text-gray-600 text-sm">
            Belum memiliki akun?{" "}
            <a
            href="/register"
            className="text-blue-700 hover:text-blue-800 font-semibold transition duration-300"
            >
            Daftar sekarang
            </a>
        </p>
        </form>
    </div>
  );
}