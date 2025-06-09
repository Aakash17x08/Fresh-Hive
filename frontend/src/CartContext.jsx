// src/CartContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add an item to the cart (or increase its quantity)
  const addToCart = (item, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(ci => ci.id === item.id);
      if (existingItem) {
        return prevCart.map(ci =>
          ci.id === item.id
            ? { ...ci, quantity: ci.quantity + quantity }
            : ci
        );
      } else {
        return [...prevCart, { ...item, quantity }];
      }
    });
  };

  // Remove an item completely from the cart
  const removeFromCart = itemId => {
    setCart(prevCart => prevCart.filter(ci => ci.id !== itemId));
  };

  // Update the quantity of a specific item
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(ci =>
        ci.id === itemId ? { ...ci, quantity: newQuantity } : ci
      )
    );
  };

  // Clear all items from the cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total cost of items in the cart
  const getCartTotal = () =>
    cart.reduce((total, ci) => total + ci.price * ci.quantity, 0);

  // Calculate total number of items in the cart
  const cartCount = cart.reduce((count, ci) => count + ci.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for accessing cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
