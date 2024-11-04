import React from 'react';

const ForgotPassword = () => {
  return (
    <div className="forgot-password-container">
      <h2>Recuperar Contraseña</h2>
      <p>Ingresa tu correo para recibir un enlace de recuperación.</p>
      <form>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" id="email" placeholder="Ingresa tu correo" required />
        </div>
        <button type="submit" className="recover-button">Enviar</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
