import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Button,
} from '@mui/material'; // Importaciones de Material UI
import { Product } from 'types';
import APIService from 'services/Api';

interface ProductListProps {
  products: Product[]
  loading: boolean
}

const ProductList: React.FC<ProductListProps> = ({ products,loading }) => {
  
  const [error, setError] = useState<string | null>(null);
/*
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await APIService.productListByUser(userId);
        if (result?.status && result.data) {
          setProducts(result.data);
        } else {
          setError(result?.message || 'Error desconocido al obtener productos.');
        }
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError('Error al conectar con el servidor.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [userId]); // El useEffect se ejecuta cuando cambia el userId
  
  */
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}> {/* Centrado */}
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!products || products.length === 0) {
    return <Typography sx={{width:'w-full',margin:'0 auto',textAlign:'center'}} variant="body1">No hay productos disponibles.</Typography>;
  }

  return (
    <Grid container spacing={2}> 
    <Box sx={{ width: '90%', margin: '0 auto', paddingTop:'4rem' }}>
 
      {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>  
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={`${process.env.REACT_APP_API}/${product.photoUrl}`}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                  <Typography variant="body1" color="text.primary">
                      Precio: ${product.price}
                  </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Box>
    </Grid>
  );
};

export default ProductList;