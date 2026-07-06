import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getProducts } from "../services/productApi";

function Accessories() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts();

      if (result.success) {
        const filtered = result.products.filter(
          (p) =>
            p.category === "Boots" ||
            p.category === "Footballs" ||
            p.category === "Training Kits" ||
            p.category === "Accessories"
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
        <h2 className="text-center fw-bold mb-4">Accessories</h2>

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
                  <p className="text-primary fw-bold fs-4">Rs {product.price}</p>
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

export default Accessories;