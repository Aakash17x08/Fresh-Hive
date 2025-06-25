// src/admin/pages/Orders.jsx
import React, { useState } from 'react';
import OrderManagement from '../components/OrderManagement';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const tabs = [
    { id: 'all', name: 'All Orders' },
    { id: 'pending', name: 'Pending' },
    { id: 'processing', name: 'Processing' },
    { id: 'shipped', name: 'Shipped' },
    { id: 'delivered', name: 'Delivered' },
    { id: 'cancelled', name: 'Cancelled' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-emerald-800">Order Management</h1>
      
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`whitespace-nowrap py-4 px-6 text-center font-medium ${
                activeTab === tab.id
                  ? 'border-b-2 border-emerald-500 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      
      <OrderManagement statusFilter={activeTab} />
    </div>
  );
};

export default Orders;