import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🎯</span>
          Skill2Success
        </Link>
        
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        
        <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/skills" className="nav-link">My Skills</Link>
              <Link to="/recommendations" className="nav-link">Recommendations</Link>
              <Link to="/domain-suggestions" className="nav-link">🎯 Domain Skills</Link>
              <Link to="/report" className="nav-link">📊 Career Report</Link>
              <Link to="/exams" className="nav-link">Exams</Link>
              <div className="user-info">
                <span className="user-name">{user.fullName}</span>
              </div>
              <button className="btn btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
