import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importar las vistas o componentes
import Home from './components/Home';
import Store from './components/Store';
import Cart from './components/Cart';
import Register from './components/Register';
import Login from './components/Login'; // Importamos el componente Login
import Navbar from './components/Navbar'; // Importamos el componente Navbar

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

export default App;
