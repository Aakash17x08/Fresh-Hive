import React, { useState } from 'react';
import { groceryData } from './dummyDataItem.jsx';
import { FiArrowLeft, FiChevronDown, FiChevronUp, FiPlus, FiMinus } from 'react-icons/fi';

// Enhanced Add to Cart Button
const AddToCartButton = () => (
  <button className="mt-3 w-full bg-emerald-400 hover:bg-emerald-300 text-black cursor-pointer py-3 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-[1.02] group font-bold shadow-lg shadow-emerald-900/20">
    <span>Add to Cart</span>
    <span className="ml-2 text-xl transform group-hover:translate-x-1 transition-transform">
      →
    </span>
  </button>
);

// Product Card with improved design
const ProductCard = ({ item }) => (
  <div className="bg-emerald-900 rounded-2xl overflow-hidden shadow-2xl shadow-emerald-950 hover:shadow-emerald-900/50 transition-all duration-300 hover:-translate-y-1 border-2 border-emerald-700">
    <div className="h-48 relative overflow-hidden">
      <img 
        src={item.image} 
        className="object-contain w-full h-full transition-transform duration-500" 
        alt={item.name}
      />
    </div>
    <div className="p-5">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-emerald-50 text-lg truncate max-w-[70%]">
          {item.name}
        </h3>
      </div>
      
      <p className="mt-2 text-emerald-200 text-sm h-12 overflow-hidden">
        {item.description || `Fresh organic ${item.name.toLowerCase()} sourced locally`}
      </p>
      
      <div className="mt-4 flex justify-between items-center">
        <span className="text-emerald-50 font-bold text-xl">
          ₹{item.price.toFixed(2)}
        </span>
        <span className="text-emerald-300 line-through text-sm">
          ₹{(item.price * 1.15).toFixed(2)}
        </span>
      </div>
      <AddToCartButton />
    </div>
  </div>
);

// Main Items Component
const Items = () => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [allExpanded, setAllExpanded] = useState(false);
  
  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  
  const toggleAllCategories = () => {
    if (allExpanded) {
      setExpandedCategories({});
    } else {
      const expanded = {};
      groceryData.forEach(category => {
        expanded[category.id] = true;
      });
      setExpandedCategories(expanded);
    }
    setAllExpanded(!allExpanded);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-emerald-950">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <header className="mb-12 text-center py-8 relative">
          <div className="absolute top-5 left-0 flex items-center text-emerald-300 hover:text-emerald-100 cursor-pointer transition-colors">
            <FiArrowLeft className="mr-2" />
            <span>Back</span>
          </div>
          
          <h1 className="text-5xl font-bold text-emerald-100 mt-7 tracking-tight">
            <span className="text-emerald-400">Organic</span> Pantry
          </h1>
          <p className="text-emerald-300 mt-4 max-w-2xl mx-auto text-lg">
            Premium quality groceries sourced from local organic farms
          </p>
          
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
          </div>
        </header>

        {/* Global Expand/Collapse Button */}
        <div className="flex justify-center mb-10">
          <button 
            onClick={toggleAllCategories}
            className="flex items-center bg-emerald-800 hover:bg-emerald-700 cursor-pointer text-emerald-200 py-3 px-6 rounded-full transition-all shadow-lg shadow-emerald-950 hover:shadow-emerald-900/50"
          >
            <span className="mr-2 font-medium">{allExpanded ? 'Collapse All Categories' : 'Expand All Categories'}</span>
            {allExpanded ? <FiMinus className="text-lg" /> : <FiPlus className="text-lg" />}
          </button>
        </div>

        {/* Categories */}
        {groceryData.map(category => {
          const isExpanded = expandedCategories[category.id] || allExpanded;
          const visibleItems = isExpanded ? category.items : category.items.slice(0, 4);
          const hasMoreItems = category.items.length > 4;
          
          return (
            <section key={category.id} className="mb-16">
              <div className="flex items-center mb-8">
                <div className="w-3 h-8 bg-emerald-400 rounded-full mr-3"></div>
                <h2 className="text-3xl font-bold text-emerald-100">{category.name}</h2>
                <div className="ml-4 flex-1 h-px bg-gradient-to-r from-emerald-700 to-transparent"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {visibleItems.map(item => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
              
              {hasMoreItems && (
                <div className="mt-8 flex justify-center">
                  <button 
                    onClick={() => toggleCategory(category.id)}
                    className="flex items-center bg-emerald-600 hover:bg-emerald-500 text-black py-3 px-6 rounded-full transition-all shadow-lg cursor-pointer shadow-emerald-950 hover:shadow-emerald-900/50"
                  >
                    <span className="mr-2 font-medium">
                      {isExpanded 
                        ? `Show Less ${category.name}` 
                        : `Show More ${category.name} (${category.items.length - 4}+)`
                      }
                    </span>
                    {isExpanded ? <FiChevronUp className="text-lg" /> : <FiChevronDown className="text-lg" />}
                  </button>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Items;