import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { Logout } from './Logout';

const DropDownNavbar = ({ setToken, setUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
      history.push('/users/login');
      closeDropdown();
    } catch (err) {
      console.error(err);
    }
  };

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
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DropDownNavbar;
