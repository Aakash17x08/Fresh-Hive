import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiShoppingBag,
  FiMail,
  FiUser,
  FiX,
  FiMenu,
} from 'react-icons/fi';
import { FaOpencart } from 'react-icons/fa';
import { useCart } from '../CartContext';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(location.pathname);
  const { cartCount } = useCart();

  // Sync active tab and close menu on route change
  useEffect(() => {
    setActiveTab(location.pathname);
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/', icon: <FiHome className="text-xl" /> },
    { name: 'Items', path: '/items', icon: <FiShoppingBag className="text-xl" /> },
    { name: 'Contact', path: '/contact', icon: <FiMail className="text-xl" /> },
  ];

  return (
    <nav className="fixed w-full z-50 bg-black backdrop-blur-lg shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300 tracking-tight transition-transform">
              RushBasket
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map(item => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative font-medium flex flex-col items-center py-2 transition-all duration-300 ${
                  activeTab === item.path
                    ? 'text-green-300'
                    : 'text-slate-300 hover:text-green-200'
                } group`}
              >
                <div className="flex items-center">
                  <span
                    className={`mr-2 transition-transform ${
                      activeTab === item.path ? 'scale-125' : 'group-hover:scale-110'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>
                <div
                  className={`absolute -bottom-1 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full transition-all duration-500 ${
                    activeTab === item.path
                      ? 'w-full opacity-100'
                      : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Icons & Hamburger */}
          <div className="flex items-center space-x-5">
            {/* Login */}
            <Link
              to="/login"
              className="hidden lg:inline-flex p-2.5 rounded-full hover:bg-slate-700/50 transition-colors"
            >
              <FiUser className="h-5 w-5 text-slate-300 hover:text-green-300 transition-colors" />
            </Link>
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-full hover:bg-slate-700/50 transition-colors"
            >
              <FaOpencart className="h-5 w-5 text-slate-300 hover:text-green-200 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-green-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden ml-2 p-2 rounded-full text-slate-300 hover:bg-gray-700 transition-colors"
            >
              {isOpen ? <FiX className="h-6 w-6 text-white" /> : <FiMenu className="h-6 w-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay (no bg-black here) */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        {/* Side Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-4/5 max-w-xs bg-black backdrop-blur-xl shadow-2xl transform transition-transform duration-500 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300 tracking-tight transition-transform">
                RushBasket
              </span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-full transition-colors">
              <FiX className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="p-4 space-y-2 text-green-300 bg-black">
            {navItems.map(item => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center p-4 rounded-xl transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span className="text-lg">{item.name}</span>
              </Link>
            ))}

            <div className="pt-4 mt-4 grid grid-cols-2 gap-3">
              <Link
                to="/login"
                className="col-span-2 flex items-center justify-center p-3 bg-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 group"
                onClick={() => setIsOpen(false)}
              >
                <FiUser className="mr-2" />
                Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
