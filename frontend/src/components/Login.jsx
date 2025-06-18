import React, { useState } from "react";
import {
  FaArrowLeft,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheck,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.remember) {
      setError("You must agree to “Remember me” before signing in.");
      return;
    }
    setError("");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate("/");
    }, 2000);
  };

  return (
    <div
      className="
        relative w-full h-screen bg-black flex items-center justify-center
        overflow-hidden px-4 sm:px-6 md:px-8 lg:px-4
      "
    >
      {/* Back to Home */}
      <Link
        to="/"
        className="absolute top-4 left-4 mt-19 flex items-center text-white hover:text-emerald-400 z-20"
      >
        <FaArrowLeft className="mr-2" />
        Back to Home
      </Link>

      {/* Toast Notification */}
      {showToast && (
        <div
          className="
            fixed top-16 right-6 bg-green-600 text-black inline-flex items-center
            px-4 py-2 rounded-lg shadow-lg z-50
          "
        >
          <FaCheck className="mr-2" />
          Login successful!
        </div>
      )}

      {/* Login Card */}
      <div
        className="
          mt-29 md:mt-24 lg:mt-0         
          sm:max-w-xs
          md:max-w-md
          lg:max-w-sm
          bg-gray-900 bg-opacity-80 backdrop-blur-sm
          p-6 sm:p-8 md:p-10 lg:p-6
          rounded-2xl border border-green-700/30 shadow-lg
          flex-shrink-0
        "
      >
        {/* Logo Avatar */}
        <div className="flex justify-center mb-6">
          <div
            className="
              w-16 h-16 sm:w-20 sm:h-20 rounded-full
              bg-gradient-to-br from-emerald-500 to-green-500
              flex items-center justify-center shadow-lg
            "
          >
            <div
              className="
                w-12 h-12 sm:w-16 sm:h-16
                bg-emerald-800 rounded-full
                flex items-center justify-center
              "
            >
              <FaUser className="text-xl sm:text-3xl text-emerald-400" />
            </div>
          </div>
        </div>

        <h2 className="text-center text-lg sm:text-xl font-semibold text-white mb-4">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="
                w-full pl-10 pr-3 py-2.5
                bg-gray-800 text-white rounded-lg
                focus:outline-none focus:ring-2 focus:ring-green-500
              "
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="
                w-full pl-10 pr-10 py-2.5
                bg-gray-800 text-white rounded-lg
                focus:outline-none focus:ring-2 focus:ring-green-500
              "
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="
                  mr-2 h-4 w-4 cursor-pointer
                  text-green-500 bg-gray-800 border-gray-600 rounded
                  focus:ring-green-500
                "
                required
              />
              Remember me
            </label>
            <Link to="#" className="text-green-400 hover:underline">
              Forgot?
            </Link>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            className="
              w-full py-2.5 bg-green-500 hover:bg-green-600
              text-black font-medium rounded-lg transition
            "
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-white mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
