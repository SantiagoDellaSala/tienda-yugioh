import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

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
          <li style={{ ...navItemStyle, ...(isActive('/cart') ? activeStyle : {}) }}>
            <Link to="/cart" style={linkStyle}>Carrito</Link>
          </li>
          <li style={{ ...navItemStyle, ...(isActive('/register') ? activeStyle : {}) }}>
            <Link to="/register" style={linkStyle}>Registrar</Link>
          </li>
          <li style={{ ...navItemStyle, ...(isActive('/login') ? activeStyle : {}) }}>
            <Link to="/login" style={linkStyle}>Iniciar Sesión</Link>
          </li>
        </ul>
        {/* Barra de búsqueda */}
        <input 
          type="text" 
          placeholder="Buscar cartas..." 
          style={searchInputStyle}
        />
      </div>
    </nav>
  );
};

// Estilos
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
  fontSize: '18px'
};

const activeStyle = {
  backgroundColor: '#555',
  boxShadow: '0 0 10px #facc15',
  color: '#facc15'
};

const searchInputStyle = {
  padding: '6px 12px',
  borderRadius: '5px',
  border: 'none',
  fontSize: '16px',
  outline: 'none'
};

export default Navbar;
