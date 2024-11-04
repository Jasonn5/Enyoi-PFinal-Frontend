// src/pages/Register.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de envío de formulario (integración con la API, etc.)
    console.log('Formulario de registro enviado');
  };

  return (
    <div className="register-container">
      <h2>Crear una cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre completo</label>
          <input type="text" id="name" placeholder="Ingresa tu nombre completo" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" id="email" placeholder="Ingresa tu correo" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" placeholder="Ingresa tu contraseña" required />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input type="password" id="confirmPassword" placeholder="Confirma tu contraseña" required />
        </div>
        <button type="submit" className="register-button">Registrarse</button>
      </form>
      <div className="register-links">
        <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
      </div>
    </div>
  );
};

export default Register;
