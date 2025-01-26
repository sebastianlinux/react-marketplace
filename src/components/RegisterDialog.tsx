import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

interface RegisterDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (userData: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    userType: string;
  }) => void;
}

const RegisterDialog: React.FC<RegisterDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
  });
  const [errors, setErrors] = useState({} as any);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setFormData({ ...formData, userType: event.target.value }); // Acceso directo a event.target.value
    setErrors({ ...errors, userType: "" });
  };

  const validateForm = () => {
    let newErrors: any = {};

    if (!formData.username) {
      newErrors.username = "El nombre completo es requerido";
    }

    if (!formData.email) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Formato de correo electrónico inválido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!formData.userType) {
      newErrors.userType = "Debe seleccionar un tipo de usuario";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      handleClose();
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "",
      });
      setErrors({});
    }
  };

  const handleClose = () => {
    onClose();
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "",
    });
    setErrors({});
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Registro de usuario</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* Selector de tipo de usuario */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="user-type-label">Tipo de usuario</InputLabel>
              <Select
                labelId="user-type-label"
                id="userType"
                name="userType"
                value={formData.userType}
                label="Tipo de usuario"
                onChange={handleSelectChange}
                error={!!errors.userType}
              >
                <MenuItem value="comprador">Comprador</MenuItem>
                <MenuItem value="vendedor">Vendedor</MenuItem>
              </Select>
              {errors.userType && (
                <Typography variant="caption" color="error">
                  {errors.userType}
                </Typography>
              )}
            </FormControl>
          </Grid>
          {/* Campos de texto */}
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              name="username"
              label="Nombre completo"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.username}
              onChange={handleInputChange}
              error={!!errors.username}
              helperText={errors.username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="email"
              name="email"
              label="Correo electrónico"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              fullWidth
              variant="outlined"
              value={formData.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirmar contraseña"
              type="password"
              fullWidth
              variant="outlined"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>Registrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterDialog;
