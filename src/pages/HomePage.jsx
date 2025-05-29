import React from "react";
import "../components/styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-text">
          <h1>
            Eco-friendly <br />
            shopping, delivered <br />
            to your doorstep
          </h1>
          <div className="shopping-buttons">
            <button>WOMEN</button>
            <button>SWIMMING</button>
            <button>MEN</button>
            <button>SHOPPING</button>
           
          </div>
          <p className="home-subtext">
            Discover sustainable products and enjoy guilt-free shopping with
            eco-conscious choices
          </p>
          <div className="action-buttons">
            <button className="start-shopping">Start Shopping</button>
            <a href="/register" className="btn-register">Register</a>
            <a href="/login" className="btn-login">Login</a>
          </div>
        </div>
        <div className="home-image-container">
          {/* <img
            src="/images/your-provided-model-image.jpg"
            alt="Model"
            className="home-image"
          /> */}
          <div className="gift-barcode">
            <div className="barcode">SCAN TO COLLECT YOUR SHOPPING GIFT</div>
            <img
              src="/images/your-provided-image.jpg"
              alt="Gift Avatar"
              className="gift-avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
