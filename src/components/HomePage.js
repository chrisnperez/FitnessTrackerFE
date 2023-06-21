import React from 'react';
import { Link } from 'react-router-dom';
import Slideshow from './SlideShow.js';

const HomePage = ({ token }) => {
  const images = [
    "/images/dumbells.jpg",
    "/images/treadmill.jpg"
  ];

  return (
    <>
      <h1>Fitness Tracker</h1>
      {token ? (
        <>
          <h2>Welcome!</h2>
          <p>Click here to view your routines </p>  
          <Link to="/routines">My Routines</Link>
        </>
      ) : (
        <>
          <p>Log in to see more</p>
          <Link to="/users/login">Login</Link>
          <p>Don't have an account yet?</p>
          <Link to="/users/register">Register here</Link>
        </>
      )}
      <div id="welcomeUser">
        <Slideshow images={images} interval={6000} />
      </div>
    </>
  );
};

export default HomePage;