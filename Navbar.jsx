import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNavLinks } from "../services/productApi";

function Navbar() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const result = await getNavLinks();

      if (result.success) {
        setLinks(result.links);
      }
    };

    fetchLinks();
  }, []);

  return (
    <>
      <div className="bg-dark text-white py-2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <small>Free Shipping on Orders Over $100</small>
            </div>

            <div className="col-md-6 text-center text-md-end">
              <small>Helpline No: +92 300 1234567</small>
            </div>
          </div>
        </div>
      </div>

      <nav
        className="navbar navbar-expand-lg shadow-sm sticky-top"
        style={{ backgroundColor: "#8DFF00" }}
      >
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
            <img
              src="/GoalGearPK.jpg"
              alt="GoalGearPK"
              width="50"
              height="50"
              className="rounded-circle me-2"
            />
            <h4 className="m-0 fw-bold">GoalGear.pk</h4>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              {links.map((link) => (
                <li className="nav-item" key={link.id}>
                  <Link
                    className={
                      link.title === "Sale"
                        ? "nav-link fw-semibold text-danger"
                        : "nav-link fw-semibold"
                    }
                    to={link.path}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>

            <Link to="/login" className="btn btn-outline-dark me-2">
              Login
            </Link>

            <Link to="/signup" className="btn btn-dark">
              Register
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;