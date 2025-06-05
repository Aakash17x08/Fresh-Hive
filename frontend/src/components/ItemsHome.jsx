import React, { useState } from "react";
import { FaShoppingCart, FaChevronRight, FaFire, FaStar } from "react-icons/fa";
import { categories, products } from "../components/dummyData.jsx";
import { useNavigate } from "react-router-dom";

const ItemsHome = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Filter products by active category
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  // Add to cart function
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  // Redirect to items page with category filter
  const redirectToItemsPage = () => {
    navigate("/items", { state: { category: activeCategory } });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Sidebar Design with Rounded Right Edge */}
      <div className="w-64 rounded-r-3xl bg-gradient-to-b from-emerald-600 to-emerald-800 text-white p-4 shadow-2xl flex flex-col">
        {/* Brand Header */}
        <div className="text-center mb-8 mt-4">
          <h1
            className="text-4xl font-bold tracking-tighter"
            style={{
              fontFamily: "'Pacifico', cursive",
              textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            FreshCart
          </h1>
          <div className="w-32 h-1 bg-emerald-400 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Categories with Custom Scrollbar */}
        <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-emerald-700 scrollbar-thumb-rounded-full">
          <ul className="space-y-3">
            {categories.map((category) => (
              <li key={category.name}>
                <button
                  onClick={() => setActiveCategory(category.name)}
                  className={`w-full cursor-pointer flex items-center p-4 rounded-xl transition-all transform hover:scale-105 ${
                    activeCategory === category.name
                      ? "bg-white text-emerald-700 font-bold shadow-lg"
                      : "bg-emerald-700 hover:bg-emerald-500"
                  }`}
                >
                  {/* Circular Icon Container */}
                  <div className="bg-emerald-500 p-3 rounded-full">
                    {category.icon}
                  </div>
                  <span className="ml-4 text-lg">{category.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2
              className="text-3xl font-bold text-gray-800 capitalize"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              {activeCategory === "All"}
            </h2>
          </div>
        </div>

        {/* Product Grid with Improved Image Display */}
        <div className="text-center mb-6">
          <h2
            className="text-3xl font-bold text-emerald-700 capitalize mb-2"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {activeCategory === "All"
              ? "Featured Products"
              : "Best " + activeCategory}
          </h2>
          <div className="w-32 h-1 bg-emerald-500 mx-auto rounded-full mb-6"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {filteredProducts.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
            >
              {/* ←–– FIXED-HEIGHT IMAGE CONTAINER ––→ */}
              <div className="w-full h-52 bg-gray-100 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full object-cover transition-transform duration-300 "
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.parentNode.innerHTML = `
                      <div class="flex items-center justify-center w-full h-full bg-gray-200">
                        <span class="text-gray-500 text-sm">No Image</span>
                      </div>
                    `;
                  }}
                />
              </div>
             

              {/* Product Info */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-800 text-center mb-2 line-clamp-1">
                  {product.name}
                </h3>

                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-emerald-600 font-bold text-xl">
                      ₹{product.price.toFixed(2)}
                    </p>
                    <span className="text-gray-500 text-sm line-through">
                      ₹{(product.price * 1.2).toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-4 py-2 cursor-pointer rounded-full flex items-center transition-colors shadow-md hover:shadow-lg"
                  >
                    <FaShoppingCart className="mr-2" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mb-10">
          <button
            onClick={redirectToItemsPage}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center text-lg"
          >
            View All {activeCategory === "All" ? "Products" : activeCategory}
            <FaChevronRight className="ml-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemsHome;
