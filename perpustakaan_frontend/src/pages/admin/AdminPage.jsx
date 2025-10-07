// src/pages/AdminPage.jsx
import LogoutButton from "../components/admin/LogoutButton";

export default function AdminPage() {
  const name = localStorage.getItem("userName");
  const email = localStorage.getItem("userEmail");

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <p className="mb-2">Welcome, <strong>{name}</strong> ({email})</p>
      <LogoutButton />
    </div>
  );
}