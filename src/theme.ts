
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Un azul de ejemplo, cámbialo a tu color primario
    },
    secondary: {
      main: '#dc004e', // Un rosa de ejemplo, cámbialo a tu color secundario
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Fuente predeterminada
  },
});

export default theme;