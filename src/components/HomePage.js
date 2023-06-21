import React from 'react';
import { Link } from 'react-router-dom';
import Slideshow from './SlideShow.js';

const HomePage = ({ token }) => {
  const images = [
    "/images/dumbells.jpg",
    "/images/treadmills.jpg",
    "/images/Shoes.jpg"
  ];

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Fitness Tracker</h1>
      {token ? (
        <div className="homepage-content">
          <h2 className="welcome-message">Welcome!</h2>
          <p>Click here to view your routines</p>  
          <Link to="/profile" className="homepage-link">My Routines</Link>
        </div>
      ) : (
        <div className="homepage-content">
          <p className="login-message">Log in to see more</p>
          <Link to="/users/login" className="homepage-link">Login</Link>
          <p>Don't have an account yet?</p>
          <Link to="/users/register" className="homepage-link">Register here</Link>
        </div>
      )}
      <div className="slideshow-container">
        <Slideshow images={images} interval={6000} />
      </div>
    </div>
  );
};

export default HomePage;
