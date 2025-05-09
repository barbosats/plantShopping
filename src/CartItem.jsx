import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice'; 
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items); 
  const dispatch = useDispatch();

  // Função para limpar o preço do símbolo "$" e converter para número
  const parsePrice = (price) => parseFloat(price.replace('$', '').trim());

  // Calcular o custo total de todos os itens no carrinho
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + parsePrice(item.cost) * item.quantity, 0).toFixed(2);
  };

  // Incrementar a quantidade de um item
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrementar a quantidade de um item
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name)); 
    }
  };

  // Remover um item do carrinho
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calcular o custo total de cada item
  const calculateTotalCost = (item) => {
    return (parsePrice(item.cost) * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${item.cost}</div>
              <div className="cart-item-quantity">
                <button 
                  className="cart-item-button cart-item-button-dec" 
                  onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button 
                  className="cart-item-button cart-item-button-inc" 
                  onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button 
                className="cart-item-delete" 
                onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="continue_shopping_btn">
        <button 
          className="get-started-button" 
          onClick={onContinueShopping}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default CartItem;
