import React from "react";
import Logout from "../../components/admin/Logout";

export default function AdminDashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Logout />
    </div>
  );
}
