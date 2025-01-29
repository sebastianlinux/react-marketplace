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
  Box,
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

import APIService from "services/Api";
import Notify from "./Notify";
import { ToastContainer } from "react-toastify";
import { User } from "../types";
import {  AppDispatch } from './../store';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './../redux/authSlice'
interface RegisterDialogProps {
  open: boolean;
  onClose: () => void
}

const RegisterDialog: React.FC<RegisterDialogProps> = ({
  open,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [errors, setErrors] = useState({} as any);
  const [loading, setLoading] = useState<boolean>(false)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  };
  const dispatch = useDispatch<AppDispatch>();
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setFormData({ ...formData, role: event.target.value }); // Acceso directo a event.target.value
    setErrors({ ...errors, role: "" });
  };

  const validateForm = () => {
    let newErrors: any = {};

    if (!formData.name) {
      newErrors.name = "El nombre completo es requerido";
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

    if (!formData.role) {
      newErrors.role = "Debe seleccionar un tipo de usuario";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async() => {
    if (validateForm()) {
      setLoading(true)
      const dataToSend:any = {
        ...formData
      }
      delete dataToSend.confirmPassword
      const res = await APIService.userRegister({...dataToSend})
      
      if(res.status){
      handleClose();
      console.log('RESPUESTA DE EL REGISTRO ES ',res)
      Notify('Registro exitoso','success')
      const user = {...res?.data} as User
      dispatch(loginSuccess({user:user}))
       setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      });
      }else{
        Notify(res.message,'error')
      }
      console.log('RESPUESTA',res)
      setErrors({});
      setLoading(false)
    }
  };

  const handleClose = () => {
    onClose();
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    });
    setErrors({});
  };

  return (
    <>
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
                  id="role"
                  name="role"
                  value={formData.role}
                  label="Tipo de usuario"
                  onChange={handleSelectChange}
                  error={!!errors.role}
                >
                  <MenuItem value="comprador">Comprador</MenuItem>
                  <MenuItem value="vendedor">Vendedor</MenuItem>
                </Select>
                {errors.role && (
                  <Typography variant="caption" color="error">
                    {errors.role}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            {/* Campos de texto */}
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="Nombre completo"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
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
        {!loading ? 
        <>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Registrar</Button>
        </DialogActions>
        </>  
        :
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      }
      </Dialog>
      <ToastContainer
        position="bottom-center"
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default RegisterDialog;
 
