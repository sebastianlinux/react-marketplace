import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom"; // Importa Link para la navegación
import RegisterDialog from "./RegisterDialog";
import LoginDialog from "./LoginDialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { logout } from './../redux/authSlice';
interface NavItem {
  label: string;
  path: string;
  action?: "register" | "login";
  show?: boolean;
}

const Navbar: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [viewRegisterDialog, setViewRegisterDialog] = useState<boolean>(false);
  const [viewLoginDialog, setViewLoginDialog] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  ); // Tipado con RootState


  const logoutUser = () => {
    dispatch(logout())
  }
  const pages: NavItem[] = [
    // Define las páginas de tu Navbar
    { label: "Inicio", path: "/", show: true },
    { label: "Productos", path: "/products", show: true },
    {
      label: "Iniciar sesión",
      path: "",
      action: "login",
      show: !isAuthenticated,
    },
    {
      label: "Registrarse",
      path: "",
      action: "register",
      show: !isAuthenticated,
    },
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenDialog = (action: "register" | "login") => {
    handleCloseNavMenu();
    if (action === "register") {
      setViewRegisterDialog(true);
    } else if (action === "login") {
      setViewLoginDialog(true);
    }
  };

  return (
    <>
      <RegisterDialog
        open={viewRegisterDialog}
        onClose={() => setViewRegisterDialog(false)}
      />
      <LoginDialog
        open={viewLoginDialog}
        onClose={() => setViewLoginDialog(false)}
      />
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" }, // Ocultar en pantallas pequeñas
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              TU MARKETPLACE
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              {" "}
              {/* Menú móvil */}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={() => handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages
                  .filter((p) => p.show)
                  .map((page) => (
                    <React.Fragment key={page.label}>
                      {page.path === "" ? (
                        <MenuItem
                          key={page.label}
                          onClick={() => {
                            handleOpenDialog(page.action || "login");
                          }}
                        >
                          <Typography textAlign="center">
                            {page.label}
                          </Typography>
                        </MenuItem>
                      ) : (
                        <MenuItem
                          key={page.label}
                          onClick={() => handleCloseNavMenu}
                          component={Link}
                          to={page.path}
                        >
                          <Typography textAlign="center">
                            {page.label}
                          </Typography>
                        </MenuItem>
                      )}
                    </React.Fragment>
                  ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" }, // Mostrar en pantallas pequeñas
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              TU MARKETPLACE
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {" "}
              {/* Menú de escritorio */}
              {pages
                .filter((p) => p.show)
                .map((page) => (
                  <React.Fragment key={page.label}>
                    {" "}
                    {/* Usar Fragment para evitar key prop error */}
                    {page.path === "" ? ( // Condición: si el path está vacío
                      <Button
                        onClick={() => {
                          handleOpenDialog(page.action || "login");
                        }} // Ejecuta la acción
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        {page.label}
                      </Button>
                    ) : (
                      // Si el path no está vacío
                      <Button
                        component={Link}
                        to={page.path}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        {page.label}
                      </Button>
                    )}
                  </React.Fragment>
                ))}
              {isAuthenticated && (
                <>
                <Button sx={{ my: 2, color: "white", display: "flex" }}>
                  <AccountCircleIcon />
                  {user?.name}
                </Button>
                <Button onClick={() => logoutUser()} sx={{ my: 2, color: "white", display: "block" }}>
                  Cerrar sesión
                </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
