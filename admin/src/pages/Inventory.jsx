import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import ProductTable from '../components/OrderManagement';

const Products = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Organic Bananas', category: 'Fruits', price: 1.99, stock: 42, status: 'In Stock' },
    { id: 2, name: 'Free Range Eggs', category: 'Dairy', price: 4.99, stock: 0, status: 'Out of Stock' },
    { id: 3, name: 'Avocados', category: 'Vegetables', price: 2.49, stock: 15, status: 'Low Stock' },
    { id: 4, name: 'Whole Wheat Bread', category: 'Bakery', price: 3.49, stock: 28, status: 'In Stock' },
    { id: 5, name: 'Almond Milk', category: 'Beverages', price: 3.99, stock: 36, status: 'In Stock' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Product Management</h2>
        <Link 
          to="/admin/products/add" 
          className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg"
        >
          <FiPlus className="mr-2" /> Add Product
        </Link>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <ProductTable products={filteredProducts} onDelete={handleDelete} />
    </div>
  );
};

export default Products;