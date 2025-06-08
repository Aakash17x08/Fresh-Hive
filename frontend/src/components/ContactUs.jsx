import React, { useState } from 'react';
import { FaUser, FaEnvelope,FaCheck, FaPhone, FaTag, FaComment, FaPaperPlane } from 'react-icons/fa';

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-green-900 flex items-center justify-center py-12 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="toast-notification">
          <div className="fixed top-17  right-6
      bg-green-600 text-black
      inline-flex items-center
      px-4 py-2
      rounded-lg
      shadow-lg z-50
      whitespace-nowrap
      hover:opacity-90 transition-opacity duration-200">
            <FaCheck className=" mr-2" />
            Form submitted successfully!
          </div>
        </div>
      )}

      {/* Centered Container */}
      <div className="w-full max-w-md z-10">
        {/* Unified Heading */}
        <div className="flex flex-col items-center justify-center mt-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-center text-emerald-100 font-cursive whitespace-nowrap">
            Contact FreshGrocers
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-green-300 rounded-full mt-4"></div>
        </div>
        <br />

        {/* Contact Form */}
        <div className="contact-form-container relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-900 bg-opacity-90 backdrop-blur-sm z-0"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Name Field */}
            <div className="form-field">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-emerald-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
            
            {/* Email Field */}
            <div className="form-field">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-emerald-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            
            {/* Phone Field */}
            <div className="form-field">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="h-5 w-5 text-emerald-400" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="(123) 456-7890"
                  required
                />
              </div>
            </div>
            
            {/* Subject Field */}
            <div className="form-field">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaTag className="h-5 w-5 text-emerald-400" />
                </div>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Order Inquiry"
                  required
                />
              </div>
            </div>
            
            {/* Message Field */}
            <div className="form-field">
              <div className="relative">
                <div className="absolute top-3 left-3">
                  <FaComment className="h-5 w-5 text-emerald-400" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="form-textarea"
                  placeholder="Type your message here..."
                  required
                ></textarea>
              </div>
            </div>
            
            {/* Submit Button */}
              <button
              type="submit"
              className="submit-button"
            >
              <span className="font-semibold text-xl text-black mr-2">Send Message</span>
              <FaPaperPlane className="h-5 w-5 text-black" />
            </button>
          </form>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Poppins:wght@400;600&display=swap');
        
        .font-cursive {
          font-family: 'Dancing Script', cursive;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        
        
        
        
        .contact-form-container {
          background: rgba(5, 46, 22, 0.6);
          backdrop-filter: blur(8px);
          border-radius: 20px;
          box-shadow: 
            0 10px 25px rgba(0,0,0,0.4),
            inset 0 0 0 1px rgba(52, 211, 153, 0.2);
          padding: 30px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .contact-form-container:hover {
          box-shadow: 
            0 15px 35px rgba(0,0,0,0.5),
            inset 0 0 0 1px rgba(52, 211, 153, 0.3);
        }
        
        .form-field {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .form-field:hover {
          transform: translateY(-2px);
        }
        
        .form-input, .form-textarea {
          width: 100%;
          padding: 15px 15px 15px 45px;
          border: 1px solid rgba(52, 211, 153, 0.2);
          border-radius: 12px;
          font-size: 16px;
          transition: all 0.3s ease;
          background: rgba(6, 78, 59, 0.4);
          font-family: 'Poppins', sans-serif;
          color: #d1fae5;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .form-input::placeholder, .form-textarea::placeholder {
          color: #a7f3d0;
          opacity: 0.7;
        }
        
        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: #34d399;
          box-shadow: 
            0 0 0 3px rgba(52, 211, 153, 0.25),
            inset 0 2px 4px rgba(0,0,0,0.2);
          background: rgba(6, 78, 59, 0.6);
        }
        
        .form-textarea {
          min-height: 150px;
          padding-left: 45px;
        }
        
          .submit-button {
          width: 100%;
          background: linear-gradient(to right, #10b981, #34d399);
          color: white;
          padding: 16px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(5, 150, 105, 0.2);
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          font-family: 'Poppins', sans-serif;
        }
        
        .submit-button::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -60%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to right,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.4) 50%,
            rgba(255,255,255,0) 100%
          );
          transform: rotate(30deg);
          transition: all 0.6s ease;
        }
        
        .submit-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 7px 14px rgba(5, 150, 105, 0.3);
          background: linear-gradient(to right, #059669, #10b981);
        }
        
        .submit-button:hover::after {
          left: 120%;
        }
        
        .submit-button:active {
          transform: translateY(1px);
          box-shadow: 0 2px 4px rgba(5, 150, 105, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ContactUs;