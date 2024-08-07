'use client';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const navbarStyle = {
  background: 'linear-gradient(120deg, #ecf665 0%, #fd8585e2 100%)',
  backgroundSize: '200% 200%',
  animation: 'gradientAnimation 10s ease infinite',
};

const NavBar = ({ handleLogout, hideRecipeGenerator }) => {
  const router = useRouter();

  return (
    <AppBar position="static" sx={navbarStyle}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'black' }}>
          Inventory Management
        </Typography>
        {!hideRecipeGenerator && (
          <Button
            color="inherit"
            sx={{ color: 'black' }}
            onClick={() => router.push('/recipe-generator')}
          >
            Recipe Generator
          </Button>
        )}
        <Button color="inherit" sx={{ color: 'black' }} onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
