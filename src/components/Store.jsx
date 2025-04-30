import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Store = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Aquí va la llamada a tu API para obtener las cartas
    axios.get('http://localhost:3001/products')
      .then(response => setCards(response.data))
      .catch(error => console.error('Error fetching cards:', error));
  }, []);

  return (
    <div>
      <h1>Tienda de Cartas</h1>
      <div>
        {cards.map(card => (
          <div key={card.id}>
            <h2>{card.name}</h2>
            <p>{card.description}</p>
            <p>Precio: ${card.price}</p>
            <button>Añadir al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;