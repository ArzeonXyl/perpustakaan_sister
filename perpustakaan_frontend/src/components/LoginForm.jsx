import { useState } from "react";
import api from "../services/api";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Kirim body:", { email, password });
      const res = await api.post("/login", { email, password });
      console.log("Response:", res.data);

      console.log(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Login gagal");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <input type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" className="w-full p-2 mb-6 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
        Login
      </button>
    </form>
  );
}
