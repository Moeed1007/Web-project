import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

function ProductTable() {
  const { products } = useContext(ProductContext);

  return (
    <div>
      <h2>Product List</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr><th>Image</th><th>Name</th><th>Price</th><th>Quantity</th><th>ID</th></tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="text-center">
                  <img src={product.image} alt={product.name} className="rounded" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                </td>
                <td>{product.name}</td>
                <td>Rs {product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;