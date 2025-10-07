// src/components/LogoutButton.jsx
import api from "../services/api";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await api.post("/logout", {}, { withCredentials: true });

      // Bersihkan localStorage (opsional)
      localStorage.removeItem("userRole");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");

      // Redirect ke login
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout error:", err);
      alert("Gagal logout");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}