import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import LandingPage from "./pages/LandingPage";
import ProductsPage from "./pages/ProductsPage";
import ProfilePage from "pages/ProfilePage";
import AdminUsersPage from "pages/Admin/UsersPage";
import AdminUserProductPage from "pages/Admin/UserProduct";
import OrderResumePage from "pages/OrderResumePage";
import ProtectedRouteRole from "Middleware/ProtectedRouteRole";
import UnauthorizedPage from "pages/UnauthorizedPage";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/profile"
            element={
              <ProtectedRouteRole
                allowedRoles={["admin", "comprador", "vendedor"]}
                element={<ProfilePage />}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRouteRole
                allowedRoles={["admin", "comprador", "vendedor"]}
                element={<ProfilePage />}
              />
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRouteRole
                allowedRoles={["vendedor"]}
                element={<ProductsPage />}
              />
            }
          />

          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          <Route path="/products" element={<ProductsPage />} />
          <Route path="/order-resume" element={<OrderResumePage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route
            path="/admin/users/products/:userId"
            element={<AdminUserProductPage />}
          />
          {/*           <Route path="/product/:id" element={<ProductDetails />} /> {/* Ruta con parámetro }
          <Route path="*" element={<NotFound />} /> {/* Ruta para cualquier otra ruta (404) } */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
