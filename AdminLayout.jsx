import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ThemeContext } from "./context/ThemeContext";

function AdminLayout() {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/admin/dashboard">Admin Panel - GoalGear.PK</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="adminNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/admin/dashboard">Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin/addproduct">Add Product</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin/modifyproduct">Modify Product</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin/deleteproduct">Delete Product</Link></li>
              <li className="nav-item">
                <button className="btn btn-outline-light ms-2" onClick={toggleTheme}>
                  {darkMode ? "☀️ Light" : "🌙 Dark"}
                </button>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        {user && <div className="alert alert-info">Welcome, {user.email}!</div>}
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
     
      