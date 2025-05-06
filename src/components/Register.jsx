// Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  // Manejar los cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Enviar los datos de registro
  const handleSubmit = (e) => {
    e.preventDefault();

    // Llamada al backend para registrar el usuario
    axios
      .post('http://localhost:5000/api/register', formData)
      .then((response) => {
        // Mostrar mensaje de éxito con SweetAlert
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: response.data.message, // Mensaje de la respuesta del backend
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch((error) => {
        // Mostrar mensaje de error con SweetAlert
        Swal.fire({
          title: '¡Error!',
          text: error.response?.data?.message || 'Hubo un problema al registrar el usuario',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-control"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Apellido
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-control"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
