import { Box, Button } from "@mui/material";
import Navbar from "components/Navbar";
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
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await APIService.productListByUser(user?.id || '');
        if (result?.status && result.data) {
          setProducts(result.data);
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
  }, [user]); // El useEffect se ejecuta cuando cambia el userId
  
  return (
    <div>
      <div>
      <Navbar />
      <AddProduct open={showAddProduct} onClose={() => setShowAddProduct(false)} />
      <Box sx={{ width: '90%', margin: '0 auto', paddingTop:'4rem' }}>
      <div>
        <Box sx={{ display:'flex', justifyContent:'space-between', width:'100%', alignItems:'center'}}>
          <h2>
            Mis productos
          </h2>
          <Button onClick={() => setShowAddProduct(true)} variant="contained">Añadir producto</Button>

        </Box>
      </div>
      </Box>
      {user?.id && 
        <ProductList products={products} loading={loading}  />
      }
      </div>
    </div>
  );
};

export default ProductsPage;
