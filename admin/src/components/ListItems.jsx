// src/pages/admin/ListItemsPage.jsx
import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiPlus, FiEdit, FiTrash2, FiAlertCircle, FiPackage } from 'react-icons/fi';

const StatsCard = ({ icon: Icon, color, border, label, value }) => (
  <div className={`bg-white rounded-xl shadow p-6 border-l-4 ${border}`}>
    <div className="flex items-center">
      <div className={`${color} p-3 rounded-full mr-4`}>
        <Icon className={`${color.replace('bg-', 'text-')} text-xl`} />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);

const StockAlertSection = ({ title, color, items, count }) => {
  const bgColor = `bg-${color}-500`;
  const textColor = `text-${color}-700`;
  const hoverTextColor = `hover:text-${color}-900`;
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className={`${bgColor} p-4`}>
        <h2 className="text-lg font-bold text-white flex items-center">
          <FiAlertCircle className="mr-2" />
          {title} ({count})
        </h2>
      </div>
      <div className="p-4">
        {count === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500">
              {title.includes('Out') ? 'All products are in stock' : 'No low stock items'}
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {items.map(item => (
              <div key={item.id} className="flex items-center border-b border-gray-100 pb-3 last:border-0">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-12 h-12 object-cover rounded-lg mr-3"
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 mr-3" />
                )}
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.category}</div>
                </div>
                {title.includes('Out') ? (
                  <button
                    onClick={() => {
                      localStorage.setItem('editItem', JSON.stringify(item));
                      window.location.href = `/admin/add-item?edit=${item.id}`;
                    }}
                    className="ml-auto text-sm bg-red-100 hover:bg-red-200 text-red-700 py-1 px-3 rounded-full transition-colors"
                  >
                    Restock
                  </button>
                ) : (
                  <div className="ml-auto text-right">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800`}>
                      {item.stock} left
                    </div>
                    <button
                      onClick={() => {
                        localStorage.setItem('editItem', JSON.stringify(item));
                        window.location.href = `/admin/add-item?edit=${item.id}`;
                      }}
                      className={`text-xs mt-1 ${textColor} ${hoverTextColor}`}
                    >
                      Restock
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ListItemsPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm] = useState('');
  const [selectedCategory] = useState('All');
  const [stockFilter] = useState('All');
  const [sortBy] = useState('name');
  const [sortOrder] = useState('asc');
  
  useEffect(() => {
    const savedItems = localStorage.getItem('adminItems');
    if (savedItems) setItems(JSON.parse(savedItems));
  }, []);

  useEffect(() => {
    let result = [...items];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(item => item.category === selectedCategory);
    }
    
    // Apply stock filter
    if (stockFilter === 'In Stock') {
      result = result.filter(item => item.stock > 0);
    } else if (stockFilter === 'Out of Stock') {
      result = result.filter(item => item.stock === 0);
    } else if (stockFilter === 'Low Stock') {
      result = result.filter(item => item.stock > 0 && item.stock <= 10);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (sortBy === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      } else if (sortBy === 'stock') {
        return sortOrder === 'asc' ? a.stock - b.stock : b.stock - a.stock;
      }
      return 0;
    });
    
    setFilteredItems(result);
  }, [items, searchTerm, selectedCategory, stockFilter, sortBy, sortOrder]);

  const handleDelete = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('adminItems', JSON.stringify(updatedItems));
  };

  const outOfStockItems = items.filter(item => item.stock === 0);
  const lowStockItems = items.filter(item => item.stock > 0 && item.stock <= 10);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-2">
            Product Inventory
          </h1>
          <p className="text-gray-600">
            Manage your product listings, stock levels, and categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatsCard 
            icon={FiPackage} 
            color="bg-emerald-100" 
            border="border-emerald-500"
            label="Total Products"
            value={items.length}
          />
          <StatsCard 
            icon={FiAlertCircle} 
            color="bg-amber-100" 
            border="border-amber-500"
            label="Low Stock"
            value={lowStockItems.length}
          />
          <StatsCard 
            icon={FiAlertCircle} 
            color="bg-red-100" 
            border="border-red-500"
            label="Out of Stock"
            value={outOfStockItems.length}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-emerald-800">
                  All Products ({filteredItems.length})
                </h2>
                <button 
                  className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg transition-colors"
                  onClick={() => window.location.href = '/admin/add-item'}
                >
                  <FiPlus className="mr-2" />
                  Add New
                </button>
              </div>

              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <FiPackage className="text-gray-500 text-2xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
                  <p className="text-gray-500">Try changing your filters or add a new product</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-500">Product</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-500">Category</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-500">Price</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-500">Stock</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredItems.map(item => {
                        const stockStatus = item.stock > 10 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : item.stock > 0 
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800';
                        
                        return (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                {item.image ? (
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-10 h-10 object-cover rounded-lg mr-3"
                                  />
                                ) : (
                                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                                )}
                                <div>
                                  <div className="font-medium text-gray-900">{item.name}</div>
                                  <div className="text-sm text-gray-500 line-clamp-1">{item.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-500">
                              {item.category}
                            </td>
                            <td className="py-4 px-4">
                              <div className="font-medium text-emerald-600">₹{item.price.toFixed(2)}</div>
                              {item.oldPrice > item.price && (
                                <div className="text-xs text-gray-400 line-through">
                                  ₹{item.oldPrice.toFixed(2)}
                                </div>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus}`}>
                                {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => {
                                    localStorage.setItem('editItem', JSON.stringify(item));
                                    window.location.href = `/admin/add-item?edit=${item.id}`;
                                  }}
                                  className="text-gray-500 hover:text-emerald-600 transition-colors"
                                >
                                  <FiEdit size={18} />
                                </button>
                                <button
                                  onClick={() => handleDelete(item.id)}
                                  className="text-gray-500 hover:text-red-600 transition-colors"
                                >
                                  <FiTrash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <StockAlertSection 
              title="Out of Stock" 
              color="red" 
              items={outOfStockItems} 
              count={outOfStockItems.length} 
            />
            <StockAlertSection 
              title="Low Stock" 
              color="amber" 
              items={lowStockItems} 
              count={lowStockItems.length} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItemsPage;