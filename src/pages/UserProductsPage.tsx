import { Box, Button } from "@mui/material";
import MainLayout from "Layouts/MainLayout";
import Paginacion from "components/Pagination";
import AddProduct from "components/Product/AddProduct";
import ProductList from "components/Product/ProductList";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import APIService from "services/Api";
import { RootState } from "store";
import { Product } from "types";
import { useDebounce } from "use-debounce";

const ProductsPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [showAddProduct, setShowAddProduct] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [priceRanges, setPriceRanges] = useState<number[]>([0, 10000]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [valueRanges, setValueRanges] = useState([0, 10000]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>()

  const [debouncedRange] = useDebounce(valueRanges, 1000); 
  const [debouncedSearch] = useDebounce(searchTerm,1000)



  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await APIService.productListAll(
          user?.id || '',
          currentPage,
          valueRanges[0],
          valueRanges[1],
          searchTerm
        );
        console.log("respuesta es ", result);
        if (result?.status && result.data) {
          setProducts(result.data?.products || []);
          setTotalPages(result.data?.totalCount || 1);
          setPriceRanges([
            Number(result?.data?.minPrice || 0),
            Number(result?.data?.maxPrice || 100000),
          ]);
        } else {
          setError(
            result?.message || "Error desconocido al obtener productos."
          );
        }
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError("Error al conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user, currentPage,debouncedRange,debouncedSearch]);

  const handleSearchChange = (s :string) => {
    setSearchTerm(s);
    setCurrentPage(1)
  };

  const handlePage = (x: any, e: any) => {
    setCurrentPage(e);
  };

  const handleCloseAddProduct = (product?: Product) => {
    if (product) {
      setProducts([product, ...products]);
    }
    setShowAddProduct(false);
  };

  const handleChangeRange = (event: Event, newValue: number | number[]) => {
    setValueRanges(newValue as number[]);
    setCurrentPage(1);
  };

  return (
    <MainLayout>
      <div>
        <AddProduct open={showAddProduct} onClose={handleCloseAddProduct} />
        <Box sx={{ width: "90%", margin: "0 auto", paddingTop: "4rem" }}>
          <div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <h2>Mis productos - {user?.name}</h2>
              <Button
                onClick={() => setShowAddProduct(true)}
                variant="contained"
              >
                Añadir producto
              </Button>
            </Box>
          </div>
        </Box>
        {user?.id && (
          <>
            <ProductList
              products={products}
              loading={loading}
              min={priceRanges[0] || 0}
              max={priceRanges[1] || 10000}
              handleSearchChange={handleSearchChange}
              valueRanges={valueRanges}
              onChangeRange={handleChangeRange}
            />
            <Paginacion
              page={currentPage}
              totalPages={totalPages}
              onChangePage={handlePage}
            />
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
