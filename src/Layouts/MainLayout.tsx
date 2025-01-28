import React from 'react';
import { AppBar, Box } from '@mui/material';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';


interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
 
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      <AppBar position="static">
        <Navbar /> {/* Renderiza el componente Navbar */}
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children} {/* Renderiza el contenido de la página */}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;

 