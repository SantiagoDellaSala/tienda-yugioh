import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importar las vistas o componentes
import Home from './components/Home';
import Store from './components/Store';
import Cart from './components/Cart';
import Register from './components/Register';
import Login from "./components/Login"; // Importamos el componente Login

function App() {
  return (
    <Router>
      <div className="App">
        {/* Componente de navegación */}
        <Navbar />

        {/* Configuración de las rutas */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Página de inicio */}
          <Route path="/store" element={<Store />} /> {/* Tienda de cartas */}
          <Route path="/cart" element={<Cart />} /> {/* Carrito de compras */}
          <Route path="/register" element={<Register />} /> {/* Registro de usuario */}
          <Route path="/login" element={<Login />} /> {/* Registro de usuario */}
        </Routes>
      </div>
    </Router>
  );
}

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

export default App;
