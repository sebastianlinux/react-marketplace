import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  InputAdornment,
  IconButton,
  TextField,
  Box,
  Slider,
} from "@mui/material";
import Hero from "../components/Hero";
import APIService from "services/Api";
import { Product } from "types";
import ProductList from "components/Product/ProductList";
import MainLayout from "Layouts/MainLayout";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { RootState } from "store";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import Paginacion from "components/Pagination";
import { useDebounce } from 'use-debounce';


const LandingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [valueRanges, setValueRanges] = useState([20, 37]);
  const [searchTerm, setSearchTerm] = useState<string>();
  /*usamos debounce para que no llame al 
  api cada vez que muevan el slider de rango de precios
  q espere 1 segundo de retardo para llamarla.
  lo mismo hacemos con debounceSearch
  */
  const [debouncedRange] = useDebounce(valueRanges, 1000); 
  const [ debouncedSearch ] = useDebounce(searchTerm,1000)

  const [priceRanges, setPriceRanges] = useState<any>([0, 1000]);
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1)
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1)
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValueRanges(newValue as number[]);
    setCurrentPage(1)
    //fetchProducts()
  };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    setError(null);

    try {
      let result: any = { status: false };
      if (user?.role === "admin" || user?.role === "comprador") {
        console.log(searchTerm);
        result = await APIService.productListAll(
          "",
          currentPage,
          valueRanges[0],
          valueRanges[1],
          searchTerm
        );
      } else if (user?.role === "vendedor") {
        result = await APIService.productListAll(
          user?.id,
          currentPage - 1,
          0,
          0,
          searchTerm
        );
      }
      if (result?.status && result.data) {
        setProducts(result.data.products);
        setTotalPages(result.data.totalCount);
        console.log("min", result?.data?.minPrice);
        console.log("max", result?.data?.minPrice);
        setPriceRanges([
          Number(result?.data?.minPrice),
          Number(result?.data?.maxPrice),
        ]);
      } else {
        setError(result?.message || "Error desconocido al obtener productos.");
      }
    } catch (err) {
      console.error("Error al obtener productos:", err);
      setError("Error al conectar con el servidor.");
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated, currentPage,debouncedRange,debouncedSearch]
  );
  const handlePage = (x: any, e: any) => {
    setCurrentPage(e);
  };
  return (
    <div>
      <MainLayout>
        <Hero
          title="Bienvenido a Nuestro Marketplace"
          description={
            "¡Bienvenido a nuestra tienda virtual de prueba! Explora nuestra selección de productos y descubre las últimas tendencias. ¡Disfruta de una experiencia de compra fácil y segura!"
          }
          imageUrl={""}
        />

        <Container sx={{ py: 8 }}>
          {!isAuthenticated ? (
            <>
              <Typography
                variant="h4"
                component="h2"
                align="center"
                gutterBottom
              >
                ¡Hay productos esperando por ti!
              </Typography>
              <Typography
                variant="h4"
                component="h2"
                align="center"
                gutterBottom
              >
                Por favor inicia sesión para ver los productos.
                <div>
                  <ProductionQuantityLimitsIcon
                    sx={{ fontSize: "4rem", paddingTop: "1rem" }}
                  />
                </div>
              </Typography>
            </>
          ) : (
            <Typography variant="h4" component="h2" align="center" gutterBottom>
              Productos Destacados 
            </Typography>
          )}
          {isAuthenticated && (
            <>
              <TextField
                label="Buscar productos"
                variant="outlined"
                value={searchTerm}
                disabled={loadingProducts}
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {searchTerm && (
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
              <Box sx={{padding:'1rem'}}>Filtrar por rango de precio</Box>
              <Box sx={{ width: 300 }}>
                <Slider
                  getAriaLabel={() => "Rango de precios"}
                  value={valueRanges}
                  onChange={handleChange}
                  disabled={loadingProducts}
                  valueLabelDisplay="auto"
                  valueLabelFormat={valuetext}
                  min={priceRanges[0] || 0}
                  max={priceRanges[1] || 10000}
                />
              </Box>

              <ProductList loading={loadingProducts} products={products} />

              <Paginacion
                page={currentPage}
                totalPages={totalPages}
                onChangePage={handlePage}
              />
            </>
          )}
        </Container>
      </MainLayout>
    </div>
  );
};

function valuetext(value: number) {
  return `$${value}`;
}

export default LandingPage;
