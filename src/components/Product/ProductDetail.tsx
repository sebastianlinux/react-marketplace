import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
  Chip,
  Divider,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Product } from "types";
import Decimal from "decimal.js";
import moment from "moment";
import "moment/locale/es";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
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
          fontWeight:'700'
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
            <Typography variant="h6">Precio: ${formattedPrice}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Typography variant="h6">{product.description}</Typography>
          </Box>
          <Divider />
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Typography variant="body1">Vendedor</Typography>
            <Avatar
              sx={{
                width: 20,
                height: 20,
                backgroundColor: "primary.main",
                margin: "5px",
              }}
            >
              <AccountCircleIcon sx={{ fontSize: 30, color: "white" }} />
            </Avatar>
            <Typography variant="body1" component={Link} onClick={handleClose} to={`/user/products/${product?.user?.id}`}>{product?.user?.name}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Typography variant="body1">código:</Typography>
            <Typography variant="body1">{product.sku}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Typography variant="body1">Estado:</Typography>
            <Chip
              label={product.status}
              color={product.status === "active" ? "success" : "error"}
            />{" "}
            {/* Chip para el estado */}
          </Box>
          {/* Otros detalles del producto */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Typography variant="body1">Creado:</Typography>
            <Typography variant="body1">
              {moment(product.createdAt).format("LL")}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Typography variant="body1">Actualizado:</Typography>

            <Typography variant="body1">
              {moment(product.updatedAt).format("LL")}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetail;
