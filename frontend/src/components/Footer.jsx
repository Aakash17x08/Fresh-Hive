// src/components/Footer.jsx

import React from 'react';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
  FaApplePay
} from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';
import { BsTelephone } from 'react-icons/bs';
import { FiLink, FiBookmark, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white pt-12 pb-8 relative overflow-hidden border-t-8 border-emerald-500">
      {/* Decorative backgrounds - hide on small screens */}
      <div className="hidden md:block absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-emerald-400 z-20"></div>
      {/** Floating shapes */}
      <div className="hidden lg:block absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-700 opacity-20 animate-pulse-slow"></div>
      <div className="hidden lg:block absolute -bottom-40 -left-24 w-96 h-96 rounded-full bg-emerald-700 opacity-15 animate-pulse-slow animation-delay-2000"></div>
      <div className="hidden lg:block absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-emerald-600 opacity-10 animate-pulse animation-delay-1000"></div>

      {/* Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z' fill='%23137b50'/%3E%3C/svg%3E")`,
        backgroundSize: '60px'
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-wider mb-4">
              RUSH<span className="text-emerald-300">BASKET</span>
            </h2>
            <p className="text-emerald-200 mb-6 leading-relaxed text-sm sm:text-base">
              Bringing you the freshest organic produce since 2010. Our mission is to deliver farm-fresh goodness straight to your doorstep.
            </p>
            <div className="flex space-x-3">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, idx) => (
                <a key={idx} href="#" className="bg-emerald-700 hover:bg-emerald-600 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-transform transform hover:-translate-y-1 shadow-md">
                  <Icon className="text-emerald-100 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 pb-2 border-b-2 border-emerald-500 inline-flex items-center">
              <FiLink className="mr-2 text-emerald-400" /> Quick Links
            </h3>
            <ul className="space-y-2 text-sm sm:text-base">
              {['About Us', 'Our Products', 'Farmers Network', 'Delivery Information', 'Privacy Policy', 'Terms & Conditions'].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="flex items-center group hover:text-white">
                    <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 pb-2 border-b-2 border-emerald-500 inline-flex items-center">
              <BsTelephone className="mr-2 text-emerald-400 text-lg" /> Contact Us
            </h3>
            <ul className="space-y-4 text-sm sm:text-base">
              <li className="flex items-start">
                <div className="mt-1 bg-emerald-700 p-2 rounded-lg mr-3">
                  <FaMapMarkerAlt className="text-emerald-300" />
                </div>
                <div>
                  <p>123 Organic Valley, Green City, GC 54321</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mt-1 bg-emerald-700 p-2 rounded-lg mr-3">
                  <FaPhone className="text-emerald-300" />
                </div>
                <div>
                  <p>+91 (123) LUCKNOW</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mt-1 bg-emerald-700 p-2 rounded-lg mr-3">
                  <FaEnvelope className="text-emerald-300" />
                </div>
                <div>
                  <p>hexagonsservices@gmail.com</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 pb-2 border-b-2 border-emerald-500 inline-flex items-center">
              <FiMail className="mr-2 text-emerald-400 text-lg" /> Newsletter
            </h3>
            <p className="text-emerald-200 mb-4 text-sm sm:text-base">
              Subscribe to our newsletter for fresh updates, exclusive offers, and seasonal recipes!
            </p>
            {/* Updated flex with spacing and responsive widths */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full sm:flex-1 bg-emerald-800 border-2 border-emerald-600 rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none px-4 py-2 text-white placeholder-emerald-300 focus:outline-none focus:border-emerald-400 mb-2 sm:mb-0"
              />
              <button className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 px-4 py-2 rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none flex items-center justify-center transition-transform transform hover:-translate-y-1">
                <BiMailSend className="mr-2 text-lg" />
                <span>Subscribe</span>
              </button>
            </div>
            <p className="text-emerald-300 text-xs sm:text-sm">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t-2 border-emerald-800 pt-6">
          <h4 className="text-emerald-300 mb-4 font-medium flex items-center justify-center text-sm sm:text-base">
            <FiBookmark className="mr-2 text-emerald-400 text-lg" /> We Accept All Major Payment Methods
          </h4>
          <div className="flex flex-wrap justify-center gap-4">
            {[FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex, FaApplePay].map((Icon, idx) => (
              <div key={idx} className="bg-emerald-800 p-3 rounded-lg hover:bg-emerald-700 transition-transform transform hover:-translate-y-1">
                <Icon className="text-2xl hover:text-white" />
              </div>
            ))}
          </div>
        </div>

        {/* Attribution */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center bg-emerald-900 px-6 py-3 rounded-full border border-emerald-700 shadow-lg">
            <div className="relative mr-3">
              <div className="w-6 h-6 bg-emerald-500 rounded-sm transform rotate-45"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-white transform -rotate-45"></div>
              </div>
            </div>
            <span className="text-emerald-200 text-sm sm:text-base">
              Designed by{' '}
              <a
                href="https://hexagondigitalservices.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white underline hover:text-purple-400"
              >
                Hexagon Digital Services
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.05); }
          100% { opacity: 0.1; transform: scale(1); }
        }
        @keyframes pulse-slow {
          0% { opacity: 0.1; }
          50% { opacity: 0.2; }
          100% { opacity: 0.1; }
        }
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        .animate-pulse { animation: pulse 4s ease-in-out infinite; }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
      `}</style>
    </footer>
  );
};

export default Footer;
