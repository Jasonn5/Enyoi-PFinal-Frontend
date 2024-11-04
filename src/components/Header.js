import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isAuthenticated) {
      navigate('/tasks');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="header">
      <h1>TaskMaster</h1>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/profile">Perfil</Link></li>
          <li><Link to="/tasks">Tareas</Link></li>
        </ul>
      </nav>
      <button className="auth-button" onClick={handleButtonClick}>
        {isAuthenticated ? 'Ir al Tablero' : 'Ingresar'}
      </button>
    </header>
  );
};

export default Header;
