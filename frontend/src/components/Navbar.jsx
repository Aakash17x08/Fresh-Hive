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
import { FaGem, FaOpencart  } from 'react-icons/fa';

import { useCart } from '../CartContext';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(location.pathname);
  const { cartCount } = useCart();    

  // Update active tab on route change and close mobile menu
  useEffect(() => {
    setActiveTab(location.pathname);
    setIsOpen(false);
  }, [location]);

  // Navigation items
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
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300 tracking-tight">
                RushBasket
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative font-medium flex flex-col items-center py-2 transition-all duration-300 ${
                  activeTab === item.path ? 'text-green-300' : 'text-slate-300 hover:text-green-200'
                }`}
              >
                <div className="flex items-center">
                  <span className={`mr-2 transition-transform ${
                    activeTab === item.path ? 'scale-125' : 'group-hover:scale-110'
                  }`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>
                <div
                  className={`absolute -bottom-1 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full transition-all duration-500 ${
                    activeTab === item.path ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <Link to="/login" className="p-2.5 rounded-full hover:bg-slate-700/50 transition-colors group">
              <FiUser className="h-5 w-5 text-slate-300 group-hover:text-green-300 transition-colors" />
            </Link>

            <Link to="/cart" className="relative p-2.5 rounded-full hover:bg-slate-700/50 transition-colors group">
              <FaOpencart  className="h-5 w-5 text-slate-300 group-hover:text-green-200 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-green-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden ml-2 p-2 rounded-full text-slate-300 hover:bg-slate-700/50 focus:outline-none transition-colors"
            >
              {isOpen ? <FiX className="h-6 w-6 text-green-300" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ${
          isOpen ? 'bg-black/40 backdrop-blur-sm' : 'bg-transparent pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 h-full w-4/5 max-w-xs bg-emerald-900/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-500 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-5 border-b border-emerald-700">
            <div className="flex items-center space-x-2">
              <FaGem className="text-green-400 text-xl" />
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">
                LuxeBazaar
              </span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-emerald-800 transition-colors">
              <FiX className="h-6 w-6 text-green-300" />
            </button>
          </div>

          <div className="p-4 space-y-2">
            {navItems.map(item => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center p-4 rounded-xl transition-all duration-300 ${
                  activeTab === item.path
                    ? 'bg-emerald-800/50 border-l-4 border-green-400'
                    : 'hover:bg-emerald-800/50'
                }`}
              >
                <span className={`mr-3 text-lg ${
                  activeTab === item.path ? 'text-green-300' : 'text-slate-300 group-hover:text-green-200'
                }`}>
                  {item.icon}
                </span>
                <span className={`text-lg ${
                  activeTab === item.path ? 'text-green-300 font-semibold' : 'text-slate-200'
                }`}>
                  {item.name}
                </span>
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-emerald-700 grid grid-cols-2 gap-3">
             <Link to="/cart" className="relative p-2.5 rounded-full hover:bg-slate-700/50 transition-colors">
          <FaOpencart className="h-5 w-5 text-slate-300 hover:text-green-200" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white bg-green-500 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

              <Link
                to="/login"
                className="col-span-2 flex items-center justify-center p-3 mt-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 group"
              >
                <FiUser className="mr-2 group-hover:animate-pulse" />
                Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
