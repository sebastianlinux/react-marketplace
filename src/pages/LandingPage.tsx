import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import APIService from "services/Api";
import { Product } from "types";
import ProductList from "components/Product/ProductList";

const LandingPage: React.FC = () => {
  const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const loremIpsumShort =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

    const [products, setProducts] = useState<Product[]>([])
    const [error, setError] = useState<string | null>(null);
    const [loadingProducts, setLoadingProducts] = useState(true);
  
 /*    const fetchProducts = async() => {
      const res = await APIService.productListAll({})
      console.log(res)
    } */

    const fetchProducts = async () => {
      setLoadingProducts(true);
      setError(null);

      try {
        const result = await APIService.productListAll({});
        if (result?.status && result.data) {
          setProducts(result.data);
        } else {
          setError(result?.message || 'Error desconocido al obtener productos.');
        }
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError('Error al conectar con el servidor.');
      } finally {
        setLoadingProducts(false);
      }
    };


    useEffect(() => {
      fetchProducts()
    }, [])
    
  return (
    <div>
      <Navbar />
      <Hero
        title="Bienvenido a Nuestro Marketplace"
        description={loremIpsum}
        buttonText="Explorar Productos"
        imageUrl={""} // Reemplaza con tu imagen
      />

      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Productos Destacados
        </Typography>
        <ProductList loading={loadingProducts} products={products} />
       
      </Container>
    </div>
  );
};

export default LandingPage;
