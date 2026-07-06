import { createBrowserRouter } from "react-router-dom";
import Landingpage from "./Landingpage";
import Login from "./Login";
import Signup from "./Signup";
import AdminLayout from "./AdminLayout";
import AddProduct from "./components/AddProduct";
import ModifyProduct from "./components/ModifyProduct";
import DeleteProduct from "./components/DeleteProduct";
import AdminPanel from "./components/AdminPanel";
import Jerseys from "./pages/Jerseys";
import Accessories from "./pages/Accessories";
import Sale from "./pages/Sale";
import SearchResults from "./pages/SearchResults";

const router = createBrowserRouter([
  // Customer Routes
  { path: "/", element: <Landingpage /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/jerseys", element: <Jerseys /> },
{ path: "/accessories", element: <Accessories /> },
{ path: "/sale", element: <Sale /> },
{ path: "/search", element: <SearchResults /> },
  
  // Admin Routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <AdminPanel /> },
      { path: "addproduct", element: <AddProduct /> },
      { path: "modifyproduct", element: <ModifyProduct /> },
      { path: "deleteproduct", element: <DeleteProduct /> },
     
    ]
  },
]);

export default router;
