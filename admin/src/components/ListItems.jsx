// src/pages/admin/ListItemsPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit, FiTrash2, FiPackage, FiFilter, FiX, FiSave, FiUpload } from 'react-icons/fi';
import { listItemsPageStyles as styles, addItemPageStyles as formStyles, ordersPageStyles as modalStyles } from '../assets/adminStyles';

const StatsCard = ({ icon: Icon, color, border, label, value }) => (
  <div className={styles.statsCard(border)}>
    <div className={styles.statsCardInner}>
      <div className={styles.statsCardIconContainer(color)}>
        <Icon className={styles.statsCardIcon(color)} />
      </div>
      <div>
        <p className={styles.statsCardLabel}>{label}</p>
        <p className={styles.statsCardValue}>{value}</p>
      </div>
    </div>
  </div>
);

export default function ListItemsPage() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    category: "",
    oldPrice: "",
    price: "",
    image: null,
    preview: "",
  });
  const editFileInputRef = useRef(null);

  const categoryOptions = [
    "Fruits", "Vegetables", "Dairy", "Beverages", "Snacks", "Seafood", "Bakery", "Meat"
  ];

  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/items');
        const data = response.data;

        const withUrls = data.map(item => ({
          ...item,
          imageUrl: item.imageUrl
            ? (item.imageUrl.startsWith('http') || item.imageUrl.startsWith('data:') 
                ? item.imageUrl 
                : `http://localhost:4000${item.imageUrl.startsWith('/') ? '' : '/'}${item.imageUrl}`)
            : null,
        }));

        const itemCategories = data.map(item => item.category);
        const uniqueCategories = ['All', ...new Set(itemCategories.filter(Boolean))];
        
        setCategories(uniqueCategories);
        setItems(withUrls);
        setFilteredItems(withUrls);
      } catch (err) {
        console.error('Failed to load items:', err);
      }
    };

    loadItems();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory, items]);

  const handleDelete = async id => {
    if (!window.confirm('Delete this product?')) return;
  
    try {
      await axios.delete(`http://localhost:4000/api/items/${id}`);
      setItems(prev => prev.filter(i => i._id !== id));
      setFilteredItems(prev => prev.filter(i => i._id !== id));
    } catch (err) {
      console.error('Delete failed', err.response?.status, err.response?.data);
      alert(`Delete failed: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditFormData({
      name: item.name,
      description: item.description || "",
      category: item.category,
      oldPrice: item.oldPrice || "",
      price: item.price,
      image: null,
      preview: item.imageUrl,
    });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setEditFormData((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    } else {
      setEditFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = new FormData();
      body.append("name", editFormData.name);
      body.append("description", editFormData.description);
      body.append("category", editFormData.category);
      body.append("oldPrice", editFormData.oldPrice);
      body.append("price", editFormData.price);
      if (editFormData.image) {
        body.append("image", editFormData.image);
      }

      const res = await axios.put(`http://localhost:4000/api/items/${editingItem._id}`, body, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedItem = {
        ...res.data,
        imageUrl: res.data.imageUrl
            ? (res.data.imageUrl.startsWith('http') || res.data.imageUrl.startsWith('data:') 
                ? res.data.imageUrl 
                : `http://localhost:4000${res.data.imageUrl.startsWith('/') ? '' : '/'}${res.data.imageUrl}`)
            : null,
      };

      setItems(prev => prev.map(i => i._id === updatedItem._id ? updatedItem : i));
      setFilteredItems(prev => prev.map(i => i._id === updatedItem._id ? updatedItem : i));
      
      setIsEditModalOpen(false);
      setEditingItem(null);
      alert("Product updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update product.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      
      <div className={styles.statsGrid}>
        <StatsCard
          icon={FiPackage}
          color="bg-emerald-100"
          border="border-emerald-500"
          label="Total Products"
          value={items.length}
        />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.headerFlex}>
          <h2 className={styles.headerTitleSmall}>
            Product List
          </h2>
          <div className={styles.filterContainer}>
            <div className={styles.filterSelectContainer}>
              <div className={styles.filterIconContainer}>
                <FiFilter className={styles.filterIcon} />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={styles.filterSelect}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className={styles.filterSelectArrow}>
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className={styles.emptyStateContainer}>
            <div className={styles.emptyStateIconContainer}>
              <FiPackage className={styles.emptyStateIcon} />
            </div>
            <h3 className={styles.emptyStateTitle}>
              No products found
            </h3>
            <p className={styles.emptyStateText}>
              {selectedCategory === 'All'
                ? 'Try adding a new product.'
                : `No products in ${selectedCategory} category.`}
            </p>
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th className={styles.tableHeaderCell}>Product</th>
                  <th className={styles.tableHeaderCell}>Category</th>
                  <th className={styles.tableHeaderCell}>Price</th>
                  <th className={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {filteredItems.map(item => (
                  <tr key={item._id} className={styles.tableRowHover}>
                    <td className={styles.tableDataCell}>
                      <div className={styles.productCell}>
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className={styles.productImage}
                            onError={(e) => {e.target.src = 'https://placehold.co/40x40?text=NA'}}
                          />
                        ) : (
                          <div className={styles.placeholderImage}>No Img</div>
                        )}
                        <div>
                          <div className={styles.productName}>
                            {item.name}
                          </div>
                          <div className={styles.productDescription}>
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className={styles.tableDataCell}>
                      <span className={styles.categoryText}>
                        {item.category}
                      </span>
                    </td>
                    <td className={styles.tableDataCell}>
                      <div className={styles.price}>
                        ₹{item.price.toFixed(2)}
                      </div>
                      {item.oldPrice > item.price && (
                        <div className={styles.oldPrice}>
                          ₹{item.oldPrice.toFixed(2)}
                        </div>
                      )}
                    </td>
                    <td className={styles.tableDataCell}>
                      <div className={styles.actionButtons}>
                        <button
                          onClick={() => handleEditClick(item)}
                          className={styles.editButton}
                          title="Edit"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className={styles.deleteButton}
                          title="Delete"
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

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className={modalStyles.modalOverlay}>
          <div className={`${modalStyles.modalContainer} max-w-2xl`}>
            <div className={modalStyles.modalHeader}>
              <h2 className={modalStyles.modalHeaderTitle}>Edit Product</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className={modalStyles.modalHeaderClose}
              >
                <FiX size={24} />
              </button>
            </div>
            
            <form onSubmit={handleUpdateSubmit} className="flex-1 overflow-y-auto">
              <div className="p-8 space-y-6">
                
                {/* Image Upload */}
                <div className="flex justify-center mb-6">
                  <div 
                    className={`${formStyles.imageUploadContainer} w-full max-w-sm p-6`}
                    onClick={() => editFileInputRef.current?.click()}
                  >
                    {editFormData.preview ? (
                      <div className="relative">
                        <img 
                          src={editFormData.preview} 
                          alt="Preview" 
                          className="mx-auto h-40 object-contain rounded-lg shadow-sm"
                        />
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center group rounded-lg">
                          <span className="opacity-0 group-hover:opacity-100 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm">
                            Change Image
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-40">
                         <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                         <span className="text-sm text-gray-500">Click to upload image</span>
                      </div>
                    )}
                    <input
                      type="file"
                      name="image"
                      onChange={handleEditChange}
                      ref={editFileInputRef}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={formStyles.label}>Product Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditChange}
                      required
                      className={formStyles.input}
                    />
                  </div>

                  <div>
                    <label className={formStyles.label}>Category</label>
                    <select
                      name="category"
                      value={editFormData.category}
                      onChange={handleEditChange}
                      required
                      className={formStyles.input}
                    >
                      <option value="">Select Category</option>
                      {categoryOptions.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={formStyles.label}>Description</label>
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditChange}
                    className={`${formStyles.textarea} min-h-[100px]`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className={formStyles.label}>Price (₹)</label>
                    <input
                      type="number"
                      name="price"
                      value={editFormData.price}
                      onChange={handleEditChange}
                      required
                      step="0.01"
                      className={formStyles.input}
                    />
                  </div>
                  <div>
                    <label className={formStyles.label}>Old Price (₹)</label>
                    <input
                      type="number"
                      name="oldPrice"
                      value={editFormData.oldPrice}
                      onChange={handleEditChange}
                      step="0.01"
                      className={formStyles.input}
                    />
                  </div>
                </div>
              </div>

              <div className={modalStyles.modalFooter}>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className={modalStyles.modalFooterButton}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={modalStyles.modalFooterPrimaryButton}
                >
                  <FiSave className="mr-2 inline-block" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
