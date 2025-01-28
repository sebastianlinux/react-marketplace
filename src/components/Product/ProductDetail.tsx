import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Product } from "types";
import Decimal from "decimal.js"; 

type ParamsProductDetail = {
  product: Product;
  open: boolean;
  handleClose: () => void;
};

const ProductDetail: React.FC<ParamsProductDetail> = ({
  product,
  open,
  handleClose,
}) => {
  if (!product) {
    return null;
  }
  const formattedPrice = new Decimal(product.price).toFixed(2); 

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {product.name}
        <IconButton onClick={handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ padding: "2rem" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <img
            src={`${process.env.REACT_APP_API}/${product.photoUrl}`}
            alt={product.name}
            style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Typography variant="h6">Precio:</Typography>
            <Typography variant="h6">${formattedPrice}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Typography variant="h6">SKU:</Typography>
            <Typography variant="body1">{product.sku}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Typography variant="h6">Descripción:</Typography>
            <Typography variant="body1">{product.description}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Typography variant="h6">Estado:</Typography>
            <Chip
              label={product.status}
              color={product.status === "active" ? "success" : "error"}
            />{" "}
            {/* Chip para el estado */}
          </Box>
          {/* Otros detalles del producto */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Typography variant="h6">Creado:</Typography>
            <Typography variant="body1">{product.createdAt}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Typography variant="h6">Actualizado:</Typography>
            <Typography variant="body1">{product.updatedAt}</Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetail;
