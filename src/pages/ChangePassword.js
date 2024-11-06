import React, { useState } from 'react';
import { changePassword } from '../services/authService';
import '../styles/ChangePassword.css';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await changePassword(currentPassword, newPassword);
      setMessage('Contraseña actualizada con éxito');
      setError('');
    } catch (err) {
      setMessage('');
      setError(
        err.response?.data?.message ||
        'Hubo un error al intentar actualizar la contraseña. Verifica tus datos e inténtalo de nuevo.'
      );
    }
  };

  return (
    <div className="change-password-container">
      <h2>Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="current-password">Contraseña actual</label>
          <input
            type="password"
            id="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="new-password">Nueva contraseña</label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Cambiar contraseña
        </button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ChangePassword;
