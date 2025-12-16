// src/public/admin-socket.js
(function() {
  'use strict';
  
  // Cek apakah ini halaman Admin
  if (!window.location.pathname.startsWith('/admin')) return;

  // Cegah inisialisasi ganda
  if (window.isAdminSocketInit) return;
  window.isAdminSocketInit = true;

  console.log('🔌 Admin Socket Client Started');

  // Konek ke Server
  const socket = io(window.location.origin, {
    path: '/socket.io/',
    transports: ['websocket'] // Paksa pakai WebSocket biar cepat (Anti-Polling)
  });

  // Saat tersambung
  socket.on('connect', () => {
    console.log('✅ Connected to Server');
    socket.emit('joinAdminRoom');
  });

  // 🔥 SAAT ADA UPDATE DARI SERVER (src/socket.js)
  socket.on('dbUpdate', (data) => {
    console.log('🔔 Update received:', data);
    
    // Tampilkan notifikasi kecil
    showNotification(data.message || 'Data diperbarui');

    // Refresh halaman otomatis agar data di tabel berubah
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  });

  // Helper Notifikasi Kecil
  function showNotification(msg) {
    const div = document.createElement('div');
    div.style.cssText = 'position:fixed; bottom:20px; right:20px; background:#28a745; color:white; padding:15px; border-radius:5px; z-index:99999; box-shadow:0 2px 5px rgba(0,0,0,0.2); font-family:sans-serif;';
    div.innerText = msg;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
  }
})();