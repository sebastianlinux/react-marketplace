import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import APIService from 'services/Api';
import Notify from './Notify';
import {  AppDispatch } from './../store';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './../redux/authSlice';
import { User } from 'types';
interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState({} as any);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: '' }); // Limpia el error al cambiar el valor
    validateForm()
  };

  const validateForm = () => {
    let newErrors: any = {};

    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Formato de correo electrónico inválido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async() => {
    if (validateForm()) {
      setLoading(true)
      const res = await APIService.userLogin({...formData})
      if(res.status){
        handleClose();
        setFormData({ email: '', password: '' });
        setErrors({});
        Notify('Login éxitoso','success')
        const user = {...res?.data?.user} as User
        dispatch(loginSuccess({user:user}))
      }else{
        Notify(res?.message,'error')
      }
      setLoading(false)
    }
  };

  const handleClose = () => {
    onClose();
    setFormData({ email: '', password: '' });
    setErrors({});
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Iniciar Sesión</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              name="email"
              label="Correo electrónico"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            {errors.email}
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
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>
            {Object.keys(errors).length > 0 && (
                <Grid item xs={12}>
                    <Typography color="error">
                        Todos campos son obligatorios
                    </Typography>
                </Grid>
            )}
        </Grid>
      </DialogContent>
      {!loading ? 
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Iniciar Sesión</Button>
        </DialogActions>
      :
      <Box sx={{ display: 'flex',marginY:'2rem', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
    </Box>
      }
    </Dialog>
  );
};

export default LoginDialog;