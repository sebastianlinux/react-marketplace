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
import ProductDetail from "./ProductDetail";
import Decimal from "decimal.js";
interface ProductListProps {
  products: Product[];
  loading: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, loading }) => {
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const [error, setError] = useState<string | null>(null);
  const [viewDetail, setViewDetail] = useState<boolean>(false);
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
        <Box sx={{ width: "90%", margin: "0 auto", paddingTop: "4rem" }}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
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
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    Precio: ${new Decimal(product.price).toFixed(2)}
                  </Typography>
                  {product?.user && (
                    <div>
                      Vendedor
                      <Box sx={{ fontWeight: "bold" }}>
                        {product?.user?.name}
                      </Box>
                    </div>
                  )}
                  <Button
                    variant="contained"
                    onClick={() => handleDetail(product)}
                  >
                    Ver Detalle
                  </Button>
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
