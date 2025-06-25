import React, { useContext, useState, useEffect } from 'react';
import { AdminContext } from '../AdminContext';
import { 
  FiTruck, 
  FiXCircle, 
  FiCheckCircle, 
  FiClock, 
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiInfo
} from 'react-icons/fi';
import { format } from 'date-fns';

const OrderManagement = () => {
  const { orders, updateOrderStatus } = useContext(AdminContext);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting and filtering
  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortConfig.key === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
      }
      if (sortConfig.key === 'total') {
        return sortConfig.direction === 'asc' ? a.total - b.total : b.total - a.total;
      }
      return 0;
    });

  const statusColors = {
    pending: 'bg-amber-100 text-amber-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-indigo-100 text-indigo-800',
    delivered: 'bg-emerald-100 text-emerald-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const statusIcons = {
    pending: <FiClock className="w-5 h-5 mr-2" />,
    processing: <FiClock className="w-5 h-5 mr-2" />,
    shipped: <FiTruck className="w-5 h-5 mr-2" />,
    delivered: <FiCheckCircle className="w-5 h-5 mr-2" />,
    cancelled: <FiXCircle className="w-5 h-5 mr-2" />
  };

  const handleStatusChange = (orderId, status) => {
    updateOrderStatus(orderId, status);
    setExpandedOrder(null); // Collapse after action
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? 
      <FiChevronUp className="ml-1 inline" /> : 
      <FiChevronDown className="ml-1 inline" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Filters and Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search orders by ID, name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>
          
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <div className="flex items-center justify-end">
            <span className="text-sm text-gray-500">
              Showing {filteredOrders.length} of {orders.length} orders
            </span>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center">
                  Date & Time
                  {getSortIndicator('date')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('total')}
              >
                <div className="flex items-center">
                  Total
                  {getSortIndicator('total')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <FiSearch className="w-12 h-12 mb-2" />
                    <p className="text-lg font-medium">No orders found</p>
                    <p className="mt-1">Try adjusting your search or filter criteria</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr className={expandedOrder === order.id ? 'bg-gray-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {format(new Date(order.date), 'dd MMM yyyy')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {format(new Date(order.date), 'hh:mm a')}
                      </div>
                    </td>
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
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[order.status]}`}>
                        <div className="flex items-center">
                          {statusIcons[order.status]}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </div>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {order.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(order.id, 'processing')}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                            >
                              Process
                            </button>
                            <button
                              onClick={() => handleStatusChange(order.id, 'cancelled')}
                              className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {order.status === 'processing' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(order.id, 'shipped')}
                              className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
                            >
                              Ship
                            </button>
                            <button
                              onClick={() => handleStatusChange(order.id, 'cancelled')}
                              className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {order.status === 'shipped' && (
                          <button
                            onClick={() => handleStatusChange(order.id, 'delivered')}
                            className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-md hover:bg-emerald-200 transition-colors"
                          >
                            Deliver
                          </button>
                        )}
                        <button
                          onClick={() => toggleOrderDetails(order.id)}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          {expandedOrder === order.id ? <FiChevronUp /> : <FiChevronDown />}
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Expanded Order Details */}
                  {expandedOrder === order.id && (
                    <tr className="bg-gray-50">
                      <td colSpan="6" className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                              <FiInfo className="mr-2" /> Order Details
                            </h3>
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">Order ID:</span>
                                  <span className="font-medium">#{order.id}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">Date:</span>
                                  <span>{format(new Date(order.date), 'dd MMM yyyy, hh:mm a')}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">Status:</span>
                                  <span className={`font-medium ${statusColors[order.status]}`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">Payment Method:</span>
                                  <span>Credit Card</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Items</h3>
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                              <div className="space-y-3">
                                {order.items.map((item, index) => (
                                  <div key={index} className="flex justify-between text-sm">
                                    <div>
                                      <span className="font-medium">{item.quantity}x</span> {item.name}
                                    </div>
                                    <div>₹{(item.price * item.quantity).toFixed(2)}</div>
                                  </div>
                                ))}
                                <div className="border-t border-gray-200 pt-2 mt-2">
                                  <div className="flex justify-between font-medium">
                                    <span>Total:</span>
                                    <span>₹{order.total.toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Shipping Information</h3>
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                              <div className="space-y-2 text-sm">
                                <div className="font-medium">{order.customer.name}</div>
                                <div>{order.shippingAddress.street}</div>
                                <div>
                                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zip}
                                </div>
                                <div className="mt-2">
                                  <div className="text-gray-500">Contact:</div>
                                  <div>{order.customer.email}</div>
                                  <div>{order.customer.phone}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination would go here */}
    </div>
  );
};

export default OrderManagement;