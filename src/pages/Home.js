// src/pages/Home.js
import React from 'react';
import '../styles/Home.css'; // Asegúrate de crear un archivo de estilo para esta página.

const Home = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>Ve el trabajo desde una nueva perspectiva</h1>
        <p>Visualiza los proyectos de tu equipo desde todos los ángulos y trae un nuevo enfoque a tus tareas.</p>
        <button className="cta-button">Descubre todas las vistas</button>
      </div>
      <div className="hero-image">
        <img src="ruta-a-tu-imagen.png" alt="Vista de ejemplo de TaskMaster" />
      </div>
    </div>
  );
};

export default Home;
