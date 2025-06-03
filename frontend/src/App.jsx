import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Contact from './page/Contact'
import Items from './page/Items'
import Cart from './page/Cart'
import Login from './components/Login'
import Signup from './components/Signup'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/items' element={<Items />} />
      <Route path='/cart' element={<Cart />} />

      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  )
}

export default App