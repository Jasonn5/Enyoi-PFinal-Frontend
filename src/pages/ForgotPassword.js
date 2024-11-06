import React, { useState } from 'react';
import { sendPasswordRecoveryEmail } from '../services/authService';
import '../styles/ForgotPassword.css'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await sendPasswordRecoveryEmail(email);
      setMessage('Correo de recuperación enviado con éxito. Por favor, revisa tu bandeja de entrada.');
    } catch (error) {
      setError('Hubo un error al enviar la solicitud de recuperación. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Recuperar Contraseña</h2>
        <p>Ingresa tu correo para recibir un enlace de recuperación.</p>
        {message && <p className="success-message">{message}</p>}
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
              className="form-input"
            />
          </div>
          <button type="submit" className="primary-button">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
