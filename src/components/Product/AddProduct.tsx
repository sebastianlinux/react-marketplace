import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
    Alert,
    AlertTitle
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Product } from 'types';

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>({
    sku: '',
    name: '',
    description: '',
    photoUrl: '',
    price: '',
    status: 'active',
  });
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      setLoading(true);
      setError(null);
        setSuccess(false);
    try {
      const formData = new FormData();
      formData.append('sku', product.sku);
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price);
      if (file) {
        formData.append('photo', file);
      }

      const response = await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Producto añadido:', response.data);
        setProduct({
            sku: '',
            name: '',
            description: '',
            photoUrl: '',
            price: '',
            status: 'active',
        });
        setFile(null);
        setSuccess(true);
    } catch (err: any) {
      console.error('Error al añadir producto:', err);
        if (axios.isAxiosError(err)) {
            setError(err.response?.data?.message || 'Error al añadir el producto.');
        } else {
            setError('Un error desconocido ha ocurrido.');
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Paper elevation={3} sx={{ padding: 4, width: '500px' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Añadir Producto
        </Typography>
          {error && (
              <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {error}
              </Alert>
          )}
          {success && (
              <Alert severity="success">
                  <AlertTitle>Éxito</AlertTitle>
                  Producto añadido correctamente
              </Alert>
          )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="SKU"
            name="sku"
            value={product.sku}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Descripción"
            name="description"
            value={product.description}
            onChange={handleChange}
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Precio"
            name="price"
            value={product.price}
            onChange={handleChange}
            type="number"
            required
          />
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              Subir Foto
              <input
                hidden
                accept="image/*"
                type="file"
                name="photo"
                onChange={handleFileChange}
              />
            </Button>
              {file && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                      Archivo seleccionado: {file.name}
                  </Typography>
              )}
          </Box>
          <Box sx={{ mt: 3 }}>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Añadir producto'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AddProduct;