import React from "react";
import "../components/styles/HomePage.css"; // Import our vanilla CSS file

const HomePage = () => {
  return (
    <div className="home-container">
      <h2 className="home-title">Stringcode Limited</h2>
      <p className="home-description">
        Seamlessly manage your dashboard, profile, and accounts. Register now or
        login to get started!
      </p>
      <div className="home-links">
        <a href="/" className="home-link home-link-home">
          Home
        </a>
        <a href="/register" className="home-link home-link-register">
          Register
        </a>
        <a href="/login" className="home-link home-link-login">
          Login
        </a>
      </div>
    </div>
  );
};

export default HomePage;
