// src/App.js
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Navbar from './components/Navbar';
import Home from './page/Home';
import Contact from './page/Contact';
import Items from './page/Items';
import Cart from './page/Cart';
import Login from './components/Login';
import Signup from './components/Signup';

// ScrollToTop component: listens to route changes and scrolls window to top
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <CartProvider>
    <ScrollToTop />
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/items" element={<Items />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </CartProvider>
);

export default App;
