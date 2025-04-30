import React from 'react';

const CartItem = ({ item }) => {
  return (
    <div>
      <h2>{item.product.name}</h2>
      <p>Cantidad: {item.quantity}</p>
      <p>Precio: ${item.product.price}</p>
    </div>
  );
};

export default CartItem;
