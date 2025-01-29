import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,

} from "@mui/material";
import Hero from "../components/Hero";
import APIService from "services/Api";
import { Product } from "types";
import ProductList from "components/Product/ProductList";
import MainLayout from "Layouts/MainLayout";
import { useSelector } from "react-redux";

import { RootState } from "store";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import Paginacion from "components/Pagination";
import { useDebounce } from 'use-debounce';


const LandingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  //const [error, setError] = useState<string | null>(null);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [valueRanges, setValueRanges] = useState([0, 10000000000]);
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
 
  const handleSearchChange = (s :string) => {
    setSearchTerm(s);
    setCurrentPage(1)
  };

/*   const handleClearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1)
  }; */

  const handleChangeRange = (event: Event, newValue: number | number[]) => {
    setValueRanges(newValue as number[]);
    setCurrentPage(1)
  };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    //setError(null);

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
          valueRanges[0],
          valueRanges[1],
          searchTerm
        );
      }
      if (result?.status && result.data) {
        setProducts(result.data.products);
        setTotalPages(result.data.totalCount);
        setPriceRanges([
          Number(result?.data?.minPrice || 0),
          Number(result?.data?.maxPrice || 10000000),
        ]);
      } else {
        //setError(result?.message || "Error desconocido al obtener productos.");
      }
    } catch (err) {
      console.error("Error al obtener productos:", err);
      //setError("Error al conectar con el servidor.");
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated, currentPage,debouncedRange,debouncedSearch, user]
  );
  const handlePage = (x: any, e: any) => {
    const p = parseInt(e) < 0 ? 1: parseInt(e) 
    setCurrentPage(p);
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
              

              <ProductList handleSearchChange={handleSearchChange} valueRanges={valueRanges}   onChangeRange={handleChangeRange}
              min={priceRanges[0] || 0} max={priceRanges[1]||10000} 
              loading={loadingProducts} products={products} />

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

 
export default LandingPage;
