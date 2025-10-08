// pages/peminjam/dashboard.jsx
import React from 'react';

const DashboardPeminjam = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard Peminjam</h1>
      <p style={styles.text}>Halaman ini sedang dalam tahap pengembangan.</p>
      <p style={styles.text}>Silakan kembali lagi nanti untuk melihat fitur lengkapnya.</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  text: {
    fontSize: '1rem',
    color: '#555',
  },
};

export default DashboardPeminjam;