import React from 'react';
import { Route, Link } from 'react-router-dom';

const App = () => {
    return (
    <>
    <nav className='navBar'>
                <Link to="/">Home</Link> |
                <Link to="/routines">Routines</Link> |
                <Link to="/profile">Profile</Link> |
                <Link to="/account/login">Account</Link>
            </nav>
    </> 
    )
  }

  export default App; 