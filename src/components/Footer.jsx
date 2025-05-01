import React from 'react';
import { Link } from 'react-router-dom';

const footerStyle = {
  backgroundColor: '#222',
  color: '#fff',
  padding: '40px 20px',
  textAlign: 'center'
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  maxWidth: '1200px',
  margin: '0 auto'
};

const columnStyle = {
  flex: '1',
  minWidth: '150px',
  textAlign: 'left',
  padding: '10px'
};

const centerStyle = {
  flex: '2',
  minWidth: '250px',
  textAlign: 'center',
  padding: '10px'
};

const smallTextStyle = {
  marginTop: '10px',
  fontSize: '14px',
  color: '#ccc'
};

const linkStyle = {
  display: 'block',
  color: '#fff',
  textDecoration: 'none',
  marginBottom: '8px',
  fontSize: '16px'
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        {/* Columna izquierda */}
        <div style={columnStyle}>
          <h4>Navegación</h4>
          <Link to="/" style={linkStyle}>Inicio</Link>
          <Link to="/store" style={linkStyle}>Tienda</Link>
          <Link to="/cart" style={linkStyle}>Carrito</Link>
          <Link to="/register" style={linkStyle}>Registrar</Link>
          <Link to="/login" style={linkStyle}>Iniciar sesión</Link>
        </div>

        {/* Centro */}
        <div style={centerStyle}>
          <h3>Realizado por Santiago Della Sala</h3>
          <p style={smallTextStyle}>Proyecto Final React Talento Tech</p>
        </div>

        {/* Columna derecha */}
        <div style={columnStyle}>
          <h4>Ayuda</h4>
          <Link to="/faq" style={linkStyle}>Preguntas frecuentes</Link>
          <Link to="/contact" style={linkStyle}>Contacto</Link>
          <Link to="/privacy" style={linkStyle}>Política de privacidad</Link>
          <Link to="/terms" style={linkStyle}>Términos y condiciones</Link>
          <Link to="/support" style={linkStyle}>Soporte técnico</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;