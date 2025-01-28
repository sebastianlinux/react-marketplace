import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainLayout from "Layouts/MainLayout";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Redirige al usuario a la página principal
  };

  return (
    <>
      <MainLayout>
        <Container maxWidth="md">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "80vh",
            }}
          >
            <Typography variant="h4" gutterBottom>
              No autorizado
            </Typography>
            <Typography variant="body1" align="center">
              No tienes los permisos necesarios para acceder a esta página.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleGoHome}
            >
              Ir a la página principal
            </Button>
          </Box>
        </Container>
      </MainLayout>
    </>
  );
};

export default UnauthorizedPage;
