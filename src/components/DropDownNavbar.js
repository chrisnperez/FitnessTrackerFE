import React, { useState } from "react";
import { Link } from "react-router-dom";

const DropDownNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
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
              <Link to="/users/login" onClick={closeDropdown}>Logout</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DropDownNavbar;
