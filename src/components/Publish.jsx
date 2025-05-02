// Publish.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Publish = () => {
  const [name, setName] = useState('');
  const [stars, setStars] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [element, setElement] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    window.location.href = '/login'; // Redirige al login si no hay usuario autenticado
    return <div>Cargando...</div>;
  }

  const handlePublish = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/cards', {
        name,
        stars,
        type,
        image,
        element,
        description,
        code
      }, {
        headers: { Authorization: `Bearer ${token}` } // Enviar token en el header
      });

      alert('Carta publicada exitosamente!');
    } catch (error) {
      console.error('Error al publicar la carta:', error);
      alert('Hubo un error al publicar la carta.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Publicar Carta</h1>
      <form onSubmit={handlePublish}>
        <div className="form-group">
          <label>Nombre de la carta:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Estrellas:</label>
          <input
            type="number"
            className="form-control"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Tipo:</label>
          <input
            type="text"
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Imagen (URL):</label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Elemento:</label>
          <input
            type="text"
            className="form-control"
            value={element}
            onChange={(e) => setElement(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Código:</label>
          <input
            type="text"
            className="form-control"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Publicar</button>
      </form>
    </div>
  );
};

export default Publish;
