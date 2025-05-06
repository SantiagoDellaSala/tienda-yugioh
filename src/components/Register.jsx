import React, { useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // acceder a la función login

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Registro del usuario
      await axios.post('http://localhost:5000/api/register', formData);

      // Login automático
      const res = await axios.post('http://localhost:5000/api/login', {
        email: formData.email,
        password: formData.password
      });

      const token = res.data.token;
      login(token); // Guardar el token en el contexto

      Swal.fire('¡Éxito!', 'Usuario registrado y logueado correctamente', 'success');
      navigate('/');
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || 'Error al registrar o loguear';
      Swal.fire('Error', msg, 'error');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">Nombre</label>
          <input type="text" id="firstName" name="firstName" className="form-control"
            value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Apellido</label>
          <input type="text" id="lastName" name="lastName" className="form-control"
            value={formData.lastName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input type="email" id="email" name="email" className="form-control"
            value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input type="password" id="password" name="password" className="form-control"
            value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
