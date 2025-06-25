// src/pages/Dashboard.jsx
import React, { useContext } from 'react';
import { AdminContext } from '../AdminContext';
import { FiPackage, FiShoppingCart, FiTruck, FiAlertTriangle } from 'react-icons/fi';

const Dashboard = () => {
  const { items, orders, outOfStockItems, lowStockItems } = useContext(AdminContext);
  
  const pendingOrders = orders.filter(order => order.status === 'pending');
  const processingOrders = orders.filter(order => order.status === 'processing');
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-emerald-800">Admin Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="p-3 rounded-full bg-emerald-100 text-emerald-600 mr-4">
            <FiPackage className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
            <p className="text-2xl font-bold text-emerald-600">{items.length}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
            <FiShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Pending Orders</h3>
            <p className="text-2xl font-bold text-amber-600">{pendingOrders.length}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <FiTruck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Processing Orders</h3>
            <p className="text-2xl font-bold text-blue-600">{processingOrders.length}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
            <FiAlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Out of Stock</h3>
            <p className="text-2xl font-bold text-red-600">{outOfStockItems.length}</p>
          </div>
        </div>
      </div>
      
      {/* Stock Alerts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Stock Alerts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
            <h3 className="font-medium text-red-800 flex items-center">
              <FiAlertTriangle className="mr-2" />
              Out of Stock ({outOfStockItems.length})
            </h3>
            <ul className="mt-2 space-y-1">
              {outOfStockItems.slice(0, 5).map(item => (
                <li key={item.id} className="text-sm text-red-700 truncate">
                  {item.name}
                </li>
              ))}
              {outOfStockItems.length > 5 && (
                <li className="text-sm text-red-700">+{outOfStockItems.length - 5} more...</li>
              )}
            </ul>
          </div>
          
          <div className="border border-amber-200 rounded-lg p-4 bg-amber-50">
            <h3 className="font-medium text-amber-800 flex items-center">
              <FiAlertTriangle className="mr-2" />
              Low Stock ({lowStockItems.length})
            </h3>
            <ul className="mt-2 space-y-1">
              {lowStockItems.slice(0, 5).map(item => (
                <li key={item.id} className="text-sm text-amber-700 truncate">
                  {item.name} - {item.stock} left
                </li>
              ))}
              {lowStockItems.length > 5 && (
                <li className="text-sm text-amber-700">+{lowStockItems.length - 5} more...</li>
              )}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.slice(0, 5).map(order => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id.slice(0, 8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                    <div className="text-sm text-gray-500">{order.customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-emerald-700">
                    ₹{order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;