// App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Aquí envolvemos toda la app en Router
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import AppRoutes from './AppRoutes'; // Importamos las rutas
import Footer from './components/Footer';

function App() {
  return (
    <Router>  {/* Único Router para toda la aplicación */}
      <div className="App">
        <Navbar />
        <AppRoutes />  {/* Rutas definidas en AppRoutes.jsx */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
