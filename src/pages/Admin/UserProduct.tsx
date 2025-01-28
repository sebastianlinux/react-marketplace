import { Box, Grid } from "@mui/material";
import Navbar from "components/Navbar";
import ProductList from "components/Product/ProductList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APIService from "services/Api";
import { Product } from "types";

const AdminUserProductPage = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        if (userId) {
          const result = await APIService.productListByUser(userId || "");
          if (result?.status && result.data) {
            setProducts(result.data);
          } else {
            setError(
              result?.message || "Error desconocido al obtener productos."
            );
          }
        }
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError("Error al conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userId]); // El useEffect se ejecuta cuando cambia el userId

  return (
    <div>
      <Navbar />
      <div>
      <Grid container spacing={2}>
        <Box sx={{ width: "90%", margin: "0 auto", paddingTop: "4rem" }}>
          <div>Productos del usuario <b>{products![0]?.user?.name}</b></div>
          </Box>
          </Grid>
        <ProductList products={products} loading={loading} />
      </div>
    </div>
  );
};

export default AdminUserProductPage;
