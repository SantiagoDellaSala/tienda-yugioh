import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import CartEmptyMessage from './CartEmptyMessage';
import CartTotal from './CartTotal';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token'); // Asegúrate de tener el token guardado
        const response = await fetch('http://localhost:5000/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener el carrito');
        }

        const data = await response.json();
        setCartItems(data.products); // Aquí asignamos los productos del carrito
      } catch (error) {
        console.error('Error al obtener el carrito:', error);
      }
    };

    fetchCartItems();
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
