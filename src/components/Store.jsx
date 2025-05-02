import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Store = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Cambiamos la URL a la de nuestro servidor backend local
    axios.get('http://localhost:5000/api/cards') // Asegúrate de que el puerto es el correcto
      .then(response => {
        // Aquí recibimos las cartas desde la API del backend
        setCards(response.data); // 'response.data' contiene las cartas
      })
      .catch(error => {
        console.error('Error fetching cards from backend:', error);
      });
  }, []); // El array vacío asegura que solo se haga la solicitud una vez cuando el componente se monta

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Tienda de Cartas</h1>
      <div className="row">
        {cards.map(card => (
          <div key={card.id} className="col-md-3 mb-4">
            <div className="card h-100 shadow-lg border-light">
              {/* Si tienes imágenes almacenadas en tu base de datos, cámbialo aquí */}
              <img
                src={card.image || 'default-image.jpg'} // Usa una imagen por defecto si no hay imagen
                alt={card.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{card.name}</h5>
                <p className="card-text">{card.description}</p> {/* Descripción de la carta */}
                <p className="card-text">
                  <strong>Precio:</strong> ${card.price || 'N/A'}
                </p>
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-primary w-100">Añadir al carrito</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;