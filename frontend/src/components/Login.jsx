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
import { loginStyles } from "../assets/dummyStyles";

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
      setError("You must agree to \"Remember me\" before signing in.");
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
    <div className={loginStyles.page}>
      {/* Back to Home */}
      <Link
        to="/"
        className={loginStyles.backLink}
      >
        <FaArrowLeft className="mr-2" />
        Back to Home
      </Link>

      {/* Toast Notification */}
      {showToast && (
        <div className={loginStyles.toast}>
          <FaCheck className="mr-2" />
          Login successful!
        </div>
      )}

      {/* Login Card */}
      <div className={loginStyles.loginCard}>
        {/* Logo Avatar */}
        <div className={loginStyles.logoContainer}>
          <div className={loginStyles.logoOuter}>
            <div className={loginStyles.logoInner}>
              <FaUser className={loginStyles.logoIcon} />
            </div>
          </div>
        </div>

        <h2 className={loginStyles.title}>
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className={loginStyles.form}>
          {/* Email */}
          <div className={loginStyles.inputContainer}>
            <FaUser className={loginStyles.inputIcon} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className={loginStyles.input}
            />
          </div>

          {/* Password */}
          <div className={loginStyles.inputContainer}>
            <FaLock className={loginStyles.inputIcon} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className={loginStyles.passwordInput}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className={loginStyles.toggleButton}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Remember + Forgot */}
          <div className={loginStyles.rememberContainer}>
            <label className={loginStyles.rememberLabel}>
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className={loginStyles.rememberCheckbox}
                required
              />
              Remember me
            </label>
            <Link to="#" className={loginStyles.forgotLink}>
              Forgot?
            </Link>
          </div>

          {error && <p className={loginStyles.error}>{error}</p>}

          <button
            type="submit"
            className={loginStyles.submitButton}
          >
            Sign In
          </button>
        </form>

        <p className={loginStyles.signupText}>
          Don't have an account?{" "}
          <Link to="/signup" className={loginStyles.signupLink}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;