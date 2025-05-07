import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Publish = () => {
  const [name, setName] = useState('');
  const [stars, setStars] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [element, setElement] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [code, setCode] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    window.location.href = '/login'; // Redirige al login si no hay usuario autenticado
    return <div>Cargando...</div>;
  }

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl); // Limpia el objeto URL cuando el componente se desmonte
    }
  }, [image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    } else {
      alert('Por favor, selecciona un archivo de imagen válido.');
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', name);
      formData.append('stars', stars);
      formData.append('type', type);
      formData.append('image', image);
      formData.append('element', element);
      formData.append('description', description);
      formData.append('code', code);

      const response = await axios.post('http://localhost:5000/api/cards', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
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
          <label>Imagen:</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {imagePreview && (
            <div className="mt-3">
              <img src={imagePreview} alt="Vista previa" className="img-fluid" />
            </div>
          )}
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
          <label>Precio:</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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