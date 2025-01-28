import { Box, Grid } from "@mui/material";
import MainLayout from "Layouts/MainLayout";
import Navbar from "components/Navbar";
import ProductList from "components/Product/ProductList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APIService from "services/Api";
import { Product } from "types";
import moment from "moment";
import 'moment/locale/es';

const AdminUserProductPage = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState<number>(0);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        if (userId) {
          const result = await APIService.productListByUser(
            userId || "",
            currentPage,
            ""
          );
          if (result?.status && result.data) {
            setProducts(result?.data?.products || []);
            setTotalPages(result?.data?.totalCount || []);
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
      <MainLayout>
        <Grid container spacing={2}>
          {products![0]?.user?.name && 
            <Box sx={{ width: "90%", margin: "0 auto", paddingTop: "4rem" }}>
              <Box sx={{ marginTop: "2rem", fontSize: "2rem" }}>
                Productos del vendedor <b>{products![0]?.user?.name?.toLowerCase()}</b>
              </Box>
              <Box>Miembro desde: {moment(products![0]?.user?.createdAt).format('LL')}</Box>
            </Box>
          }
        </Grid>
        <ProductList products={products} loading={loading} />
      </MainLayout>
    </div>
  );
};

export default AdminUserProductPage;
