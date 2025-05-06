// Store.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Store = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const location = useLocation();  // Para obtener los parámetros de la URL
  const navigate = useNavigate();  // Para cambiar la URL programáticamente

  // Obtener todas las cartas desde la API
  useEffect(() => {
    axios.get('http://localhost:5000/api/cards')
      .then(response => {
        setCards(response.data);  // Guardar todas las cartas
      })
      .catch(error => {
        console.error('Error fetching cards from backend:', error);
      });
  }, []);

  // Filtrar las cartas según el parámetro 'search' en la URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);  // Obtener los parámetros de búsqueda
    const searchQuery = queryParams.get('search')?.toLowerCase() || '';

    // Filtrar las cartas si hay un término de búsqueda
    if (searchQuery) {
      setFilteredCards(cards.filter(card => card.name.toLowerCase().includes(searchQuery)));
    } else {
      setFilteredCards(cards);  // Si no hay búsqueda, mostrar todas las cartas
    }
  }, [location.search, cards]);  // Se ejecuta cada vez que cambian los parámetros de búsqueda o las cartas

  // Manejar el evento "Enter" del input
  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      const searchQuery = event.target.value.trim().toLowerCase();

      // Si el input está vacío, redirigir a la tienda sin el parámetro de búsqueda
      if (searchQuery === '') {
        navigate('/store'); // Redirige a /store sin parámetros
      } else {
        navigate(`/store?search=${searchQuery}`); // Redirige con el parámetro de búsqueda
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Tienda de Cartas</h1>
      <div className="row">
        {/* Mostrar las cartas filtradas */}
        {filteredCards.length > 0 ? (
          filteredCards.map(card => (
            <div key={card.id} className="col-md-3 mb-4">
              <div className="card h-100 shadow-lg border-light">
                <img
                  src={`http://localhost:5000${card.image}`}
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
          ))
        ) : (
          <p className="text-center">No se encontraron cartas que coincidan con tu búsqueda.</p>
        )}
      </div>
    </div>
  );
};

export default Store;