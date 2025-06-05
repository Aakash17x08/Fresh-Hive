import React, { useState } from 'react';
import { FiSearch, FiShoppingCart, FiTruck, FiPercent, FiGift } from 'react-icons/fi';
import BannerFood from '../assets/FoodBanner.png'; // ← Replace with your actual image path

const BannerHome = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search submit (you can integrate real search logic here)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      alert(`Searching for: ${searchTerm}`);
      // TODO: Navigate/send to actual results page
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-lime-100 z-0"></div>

      {/* Decorative circles */}
      <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-emerald-200 opacity-25"></div>
      <div className="absolute bottom-16 right-32 w-36 h-36 rounded-full bg-lime-200 opacity-25"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-yellow-200 opacity-25"></div>

      {/* Banner container */}
      <div className="relative z-10 mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Free delivery badge */}
            <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full mb-3">
              <span className="flex items-center text-sm md:text-base">
                <FiTruck className="mr-2" /> Free delivery on orders over ₹500
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5">
              Fresh{' '}
              <span className="font-cursive text-4xl md:text-5xl lg:text-6xl text-emerald-600">
                Groceries
              </span>
              <br />Delivered to Your Door
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-lg text-gray-600 mb-6 max-w-2xl">
              Discover the freshest produce, top‐quality meats, and pantry essentials—all delivered within 30 minutes.
            </p>

            {/* Search bar */}
            <div className="mb-8 max-w-2xl mx-auto lg:mx-0">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search for fruits, vegetables, meats, dairy..."
                  className="w-full py-4 px-5 pr-14 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent shadow-md"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-emerald-500 hover:bg-emerald-600 text-white p-2.5 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <FiSearch className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <FiTruck className="h-7 w-7" />, text: 'Fast Delivery' },
                { icon: <FiPercent className="h-7 w-7" />, text: 'Best Prices' },
                { icon: <FiShoppingCart className="h-7 w-7" />, text: 'Easy Returns' },
                { icon: <FiGift className="h-7 w-7" />, text: 'Daily Deals' },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-3 flex flex-col items-center shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="text-emerald-500 mb-1.5">{feature.icon}</div>
                  <span className="text-gray-700 font-medium text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-gray-200 rounded-xl overflow-hidden w-full h-64 md:h-80 lg:h-[350px] shadow-lg">
                <img
                  src={BannerFood}
                  alt="Gorgeous Grocery Banner"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* More decorative circles */}
            <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full bg-yellow-200 z-0 opacity-25"></div>
            <div className="absolute -bottom-5 -left-5 w-32 h-32 rounded-full bg-emerald-200 z-0 opacity-25"></div>
            <div className="absolute top-1/4 -left-8 w-20 h-20 rounded-full bg-lime-200 z-0 opacity-25"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerHome;
