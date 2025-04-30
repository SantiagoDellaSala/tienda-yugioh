import React from 'react';
import { Link } from 'react-router-dom';

// Componente Navbar para la navegación
const Navbar = () => {
  return (
    <nav style={navbarStyle}>
      <ul style={navListStyle}>
        <li style={navItemStyle}><Link to="/" style={linkStyle}>Inicio</Link></li>
        <li style={navItemStyle}><Link to="/store" style={linkStyle}>Tienda</Link></li>
        <li style={navItemStyle}><Link to="/cart" style={linkStyle}>Carrito</Link></li>
        <li style={navItemStyle}><Link to="/register" style={linkStyle}>Registrar</Link></li>
        <li style={navItemStyle}><Link to="/login" style={linkStyle}>Iniciar Sesión</Link></li>
      </ul>
    </nav>
  );
};

// Estilos básicos para el Navbar
const navbarStyle = {
  backgroundColor: '#333',
  padding: '10px',
  color: '#fff',
  textAlign: 'center'
};

const navListStyle = {
  listStyleType: 'none',
  margin: 0,
  padding: 0
};

const navItemStyle = {
  display: 'inline',
  margin: '0 15px'
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '18px'
};

export default Navbar;
