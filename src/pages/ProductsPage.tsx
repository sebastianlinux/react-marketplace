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


const ProductsPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [showAddProduct, setShowAddProduct] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages,setTotalPages] = useState<number>(1)
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await APIService.productListAll(user?.id || '',currentPage-1);
        console.log('respuesta es ',result)
        if (result?.status && result.data) {
          setProducts(result.data?.products || []);
          setTotalPages(result.data?.totalCount || 1);
        } else {
          setError(result?.message || 'Error desconocido al obtener productos.');
        }
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError('Error al conectar con el servidor.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user,currentPage]); 
  
  const handlePage = (x:any,e:any) => {
    setCurrentPage(e)
  }

  const handleCloseAddProduct = (product?:Product) => {
    if(product){
      setProducts([product,...products])
    }
    setShowAddProduct(false)
  }
  return (
    <MainLayout>

        <div>
        <AddProduct open={showAddProduct} onClose={handleCloseAddProduct} />
        <Box sx={{ width: '90%', margin: '0 auto', paddingTop:'4rem' }}>
        <div>
          <Box sx={{ display:'flex', justifyContent:'space-between', width:'100%', alignItems:'center'}}>
            <h2>
              Mis productos -  {user?.name}
            </h2>
            <Button onClick={() => setShowAddProduct(true)} variant="contained">Añadir producto</Button>

          </Box>
        </div>
        </Box>
        {user?.id && 
        <>
        <ProductList products={products} loading={loading}  />
        <Paginacion page={currentPage} totalPages={totalPages} onChangePage={handlePage} />
        </>
        }
        </div>


      
    </MainLayout>
  );
};

export default ProductsPage;
