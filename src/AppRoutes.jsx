// AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Usamos Routes para definir las rutas
import Home from './components/Home';  // Importamos el componente Home
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Store from './components/Store';  // Importamos el componente Store
import Cart from './components/Cart';    // Importamos el componente Cart
import Publish from './components/Publish'; //Importamos el componente Publish

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />  {/* Página principal */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/store" element={<Store />} />  {/* Página de tienda */}
      <Route path="/cart" element={<Cart />} />    {/* Página de carrito */}
      <Route path="/publish" element={<Publish />} />
    </Routes>
  );
}

export default AppRoutes;
