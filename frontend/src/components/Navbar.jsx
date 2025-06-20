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
import { navbarStyles } from '../assets/dummyStyles';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(location.pathname);
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const prevCartCountRef = useRef(cartCount);
  const [cartBounce, setCartBounce] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  // Check login status on mount and when location changes
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, [location]);

  // Listen for auth state changes from other components
  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    };

    window.addEventListener('authStateChanged', handleAuthChange);
    return () => {
      window.removeEventListener('authStateChanged', handleAuthChange);
    };
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: <FiHome className="text-xl" /> },
    { name: 'Items', path: '/items', icon: <FiShoppingBag className="text-xl" /> },
    { name: 'Contact', path: '/contact', icon: <FiMail className="text-xl" /> },
  ];

  return (
    <nav className={`${navbarStyles.nav} ${scrolled ? navbarStyles.scrolledNav : navbarStyles.unscrolledNav
      }`}>
      {/* Animated border gradient */}
      <div className={navbarStyles.borderGradient}></div>

      {/* Animated particles */}
      <div className={navbarStyles.particlesContainer}>
        <div className={`${navbarStyles.particle} w-24 h-24 bg-emerald-500/5 -top-12 left-1/4 ${navbarStyles.floatAnimation}`}></div>
        <div className={`${navbarStyles.particle} w-32 h-32 bg-green-500/5 -bottom-16 left-2/3 ${navbarStyles.floatSlowAnimation}`}></div>
        <div className={`${navbarStyles.particle} w-16 h-16 bg-teal-500/5 -top-8 left-3/4 ${navbarStyles.floatSlowerAnimation}`}></div>
      </div>

      <div className={navbarStyles.container}>
        <div className={navbarStyles.innerContainer}>
          {/* Logo with heading */}
          <Link
            to="/"
            className={navbarStyles.logoLink}
          >
            <img
              src={logo}
              alt="RushBasket Logo"
              className={`${navbarStyles.logoImage} ${scrolled ? "h-10 w-10" : "h-12 w-12"
                }`}
            />
            <span className={navbarStyles.logoText}>
              RushBasket
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className={navbarStyles.desktopNav}>
            {navItems.map(item => (
              <Link
                key={item.name}
                to={item.path}
                className={`${navbarStyles.navItem} ${activeTab === item.path
                    ? navbarStyles.activeNavItem
                    : navbarStyles.inactiveNavItem
                  }`}
              >
                <div className="flex items-center">
                  <span
                    className={`${navbarStyles.navIcon} ${activeTab === item.path
                        ? navbarStyles.activeNavIcon
                        : navbarStyles.inactiveNavIcon
                      }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>
                <div
                  className={`${navbarStyles.navIndicator} ${activeTab === item.path
                      ? navbarStyles.activeIndicator
                      : navbarStyles.inactiveIndicator
                    }`}
                />
              </Link>
            ))}
          </div>

          {/* Icons & Hamburger */}
          <div className={navbarStyles.iconsContainer}>
            {/* Login with indicator */}
            <Link
              to="/login"
              className={navbarStyles.loginLink}
            >
              <div className="relative">
                <FiUser className={navbarStyles.loginIcon} />
                {isLoggedIn && (

                  <span className="absolute -top-1 -right-1 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white "></span>

                )}
              </div>
            </Link>
            {/* Cart with bounce animation */}
            <Link
              to="/cart"
              className={navbarStyles.cartLink}
            >
              <FaOpencart
                className={`${navbarStyles.cartIcon} ${cartBounce ? 'animate-bounce' : ''}`}
              />
              {cartCount > 0 && (
                <span className={navbarStyles.cartBadge}>
                  {cartCount}
                </span>
              )}
            </Link>
            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={navbarStyles.hamburgerButton}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <FiX className="h-6 w-6 text-white" /> : <FiMenu className="h-6 w-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`${navbarStyles.mobileOverlay} ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        onClick={() => setIsOpen(false)}
      >
        {/* Side Panel */}
        <div
          className={`${navbarStyles.mobilePanel} ${isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          onClick={e => e.stopPropagation()}
        >
          <div className={navbarStyles.mobileHeader}>
            <div className={navbarStyles.mobileLogo}>
              <img
                src={logo}
                alt="RushBasket Logo"
                className={navbarStyles.mobileLogoImage}
              />
              <span className={navbarStyles.mobileLogoText}>
                RushBasket
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={navbarStyles.closeButton}
              aria-label="Close menu"
            >
              <FiX className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className={navbarStyles.mobileItemsContainer}>
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={navbarStyles.mobileItem}
                style={{
                  transitionDelay: isOpen ? `${index * 100}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: `translateX(${isOpen ? 0 : '20px'})`
                }}
                onClick={() => setIsOpen(false)}
              >
                <span className={navbarStyles.mobileItemIcon}>{item.icon}</span>
                <span className={navbarStyles.mobileItemText}>{item.name}</span>
              </Link>
            ))}

            <div className={navbarStyles.mobileButtons}>
              <Link
                to="/login"
                className={navbarStyles.loginButton}
                onClick={() => setIsOpen(false)}
              >
                <div className="relative">
                  <FiUser className={navbarStyles.loginButtonIcon} />
                  {isLoggedIn && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white"></span>
                  )}
                </div>
                Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style>{navbarStyles.customCSS}</style>
    </nav>
  );
}