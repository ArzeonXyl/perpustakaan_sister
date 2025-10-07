// src/components/admin/Logout.jsx
import React from "react";

export default function Logout() {
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include", // penting supaya cookie JWT dihapus
      });

      const data = await res.json();
      console.log(data.message); // Logout berhasil

      // redirect ke halaman login frontend (Vite)
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout gagal:", err);
      alert("Logout gagal");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}
