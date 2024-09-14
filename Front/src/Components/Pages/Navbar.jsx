import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">BookStore <span>App</span></Link>

      <button className="navbar-toggler" type="button" onClick={toggleMenu}>
        ☰
      </button>

      <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
        <form className="search-form">
          <input className="search-input" type="search" placeholder="Search books..." aria-label="Search" />
          <button className="search-button" type="submit">Search</button>
        </form>

        <ul className="nav-links">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""}`} to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === "/books" ? "active" : ""}`} to="/books">Books</Link>
          </li>
          <li className="nav-item ">
            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
