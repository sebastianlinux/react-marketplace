import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, removeItem, updateQuantity } from './../redux/cartSlice';
import { RootState } from '../store';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  TextField,
  Button,
  Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close'
import { Link } from 'react-router-dom';
import Notify from './Notify';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  photoUrl: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const Cart: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => selectCartItems(state));

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
    Notify('Producto removido');
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <Box
        sx={{
          width: { xs: '100vw', sm: 400 }, // Ancho responsivo
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6">Carrito de compras</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {cartItems.length === 0 ? (
          <Typography variant="body1" sx={{ mt: 2 }}>
            No hay productos en el carrito.
          </Typography>
        ) : (
          <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
            <Grid container spacing={2}>
              {cartItems.map((item: CartItem) => (
                <Grid item xs={12} key={item.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 80, mr: 2, flexShrink: 0 }}>
                      <img
                        src={`${process.env.REACT_APP_API}/${item.photoUrl}`}
                        alt={item.name}
                        width="100%"
                      />
                    </Box>
                    <Box sx={{ flexGrow: 1, mr: 1 }}>
                      <Typography variant="subtitle1" noWrap>
                        {item.name}
                      </Typography>
                      <Typography variant="body2">Precio: ${item.price}</Typography>
                    </Box>
                    <TextField
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateQuantity(item.id, parseInt(e.target.value))
                      }
                      inputProps={{ min: 1 }}
                      sx={{ width: 60, ml: 0, mr: 1 }}
                    />
                    <IconButton onClick={() => handleRemoveItem(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        <Divider />

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Total: ${calculateTotal().toFixed(2)}</Typography>
          <Button
            component={Link}
            to={'/order-resume'}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Comprar
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Cart;