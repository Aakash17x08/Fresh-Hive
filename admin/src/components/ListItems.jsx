// src/pages/admin/ListItemsPage.jsx
import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiPlus, FiEdit, FiTrash2, FiPackage } from 'react-icons/fi';

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

const ListItemsPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm] = useState('');
  const [selectedCategory] = useState('All');
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
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (sortBy === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });
    
    setFilteredItems(result);
  }, [items, searchTerm, selectedCategory, sortBy, sortOrder]);

  const handleDelete = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('adminItems', JSON.stringify(updatedItems));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-2">
            Product Inventory
          </h1>
          <p className="text-gray-600">
            Manage your product listings and categories
          </p>
        </div>

        {/* Simplified stats section - only total products */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <StatsCard 
            icon={FiPackage} 
            color="bg-emerald-100" 
            border="border-emerald-500"
            label="Total Products"
            value={items.length}
          />
        </div>

        <div className="grid grid-cols-1">
          <div>
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
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredItems.map(item => (
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
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItemsPage;