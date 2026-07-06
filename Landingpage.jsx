import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { getProducts } from "./services/productApi";
import { getHomepageCards } from "./services/productApi";

function LandingPage() {
  // Best Sellers Data and arrival daat
  const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const result = await getProducts();

    if (result.success) {
      setProducts(result.products);
    }
  };

  fetchData();
}, []);

const [homepageCards, setHomepageCards] = useState([]);

useEffect(() => {
  const fetchCards = async () => {
    const result = await getHomepageCards();

    if (result.success) {
      setHomepageCards(result.cards);
    }
  };

  fetchCards();
}, []);

const bestSellers = products.slice(0, 4);
const newArrivals = products.slice(4, 8);

  

  return (
    <div>
      <Navbar />
      {/* ========== HERO SECTION ========== */}
      <div
  className="text-white py-5"
  style={{ background: "linear-gradient(180deg, #000000 0%, #0a0a0a 100%)"}}
>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-7 text-center text-lg-start">
              <h1 className="display-3 fw-bold mb-3">Welcome to <span className="text-primary">GoalGear.pk</span></h1>
              <p className="lead mb-4">Your one-stop shop for authentic football jerseys, boots, and accessories. Get the best deals on official merchandise.</p>
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                <button className="btn btn-primary btn-lg px-4" style={{ cursor: 'default' }}>Shop Now</button>
                <button className="btn btn-outline-light btn-lg px-4" style={{ cursor: 'default' }}>Learn More</button>
              </div>
            </div>
            <div className="col-lg-5 text-center mt-5 mt-lg-0">
              <img src="/public/GoalGearPK.jpg" alt="Hero Image" className="img-fluid rounded-4 shadow-lg" style={{ maxHeight: '350px', width: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ========== BEST SELLERS SECTION ========== */}
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">Best Sellers</h2>
          <p className="text-muted">Most popular products this month</p>
          <div className="bg-primary mx-auto" style={{ width: '60px', height: '3px' }}></div>
        </div>
        
        <div className="row g-4">
          {bestSellers.map((product) => (
            <div className="col-lg-3 col-md-6" key={product.id}>
              <div className="card h-100 shadow-sm border-0 text-center">
                <img src={product.image} className="card-img-top p-3" alt={product.name} style={{ height: '220px', objectFit: 'contain' }} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-primary fw-bold fs-4">Rs {product.price}</p>
                  <button className="btn btn-outline-primary w-100" style={{ cursor: 'default' }}>View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

{/* ========== NEW ARRIVALS SECTION ========== */}

<div className="container py-5">

  <div className="text-center mb-5">
    <h2 className="display-5 fw-bold">New Arrivals</h2>
    <p className="text-muted">
      Check out our latest football products
    </p>

    <div
      className="bg-primary mx-auto"
      style={{ width: "60px", height: "3px" }}
    ></div>
  </div>

  <div className="row g-4">

    {newArrivals.map((product) => (

      <div className="col-lg-3 col-md-6" key={product.id}>

        <div className="card h-100 shadow-sm border-0 text-center">

          <img
            src={product.image || "https://placehold.co/300x300?text=Add+Image"}
            alt={product.name}
            className="card-img-top p-3"
            style={{
              height: "220px",
              objectFit: "contain"
            }}
          />

          <div className="card-body">

            <h5 className="card-title">
              {product.name}
            </h5>

            <p className="card-text text-primary fw-bold fs-4">
              
              Rs {product.price}
            </p>

            <button
              className="btn btn-outline-primary w-100"
              style={{ cursor: "default" }}
            >
              View Details
            </button>

          </div>

        </div>

      </div>

    ))}

  </div>

</div>



      {/* ========== CATEGORIES SECTION ========== */}
<div className="bg-light py-5">
  <div className="container">
    <div className="text-center mb-5">
      <h2 className="display-5 fw-bold">Shop by Category</h2>
      <p className="text-muted">Choose what you want to explore</p>
      <div
        className="bg-primary mx-auto"
        style={{ width: "60px", height: "3px" }}
      ></div>
    </div>

    <div className="row g-4">
      {homepageCards.map((card) => (
        <div className="col-lg-4 col-md-6" key={card.id}>
          <Link to={card.path} className="text-decoration-none text-dark">
            <div className="card text-center border-0 shadow-sm h-100">
              <div className="card-body py-5">
                <h1>{card.icon}</h1>
                <h3 className="fw-bold fs-4">{card.title}</h3>
                <p className="mb-0 text-primary">{card.button_text}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
</div>

      {/* ========== FEATURES SECTION ========== */}
      <div className="container py-5">
        <div className="row g-4 text-center">
          <div className="col-md-3 col-6">
            <h3 className="mb-2">🚚</h3>
            <h5>Free Shipping</h5>
            <p className="text-muted small">On orders over $50</p>
          </div>
          <div className="col-md-3 col-6">
            <h3 className="mb-2">🛡️</h3>
            <h5>Secure Payment</h5>
            <p className="text-muted small">100% secure</p>
          </div>
          <div className="col-md-3 col-6">
            <h3 className="mb-2">🔄</h3>
            <h5>Easy Returns</h5>
            <p className="text-muted small">30 days policy</p>
          </div>
          <div className="col-md-3 col-6">
            <h3 className="mb-2">⭐</h3>
            <h5>24/7 Support</h5>
            <p className="text-muted small">Always here</p>
          </div>
        </div>
      </div>

      {/* ========== FOOTER ========== */}
      <footer className="bg-dark text-white pt-4 pb-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-3">
              <h5 className="mb-2">GoalGear.PK</h5>
              <p className="small">Your trusted source for authentic football merchandise since 2024.</p>
            </div>
            <div className="col-md-2 mb-3">
              <h6>Quick Links</h6>
              <ul className="list-unstyled small">
                <li><Link to="/" className="text-white-50 text-decoration-none">Home</Link></li>
                <li><span className="text-white-50" style={{ cursor: 'pointer' }}>Best Sellers</span></li>
                <li><span className="text-white-50" style={{ cursor: 'pointer' }}>Categories</span></li>
              </ul>
            </div>
            <div className="col-md-2 mb-3">
              <h6>Support</h6>
              <ul className="list-unstyled small">
                <li><Link to="#" className="text-white-50 text-decoration-none">Contact</Link></li>
                <li><Link to="#" className="text-white-50 text-decoration-none">FAQs</Link></li>
                <li><Link to="#" className="text-white-50 text-decoration-none">Returns</Link></li>
              </ul>
            </div>
            <div className="col-md-4 mb-3">
              <h6>Newsletter</h6>
              <p className="small">Get latest updates on new arrivals</p>
              <div className="input-group input-group-sm">
                <input type="email" className="form-control" placeholder="Your email" />
                <button className="btn btn-primary btn-sm" type="button" style={{ cursor: 'default' }}>Subscribe</button>
              </div>
            </div>
          </div>
          <hr className="my-2" />
          <div className="text-center small">
            <p className="mb-0">© 2024 Football Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;