import React from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Paper,
  Button,
  Box,
} from '@mui/material';
import { useSelector } from 'react-redux'; // Importa useSelector
import { RootState } from './../store'; // Importa RootState
import { selectCartItems } from './../redux/cartSlice'; // Importa el selector del carrito
import MainLayout from 'Layouts/MainLayout';
import Decimal from 'decimal.js';

const OrderResumePage = () => {
  // Obtiene los productos del carrito desde Redux usando el selector
  const cartItems = useSelector((state: RootState) => selectCartItems(state));
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  // Calcula el total de la compra
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Datos de ejemplo de la dirección de envío y método de pago (reemplaza con datos reales)
  const shippingAddress = {
    street: 'Calle 123',
    city: 'Ciudad Ejemplo',
    state: 'Estado Ejemplo',
    zip: '12345',
  };
  const paymentMethod = 'Tarjeta de crédito';

  return (
    <MainLayout >


 
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Resumen de la compra
        </Typography>

        {/* Detalles de los productos */}
        <Typography variant="h6" gutterBottom>
          Productos
        </Typography>
        <List disablePadding>
          {cartItems.map((item, index) => ( // Usa cartItems en lugar de order.items
            <React.Fragment key={index}>
              <ListItem sx={{ py: 1 }}>
              <Box sx={{ mr: 2 }}> {/* Contenedor para la imagen */}
                  <img src={`${process.env.REACT_APP_API}/${item.photoUrl}`} alt={item.name} width="80" /> {/* Muestra la imagen */}
                </Box>
                <ListItemText
                  primary={item.name}
                  secondary={`${item.quantity} x $${item.price} = $${item.quantity * item.price}`}
                />
              </ListItem>
              {index < cartItems.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>

        {/* Dirección de envío */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Dirección de envío
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>{shippingAddress.street}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>{shippingAddress.city}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>{shippingAddress.state}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>{shippingAddress.zip}</Typography>
          </Grid>
        </Grid>

        {/* Método de pago */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Método de pago
        </Typography>
        <Typography>{paymentMethod}</Typography>


        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Total
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          ${new Decimal(calculateTotal()).toFixed(2)} 
        </Typography>


        {isAuthenticated ? 
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button variant="contained" color="primary">
                Confirmar compra
            </Button>
            </Box>
        :
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, fontWeight:'bold' }}>
            Por favor inicia sesion para continuar con la compra
        </Box>
    }
      </Paper>
    </Container>
    </MainLayout>
  );
};

export default OrderResumePage;