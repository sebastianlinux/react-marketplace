import * as React from 'react';
import { Box, Typography, Container, Grid, Link } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5', 
        padding: (theme) => theme.spacing(6, 0),
        position: 'relative', 
        bottom: 0, 
        width: '100%', 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Acerca de nosotros
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Somos una tienda virtual dedicada a ofrecer productos de alta calidad y un excelente servicio al cliente.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Información
            </Typography>
            <Link href="#" color="inherit" underline="hover">
              Contacto
            </Link><br />
            <Link href="#" color="inherit" underline="hover">
              Preguntas frecuentes
            </Link><br />
            <Link href="#" color="inherit" underline="hover">
              Envío y devoluciones
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Síguenos
            </Typography>
            <Link href="#" color="inherit" underline="hover">
              Facebook
            </Link><br />
            <Link href="#" color="inherit" underline="hover">
              Instagram
            </Link><br />
            <Link href="#" color="inherit" underline="hover">
              Twitter
            </Link>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Derechos de autor &copy; {new Date().getFullYear()} Tu Tienda Virtual
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;