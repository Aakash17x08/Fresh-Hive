import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaCheck, FaPhone, FaTag, FaComment, FaPaperPlane } from 'react-icons/fa';
import contactStyles from '../assets/contactStyles';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      alert('Please fill all fields');
      return;
    }
    
    console.log("Form submitted with data:", formData);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);

    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className={contactStyles.pageContainer}>
      {/* Toast Notification */}
      {showToast && (
        <div className="toast-notification">
          <div className={contactStyles.toast}>
            <FaCheck className="mr-2" />
            Form submitted successfully!
          </div>
        </div>
      )}

      {/* Centered Container */}
      <div className={contactStyles.centeredContainer}>
        {/* Unified Heading */}
        <div className={contactStyles.headingContainer}>
          <h1 className={contactStyles.heading}>
            Contact FreshGrocers
          </h1>
          <div className={contactStyles.divider}></div>
        </div>
        <br />

        {/* Contact Form */}
        <div className={contactStyles.contactFormContainer}>
          <div className="absolute inset-0 bg-emerald-900 bg-opacity-90 backdrop-blur-sm z-0"></div>
          
          <form onSubmit={handleSubmit} className={contactStyles.form}>
            {/* Name Field */}
            <div className={contactStyles.formField}>
              <div className={contactStyles.inputContainer}>
                <div className={contactStyles.inputIconContainer}>
                  <FaUser className={contactStyles.inputIcon} />
                </div>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={contactStyles.formInput}
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
            
            {/* Email Field */}
            <div className={contactStyles.formField}>
              <div className={contactStyles.inputContainer}>
                <div className={contactStyles.inputIconContainer}>
                  <FaEnvelope className={contactStyles.inputIcon} />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={contactStyles.formInput}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            
            {/* Phone Field */}
            <div className={contactStyles.formField}>
              <div className={contactStyles.inputContainer}>
                <div className={contactStyles.inputIconContainer}>
                  <FaPhone className={contactStyles.inputIcon} />
                </div>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={contactStyles.formInput}
                  placeholder="(123) 456-7890"
                  required
                />
              </div>
            </div>
            
            {/* Subject Field */}
            <div className={contactStyles.formField}>
              <div className={contactStyles.inputContainer}>
                <div className={contactStyles.inputIconContainer}>
                  <FaTag className={contactStyles.inputIcon} />
                </div>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={contactStyles.formInput}
                  placeholder="Order Inquiry"
                  required
                />
              </div>
            </div>
            
            {/* Message Field */}
            <div className={contactStyles.formField}>
              <div className={contactStyles.inputContainer}>
                <div className={contactStyles.textareaIconContainer}>
                  <FaComment className={contactStyles.inputIcon} />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={contactStyles.formTextarea}
                  placeholder="Type your message here..."
                  required
                ></textarea>
              </div>
            </div>
            
            {/* Submit Button */}
              <button
              type="submit"
              className={contactStyles.submitButton}
            >
              <span className={contactStyles.submitButtonText}>Send Message</span>
              <FaPaperPlane className="h-5 w-5 text-black" />
            </button>
          </form>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{contactStyles.customCSS}</style>
    </div>
  );
};

export default ContactUs;