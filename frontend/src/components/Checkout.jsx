// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheck, FiCreditCard, FiTruck, FiUser, FiPackage, FiMapPin, FiPhone, FiMail, FiFileText } from 'react-icons/fi';
import { useCart } from '../CartContext';
import { checkoutStyles } from '../assets/dummyStyles';
import axios from 'axios';

const CheckoutPage = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'COD',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = 'Invalid phone number';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    const order = {
      customer: { ...formData },
      items: cart.map(item => ({
        id: item.productId || item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl
      })),
      total: getCartTotal(),
      status: 'Pending',
      paymentMethod: formData.paymentMethod,
      paymentStatus: formData.paymentMethod === 'COD' ? 'Paid' : 'Unpaid',
      deliveryDate: new Date(
        Date.now() + 3 * 24 * 60 * 60 * 1000
      ).toISOString().split('T')[0],
      notes: formData.notes
    };

    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.post(
        'https://fresh-hive-backend.onrender.com/api/orders',
        {
          ...order,
          paymentMethod: formData.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` })
          }
        }
      );

      if (res.data.checkoutUrl) {
        window.location.href = res.data.checkoutUrl;
        return;
      }

      if (res.status === 201 || res.status === 200) {
        const createdOrder = res.data.order;
        const displayId = createdOrder?.orderId || createdOrder?._id || 'New Order';
        clearCart();
        alert(`Order placed successfully! Order ID: ${displayId}`);
        navigate('/');
      } else {
        alert('Order failed. Try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to place order. Please try again. Check if backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = getCartTotal();
  const tax = total * 0.05;
  const grandTotal = total + tax;

  if (!cart.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center border border-gray-100">
          <div className="text-emerald-200 text-6xl mb-6 mx-auto flex justify-center">
             <FiPackage />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
          <p className="text-gray-500 mb-8">
            You don't have any items to checkout.
          </p>
          <Link
            to="/items"
            className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            <FiArrowLeft className="mr-2" /> Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={checkoutStyles.pageContainer}>
      <div className={checkoutStyles.maxContainer}>
        <div className={checkoutStyles.headingContainer}>
          <h1 className={checkoutStyles.heading}>Checkout</h1>
          <p className="mt-2 text-gray-600">Complete your purchase securely</p>
        </div>

        <div className={checkoutStyles.gridContainer}>
          {/* Left Column: Form */}
          <div className={checkoutStyles.formContainer}>
            <form onSubmit={handleSubmit}>
              
              {/* Customer Details Section */}
              <div className="mb-8">
                <h2 className={checkoutStyles.sectionTitle}>
                  <FiUser className={checkoutStyles.sectionIcon} />
                  Contact Information
                </h2>
                <div className={checkoutStyles.inputGroup}>
                  {/* Name */}
                  <div className={checkoutStyles.inputWrapper}>
                    <FiUser className={checkoutStyles.inputIcon} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className={checkoutStyles.input}
                    />
                    {errors.name && <p className={checkoutStyles.errorText}>{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className={checkoutStyles.inputWrapper}>
                    <FiMail className={checkoutStyles.inputIcon} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className={checkoutStyles.input}
                    />
                    {errors.email && <p className={checkoutStyles.errorText}>{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div className={checkoutStyles.inputWrapper}>
                    <FiPhone className={checkoutStyles.inputIcon} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className={checkoutStyles.input}
                    />
                    {errors.phone && <p className={checkoutStyles.errorText}>{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Delivery Address Section */}
              <div className="mb-8">
                <h2 className={checkoutStyles.sectionTitle}>
                  <FiMapPin className={checkoutStyles.sectionIcon} />
                  Delivery Details
                </h2>
                <div className={checkoutStyles.inputGroup}>
                  <div className={checkoutStyles.inputWrapper}>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Delivery Address (House No, Street, Landmark)"
                      className={checkoutStyles.textarea}
                    />
                    {errors.address && <p className={checkoutStyles.errorText}>{errors.address}</p>}
                  </div>

                  <div className={checkoutStyles.inputWrapper}>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Delivery Instructions (Optional)"
                      className={checkoutStyles.textarea}
                      style={{ minHeight: '80px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Section */}
              <div>
                <h2 className={checkoutStyles.sectionTitle}>
                  <FiCreditCard className={checkoutStyles.sectionIcon} />
                  Payment Method
                </h2>
                <div className={checkoutStyles.paymentMethodsGrid}>
                  <label className={checkoutStyles.paymentMethodLabel(formData.paymentMethod === 'COD')}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={formData.paymentMethod === 'COD'}
                      onChange={handleChange}
                      className={checkoutStyles.paymentRadio}
                    />
                    <FiTruck className={checkoutStyles.paymentIcon} />
                    <span className={checkoutStyles.paymentText}>Cash on Delivery</span>
                    {formData.paymentMethod === 'COD' && <FiCheck className={checkoutStyles.paymentCheck} />}
                  </label>

                  <label className={checkoutStyles.paymentMethodLabel(formData.paymentMethod === 'Online')}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Online"
                      checked={formData.paymentMethod === 'Online'}
                      onChange={handleChange}
                      className={checkoutStyles.paymentRadio}
                    />
                    <FiCreditCard className={checkoutStyles.paymentIcon} />
                    <span className={checkoutStyles.paymentText}>Online Payment</span>
                    {formData.paymentMethod === 'Online' && <FiCheck className={checkoutStyles.paymentCheck} />}
                  </label>
                </div>
              </div>

            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div>
            <div className={checkoutStyles.summaryContainer}>
              <h2 className={checkoutStyles.summaryTitle}>Order Summary</h2>
              
              <div className={checkoutStyles.itemsList}>
                {cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className={checkoutStyles.itemCard}>
                    <div className={checkoutStyles.itemImage}>
                      <img 
                        src={
                          item.imageUrl 
                            ? (item.imageUrl.startsWith('http') || item.imageUrl.startsWith('data:') 
                                ? item.imageUrl 
                                : `http://localhost:4000${item.imageUrl.startsWith('/') ? '' : '/'}${item.imageUrl}`)
                            : '/placeholder-image.png'
                        } 
                        alt={item.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {e.target.src = 'https://placehold.co/100x100?text=No+Image'}}
                      />
                    </div>
                    <div className={checkoutStyles.itemInfo}>
                      <p className={checkoutStyles.itemName}>{item.name}</p>
                      <p className={checkoutStyles.itemQuantity}>Qty: {item.quantity}</p>
                    </div>
                    <p className={checkoutStyles.itemPrice}>₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className={checkoutStyles.costsContainer}>
                <div className={checkoutStyles.costRow}>
                  <span>Subtotal</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className={checkoutStyles.costRow}>
                  <span>Tax (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className={checkoutStyles.costRow}>
                  <span>Delivery</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>
                <div className={checkoutStyles.totalRow}>
                  <span>Total</span>
                  <span className={checkoutStyles.totalValue}>₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={checkoutStyles.submitButton}
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    Place Order <FiCheck />
                  </>
                )}
              </button>

              <Link to="/cart" className={checkoutStyles.backLink}>
                Return to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
