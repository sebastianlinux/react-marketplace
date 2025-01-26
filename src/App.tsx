
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import LandingPage from './pages/LandingPage';
//import ProductDetails from './pages/ProductDetails'; // Importa tus componentes de página
//import NotFound from './pages/NotFound'; // Componente para rutas no encontradas

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter> {/* Envuelve la aplicación con BrowserRouter */}
        <Routes> {/* Define las rutas */}
          <Route path="/" element={<LandingPage />} /> {/* Ruta para la página de inicio */}
{/*           <Route path="/product/:id" element={<ProductDetails />} /> {/* Ruta con parámetro }
          <Route path="*" element={<NotFound />} /> {/* Ruta para cualquier otra ruta (404) } */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;