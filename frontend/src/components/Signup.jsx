import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiArrowLeft, FiCheckCircle, FiEye, FiEyeOff } from 'react-icons/fi';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showPwd, setShowPwd] = useState({ password: false, confirmPassword: false });

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
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setShowToast(true);
  };

  const toggleShow = (field) => {
    setShowPwd(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 animate-fadeIn">
          <div className="bg-green-500 text-black px-6 py-4 rounded-xl shadow-lg flex items-center space-x-3 transition duration-300">
            <FiCheckCircle className="text-xl" />
            <div>
              <p className="font-medium">Account Created Successfully!</p>
             
            </div>
          </div>
        </div>
      )}

      <div className="max-w-md w-full">
        {/* Back Button aligned left */}
       
 <div className="absolute top-6 left-6">
         <Link
           to="/login"
           className="flex items-center text-white hover:text-emerald-600"
         >
           <FiArrowLeft className="mr-2" />
           Back to Login
         </Link>
       </div>

        {/* Card */}
        <div className="bg-gray-900 py-8 px-6 mt-20 shadow-2xl rounded-2xl border border-green-300">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex justify-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center">
                <FiUser className="text-white text-2xl" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-green-600">Create Your Account</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { id: 'name', label: 'Full Name', icon: <FiUser />, type: 'text', placeholder: 'John Doe' },
              { id: 'email', label: 'Email Address', icon: <FiMail />, type: 'email', placeholder: 'john@example.com' },
              { id: 'password', label: 'Password', icon: <FiLock />, type: showPwd.password ? 'text' : 'password', placeholder: '••••••••' },
              { id: 'confirmPassword', label: 'Confirm Password', icon: <FiLock />, type: showPwd.confirmPassword ? 'text' : 'password', placeholder: '••••••••' }
            ].map(field => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-medium text-green-600 mb-1.5">
                  {field.label}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-green-500">
                    {field.icon}
                  </div>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.id]}
                    onChange={handleChange}
                    className={`bg-green-100 border ${errors[field.id] ? 'border-red-500' : 'border-green-300 focus:border-green-500'} text-green-700 rounded-xl focus:ring-2 focus:ring-green-500/30 block w-full pl-11 pr-12 py-3.5 transition-all`}
                  />
                  {field.id.includes('password') && (
                    <button
                      type="button"
                      onClick={() => toggleShow(field.id)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-green-500"
                    >
                      {showPwd[field.id] ? <FiEyeOff /> : <FiEye />}
                    </button>
                  )}
                </div>
                {errors[field.id] && <p className="mt-1.5 text-sm text-red-500">• {errors[field.id]}</p>}
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-green-600 text-black font-medium focus:outline-none focus:ring-2 cursor-pointer focus:ring-offset-2 focus:ring-green-500/50  duration-300  hover:shadow-xl"
            >
              Create Account
            </button>
          </form>
        </div>

       
      </div>
    </div>
  );
};

export default Signup;
