import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Aquí va la lógica para obtener los productos en el carrito (puedes hacer peticiones al backend para obtener los productos del carrito)
  }, []);

  return (
    <div>
      <h1>Mi Carrito</h1>
      <div>
        {cartItems.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          cartItems.map(item => (
            <div key={item.id}>
              <h2>{item.product.name}</h2>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio: ${item.product.price}</p>
            </div>
          ))
        )}
      </div>
      <button>Proceder al pago</button>
    </div>
  );
};

export default Cart;