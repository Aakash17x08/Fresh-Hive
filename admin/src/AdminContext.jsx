import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Sample initial data
  const initialItems = [
    {
      id: uuidv4(),
      name: 'Organic Apples',
      description: 'Fresh organic apples from local farms',
      price: 2.99,
      category: 'fruits',
      stock: 25,
      imageUrl: '/images/apples.jpg'
    },
    {
      id: uuidv4(),
      name: 'Bananas',
      description: 'Premium organic bananas',
      price: 1.49,
      category: 'fruits',
      stock: 0,
      imageUrl: '/images/bananas.jpg'
    },
    {
      id: uuidv4(),
      name: 'Carrots',
      description: 'Fresh organic carrots',
      price: 0.99,
      category: 'vegetables',
      stock: 42,
      imageUrl: '/images/carrots.jpg'
    },
    {
      id: uuidv4(),
      name: 'Whole Milk',
      description: 'Organic whole milk',
      price: 3.49,
      category: 'dairy',
      stock: 18,
      imageUrl: '/images/milk.jpg'
    },
    {
      id: uuidv4(),
      name: 'Chicken Breast',
      description: 'Free-range organic chicken breast',
      price: 8.99,
      category: 'meat',
      stock: 5,
      imageUrl: '/images/chicken.jpg'
    }
  ];

  const initialOrders = [
    {
      id: `ORD-${uuidv4().substring(0, 8)}`,
      customer: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-1234'
      },
      items: [
        { id: initialItems[0].id, name: initialItems[0].name, price: initialItems[0].price, quantity: 2 },
        { id: initialItems[2].id, name: initialItems[2].name, price: initialItems[2].price, quantity: 1 }
      ],
      total: (2 * initialItems[0].price + initialItems[2].price) * 1.05, // Including 5% tax
      shippingAddress: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345'
      },
      status: 'pending',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
    },
    {
      id: `ORD-${uuidv4().substring(0, 8)}`,
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '555-5678'
      },
      items: [
        { id: initialItems[1].id, name: initialItems[1].name, price: initialItems[1].price, quantity: 3 },
        { id: initialItems[3].id, name: initialItems[3].name, price: initialItems[3].price, quantity: 2 }
      ],
      total: (3 * initialItems[1].price + 2 * initialItems[3].price) * 1.05,
      shippingAddress: {
        street: '456 Oak Ave',
        city: 'Somewhere',
        state: 'NY',
        zip: '67890'
      },
      status: 'processing',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    },
    {
      id: `ORD-${uuidv4().substring(0, 8)}`,
      customer: {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        phone: '555-9012'
      },
      items: [
        { id: initialItems[4].id, name: initialItems[4].name, price: initialItems[4].price, quantity: 1 }
      ],
      total: (initialItems[4].price) * 1.05,
      shippingAddress: {
        street: '789 Pine Rd',
        city: 'Nowhere',
        state: 'TX',
        zip: '54321'
      },
      status: 'delivered',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
    }
  ];

  // Initialize state from localStorage or with sample data
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('inventory');
    return saved ? JSON.parse(saved) : initialItems;
  });
  
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  // Persist data to localStorage
  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // CRUD operations for items
  const addItem = (newItem) => {
    const itemWithId = {
      ...newItem,
      id: uuidv4(),
      imageUrl: newItem.imageUrl || '/images/default-product.jpg'
    };
    setItems([...items, itemWithId]);
  };

  const updateItem = (id, updatedItem) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, ...updatedItem } : item
    ));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Order management
  const updateOrderStatus = (orderId, status) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const addOrder = (newOrder) => {
    const orderWithId = {
      ...newOrder,
      id: `ORD-${uuidv4().substring(0, 8)}`,
      date: new Date().toISOString()
    };
    setOrders([orderWithId, ...orders]);
  };

  const cancelOrder = (orderId) => {
    updateOrderStatus(orderId, 'cancelled');
  };

  // Stock management
  const updateStock = (productId, quantityChange) => {
    setItems(items.map(item => 
      item.id === productId 
        ? { ...item, stock: Math.max(0, item.stock + quantityChange) } 
        : item
    ));
  };

  // Process order - update stock levels
  const processOrder = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    // Update stock for each item in the order
    order.items.forEach(item => {
      updateStock(item.id, -item.quantity);
    });

    // Update order status
    updateOrderStatus(orderId, 'processing');
  };

  // Stock alert system
  const outOfStockItems = items.filter(item => item.stock <= 0);
  const lowStockItems = items.filter(item => item.stock > 0 && item.stock <= 10);

  // Sales analytics
  const getTotalSales = () => {
    return orders
      .filter(order => order.status === 'delivered')
      .reduce((total, order) => total + order.total, 0);
  };

  const getRecentOrders = (days = 7) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return orders.filter(order => 
      new Date(order.date) > cutoffDate && order.status !== 'cancelled'
    );
  };

  return (
    <AdminContext.Provider value={{
      items,
      orders,
      outOfStockItems,
      lowStockItems,
      addItem,
      updateItem,
      deleteItem,
      updateOrderStatus,
      addOrder,
      cancelOrder,
      processOrder,
      updateStock,
      getTotalSales,
      getRecentOrders
    }}>
      {children}
    </AdminContext.Provider>
  );
};