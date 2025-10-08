import { useState } from "react";
import api from "../services/api";
import { Eye, EyeOff, Home } from 'lucide-react'; // Impor ikon mata dan home
import { useNavigate } from 'react-router-dom'; // Impor useNavigate untuk navigasi programatik

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State baru untuk toggle password
  const navigate = useNavigate(); // Inisialisasi hook useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Kirim body:", { email, password });

      const res = await api.post("/login", { email, password }, {
        withCredentials: true, // penting agar cookie dikirim ke backend
      });

      console.log("Response:", res.data);

      const { role, redirect, user } = res.data;

      // Simpan info user di localStorage (opsional)
      localStorage.setItem("userRole", role);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userName", user.name);

      // Redirect sesuai role
      if (redirect) {
        window.location.href = redirect; // Menggunakan window.location.href untuk hard refresh
      } else {
        switch (role) {
          case "admin":
            navigate("/admin"); // Menggunakan navigate untuk SPA
            break;
          case "peminjam":
            navigate("/peminjam/dashboard"); // Menggunakan navigate untuk SPA
            break;
          default:
            navigate("/dashboard"); // Menggunakan navigate untuk SPA
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
      
      {/* Kolom Email */}
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

      {/* Kolom Password dengan Toggle Ikon Mata */}
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"} // Mengubah tipe input
            placeholder="Masukkan password Anda"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" // pr-10 untuk space ikon
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button" // Penting: type="button" agar tidak submit form
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
        className="w-full bg-blue-700 text-white font-semibold py-3 rounded-lg hover:bg-blue-800  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Login
      </button>

      {/* Tombol Kembali ke Beranda */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="w-full bg-transparant py-3 mt-3 text-gray-800/50"
      >
        Kembali ke Beranda
      </button>

      {/* Teks "Belum memiliki akun?" dengan link Daftar Sekarang */}
      <p className="mt-6 text-center text-gray-600 text-sm">
        Belum memiliki akun? {" "}
        <a 
          href="/register" // Arahkan ke halaman register
          className="text-blue-700 hover:text-blue-800 font-semibold transition duration-300"
        >
          Daftar sekarang
        </a>
      </p>
    </form>
  );
}