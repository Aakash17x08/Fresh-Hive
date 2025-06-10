import React, { useState } from 'react';
import {
  FaArrowLeft,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaGithub,
  FaCheck
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.remember) {
      setError('You must agree to “Remember me” before signing in.');
      return;
    }
    setError('');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-10 left-10 w-32 sm:w-48 h-32 sm:h-48 bg-emerald-700 rounded-full mix-blend-soft-light opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 sm:w-64 h-40 sm:h-64 bg-green-700 rounded-full mix-blend-soft-light opacity-20 animate-pulse"></div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast-notification">
          <div className="fixed top-6 right-6 bg-green-600 text-black inline-flex items-center px-4 py-2 rounded-lg shadow-lg z-50">
            <FaCheck className="mr-2" />
            Login successful!
          </div>
        </div>
      )}

      {/* Back to Home */}
      <div className="absolute top-6 mt-14 left-4 sm:left-6 z-20">
        <Link
          to="/"
          className="flex items-center text-white hover:underline hover:text-emerald-600"
        >
          <FaArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg z-10 scroll-mt-36">
        <div className="login-card relative overflow-hidden rounded-3xl shadow-2xl">
          {/* Internal Glow Circles */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-r from-emerald-500 to-transparent rounded-full opacity-20 animate-spin-slow"></div>
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-l from-green-500 to-transparent rounded-full opacity-20 animate-spin-slow-reverse"></div>

          <div className="relative bg-gray-900 bg-opacity-80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-emerald-700/30">
            {/* Logo Avatar */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-800 rounded-full flex items-center justify-center">
                  <FaUser className="text-xl sm:text-3xl text-emerald-400" />
                </div>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-center text-white mb-6 sm:mb-8">
              Welcome Back
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="w-full pl-12 pr-12 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Remember Me + Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-white cursor-pointer">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4 text-green-500 bg-gray-800 border-gray-600 rounded focus:ring-green-500"
                    required
                  />
                  Remember me
                </label>
                <Link
                  to="#"
                  className="text-green-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-green-500 hover:bg-green-600 text-black font-semibold transition"
              >
                Sign In
              </button>
            </form>

            {/* Social Auth */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="mx-3 text-gray-400 text-sm">Or continue with</span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>

            <div className="flex justify-center space-x-6 mb-4">
              <button className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition">
                <FaGoogle className="text-white" />
              </button>
              <button className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition">
                <FaGithub className="text-white" />
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-white text-sm">
              Don’t have an account?{' '}
              <Link
                to="/signup"
                className="text-green-400 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        .toast-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(to right, #047857, #065f46);
          color: #d1fae5;
          padding: 16px 24px;
          border-radius: 12px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
          z-index: 100;
          animation: toastSlide 0.5s ease-out;
          border: 1px solid rgba(110, 231, 183, 0.3);
          font-weight: 500;
          display: flex;
          align-items: center;
          backdrop-filter: blur(4px);
        }
        @keyframes toastSlide {
          0% { transform: translateY(-20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .login-card {
          box-shadow:
            0 25px 50px -12px rgba(0, 0, 0, 0.4),
            0 0 15px rgba(16, 185, 129, 0.2);
          border: 1px solid rgba(52, 211, 153, 0.1);
          transition: transform 0.5s ease, box-shadow 0.5s ease;
        }
        .login-card:hover {
          transform: translateY(-5px);
          box-shadow:
            0 35px 60px -12px rgba(0, 0, 0, 0.5),
            0 0 25px rgba(16, 185, 129, 0.3);
        }
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-reverse 10s linear infinite;
        }
        @keyframes spin-reverse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
};

export default Login;
