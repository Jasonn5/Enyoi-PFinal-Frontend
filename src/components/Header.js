import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleUserIconClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="header">
      <h1>TaskMaster</h1>
      <nav>
        <ul>
          <li>
            <a href="https://jeyson-valdivia.tech" target="_blank" rel="noopener noreferrer">
              Autor
            </a>
          </li>
        </ul>
      </nav>
      {isAuthenticated ? (
        <div className="user-menu-container">
          <FaUserCircle className="user-icon" onClick={handleUserIconClick} />
          {showMenu && (
            <div className="user-menu">
              <ul>
                <li onClick={() => navigate('/change-password')}>Cambiar contraseña</li>
                <li onClick={handleLogout}>Cerrar sesión</li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <button className="auth-button" onClick={() => navigate('/login')}>
          Ingresar
        </button>
      )}
    </header>
  );
};

export default Header;

