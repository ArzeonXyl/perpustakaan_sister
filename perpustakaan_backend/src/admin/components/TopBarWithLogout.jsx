import React from 'react';
import { Box, Button, Icon, Text } from '@adminjs/design-system';

const TopBarWithLogout = ({ toggleSidebar }) => {
  const handleLogout = () => {
    // HARD REDIRECT → cocok untuk AdminJS
    window.location.href = 'http://localhost:3000/api/logout';
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
      style={{ height: '64px' }}
    >
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
