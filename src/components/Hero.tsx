import React from 'react';
import { Box, Typography, Container } from '@mui/material';
 
interface HeroProps {
  title: string;
  description: string;
  onButtonClick?: () => void;
  imageUrl?: string;
}

const Hero: React.FC<HeroProps> = ({ title, description, imageUrl }) => {


  return (
    <Box
      sx={{
        pt: 8,
        pb: 6,
        bgcolor: 'white',
        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: imageUrl ? 'white' : 'inherit',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '40vh',
      }}
    >
      <Container maxWidth="md">
        <Typography component="h1" variant="h2" align="center" gutterBottom sx={{ textShadow: imageUrl ? '2px 2px 4px #000000' : 'none' }}>
          {title}
        </Typography>
        <Typography variant="h5" align="center" paragraph sx={{ textShadow: imageUrl ? '2px 2px 4px #000000' : 'none' }}>
          {description}
        </Typography>
      {/*   {buttonText &&  (
          <Box sx={{ mt: 4 }}>
            <Button component={Link} to={'/products'} variant="contained" color="primary" onClick={onButtonClick}>
              {buttonText}
            </Button>
          </Box>
        )} */}
      </Container>
    </Box>
  );
};

export default Hero;