import { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { deleteProduct } from "../services/productApi";

function DeleteProduct() {
  const { products, fetchProducts } = useContext(ProductContext);

  const [searchId, setSearchId] = useState("");
  const [foundProduct, setFoundProduct] = useState(null);
  const [message, setMessage] = useState("");

  const handleSearch = () => {
    const product = products.find((p) => Number(p.id) === Number(searchId));

    if (product) {
      setFoundProduct(product);
      setMessage("");
    } else {
      setFoundProduct(null);
      setMessage("Product not found!");
    }
  };

  const handleDelete = async () => {
    const result = await deleteProduct(foundProduct.id);

    if (result.success) {
      setMessage(result.message);
      setFoundProduct(null);
      setSearchId("");
      fetchProducts();
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title text-center">Delete Product</h3>

        {message && <div className="alert alert-info">{message}</div>}

        <div className="row mb-4">
          <div className="col-md-8">
            <input
              type="number"
              className="form-control"
              placeholder="Enter Product ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <button className="btn btn-info w-100" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        {foundProduct && (
          <div className="card mt-3 border-danger">
            <div className="card-body text-center">
              {foundProduct.image && (
                <img
                  src={foundProduct.image}
                  alt={foundProduct.name}
                  className="img-fluid rounded mb-3"
                  style={{ maxHeight: "150px" }}
                />
              )}

              <h5 className="text-danger">Product Found:</h5>

              <p>
                <strong>ID:</strong> {foundProduct.id}
              </p>

              <p>
                <strong>Name:</strong> {foundProduct.name}
              </p>

              <p>
                <strong>Price:</strong> Rs {foundProduct.price}
              </p>

              <p>
                <strong>Quantity:</strong> {foundProduct.quantity}
              </p>

              <p>
                <strong>Category:</strong> {foundProduct.category}
              </p>

              <button
                className="btn btn-danger w-100 mt-2"
                onClick={handleDelete}
              >
                Delete Product
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeleteProduct;