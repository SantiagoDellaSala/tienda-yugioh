import React from 'react';

const CartTotal = ({ items }) => {
  const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div>
      <h3>Total: ${total}</h3>
      <button>Proceder al pago</button>
    </div>
  );
};

export default CartTotal;
