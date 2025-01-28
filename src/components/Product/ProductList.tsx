import React, { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Button,
} from "@mui/material"; // Importaciones de Material UI
import { Product } from "types";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ProductDetail from "./ProductDetail";
import Decimal from "decimal.js";
import { useDispatch } from "react-redux";
import { addItem } from "./../../redux/cartSlice";
import Notify from "components/Notify";
import { ToastContainer } from "react-toastify";
import StarDisplay from "components/StarDisplay";
import { Link } from "react-router-dom";
interface ProductListProps {
  products: Product[];
  loading: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, loading }) => {
  const dispatch = useDispatch();
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const [error, setError] = useState<string | null>(null);
  const [viewDetail, setViewDetail] = useState<boolean>(false);

  const handleAddToCart = (product: Product) => {
    Notify("Añadido al carrito");
    dispatch(addItem(product)); // Dispara la acción addItem con el producto
  };

  const handleDetail = (product: Product) => {
    setCurrentProduct(product);
    setViewDetail(true);
  };
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        {" "}
        {/* Centrado */}
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!products || products.length === 0) {
    return (
      <Typography
        sx={{ width: "w-full", margin: "0 auto", textAlign: "center" }}
        variant="body1"
      >
        No hay productos disponibles.
      </Typography>
    );
  }

  return (
    <>
      {currentProduct && (
        <ProductDetail
          product={currentProduct}
          open={viewDetail}
          handleClose={() => setViewDetail(false)}
        />
      )}
      <Grid container spacing={2}>
        <Box
          sx={{
            width: "90%",
            margin: "0 auto",
            paddingTop: "4rem",
            display: "flex",
            flexWrap: "wrap",
            gap: 0,
          }}
        >
          {products.map((product) => (
            <Grid sx={{p:1}} item xs={12} sm={6} md={3} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={`${process.env.REACT_APP_API}/${product.photoUrl}`}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <StarDisplay />
                  <Typography variant="body2" color="text.secondary">
                    {product?.description?.toLowerCase()}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                     ${new Decimal(product.price).toFixed(2)}
                  </Typography>
                  {product?.user && (
                    <Box>
                      Vendedor
                      <Box sx={{ fontWeight: "medium",paddingY:'.3rem',
                       fontSize:'.9rem',backgroundColor:'#e8e8e8',
                       width:'fit-content',
                       borderRadius:'.5rem',
                       display:'flex',
                       padding:'.4rem',
                       marginY:'.4rem',
                       textDecoration:'none',
                       color:'#333'
                       }}
                       component={Link} to={`/admin/users/products/${product.user.id}`}
                       >
                        {product?.user?.name?.toLowerCase()}
                      </Box>
                    </Box>
                  )}
                  <Button
                    variant="contained"
                    onClick={() => handleDetail(product)}
                  >
                    Ver Detalle
                  </Button>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: ".4rem",
                    }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<AddShoppingCartIcon />}
                      onClick={() => handleAddToCart(product)}
                    >
                      Añadir al carrito
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Box>
      </Grid>
    </>
  );
};

export default ProductList;
