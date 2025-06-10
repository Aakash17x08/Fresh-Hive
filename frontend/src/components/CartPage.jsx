// src/page/Cart.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { useCart } from '../CartContext';

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  } = useCart();

  // Handle quantity changes
  const handleQuantityChange = (itemId, change) => {
    const item = cart.find((i) => i.id === itemId);
    if (!item) return;

    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    } else {
      removeFromCart(itemId);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/items" className="inline-flex cursor-pointer items-center text-emerald-300 hover:text-emerald-100 mb-8">
            <FiArrowLeft className="mr-2" />
            Continue Shopping
          </Link>

          <div className="bg-emerald-800/50 backdrop-blur-sm rounded-2xl p-8 text-center border border-emerald-700 shadow-2xl">
            <div className="text-emerald-100 text-5xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-emerald-100 mb-4">Your Cart is Empty</h1>
            <p className="text-emerald-300 mb-8 max-w-md mx-auto">
              Looks like you haven't added any organic goodies to your cart yet.
            </p>
            <Link
              to="/items"
              className="inline-block cursor-pointer bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-[1.03]"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="container mx-auto max-w-4xl">

        {/* Centered Heading */}
        <div className="text-center mb-10">
          <h1 
            className="text-4xl font-bold text-emerald-100 mt-12"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Your Shopping Cart
          </h1>
          <button
            onClick={clearCart}
            className="text-emerald-300 cursor-pointer hover:text-red-400 flex items-center transition-colors"
          >
            <FiTrash2 className="mr-1" />
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items as 3‑column grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-emerald-800/30 backdrop-blur-sm rounded-2xl border border-emerald-700 p-6 flex flex-col items-center shadow-2xl"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-emerald-900 flex items-center justify-center mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-contain w-16 h-16"
                    />
                  </div>

                  <h3 className="font-bold text-emerald-50 text-lg mb-2">{item.name}</h3>
                  <p className="text-emerald-300 mb-4">₹{item.price.toFixed(2)}</p>

                  <div className="flex items-center space-x-4 mb-4">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="p-2 cursor-pointer text-emerald-300 hover:text-emerald-100"
                    >
                      <FiMinus />
                    </button>
                    <span className="text-emerald-50 w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="p-2 cursor-pointer text-emerald-300 hover:text-emerald-100"
                    >
                      <FiPlus />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex cursor-pointer items-center text-emerald-300 hover:text-red-400"
                  >
                    <FiTrash2 className="mr-1" />
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-emerald-800/30 backdrop-blur-sm rounded-2xl border border-emerald-700 p-6 shadow-2xl">
              <h2 className="text-xl font-bold text-emerald-100 mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-emerald-300">Subtotal</span>
                  <span className="text-emerald-50">₹{getCartTotal().toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-emerald-300">Shipping</span>
                  <span className="text-emerald-50">Free</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-emerald-300">Taxes (5%)</span>
                  <span className="text-emerald-50">₹{(getCartTotal() * 0.05).toFixed(2)}</span>
                </div>

                <div className="h-px bg-emerald-700 my-4"></div>

                <div className="flex justify-between text-xl font-bold">
                  <span className="text-emerald-100">Total</span>
                  <span className="text-emerald-50">
                    ₹{(getCartTotal() * 1.05).toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="mt-8 w-full bg-emerald-400 hover:bg-emerald-300 text-black font-bold py-4 rounded-xl transition-all duration-300">
                Proceed to Checkout
              </button>

              <div className="mt-6 text-center">
                <Link to="/items" className="inline-flex items-center text-emerald-300 hover:text-emerald-100">
                  <FiArrowLeft className="mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
