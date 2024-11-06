import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const apiBaseUrl = `${process.env.REACT_APP_API_BASE_URL}/users/login`; 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(apiBaseUrl, {
        correo: email,
        contraseña: password,
      });

      localStorage.setItem('token', response.data.token);

      navigate('/tasks');
      window.location.reload(); 
    } catch (error) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Iniciar sesión</button>
      </form>
      <div className="login-links">
        <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
        <a href="/register">Crear una cuenta</a>
      </div>
    </div>
  );
};

export default Login;
