import React, { useEffect, useState } from 'react';
import { ApiClient } from 'adminjs';
import { 
  Box, 
  H1, 
  H2, 
  H3, 
  Text, 
  Icon,
  Badge,
  Loader
} from '@adminjs/design-system';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const api = new ApiClient();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.getPage({ pageName: 'stats' });
      if (response.data && response.data.stats) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('❌ Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box p="xxl" flex justifyContent="center" alignItems="center" flexDirection="column" height="50vh">
        <Loader />
        <Text mt="lg" color="grey60">Sedang memuat data...</Text>
      </Box>
    );
  }

  if (!stats) {
     return (
        <Box p="xxl">
           <Text>Gagal memuat data statistik.</Text>
        </Box>
     );
  }

  // Komponen Card Sederhana menggunakan Box
  const InfoCard = ({ title, value, subtitle, color, badge }) => (
    <Box 
      variant="white" 
      boxShadow="card" 
      p="lg" 
      borderRadius="default"
      mb="lg" // Margin bottom agar aman di mobile
    >
      <H3 mb="sm">{title}</H3>
      <Box flex alignItems="center">
        <H1 style={{ color: color || 'inherit', marginRight: '8px' }}>
          {value}
        </H1>
        {badge && <Badge variant="danger">{badge}</Badge>}
      </Box>
      <Text color="grey60" variant="sm">{subtitle}</Text>
    </Box>
  );

  return (
    <Box p="xxl">
      <H1>📊 Dashboard Perpustakaan</H1>
      <Text color="grey60" mb="xxl">
        Ringkasan aktivitas dan statistik sistem perpustakaan
      </Text>

      {/* --- GRID UTAMA (Manual Grid dengan CSS Grid) --- */}
      <Box 
        display="grid" 
        gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr 1fr']} 
        gridGap="lg" 
        mb="xxl"
      >
        <InfoCard 
          title="📚 Total Buku" 
          value={stats.total_books || 0} 
          subtitle="Judul tersedia" 
        />
        <InfoCard 
          title="👥 Anggota" 
          value={stats.total_members || 0} 
          subtitle="Peminjam aktif" 
        />
        <InfoCard 
          title="⏳ Pending" 
          value={stats.pending_borrowings || 0} 
          subtitle="Menunggu persetujuan" 
          color="#f39c12"
        />
        <InfoCard 
          title="⚠️ Terlambat" 
          value={stats.late_borrowings || 0} 
          subtitle="Peminjaman telat" 
          color="#e74c3c"
        />
      </Box>

      {/* --- GRID KEUANGAN --- */}
      <Box 
        display="grid" 
        gridTemplateColumns={['1fr', '1fr 1fr']} 
        gridGap="lg" 
        mb="xxl"
      >
        <InfoCard 
          title="💰 Denda Belum Dibayar" 
          value={`Rp${(stats.total_unpaid_amount || 0).toLocaleString('id-ID')}`} 
          subtitle="Total tagihan aktif" 
          color="#e74c3c"
          badge={`${stats.unpaid_fines || 0} transaksi`}
        />
        <InfoCard 
          title="✅ Denda Dibayar" 
          value={`Rp${(stats.total_paid_amount || 0).toLocaleString('id-ID')}`} 
          subtitle="Total pemasukan denda" 
          color="#27ae60"
        />
      </Box>
      
      {/* --- STATUS CEPAT --- */}
      <Box variant="white" boxShadow="card" p="lg" borderRadius="default">
        <H2 mb="lg">⚡ Status Cepat</H2>
        <Box display="grid" gridTemplateColumns={['1fr', '1fr']} gridGap="lg">
           <Box>
              <Text fontWeight="bold"><Icon icon="Clock" /> Menunggu:</Text>
              <Text>{stats.pending_borrowings || 0} Request</Text>
           </Box>
           <Box>
              <Text fontWeight="bold"><Icon icon="AlertCircle" /> Telat:</Text>
              <Text>{stats.late_borrowings || 0} Buku</Text>
           </Box>
        </Box>
      </Box>

    </Box>
  );
};

export default Dashboard;