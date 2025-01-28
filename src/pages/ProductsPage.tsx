import { Box, Button } from "@mui/material";
import Navbar from "components/Navbar";
import AddProduct from "components/Product/AddProduct";
import ProductList from "components/Product/ProductList";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";


const ProductsPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [showAddProduct, setShowAddProduct] = useState<boolean>(false)
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
        <ProductList userId={user.id} />

      }
      </div>
    </div>
  );
};

export default ProductsPage;
