import { Box, Grid } from "@mui/material";
import MainLayout from "Layouts/MainLayout";
import Navbar from "components/Navbar";
import ProductList from "components/Product/ProductList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APIService from "services/Api";
import { Product } from "types";
import moment from "moment";
import "moment/locale/es";
import Paginacion from "components/Pagination";
import { useDebounce } from "use-debounce";

const AdminUserProductPage = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [priceRanges, setPriceRanges] = useState<number[]>([0, 10000]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [valueRanges, setValueRanges] = useState([0, 100000000]);
  const [searchTerm, setSearchTerm] = useState<string>();
  const handlePage = (x: any, e: any) => {
    setCurrentPage(e);
  };

  const [debouncedRange] = useDebounce(valueRanges, 1000); 
  const [debouncedSearch] = useDebounce(searchTerm,1000)

  
  const handleChangeRange = (event: Event, newValue: number | number[]) => {
    setValueRanges(newValue as number[]);
    setCurrentPage(1);
    //fetchProducts()
  };


  const handleSearchChange = (s :string) => {
    setSearchTerm(s);
    setCurrentPage(1)
  };
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        if (userId) {
          const result = await APIService.productListAll(
            userId,
            currentPage,
            valueRanges[0],
            valueRanges[1],
            searchTerm
          );
          if (result?.status && result.data) {
            setProducts(result?.data?.products || []);
            setTotalPages(result?.data?.totalCount || []);
            setPriceRanges([
              Number(result?.data?.minPrice || 0),
              Number(result?.data?.maxPrice || 100000),
            ]);
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
  }, [userId,currentPage,debouncedRange,debouncedSearch,searchTerm]); // El useEffect se ejecuta cuando cambia el userId

  return (
    <div>
      <MainLayout>
        <Grid container spacing={2}>
          {products![0]?.user?.name ? (
            <Box sx={{ width: "90%", margin: "0 auto", paddingTop: "4rem" }}>
              <Box sx={{ marginTop: "2rem", fontSize: "2rem" }}>
                Productos del vendedor{" "}
                <b>{products![0]?.user?.name?.toLowerCase()}</b>
              </Box>
              <Box>
                Miembro desde:{" "}
                {moment(products![0]?.user?.createdAt).format("LL")}
              </Box>
            </Box>
          ) : (
            <Box
              sx={{ marginTOp: "6rem", width: "100%", height: "4rem" }}
            ></Box>
          )}
        </Grid>

          <ProductList
            products={products}
            loading={loading}
            handleSearchChange={handleSearchChange}
            min={priceRanges[0] || 0}
            max={priceRanges[1] || 10000}
            valueRanges={valueRanges}
            onChangeRange={handleChangeRange}
          />
        


        <Paginacion
          page={currentPage}
          totalPages={totalPages}
          onChangePage={handlePage}
        />
      </MainLayout>
    </div>
  );
};

export default AdminUserProductPage;
