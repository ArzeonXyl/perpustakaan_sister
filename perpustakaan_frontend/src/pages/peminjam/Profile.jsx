import React, { useEffect, useState } from 'react';
import { User, Mail, Shield } from 'lucide-react';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error('❌ Gagal ambil profil:', err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading profil...</p>;
  if (!profile) return <p className="text-center mt-10 text-red-500">Gagal memuat profil.</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Profil Pengguna</h1>

      <div className="flex items-center gap-3 mb-3">
        <User className="text-blue-600" />
        <p className="text-gray-700 text-sm">
          <strong>Nama:</strong> {profile.name}
        </p>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <Mail className="text-blue-600" />
        <p className="text-gray-700 text-sm">
          <strong>Email:</strong> {profile.email}
        </p>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <Shield className="text-blue-600" />
        <p className="text-gray-700 text-sm">
          <strong>Role:</strong> {profile.role}
        </p>
      </div>
    </div>
  );
}