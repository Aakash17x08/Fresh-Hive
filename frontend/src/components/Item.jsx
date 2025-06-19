import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiChevronDown, FiChevronUp, FiPlus, FiMinus, FiX, FiSearch } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { groceryData } from './dummyDataItem';

const ProductCard = ({ item }) => {
  const { addToCart, removeFromCart, updateQuantity, cart } = useCart();
  
  // Get current quantity in cart
  const cartItem = cart.find(cartItem => cartItem.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  
  const handleAddToCart = () => {
    addToCart(item);
  };
  
  const handleIncrement = () => {
    if (quantity === 0) {
      addToCart(item);
    } else {
      updateQuantity(item.id, quantity + 1);
    }
  };
  
  const handleDecrement = () => {
    if (quantity === 1) {
      removeFromCart(item.id);
    } else if (quantity > 1) {
      updateQuantity(item.id, quantity - 1);
    }
  };

  return (
    <div className="bg-emerald-900 rounded-2xl overflow-hidden shadow-2xl shadow-emerald-950 hover:shadow-emerald-900/50 transition-all duration-300 hover:-translate-y-1 border-2 border-emerald-700">
      <div className="h-48 relative overflow-hidden bg-emerald-950 flex items-center justify-center">
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
          <span className="text-black text-sm bg-emerald-400 px-2 py-1 rounded-full">
            Organic
          </span>
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
        
        <div className="mt-3">
          {quantity > 0 ? (
            <div className="flex items-center justify-between bg-emerald-400 text-black rounded-full">
              <button 
                onClick={handleDecrement}
                className="p-3 cursor-pointer rounded-l-full hover:bg-emerald-300 transition-colors"
              >
                <FiMinus />
              </button>
              <span className="font-bold">{quantity}</span>
              <button 
                onClick={handleIncrement}
                className="p-3 cursor-pointer rounded-r-full hover:bg-emerald-300 transition-colors"
              >
                <FiPlus />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleAddToCart}
              className="w-full bg-emerald-400 hover:bg-emerald-300 text-black cursor-pointer py-3 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-[1.02] group font-bold shadow-lg shadow-emerald-900/20"
            >
              <span>Add to Cart</span>
              <span className="ml-2 text-xl transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Items = () => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [allExpanded, setAllExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Read search query from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get('search');
    if (search) {
      setSearchTerm(search);
    }
  }, [location]);

  // Enhanced search function
  const itemMatchesSearch = (item, term) => {
    if (!term) return true;
    
    // Remove extra spaces and convert to lowercase
    const cleanTerm = term.trim().toLowerCase();
    
    // Split into individual words
    const searchWords = cleanTerm.split(/\s+/);
    
    // Check if all search words appear in the item name
    return searchWords.every(word => 
      item.name.toLowerCase().includes(word)
    );
  };

  // Filter items based on search term
  const filteredData = searchTerm
    ? groceryData.map(category => ({
        ...category,
        items: category.items.filter(item => 
          itemMatchesSearch(item, searchTerm))
      })).filter(category => category.items.length > 0)
    : groceryData;

  // Clear search handler
  const clearSearch = () => {
    setSearchTerm('');
    navigate('/items'); // Remove query params
  };

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
        <header className="mb-12 text-center py-8 relative">
          <Link to="/" className="absolute top-5 left-0 flex items-center text-emerald-300 hover:text-emerald-100 cursor-pointer transition-colors">
            <FiArrowLeft className="mr-2" />
            <span>Back</span>
          </Link>
          
          <h1 className="text-5xl font-bold text-emerald-100 mt-7 ">
            <span className="text-emerald-400 font-playfair">ORGANIC</span> PANTRY
          </h1>
          
         
          
          <p className="text-emerald-300 mt-4 max-w-2xl mx-auto text-lg">
            Premium quality groceries sourced from local organic farms
          </p>
          
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="mb-10 max-w-2xl mx-auto">
          <form onSubmit={(e) => {
            e.preventDefault();
            if (searchTerm.trim()) {
              navigate(`/items?search=${encodeURIComponent(searchTerm)}`);
            }
          }} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search fruits, vegetables, meats..."
              className="w-full py-3 px-4 pr-12 rounded-2xl bg-emerald-800 text-emerald-100 border border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-600 text-white p-2 rounded-full"
            >
              <FiSearch className="h-5 w-5" />
            </button>
          </form>
        </div>

        <div className="flex justify-center mb-10">
          <button 
            onClick={toggleAllCategories}
            className="flex items-center bg-emerald-800 hover:bg-emerald-700 cursor-pointer text-emerald-200 py-3 px-6 rounded-full transition-all shadow-lg shadow-emerald-950 hover:shadow-emerald-900/50"
          >
            <span className="mr-2 font-medium">{allExpanded ? 'Collapse All' : 'Expand All'}</span>
            {allExpanded ? <FiMinus className="text-lg" /> : <FiPlus className="text-lg" />}
          </button>
        </div>

        {filteredData.length > 0 ? (
          filteredData.map(category => {
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
          })
        ) : (
          <div className="text-center py-16">
            <div className="bg-emerald-800 p-8 rounded-2xl max-w-md mx-auto">
              <div className="text-emerald-400 mb-4">
                <FiSearch className="mx-auto h-16 w-16" />
              </div>
              <h3 className="text-xl font-bold text-emerald-100 mb-2">
                No products found
              </h3>
              <p className="text-emerald-300 mb-6">
                We couldn't find any items matching "{searchTerm}"
              </p>
              <button
                onClick={clearSearch}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white cursor-pointer px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-colors"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Items;