import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, removeItem, updateQuantity } from './../redux/cartSlice'; // Importa las acciones y el selector
import { RootState } from '../store'; // Importa RootState
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  TextField,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
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
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <Box sx={{ width: 400, padding: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Carrito de compras</Typography>
          <IconButton onClick={onClose}>
            <DeleteIcon />
          </IconButton>
        </Box>

        <Divider />

        {cartItems.length === 0 ? (
          <Typography variant="body1" sx={{ mt: 2 }}>
            No hay productos en el carrito.
          </Typography>
        ) : (
          <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
            {cartItems.map((item: CartItem) => (
              <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ width: 80, mr: 2 }}>
                  <img src={item.name} alt={item.name} width="100%" />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">{item.name}</Typography>
                  <Typography variant="body2">Precio: ${item.price}</Typography>
                </Box>
                <TextField
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                  inputProps={{ min: 1 }}
                  sx={{ width: 60, ml: 2 }}
                />
                <IconButton onClick={() => handleRemoveItem(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}

        <Divider />

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Total: ${calculateTotal().toFixed(2)}</Typography>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Comprar
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Cart;