import React from 'react';

const CartItem = ({ item }) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>Cantidad: {item.CartItem.quantity}</p>
      {/* Solo se muestra si hay un campo price en las cartas */}
      {item.price && <p>Precio: ${item.price}</p>}
    </div>
  );
};

export default CartItem;
