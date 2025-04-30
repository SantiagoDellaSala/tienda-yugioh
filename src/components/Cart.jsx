import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';  // Importamos el componente CartItem
import CartEmptyMessage from './CartEmptyMessage';  // Importamos el componente CartEmptyMessage
import CartTotal from './CartTotal';  // Importamos el componente CartTotal

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
          <CartEmptyMessage />
        ) : (
          <>
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
            <CartTotal items={cartItems} />
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
