import { Box, Button } from '@adminjs/design-system';

const LogoutButton = () => {
  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
    window.location.href = '/login';
  };

  return (
    <Box>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default LogoutButton;