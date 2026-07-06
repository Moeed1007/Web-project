import { createContext, useEffect, useState } from "react";
import { getProducts } from "../services/productApi";

export const ProductContext = createContext();

function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const result = await getProducts();

    if (result.success) {
      setProducts(result.products);
    } else {
      setProducts([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;