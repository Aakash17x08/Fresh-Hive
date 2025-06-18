import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FiUser,
  FiMail,
  FiLock,
  FiArrowLeft,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showPwd, setShowPwd] = useState({
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
        navigate('/login');
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showToast, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
    if (errors[name]) {
      setErrors((errs) => ({ ...errs, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setShowToast(true);
  };

  const toggleShow = (field) => {
    setShowPwd((p) => ({ ...p, [field]: !p[field] }));
  };

  return (
    <div className="relative w-full min-h-screen bg-black flex items-center justify-center p-4 sm:p-6">
      {/* Back to Login (top-left) */}
      <Link
        to="/login"
        className="
          absolute top-4 left-4 flex items-center 
          text-white hover:text-emerald-600 z-10
          text-sm sm:text-base mt-19
        "
      >
        <FiArrowLeft className="mr-2" /> 
        <span className=" sm:inline">Back to Login</span>
       
      </Link>

      {/* Toast - Responsive positioning */}
      {showToast && (
        <div className="
          fixed z-50 animate-fadeIn
          top-4 inset-x-4 mx-auto max-w-max
          sm:top-6 sm:right-6 sm:left-auto sm:mx-0
        ">
          <div className="bg-green-500 text-black px-4 py-3 rounded-xl shadow-lg flex items-center space-x-2">
            <FiCheckCircle className="text-lg" />
            <span className="font-medium text-sm">Account Created!</span>
          </div>
        </div>
      )}

      {/* Responsive Signup Card */}
      <div className="
        w-full 
        max-w-xs   /* Mobile */
        sm:max-w-sm   /* Small tablets */
        md:max-w-md   /* Tablets */
        bg-gray-900 
        py-5 sm:py-6 
        px-4 sm:px-5 md:px-6 
        shadow-2xl 
        rounded-2xl 
        border border-green-300
        mt-25 sm:mt-20  md:mt-24  /* Center vertically */
      ">
        <div className="text-center mb-5">
          <div className="mx-auto mb-3 flex justify-center">
            <div className="
              bg-green-600 
              w-10 h-10 sm:w-12 sm:h-12 
              rounded-full 
              flex items-center justify-center
            ">
              <FiUser className="text-white text-lg sm:text-xl" />
            </div>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-green-600">
            Create Account
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {[
            {
              id: 'name',
              label: 'Full Name',
              icon: <FiUser className="text-base sm:text-lg" />,
              type: 'text',
              placeholder: 'John Doe',
            },
            {
              id: 'email',
              label: 'Email',
              icon: <FiMail className="text-base sm:text-lg" />,
              type: 'email',
              placeholder: 'john@example.com',
            },
            {
              id: 'password',
              label: 'Password',
              icon: <FiLock className="text-base sm:text-lg" />,
              type: showPwd.password ? 'text' : 'password',
              placeholder: '••••••••',
            },
            {
              id: 'confirmPassword',
              label: 'Confirm Password',
              icon: <FiLock className="text-base sm:text-lg" />,
              type: showPwd.confirmPassword ? 'text' : 'password',
              placeholder: '••••••••',
            },
          ].map((field) => (
            <div key={field.id}>
              <label
                htmlFor={field.id}
                className="block text-xs sm:text-sm font-medium text-green-600 mb-1"
              >
                {field.label}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-green-500">
                  {field.icon}
                </div>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.id]}
                  onChange={handleChange}
                  className={`
                    w-full 
                    pl-9 sm:pl-10 
                    pr-10 
                    py-2 sm:py-2.5 
                    bg-green-100 
                    border 
                    ${errors[field.id]
                      ? 'border-red-500'
                      : 'border-green-300 focus:border-green-500'
                    } 
                    text-green-700 
                    rounded-lg sm:rounded-xl 
                    focus:ring-2 focus:ring-green-500/30 
                    block 
                    transition-all
                    text-sm sm:text-base
                  `}
                />
                {field.id.includes('password') && (
                  <button
                    type="button"
                    onClick={() => toggleShow(field.id)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-500"
                  >
                    {showPwd[field.id] ? 
                      <FiEyeOff className="text-base sm:text-lg" /> : 
                      <FiEye className="text-base sm:text-lg" />
                    }
                  </button>
                )}
              </div>
              {errors[field.id] && (
                <p className="mt-1 text-xs text-red-500">
                  • {errors[field.id]}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="
              w-full 
              py-2.5 sm:py-3 
              cursor-pointer 
              rounded-lg sm:rounded-xl 
              bg-green-600 
              text-black 
              font-medium 
              focus:outline-none 
              focus:ring-2 focus:ring-green-500/50 
              transition duration-200 
              hover:bg-green-500
              text-sm sm:text-base
            "
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;