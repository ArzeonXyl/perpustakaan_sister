import { useState } from "react";
import api from "../services/api";
import { useNavigate } from 'react-router-dom'; 

export default function RegisterForm() {
  const [form, setForm] = useState({
    nik: "",
    telepon: "",
    email: "",
    nama: "",
    gender: "L",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", form);
      alert("Register sukses!");
      console.log(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Register gagal");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <input type="text" name="nik" placeholder="NIK" className="w-full p-2 mb-4 border rounded" value={form.nik} onChange={handleChange} required />
      <input type="text" name="telepon" placeholder="Telepon" className="w-full p-2 mb-4 border rounded" value={form.telepon} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" value={form.email} onChange={handleChange} required />
      <input type="text" name="nama" placeholder="Nama" className="w-full p-2 mb-4 border rounded" value={form.nama} onChange={handleChange} required />
      <select name="gender" className="w-full p-2 mb-4 border rounded" value={form.gender} onChange={handleChange}>
        <option value="L">Laki-laki</option>
        <option value="P">Perempuan</option>
      </select>
      <input type="password" name="password" placeholder="Password" className="w-full p-2 mb-6 border rounded" value={form.password} onChange={handleChange} required />
      <button type="submit"  className="w-full bg-blue-700 text-white font-semibold py-3 rounded-lg hover:bg-blue-800  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
        Register
      </button>
      <button
          type="button" // Tetap type="button" agar tidak submit form
          onClick={() => navigate('/')}
          className="w-full bg-transparent text-gray-600/50 py-3 mt-3 rounded-lg 
                     transition duration-300 flex items-center justify-center gap-2"
      >
          Kembali ke Beranda
      </button>
      <p className="mt-6 text-center text-gray-600 text-sm">
        Sudah memiliki akun? {" "}
        <a 
          href="/login" // Arahkan ke halaman register
          className="text-blue-700 hover:text-blue-800 font-semibold transition duration-300"
        >
          Login sekarang
        </a>
      </p>
    </form>
  );
}
