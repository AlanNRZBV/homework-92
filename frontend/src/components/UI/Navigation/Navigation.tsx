import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { selectUser } from '../../../features/Users/usersSlice.ts';
import { useAppSelector } from '../../../app/hooks.ts';
import UserMenu from './UserMenu.tsx';
import AnonymousMenu from './AnonymousMenu.tsx';

const Navigation = () => {
  const user = useAppSelector(selectUser);
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          to="/"
          component={NavLink}
          variant="h6"
          color="white"
          sx={{ mr: 'auto', textDecoration: 'none' }}
        >
          Spotify
        </Typography>
        <Box display="flex" alignItems="center">
          <Button
            to="/"
            component={NavLink}
            color="success"
            variant="contained"
            sx={{ mr: 2 }}
          >
            Home
          </Button>
          {user ? <UserMenu user={user} /> : <AnonymousMenu />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
