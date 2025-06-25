// src/App.jsx
import React from 'react';
import {  Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider } from './AdminContext';

import AdminLayout from './AdminLayout';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';

function App() {
  return (
    <AdminProvider>
    
        <Routes>
      
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="orders" element={<Orders />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      
    </AdminProvider>
  );
}

export default App;