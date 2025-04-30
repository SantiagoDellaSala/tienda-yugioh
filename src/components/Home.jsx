import React from "react";
import "../styles/Home.css"; // Asegúrate de tener un archivo de estilos

const Home = () => {
  return (
    <div className="home-container">
      <div className="overlay">
        <div className="text-box">
          <h1 className="display-4">Bienvenido a la Tienda de Cartas de Yu-Gi-Oh!</h1>
          <p className="lead">
            Explora nuestras cartas y compra las que más te gusten.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
