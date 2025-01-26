import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';


const LandingPage: React.FC = () => {
    const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const loremIpsumShort = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

    return (
        <div>
            <Navbar />
            <Hero
                title="Bienvenido a Nuestro Marketplace"
                description={loremIpsum}
                buttonText="Explorar Productos"
                imageUrl={''} // Reemplaza con tu imagen
            />

            <Container sx={{ py: 8 }}>
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                    Secciones Destacadas
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px', textAlign: 'center' }}>
                            <Typography variant="h6" component="h3" gutterBottom>
                                Sección 1
                            </Typography>
                            <Typography variant="body2">{loremIpsumShort}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px', textAlign: 'center' }}>
                            <Typography variant="h6" component="h3" gutterBottom>
                                Sección 2
                            </Typography>
                            <Typography variant="body2">{loremIpsumShort}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px', textAlign: 'center' }}>
                            <Typography variant="h6" component="h3" gutterBottom>
                                Sección 3
                            </Typography>
                            <Typography variant="body2">{loremIpsumShort}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default LandingPage;