import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  AlertTitle,
  DialogTitle,
  Dialog,
  DialogContent,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Product } from "types";
import { useSelector } from "react-redux";
import { RootState } from "store";
import APIService from "services/Api";
import Notify from "components/Notify";

interface AddProductDialogProps {
  open: boolean;
  onClose: (product?:Product) => void;
}

const AddProduct: React.FC<AddProductDialogProps> = ({open,onClose}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [product, setProduct] = useState<
    Omit<Product, "id" | "createdAt" | "updatedAt">
  >({
    sku: "",
    name: "",
    description: "",
    photoUrl: "",
    price: "",
    status: "active",
    userId: user?.id || "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      let formData = new FormData();
      formData.append("sku", product.sku);
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price.toString());
      const productSave = formData as unknown as Product;
  
      if (file) {
        formData.append("photoUrl", file);
      }
      formData.append("userId", user?.id || '');

      const res = await APIService.productCreate(productSave);
      if(res?.status){
        console.log('respuesta guardada',res)
        onClose(res?.data);
        Notify('Producto guardado', 'success');
        formData = new FormData()
        setProduct({
          sku: "",
          name: "",
          description: "",
          photoUrl: "",
          price: "",
          status: "active",
          userId: user?.id || ""
        })
        setSuccess(true);
      }else{
        Notify(res?.message,'error')
      }
  
    } catch (err: any) {
      Notify(err.message, 'error'); // Usa err.message (que ahora contiene el mensaje del backend)
      console.error("Error al añadir producto:", err);
      setError(err.message || "Un error desconocido ha ocurrido."); // Usa err.message
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose()}>
       <DialogTitle >
        Añadir producto 
         
        </DialogTitle>
       <DialogContent>
    <Box
      sx={{
        minHeight: "80vh",
      }}
    >

     
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
          <Box sx={{ mt: 3 , spacing:22 }}>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Añadir producto"}
            </Button>
            <Button onClick={() => onClose()} sx={{marginTop:".5rem"}} type="button" variant="text" disabled={loading}>
              CANCELAR
            </Button>
          </Box>
        </form>

    </Box>
    </DialogContent>
    </Dialog>
  );
};

export default AddProduct;
