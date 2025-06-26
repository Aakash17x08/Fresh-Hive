import React, { useState, useRef } from 'react';
import { FiUpload, FiX, FiSave, FiEdit, FiTrash2 } from 'react-icons/fi';

const initialFormState = {
  name: '',
  description: '',
  category: '',
  oldPrice: '',
  price: '',
  image: null,
  preview: ''
};

const AddItemPage = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem('adminItems');
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setFormData(prev => ({
      ...prev,
      image: file,
      preview: URL.createObjectURL(file)
    }));
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null, preview: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newItem = {
      id: editingId || Date.now(),
      name: formData.name,
      description: formData.description,
      category: formData.category,
      oldPrice: parseFloat(formData.oldPrice),
      price: parseFloat(formData.price),
      preview: formData.preview
    };

    // Log image data to console instead of storing base64
    if (formData.image) {
      console.log('Image uploaded:', {
        name: formData.image.name,
        type: formData.image.type,
        size: formData.image.size
      });
    }

    setItems(prev => editingId 
      ? prev.map(item => item.id === editingId ? newItem : item) 
      : [newItem, ...prev]  // New items added to top
    );

    setFormData(initialFormState);
    setEditingId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      description: item.description,
      category: item.category,
      oldPrice: item.oldPrice.toString(),
      price: item.price.toString(),
      image: null,
      preview: item.preview
    });
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Save items to localStorage
  React.useEffect(() => {
    localStorage.setItem('adminItems', JSON.stringify(items));
  }, [items]);

  const categories = [
    "Fruits", "Vegetables", "Dairy & Eggs", 
    "Meat & Seafood", "Bakery", "Pantry"
  ];

  const { name, description, category, oldPrice, price, preview } = formData;
  const buttonText = editingId ? 'Update Product' : 'Add Product';
  const headerText = editingId ? 'Edit Product' : 'Add New Product';

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-2">
            {headerText}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g. Organic Apples"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Brief description..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Original Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="oldPrice"
                    value={oldPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g. 199"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g. 149"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-emerald-500 transition-colors"
                  onClick={() => fileInputRef.current?.click()}>
                  {preview ? (
                    <div className="relative">
                      <img 
                        src={preview} 
                        alt="Preview" 
                        className="w-full h-64 object-contain rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <FiX size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="p-8">
                      <FiUpload className="mx-auto text-gray-400 text-3xl mb-2" />
                      <p className="text-gray-500 mb-1">Click to upload image</p>
                      <p className="text-sm text-gray-400">Supports JPG, PNG up to 2MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
              >
                <FiSave className="mr-2" />
                {buttonText}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-emerald-800 mb-4">
              Product Inventory
            </h2>
            
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FiUpload className="text-gray-500 text-2xl" />
                </div>
                <p className="text-gray-500">Add your first product</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                {items.map(item => (
                  <div 
                    key={item.id}
                    className={`border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow ${
                      editingId === item.id ? 'ring-2 ring-emerald-500' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-4">
                        {item.preview ? (
                          <img 
                            src={item.preview} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
                            <FiUpload className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                        <div className="mt-1">
                          <span className="text-emerald-600 font-medium">
                            ₹{item.price.toFixed(2)}
                          </span>
                          {item.oldPrice > item.price && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ₹{item.oldPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
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
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemPage;