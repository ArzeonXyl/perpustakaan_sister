import { useState } from "react";
import api from "../services/api";
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Kirim body:", { email, password });

      const res = await api.post("/login", { email, password }, {
        withCredentials: true,
      });

      console.log("Response:", res.data);

      const { token, role, redirect, user } = res.data;

      // ✅ Simpan token untuk PrivateRoute
      localStorage.setItem("token", token);

      // ✅ Simpan info user (opsional)
      localStorage.setItem("userRole", role);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userName", user.name);

      // ✅ Redirect sesuai role
      if (redirect) {
        navigate(redirect);
      } else {
        switch (role) {
          case "admin":
            navigate("/admin");
            break;
          case "peminjam":
            navigate("/peminjam/dashboard");
            break;
          default:
            navigate("/dashboard");
        }
      }

    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.error || "Login gagal");
    }
  };

  return (
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
        className="w-full bg-blue-700 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Login
      </button>

      {/* Tombol Kembali */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="w-full py-3 mt-3 text-gray-800/50"
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
  );
}