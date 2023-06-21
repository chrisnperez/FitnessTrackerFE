import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const DropDownNavbar = ({ setToken, setUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state variable
  const history = useHistory();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      setToken(null);
      setUser(null);
      setIsLoggedIn(false); // Update login status
      history.push('/users/login');
      closeDropdown();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Update login status based on token or user existence
    setIsLoggedIn(!!(setToken && setUser));
  }, [setToken, setUser]);

  return (
    <nav className="navBar">
      <div className="nav-left">
        <Link to="/">Home</Link> |
        <Link to="/activities">Activities</Link> |
        <Link to="/routines">Routines</Link> |
      </div>
      <div className="nav-right">
        <div className="dropdown" onClick={toggleDropdown}>
          <button className="dropbtn">Account</button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <Link to="/profile" onClick={closeDropdown}>Profile</Link>
              {isLoggedIn ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <Link to="/users/login">Sign In</Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DropDownNavbar;