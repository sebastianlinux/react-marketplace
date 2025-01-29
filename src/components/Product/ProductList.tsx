import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
  Slider,
  TextField,
  InputAdornment,
} from "@mui/material"; // Importaciones de Material UI

import { Product } from "types";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ProductDetail from "./ProductDetail";
import Decimal from "decimal.js";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { addItem } from "./../../redux/cartSlice";
import Notify from "components/Notify";
import { useSelector } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import StarDisplay from "components/StarDisplay";
import { Link } from "react-router-dom";
import { RootState } from "store";
import { useDebounce } from "use-debounce";
interface ProductListProps {
  products: Product[];
  loading: boolean;
  min: number;
  max: number;
  valueRanges: number[];
  onChangeRange(event: Event, newValue: number | number[]): void;
  handleSearchChange(search:string): void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  max,
  min,
  valueRanges,
  onChangeRange,
  handleSearchChange,
}) => {
  const dispatch = useDispatch();
  const [currentProduct, setCurrentProduct] = useState<Product>();
  //const [error, setError] = useState<string | null>(null);
  const [viewDetail, setViewDetail] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const [localSearch, setLocalSearch] = useState<string>('');
  const handleAddToCart = (product: Product) => {
    Notify("Añadido al carrito",'success');
    dispatch(addItem(product)); // Dispara la acción addItem con el producto
  };
  const [ debouncedSearch ] = useDebounce(localSearch,1000)

  useEffect(() => {
    handleSearchChange(localSearch) 
  }, [ debouncedSearch])
  
  const preHandleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
 
    setLocalSearch(event.currentTarget.value)
  }


  const handleDetail = (product: Product) => {
    setCurrentProduct(product);
    setViewDetail(true);
  };
  

  /*  if (error) {
    return <Alert severity="error">{error}</Alert>;
  } */



  const handleClearSearch = () => {
    setLocalSearch("");
  };
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
          sx={{ width: "90%", margin: "0 auto", paddingTop: "4rem", gap: 0 }}
        >
              <TextField
                label="Buscar productos"
                variant="outlined"
                value={localSearch}
                disabled={loading}
                onChange={preHandleSearchChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {localSearch && (
                        <IconButton onClick={handleClearSearch}>
                          <ClearIcon />
                        </IconButton>
                      )}
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth // Para que ocupe todo el ancho disponible
              />

                  {!loading && (
                    <>
              <Box sx={{ padding: "1rem" }}>Filtrar por rango de precio</Box>
              <Box sx={{ width: 300 }}>
                <Slider
                  getAriaLabel={() => "Rango de precios"}
                  value={valueRanges}
                  onChange={onChangeRange}
                  disabled={loading}
                  defaultValue={[0, 10000000000000]}
                  valueLabelDisplay="auto"
                  valueLabelFormat={valuetext}
                  min={min}
                  max={max}
                />
              </Box>
            </>
          )}
        </Box>

        {(!products || products.length === 0) &&
(
      <Typography
        sx={{ width: "w-full", margin: "0 auto", textAlign: "center" }}
        variant="body1"
      >
        {user?.role === "vendedor" && localSearch==='' && (
          <div>
            No tienes productos en tu inventario. visita "mis productos" y
            presiona añadir producto para comenzar a vender.
          </div>
        )}

        {localSearch.length > 0 &&
          'No hay resultados en la busqueda' }
        {!loading && localSearch === '' && 
        'No hay productos disponibles.'}
      </Typography>
    )
  }
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
            <Grid sx={{ p: 1 }} item xs={12} sm={6} md={3} key={product.id}>
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
                      <Box
                        sx={{
                          fontWeight: "medium",
                          paddingY: ".3rem",
                          fontSize: ".9rem",
                          backgroundColor: "#e8e8e8",
                          width: "fit-content",
                          borderRadius: ".5rem",
                          display: "flex",
                          padding: ".4rem",
                          marginY: ".4rem",
                          textDecoration: "none",
                          color: "#333",
                        }}
                        component={Link}
                        to={`/user/products/${product.user.id}`}
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

function valuetext(value: number) {
  return `$${value}`;
}

export default ProductList;
