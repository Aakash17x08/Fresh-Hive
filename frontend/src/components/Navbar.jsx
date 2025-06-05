import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiGrid, 
  FiTag, 
  FiGift, 
  FiInfo,
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiX,
  FiMenu,
  FiHeart
} from 'react-icons/fi';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(location.pathname);
  const cartItems = 3; // Example cart count

  // Nav items data with icons
  const navItems = [
    { name: 'Home', path: '/', icon: <FiHome className="text-xl" /> },
    { name: 'Items', path: '/items', icon: <FiGrid className="text-xl" /> },
    { name: 'Contact', path: '/contact', icon: <FiTag className="text-xl" /> },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active tab on route change
  useEffect(() => {
    setActiveTab(location.pathname);
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white shadow-lg py-0' 
        : 'bg-gradient-to-r from-lime-50 to-emerald-50 py-2'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with animation */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center space-x-2"
            >
              <div className="bg-gradient-to-br from-lime-500 to-emerald-600 text-white p-2 rounded-xl shadow-md transform rotate-6 hover:rotate-0 transition-transform duration-300 hover:shadow-lg">
                <div className="bg-white text-emerald-600 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 group-hover:text-lime-600">
                  <span className="font-bold text-xl">L</span>
                </div>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-600 to-emerald-700 font-serif tracking-wide">
                LuxeBazaar
              </span>
            </Link>
          </div>

          {/* Desktop Navigation with active indicator */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative font-medium flex items-center py-1.5 px-4 rounded-lg group transition-all duration-200 ${
                  activeTab === item.path 
                    ? 'bg-gradient-to-r from-emerald-50 to-lime-50 text-emerald-700 font-semibold'
                    : 'text-gray-600 hover:text-emerald-800'
                }`}
              >
                <span className={`mr-2 transition-colors ${
                  activeTab === item.path ? 'text-emerald-600' : 'text-gray-500 group-hover:text-emerald-700'
                }`}>
                  {item.icon}
                </span>
                {item.name}
                <span className={`absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-emerald-400 to-lime-400 rounded-full transition-all duration-300 ${
                  activeTab === item.path ? 'opacity-100 scale-100' : 'opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100'
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Icons Section */}
          <div className="flex items-center space-x-4">
           
            <Link to="/login" className="p-2.5 rounded-full hover:bg-lime-100 transition-colors group">
              <FiUser className="h-5 w-5 text-gray-600 group-hover:text-emerald-700 transition-colors" />
            </Link>

            <Link to="/cart" className="relative p-2.5 rounded-full hover:bg-lime-100 transition-colors">
              <FiShoppingCart className="h-5 w-5 text-gray-600 hover:text-emerald-700 transition-colors" />
              
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden ml-2 p-2 rounded-full text-gray-600 hover:bg-lime-100 focus:outline-none transition-colors"
            >
              {isOpen ? (
                <FiX className="h-6 w-6 text-emerald-700" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Enhanced Animation */}
      <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
        isOpen 
          ? 'bg-black bg-opacity-30 backdrop-blur-sm' 
          : 'bg-transparent pointer-events-none'
      }`} onClick={() => setIsOpen(false)}>
        <div 
          className={`absolute top-0 left-0 h-full w-4/5 max-w-xs bg-gradient-to-b from-white to-emerald-50 shadow-2xl transform transition-transform duration-500 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-5 border-b border-emerald-100">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-lime-500 to-emerald-600 text-white p-1.5 rounded-lg">
                <div className="bg-white text-emerald-600 w-6 h-6 rounded-md flex items-center justify-center">
                  <span className="font-bold">L</span>
                </div>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-600 to-emerald-700 font-serif">
                LuxeBazaar
              </span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-lime-100 transition-colors"
            >
              <FiX className="h-6 w-6 text-emerald-700" />
            </button>
          </div>
          
          <div className="p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center p-4 rounded-xl transition-all duration-300 transform hover:translate-x-1 group ${
                  activeTab === item.path
                    ? 'bg-gradient-to-r from-emerald-50/80 to-lime-50/80 border-l-4 border-emerald-500 shadow-sm'
                    : 'hover:bg-lime-50/50'
                }`}
              >
                <span className={`mr-3 text-lg ${
                  activeTab === item.path ? 'text-emerald-600' : 'text-gray-500 group-hover:text-emerald-700'
                }`}>
                  {item.icon}
                </span>
                <span className={`text-lg font-medium ${
                  activeTab === item.path ? 'text-emerald-700 font-semibold' : 'text-gray-700'
                }`}>
                  {item.name}
                </span>
              </Link>
            ))}
            
            <div className="pt-4 mt-4 border-t border-emerald-100 grid grid-cols-2 gap-3">
             
              
              <Link 
                to="/cart" 
                className="flex items-center justify-center p-3 text-amber-700 hover:bg-amber-50 rounded-xl transition-colors group relative"
              >
                <FiShoppingCart className="mr-2 group-hover:animate-bounce" />
                Cart
                {cartItems > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gradient-to-br from-amber-500 to-orange-500 rounded-full">
                    {cartItems}
                  </span>
                )}
              </Link>
              
              <Link 
                to="/login" 
                className="col-span-2 flex items-center justify-center p-3 mt-2 bg-gradient-to-r from-emerald-500 to-lime-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <FiUser className="mr-2" />
                Sign In / Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}