import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const isActive = (path) => location.pathname === path;

  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/store?search=${searchTerm.trim()}`);
  };

  return (
    <nav style={navbarStyle}>
      <div style={navContentStyle}>
        <ul style={navListStyle}>
          <li style={{ ...navItemStyle, ...(isActive('/') ? activeStyle : {}) }}>
            <Link to="/" style={linkStyle}>Inicio</Link>
          </li>
          <li style={{ ...navItemStyle, ...(isActive('/store') ? activeStyle : {}) }}>
            <Link to="/store" style={linkStyle}>Tienda</Link>
          </li>

          {/* Opciones para usuarios no logueados */}
          {!user ? (
            <>
              <li style={{ ...navItemStyle, ...(isActive('/register') ? activeStyle : {}) }}>
                <Link to="/register" style={linkStyle}>Registrar</Link>
              </li>
              <li style={{ ...navItemStyle, ...(isActive('/login') ? activeStyle : {}) }}>
                <Link to="/login" style={linkStyle}>Iniciar Sesión</Link>
              </li>
            </>
          ) : (
            <>
              {/* Opciones exclusivas para usuarios logueados */}
              <li style={{ ...navItemStyle, ...(isActive('/cart') ? activeStyle : {}) }}>
                <Link to="/cart" style={linkStyle}>Carrito</Link>
              </li>
              <li style={{ ...navItemStyle, ...(isActive('/profile') ? activeStyle : {}) }}>
                <Link to="/profile" style={linkStyle}>Perfil</Link>
              </li>

              <li style={{ ...navItemStyle, ...(isActive('/publish') ? activeStyle : {}) }}>
                <Link to="/publish" style={linkStyle}>Publicar</Link>
              </li>
              <li style={{ ...navItemStyle }}>
                <button onClick={handleLogout} style={logoutButtonStyle}>Salir</button>
              </li>
            </>
          )}
        </ul>

        {/* Barra de búsqueda */}
        <form onSubmit={handleSearchSubmit} style={searchFormStyle}>
          <input
            type="text"
            placeholder="Buscar cartas..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={searchInputStyle}
          />
        </form>
      </div>
    </nav>
  );
};

const navbarStyle = {
  backgroundColor: '#333',
  padding: '10px 20px',
  color: '#fff'
};

const navContentStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const navListStyle = {
  listStyleType: 'none',
  display: 'flex',
  gap: '20px',
  margin: 0,
  padding: 0
};

const navItemStyle = {
  transition: 'all 0.3s ease-in-out',
  borderRadius: '5px',
  padding: '5px 10px'
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '18px',
  transition: 'all 0.3s ease-in-out'
};

const activeStyle = {
  textDecoration: 'underline',
  textDecorationColor: '#fff',
};

const searchInputStyle = {
  padding: '6px 12px',
  borderRadius: '5px',
  border: 'none',
  fontSize: '16px',
  outline: 'none'
};

const searchFormStyle = {
  margin: 0,
  display: 'flex',
  alignItems: 'center',
};

const logoutButtonStyle = {
  backgroundColor: 'transparent',
  color: '#fff',
  border: 'none',
  cursor: 'pointer'
};

export default Navbar;
