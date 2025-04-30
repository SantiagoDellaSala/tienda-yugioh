// src/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Store from './components/Store';
import Cart from './components/Cart';
import Register from './components/Register';
import Login from './components/Login';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/store" element={<Store />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
