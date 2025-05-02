// Profile.jsx
import React from 'react';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    // Si el usuario no está autenticado, redirigimos al login
    window.location.href = '/login';
    return null;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Perfil de {user.email}</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3>Bienvenido, {user.email}!</h3>
          <p>Este es tu perfil. Aquí puedes editar tus datos y ver tu información.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
