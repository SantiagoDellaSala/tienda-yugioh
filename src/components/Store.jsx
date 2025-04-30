import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Store = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Usando la API pública de Yugioh para obtener las cartas
    axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Blue-Eyes%20White%20Dragon') // Ejemplo con una carta específica
      .then(response => {
        const cardData = response.data.data;
        if (cardData) {
          setCards(cardData);
        }
      })
      .catch(error => console.error('Error fetching cards from Yugioh API:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Tienda de Cartas</h1>
      <div className="row">
        {cards.map(card => (
          <div key={card.id} className="col-md-3 mb-4">
            <div className="card h-100 shadow-lg border-light">
              <img
                src={card.card_images[0].image_url} // Usando la URL de la imagen de la carta
                alt={card.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{card.name}</h5>
                <p className="card-text">{card.desc}</p>
                <p className="card-text">
                  <strong>Precio:</strong> ${card.card_prices[0].price || 'N/A'}
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

