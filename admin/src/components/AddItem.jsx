// src/pages/admin/AddItemPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FiPlus, FiUpload, FiX, FiSave, FiEdit, FiTrash2 } from 'react-icons/fi';

const initialFormState = {
  name: '',
  description: '',
  category: '',
  oldPrice: '',
  price: '',
  stock: '',
  image: null,
  imagePreview: null
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
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image: file, imagePreview: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null, imagePreview: null }));
    fileInputRef.current.value = '';
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
      stock: parseInt(formData.stock),
      image: formData.imagePreview
    };

    // Log submitted item data to console
    console.log(`Submitting ${editingId ? 'edit' : 'new'} item:`, {
      ...newItem,
      imageInfo: formData.image 
        ? { 
            name: formData.image.name,
            type: formData.image.type,
            size: formData.image.size,
            previewStart: formData.imagePreview.substring(0, 100) + '...' 
          } 
        : 'No image uploaded'
    });

    setItems(prev => editingId 
      ? prev.map(item => item.id === editingId ? newItem : item) 
      : [...prev, newItem]
    );

    setFormData(initialFormState);
    setEditingId(null);
    fileInputRef.current.value = '';
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      description: item.description,
      category: item.category,
      oldPrice: item.oldPrice.toString(),
      price: item.price.toString(),
      stock: item.stock.toString(),
      image: null,
      imagePreview: item.image
    });
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
    console.log(`Deleted item with ID: ${id}`);
  };

  useEffect(() => {
    localStorage.setItem('adminItems', JSON.stringify(items));
    
    // Log all inventory items to console
    console.log('Current Inventory:', items.map(item => ({
      ...item,
      image: item.image ? item.image.substring(0, 100) + '...' : null
    })));
  }, [items]);

  const categories = [
    "Fruits", "Vegetables", "Dairy & Eggs", 
    "Meat & Seafood", "Bakery", "Pantry"
  ];

  const { name, description, category, oldPrice, price, stock, imagePreview } = formData;
  const buttonText = editingId ? 'Update Product' : 'Add Product';
  const headerText = editingId ? 'Edit Product' : 'Add New Product';
  const subheaderText = editingId 
    ? 'Update product details below' 
    : 'Fill in the details to add a new product to your store';

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-2">
            {headerText}
          </h1>
          <p className="text-gray-600">{subheaderText}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField 
                label="Product Name *"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="e.g. Organic Apples"
                required
              />

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
                  placeholder="Brief description of the product..."
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
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField 
                  label="Original Price (₹) *"
                  name="oldPrice"
                  type="number"
                  value={oldPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="e.g. 199"
                  required
                />
                
                <InputField 
                  label="Selling Price (₹) *"
                  name="price"
                  type="number"
                  value={price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="e.g. 149"
                  required
                />
              </div>

              <InputField 
                label="Stock Quantity *"
                name="stock"
                type="number"
                value={stock}
                onChange={handleChange}
                min="0"
                placeholder="Available units"
                required
              />

              <ImageUpload 
                imagePreview={imagePreview}
                removeImage={removeImage}
                fileInputRef={fileInputRef}
                handleImageUpload={handleImageUpload}
              />

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
              >
                <FiSave className="mr-2" />
                {buttonText}
              </button>
            </form>
          </div>

          <ProductList 
            items={items}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            editingId={editingId}
          />
        </div>
      </div>
    </div>
  );
};

// Extracted Components
const InputField = ({ label, name, type = 'text', value, onChange, placeholder, required, min, step }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      min={min}
      step={step}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
    />
  </div>
);

const ImageUpload = ({ imagePreview, removeImage, fileInputRef, handleImageUpload }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Product Image
    </label>
    {imagePreview ? (
      <div className="relative">
        <img 
          src={imagePreview} 
          alt="Preview" 
          className="w-full h-64 object-contain rounded-lg border border-gray-300"
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
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-emerald-500 transition-colors"
        onClick={() => fileInputRef.current.click()}
      >
        <FiUpload className="mx-auto text-gray-400 text-3xl mb-2" />
        <p className="text-gray-500 mb-1">Click to upload an image</p>
        <p className="text-sm text-gray-400">Supports JPG, PNG up to 2MB</p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
      </div>
    )}
  </div>
);

const ProductList = ({ items, handleEdit, handleDelete, editingId }) => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <h2 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
      <FiPlus className="mr-2" />
      Product Inventory
    </h2>
    
    {items.length === 0 ? (
      <div className="text-center py-12">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <FiPlus className="text-gray-500 text-2xl" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No products added</h3>
        <p className="text-gray-500">Add your first product using the form</p>
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
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                )}
              </div>
              
              <div className="flex-grow">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                
                <div className="flex items-center mt-1">
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
              
              <div className="ml-4 flex flex-col items-end">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.stock > 10 ? 'bg-emerald-100 text-emerald-800' 
                    : item.stock > 0 ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                </span>
                
                <div className="flex mt-2 space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-gray-500 hover:text-emerald-600 transition-colors"
                    title="Edit product"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-gray-500 hover:text-red-600 transition-colors"
                    title="Delete product"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default AddItemPage;