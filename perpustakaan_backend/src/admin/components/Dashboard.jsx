import React from 'react';
import { Box, Text } from '@adminjs/design-system';

const Dashboard = () => {
  return (
    <Box variant="grey">
      <Text fontSize={24} mb="lg">Selamat datang di Admin Panel</Text>
      <form method="POST" action="/api/logout">
        <button type="submit" style={{
          padding: '10px 20px',
          backgroundColor: '#d9534f',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer'
        }}>
          Logout
        </button>
      </form>
    </Box>
  );
};

export default Dashboard;