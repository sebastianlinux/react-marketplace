
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import LandingPage from './pages/LandingPage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from 'pages/ProfilePage';
import AdminUsersPage from 'pages/Admin/UsersPage';
import AdminUserProductPage from 'pages/Admin/UserProduct';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/profile" element={<ProfilePage />} /> 
        <Route path="/products" element={<ProductsPage />} /> 
        <Route path="/admin/users" element={<AdminUsersPage />} /> 
        <Route path="/admin/users/products" element={<AdminUserProductPage />} /> 
{/*           <Route path="/product/:id" element={<ProductDetails />} /> {/* Ruta con parámetro }
          <Route path="*" element={<NotFound />} /> {/* Ruta para cualquier otra ruta (404) } */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;