import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import RegisterDialog from './RegisterDialog';
import LoginDialog from './LoginDialog';

interface NavItem {
  label: string;
  path: string;
  action?: 'register' | 'login'; 
}

const Navbar: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [viewRegisterDialog, setViewRegisterDialog] = useState<boolean>(false)
  const [viewLoginDialog, setViewLoginDialog] = useState<boolean>(false)
  const pages: NavItem[] = [ // Define las páginas de tu Navbar
    { label: 'Inicio', path: '/' },
    { label: 'Productos', path: '/products' },
    { label: 'Iniciar sesión', path: '',action:'login'},
    { label: 'Registrarse', path: '', action:'register' },
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    
    setAnchorElNav(null);
  };

  const handleOpenDialog = (action: 'register' | 'login') => {
    handleCloseNavMenu();
    if (action === 'register') {
      setViewRegisterDialog(true);
    } else if (action === 'login') {
      setViewLoginDialog(true);
    }
  };


  return (
    <>
    
    <RegisterDialog open={viewRegisterDialog} onClose={() => setViewRegisterDialog(false)}
     onSubmit={function (userData: any): void {
        throw new Error('Function not implemented.');
      } } />
      <LoginDialog open={viewLoginDialog} onClose={ () => setViewLoginDialog(false) }
       onSubmit={function (userData: { email: string; password: string; }): void {
        throw new Error('Function not implemented.');
      } } />
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' }, // Ocultar en pantallas pequeñas
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TU MARKETPLACE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}> {/* Menú móvil */}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <React.Fragment key={page.label}>
                  {page.path === '' ?
                  (
                  <MenuItem key={page.label}   onClick={() => {handleOpenDialog(page.action || 'login');}}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
                  ) 
                  :(
                    <MenuItem key={page.label} onClick={() => handleCloseNavMenu} component={Link} to={page.path}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                  )}
                </React.Fragment>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' }, // Mostrar en pantallas pequeñas
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TU MARKETPLACE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}> {/* Menú de escritorio */}
            {pages.map((page) => (
            <React.Fragment key={page.label}> {/* Usar Fragment para evitar key prop error */}
            {page.path === '' ? ( // Condición: si el path está vacío
              <Button
                onClick={() => {handleOpenDialog(page.action || 'login');}} // Ejecuta la acción
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ) : ( // Si el path no está vacío
              <Button
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            )}
          </React.Fragment>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
};

export default Navbar;