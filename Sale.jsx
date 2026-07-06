import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getProducts } from "../services/productApi";

function Sale() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts();

      if (result.success) {
        const filtered = result.products.filter(
          (p) => p.sale === "Yes"
        );

        setProducts(filtered);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <h2 className="text-center fw-bold mb-4">Sale Products</h2>

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
                  {product.sale === "Yes" && (
  <p className="text-muted mb-1">
    <del>Rs {product.original_price}</del>
  </p>
)}

<p className="text-primary fw-bold fs-4">
  Rs {product.price}
</p>

<span className="badge bg-danger mb-2">Sale</span>
                  <button className="btn btn-outline-primary w-100">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sale;