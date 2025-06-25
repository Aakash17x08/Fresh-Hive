// src/admin/AdminLayout.jsx
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiPackage, 
  FiShoppingCart, 
  FiBarChart2,
  FiLogOut,
  FiUser
} from 'react-icons/fi';

const AdminLayout = () => {
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <FiHome className="w-5 h-5" /> },
    { name: 'Inventory', path: '/admin/inventory', icon: <FiPackage className="w-5 h-5" /> },
    { name: 'Orders', path: '/admin/orders', icon: <FiShoppingCart className="w-5 h-5" /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <FiBarChart2 className="w-5 h-5" /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-emerald-800 text-white flex flex-col">
        <div className="p-5 border-b border-emerald-700">
          <h1 className="text-xl font-bold flex items-center">
            <FiPackage className="mr-2" />
            FreshCart Admin
          </h1>
        </div>
        
        <nav className="mt-5 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end
              className={({ isActive }) => 
                `flex items-center px-5 py-3 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-emerald-900 border-l-4 border-emerald-400' 
                    : 'hover:bg-emerald-700'
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-emerald-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-emerald-600 p-2 rounded-full">
                <FiUser className="w-5 h-5" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-emerald-300">admin@freshcart.com</p>
              </div>
            </div>
            <button className="p-2 rounded-full hover:bg-emerald-700">
              <FiLogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;