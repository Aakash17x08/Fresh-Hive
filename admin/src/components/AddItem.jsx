import React, { useState, useRef } from "react";
import axios from "axios";
import { FiUpload, FiX, FiSave } from "react-icons/fi";
import { addItemPageStyles as styles } from "../assets/adminStyles";

const initialFormState = {
  name: "",
  description: "",
  category: "",
  oldPrice: "",
  price: "",
  image: null,
  preview: "",
};

const categories = [
  "Fruits",
  "Vegetables",
  "Dairy",
  "Beverages",
  "Snacks",
  "Seafood",
  "Bakery",
  "Meat",
];

export default function AddItemPage() {
  const [formData, setFormData] = useState(initialFormState);
  const fileInputRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((f) => ({
      ...f,
      image: file,
      preview: URL.createObjectURL(file),
    }));
  };

  const removeImage = () => {
    setFormData((f) => ({ ...f, image: null, preview: "" }));
    fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const body = new FormData();
      body.append("name", formData.name);
      body.append("description", formData.description);
      body.append("category", formData.category);
      body.append("oldPrice", formData.oldPrice);
      body.append("price", formData.price);
      if (formData.image) {
        body.append("image", formData.image);
      }

      const res = await axios.post("https://fresh-hive-backend.onrender.com/api/items", body, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Created", res.data);
      alert("Product added successfully!");

      // Reset form
      setFormData(initialFormState);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      alert("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { name, description, category, oldPrice, price, preview } = formData;

  return (
    <div className={styles.pageContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        
        {/* Name & Category */}
        <div className={styles.gridContainer}>
          <div>
            <label className={styles.label}>Product Name *</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              required
              placeholder="e.g. Fresh Organic Bananas"
              className={styles.input}
            />
          </div>

          <div>
            <label className={styles.label}>Category *</label>
            <select
              name="category"
              value={category}
              onChange={handleChange}
              required
              className={styles.input}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className={styles.label}>Description</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Describe the product..."
            className={styles.textarea}
          />
        </div>

        {/* Prices */}
        <div className={styles.priceGrid}>
          <div>
            <label className={styles.label}>Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
              className={styles.input}
            />
          </div>
          <div>
            <label className={styles.label}>Old Price (₹)</label>
            <input
              type="number"
              name="oldPrice"
              value={oldPrice}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
              className={styles.input}
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className={styles.label}>Product Image</label>
          <div 
            className={styles.imageUploadContainer}
            onClick={() => fileInputRef.current?.click()}
          >
            {preview ? (
              <div className="relative inline-block">
                <img src={preview} alt="Preview" className={styles.previewImage} />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                  className={styles.removeButton}
                >
                  <FiX />
                </button>
              </div>
            ) : (
              <div>
                <FiUpload className={styles.uploadIcon} />
                <p className={styles.uploadText}>
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className={styles.hiddenInput}
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          <FiSave className="mr-2" />
          {isSubmitting ? "Adding Product..." : "Save Product"}
        </button>
      </form>
    </div>
  );
}
