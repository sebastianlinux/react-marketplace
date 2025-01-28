import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  InputAdornment,
  IconButton,
  TextField,
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

const LandingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const [searchTerm, setSearchTerm] = useState<string>();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    setError(null);

    try {
      let result: any = { status: false };
      if (user?.role === "admin" || user?.role === "comprador") {
        console.log(searchTerm)
        result = await APIService.productListAll(currentPage,searchTerm);
      } else if (user?.role === "vendedor") {
        result = await APIService.productListByUser(user?.id,currentPage-1, searchTerm);
      }
      if (result?.status && result.data) {
        setProducts(result.data.products);
        setTotalPages(result.data.totalCount);
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
  }, [isAuthenticated,searchTerm,currentPage]);

  const handlePage = (x:any,e:any) => {
    setCurrentPage(e)
  }
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
            <Typography variant="h4" component="h2" align="center" gutterBottom>
              ¡Hay productos esperando por ti!
            </Typography>
              <Typography variant="h4" component="h2" align="center" gutterBottom>
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
              <ProductList loading={loadingProducts} products={products} />

              <Paginacion page={currentPage} totalPages={totalPages} onChangePage={handlePage} />
            </>
          )}
        </Container>
      </MainLayout>
    </div>
  );
};

export default LandingPage;
