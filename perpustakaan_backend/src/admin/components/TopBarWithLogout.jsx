import React from 'react';
import { Box, Button, Icon, Text } from '@adminjs/design-system';

const TopBarWithLogout = (props) => {
  // AdminJS memberikan fungsi 'toggleSidebar' lewat props
  const { toggleSidebar } = props;

  const handleLogout = () => {
    // Arahkan ke endpoint logout backend kamu
    window.location.href = '/api/auth/logout'; 
  };

  return (
    <Box
      flex
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      px="xl"
      py="lg"
      bg="white"
      borderBottom="default"
      style={{ height: '64px' }} // Jaga tinggi agar layout rapi
    >
      {/* Bagian Kiri: Tombol Sidebar & Judul */}
      <Box flex flexDirection="row" alignItems="center">
        <Button 
          variant="text" 
          onClick={toggleSidebar} 
          mr="lg" 
          type="button"
        >
          <Icon icon="Menu" />
        </Button>
        
        <Text variant="lg" fontWeight="bold">
          IFNO Perpustakaan
        </Text>
      </Box>

      {/* Bagian Kanan: Tombol Logout */}
      <Box>
        <Button 
          variant="danger" 
          size="sm"
          onClick={handleLogout}
          type="button"
        >
          <Icon icon="LogOut" /> Logout
        </Button>
      </Box>
    </Box>
  );
};

export default TopBarWithLogout;