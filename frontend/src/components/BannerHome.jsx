import React, { useState } from 'react';
import { FiSearch, FiShoppingCart, FiTruck, FiPercent, FiGift } from 'react-icons/fi';
import BannerFood from '../assets/FoodBanner.png';
import { useNavigate } from 'react-router-dom'; 

const BannerHome = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
 
  const handleSearch = (e) => setSearchTerm(e.target.value);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTerm = searchTerm.trim();
    
    if (trimmedTerm) {
      if (onSearch) {
        // Enhanced search for ItemsHome page
        const searchWords = trimmedTerm.toLowerCase().split(/\s+/);
        onSearch(searchWords.join(' '));
      } else {
        // Navigate to Items page with search query
        navigate(`/items?search=${encodeURIComponent(trimmedTerm)}`);
      }
      setSearchTerm('');
    }
  };

  const features = [
    { icon: <FiTruck className="h-6 w-6" />, text: 'Fast Delivery' },
    { icon: <FiPercent className="h-6 w-6" />, text: 'Best Prices' },
    { icon: <FiShoppingCart className="h-6 w-6" />, text: 'Easy Returns' },
    { icon: <FiGift className="h-6 w-6" />, text: 'Daily Deals' },
  ];

  return (
    <div className="relative overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-mint-100 to-seafoam-100 z-0"></div>

      {/* Decorative circles */}
      <div className="hidden sm:block absolute top-6 left-6 w-20 h-20 rounded-full bg-teal-100 opacity-30"></div>
      <div className="hidden md:block absolute bottom-12 right-28 w-32 h-32 rounded-full bg-seafoam-200 opacity-30"></div>
      <div className="hidden lg:block absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-mint-200 opacity-30"></div>

      <div className="relative z-10 mt-8 sm:mt-10 lg:mt-12 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Left Content */}
          <div className="text-center md:text-left">
            <div className="inline-block bg-teal-50 text-teal-800 px-3 py-1 rounded-full mb-3 border border-teal-100">
              <span className="flex items-center text-sm sm:text-base">
                <FiTruck className="mr-2" /> Free delivery on orders over ₹500
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Fresh{' '}
              <span className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-teal-700">
                Groceries
              </span>
              <br />Delivered to Your Door
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 mx-auto md:mx-0 max-w-md md:max-w-lg">
              Discover the freshest produce, top‐quality meats, and pantry essentials—all delivered within 30 minutes.
            </p>

            <form onSubmit={handleSubmit} className="relative max-w-md mx-auto md:mx-0 mb-6">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search for fruits, vegetables, meats, dairy..."
                className="w-full py-3 sm:py-4 px-4 pr-12 rounded-2xl border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-300 shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 transition-colors"
              >
                <FiSearch className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </form>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl p-2 sm:p-3 flex flex-col items-center shadow-sm border border-teal-50 hover:shadow-md transition-shadow"
                >
                  <div className="text-teal-600 mb-1">{f.icon}</div>
                  <span className="text-gray-700 font-medium text-xs sm:text-sm">
                    {f.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center">
            <div className="z-10 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md w-full transform transition-transform duration-500 hover:scale-[1.02]">
              <div className="rounded-xl overflow-hidden w-full h-48 sm:h-56 md:h-64 lg:h-[350px] shadow-lg border-4 border-white">
                <img
                  src={BannerFood}
                  alt="Fresh Groceries"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="hidden sm:block absolute -top-4 -right-4 w-20 h-20 rounded-full bg-mint-200 opacity-20"></div>
            <div className="hidden md:block absolute -bottom-4 -left-4 w-28 h-28 rounded-full bg-teal-100 opacity-20"></div>
            <div className="hidden lg:block absolute top-1/4 -left-6 w-20 h-20 rounded-full bg-seafoam-100 opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerHome;