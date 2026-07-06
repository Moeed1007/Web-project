import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProducts } from "../services/productApi";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSearch = async () => {
      const result = await searchProducts(query);

      if (result.success) {
        setProducts(result.products);
      }
    };

    fetchSearch();
  }, [query]);

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <h2 className="text-center fw-bold mb-4">
          Search Results for "{query}"
        </h2>

        <div className="row g-4">
          {products.map((product) => (
            <div className="col-lg-3 col-md-6" key={product.id}>
              <div className="card h-100 shadow-sm border-0 text-center">
                <img
                  src={product.image || "https://placehold.co/300x300?text=Add+Image"}
                  alt={product.name}
                  className="card-img-top p-3"
                  style={{ height: "220px", objectFit: "contain" }}
                />

                <div className="card-body">
                  <h5>{product.name}</h5>
                  <p className="text-primary fw-bold fs-4">
                    Rs {product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <p className="text-center text-muted">No products found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchResults;