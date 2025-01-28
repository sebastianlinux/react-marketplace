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
  userId: string; // Recibe el ID del usuario para filtrar los productos
}

const ProductList: React.FC<ProductListProps> = ({ userId }) => {
  
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
    return <Typography variant="body1">No hay productos disponibles.</Typography>;
  }

  return (
    <Grid container spacing={2}> {/* Usa Grid para el diseño */}

    <Box sx={{ width: '90%', margin: '0 auto', paddingTop:'4rem' }}>
 
      {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}> {/* Diseño responsive */}
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