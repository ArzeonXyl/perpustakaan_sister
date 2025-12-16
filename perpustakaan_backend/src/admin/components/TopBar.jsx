// src/admin/components/TopBar.jsx
import React from 'react';
import { Box, H2, Text } from '@adminjs/design-system';

const TopBar = () => {
  return (
    <Box 
      bg="white" 
      p="xl" 
      mb="xl" 
      style={{ 
        borderBottom: '1px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}
    >
      <H2 style={{ margin: 0 }}>
        📚 Sistem Perpustakaan
      </H2>
      <Text color="grey60" style={{ marginTop: '8px' }}>
        Admin Dashboard - Kelola Peminjaman Buku
      </Text>
    </Box>
  );
};

export default TopBar;