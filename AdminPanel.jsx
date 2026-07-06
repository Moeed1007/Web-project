import { useEffect, useContext } from "react";
import ProductTable from "./ProductTable";
import { ProductContext } from "../context/ProductContext";
import { AuthContext } from "../context/AuthContext";

function AdminPanel() {
  const { products } = useContext(ProductContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Admin Dashboard - Football Store";
    console.log("Admin panel loaded. User:", user);
  }, []);

  return (
    <div>
      <h2>Dashboard - Football Store</h2>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Products</h5>
              <p className="display-4">{products.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Product List</h5>
              <ProductTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;