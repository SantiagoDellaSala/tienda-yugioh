// Store.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Store = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/cards')
      .then(response => {
        setCards(response.data);
      })
      .catch(error => {
        console.error('Error fetching cards from backend:', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Tienda de Cartas</h1>
      <div className="row">
        {cards.map(card => (
          <div key={card.id} className="col-md-3 mb-4">
            <div className="card h-100 shadow-lg border-light">
              <img
                src={card.image || 'default-image.jpg'}
                alt={card.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{card.name}</h5>
                <p className="card-text">{card.description}</p>
                <p className="card-text">
                  <strong>Precio:</strong> ${card.price || 'N/A'}
                </p>
                <p className="card-text">Vendedor: {card.user ? `${card.user.firstName} ${card.user.lastName}` : 'Desconocido'}</p>
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
