import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RoleContext } from '../Authentication/AuthForm';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole } = useContext(RoleContext);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-role');
    
    // Update context
    setRole('');
    setIsLoggedIn(false);
    
    // Redirect to login
    navigate('/');
    alert('Logged out successfully');
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
            {isLoggedIn ? (
              <button 
                className="nav-link logout-btn" 
                onClick={handleLogout}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'inherit',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
              >
                Logout
              </button>
            ) : (
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Login</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
