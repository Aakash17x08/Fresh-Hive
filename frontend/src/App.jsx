// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Navbar    from './components/Navbar';
import Home      from './page/Home';
import Contact   from './page/Contact';
import Items     from './page/Items';
import Cart      from './page/Cart';
import Login     from './components/Login';
import Signup    from './components/Signup';

const App = () => (
  <CartProvider>
    <Navbar />
    <Routes>
      <Route path='/'      element={<Home />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/items' element={<Items />} />
      <Route path='/cart'   element={<Cart />} />
      <Route path='/login'  element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  </CartProvider>
);

export default App;
