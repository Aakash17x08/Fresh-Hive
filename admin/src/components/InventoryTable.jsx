import React, { useContext, useState } from 'react';
import { AdminContext } from '../AdminContext';
import { FiEdit, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

const InventoryTable = () => {
  const { items, outOfStockItems, lowStockItems, updateItem, deleteItem } = useContext(AdminContext);
  const [activeTab, setActiveTab] = useState('all');
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEdit = (item) => {
    setEditingItem(item.id);
    setEditForm({
      name: item.name,
      price: item.price,
      stock: item.stock,
      description: item.description,
      category: item.category
    });
  };

  const handleSave = (id) => {
    updateItem(id, editForm);
    setEditingItem(null);
  };

  const handleStockChange = (id, change) => {
    const item = items.find(i => i.id === id);
    const newStock = Math.max(0, item.stock + change);
    updateItem(id, { stock: newStock });
  };

  const getFilteredItems = () => {
    switch(activeTab) {
      case 'outOfStock': return outOfStockItems;
      case 'lowStock': return lowStockItems;
      default: return items;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            className={`py-4 px-6 text-center font-medium ${activeTab === 'all' ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('all')}
          >
            All Items ({items.length})
          </button>
          <button
            className={`py-4 px-6 text-center font-medium ${activeTab === 'lowStock' ? 'border-b-2 border-amber-500 text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('lowStock')}
          >
            Low Stock ({lowStockItems.length})
          </button>
          <button
            className={`py-4 px-6 text-center font-medium ${activeTab === 'outOfStock' ? 'border-b-2 border-red-500 text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('outOfStock')}
          >
            Out of Stock ({outOfStockItems.length})
          </button>
        </nav>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getFilteredItems().map((item) => (
              <tr 
                key={item.id} 
                className={item.stock === 0 ? 'bg-red-50' : item.stock <= 10 ? 'bg-amber-50' : ''}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {item.imageUrl ? (
                      <img className="h-10 w-10 rounded-md object-cover" src={item.imageUrl} alt={item.name} />
                    ) : (
                      <div className="bg-gray-200 border-2 border-dashed rounded-md w-10 h-10" />
                    )}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{editingItem === item.id ? (
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                          className="border border-gray-300 rounded px-2 py-1"
                        />
                      ) : item.name}</div>
                      <div className="text-sm text-gray-500">
                        {editingItem === item.id ? (
                          <textarea
                            value={editForm.description}
                            onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                            className="border border-gray-300 rounded px-2 py-1 w-full"
                            rows="2"
                          />
                        ) : item.description || 'No description'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                  {editingItem === item.id ? (
                    <select
                      value={editForm.category}
                      onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                      className="border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="fruits">Fruits</option>
                      <option value="vegetables">Vegetables</option>
                      <option value="dairy">Dairy</option>
                      <option value="meat">Meat & Poultry</option>
                      <option value="bakery">Bakery</option>
                      <option value="pantry">Pantry</option>
                    </select>
                  ) : item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingItem === item.id ? (
                    <input
                      type="number"
                      value={editForm.price}
                      onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                      className="border border-gray-300 rounded px-2 py-1 w-24"
                      min="0"
                      step="0.01"
                    />
                  ) : `₹${item.price.toFixed(2)}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {editingItem === item.id ? (
                      <input
                        type="number"
                        value={editForm.stock}
                        onChange={(e) => setEditForm({...editForm, stock: e.target.value})}
                        className="border border-gray-300 rounded px-2 py-1 w-20"
                        min="0"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleStockChange(item.id, -1)}
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className={`font-medium ${item.stock === 0 ? 'text-red-600' : item.stock <= 10 ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {item.stock}
                        </span>
                        <button 
                          onClick={() => handleStockChange(item.id, 1)}
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingItem === item.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSave(item.id)}
                        className="text-emerald-600 hover:text-emerald-900"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingItem(null)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-emerald-600 hover:text-emerald-900"
                      >
                        <FiEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;