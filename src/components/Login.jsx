// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      
      // Guardamos el token en el localStorage después del login
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({ email }));

      // Redirigimos al usuario al home
      navigate('/');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
