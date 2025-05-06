import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import AppRoutes from './AppRoutes';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext'; // Importar AuthProvider

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <AppRoutes />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
