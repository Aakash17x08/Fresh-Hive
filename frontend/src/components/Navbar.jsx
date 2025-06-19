import React, { useState, useEffect, useRef } from 'react';
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
import logo from '../assets/logo.png'; 

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(location.pathname);
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const prevCartCountRef = useRef(cartCount);
  const [cartBounce, setCartBounce] = useState(false);

  // Sync active tab and close menu on route change
  useEffect(() => {
    setActiveTab(location.pathname);
    setIsOpen(false);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cart animation effect
  useEffect(() => {
    if (cartCount > prevCartCountRef.current) {
      setCartBounce(true);
      const timer = setTimeout(() => setCartBounce(false), 1000);
      return () => clearTimeout(timer);
    }
    prevCartCountRef.current = cartCount;
  }, [cartCount]);

  const navItems = [
    { name: 'Home', path: '/', icon: <FiHome className="text-xl" /> },
    { name: 'Items', path: '/items', icon: <FiShoppingBag className="text-xl" /> },
    { name: 'Contact', path: '/contact', icon: <FiMail className="text-xl" /> },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled
        ? "bg-black/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-16"
        : "bg-gradient-to-r from-black/80 via-slate-900/80 to-black/80 backdrop-blur-lg h-20"
    }`}>
      {/* Animated border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle absolute w-24 h-24 rounded-full bg-emerald-500/5 -top-12 left-1/4 animate-float"></div>
        <div className="particle absolute w-32 h-32 rounded-full bg-green-500/5 -bottom-16 left-2/3 animate-float-slow"></div>
        <div className="particle absolute w-16 h-16 rounded-full bg-teal-500/5 -top-8 left-3/4 animate-float-slower"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with heading */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group transition-transform duration-300 hover:scale-[1.02]"
          >
            <img 
              src={logo} 
              alt="RushBasket Logo" 
              className={`transition-all duration-500 ${
                scrolled ? "h-10 w-10" : "h-12 w-12"
              }`} 
            />
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300 tracking-tight">
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
              className="hidden lg:inline-flex p-2.5 rounded-full hover:bg-slate-700/50 transition-colors group"
            >
              <FiUser className="h-5 w-5 text-slate-300 group-hover:text-green-300 transition-colors" />
            </Link>
            {/* Cart with bounce animation */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-full hover:bg-slate-700/50 transition-colors"
            >
              <FaOpencart 
                className={`h-5 w-5 text-slate-300 hover:text-green-200 transition-transform ${
                  cartBounce ? 'animate-bounce' : ''
                }`} 
              />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-green-500 rounded-full transform transition-transform duration-300 hover:scale-110">
                  {cartCount}
                </span>
              )}
            </Link>
            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden ml-2 p-2 rounded-full text-slate-300 hover:bg-gray-700 transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <FiX className="h-6 w-6 text-white" /> : <FiMenu className="h-6 w-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        {/* Side Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-4/5 max-w-xs bg-gradient-to-b from-gray-900 via-slate-900 to-black backdrop-blur-xl shadow-2xl transform transition-transform duration-500 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-5 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <img 
                src={logo} 
                alt="RushBasket Logo" 
                className="h-10 w-10"
              />
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">
                RushBasket
              </span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 rounded-full transition-colors hover:bg-slate-800"
              aria-label="Close menu"
            >
              <FiX className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="p-4 space-y-2">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center p-4 rounded-xl transition-all duration-300 hover:bg-slate-800/60 text-slate-200 hover:text-green-300"
                style={{
                  transitionDelay: isOpen ? `${index * 100}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: `translateX(${isOpen ? 0 : '20px'})`
                }}
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span className="text-lg">{item.name}</span>
              </Link>
            ))}

            <div className="pt-4 mt-4 grid grid-cols-2 gap-3 border-t border-slate-800">
              <Link
                to="/login"
                className="col-span-2 flex items-center justify-center p-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 group"
                onClick={() => setIsOpen(false)}
              >
                <FiUser className="mr-2 transform group-hover:scale-110 transition-transform" />
                Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}