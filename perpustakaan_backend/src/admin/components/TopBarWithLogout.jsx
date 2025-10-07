import React from 'react';
import { TopBar, Button } from '@adminjs/design-system';

const TopBarWithLogout = (props) => {
  return (
    <TopBar {...props}>
      <form method="POST" action="/api/logout" style={{ display: 'inline' }}>
        <Button
          variant="danger"
          size="sm"
          type="submit"
          ml="default"
        >
          Logout
        </Button>
      </form>
    </TopBar>
  );
};

export default TopBarWithLogout;