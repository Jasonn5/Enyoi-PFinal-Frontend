import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const loginUser = async (correo, contraseña) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, { correo, contraseña });
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

export const registerUser = async (nombre, correo, contraseña) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/register`, { nombre, correo, contraseña });
    return response.data;
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    throw error;
  }
};

export const sendPasswordRecoveryEmail = async (correo) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/request-password-reset`, { correo });
    return response.data;
  } catch (error) {
    console.error('Error al enviar la solicitud de restablecimiento de contraseña:', error);
    throw error;
  }
};

export const changePassword = async (contraseñaActual, nuevaContraseña) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/users/change-password`,
      { contraseñaActual, nuevaContraseña },
      authHeader()
    );
    return response.data;
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    throw error;
  }
};
