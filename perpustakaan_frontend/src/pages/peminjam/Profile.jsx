import React, { useEffect, useState } from 'react';
import { User, Mail, Shield, Camera } from 'lucide-react';

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>Gagal memuat profil pengguna.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Background */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
              <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-gray-400 relative overflow-hidden">
                <User size={40} />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors cursor-pointer flex items-center justify-center group">
                  <Camera size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 pb-8 px-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-gray-500">{profile.email}</p>
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
              {profile.role}
            </span>
          </div>

          <div className="grid gap-6 mt-8">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm text-blue-600">
                <User size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Nama Lengkap</p>
                <p className="text-gray-900 font-medium">{profile.name}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm text-blue-600">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Alamat Email</p>
                <p className="text-gray-900 font-medium">{profile.email}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm text-blue-600">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Status Akun</p>
                <p className="text-gray-900 font-medium capitalize">{profile.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}