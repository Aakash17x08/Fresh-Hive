// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { FiMenu, FiBell, FiUser } from 'react-icons/fi';
import AdminNavbar from './components/AdminNavbar';
import AddItemPage from './components/AddItem';
import ListItemsPage from './components/ListItems';
import OrdersPage from './components/Orders';
import { adminLayoutStyles } from './assets/adminStyles';

// Layout Component to handle page titles and structure
const AdminLayout = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    switch(location.pathname) {
      case '/admin/add-item': return 'Add New Product';
      case '/admin/list-items': return 'Product Inventory';
      case '/admin/orders': return 'Order Management';
      default: return 'Dashboard';
    }
  };

  return (
    <div className={adminLayoutStyles.container}>
      <AdminNavbar 
        isMobileOpen={isMobileOpen} 
        onClose={() => setIsMobileOpen(false)} 
      />
      
      <main className={adminLayoutStyles.mainContent}>
        {/* Top Bar */}
        <header className={adminLayoutStyles.topBar}>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className={adminLayoutStyles.menuButton}
            >
              <FiMenu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-gray-800 hidden sm:block">
              {getPageTitle()}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-emerald-600 rounded-full hover:bg-emerald-50 transition-colors relative">
              <FiBell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold border border-emerald-200">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className={adminLayoutStyles.pageContent}>
          {children}
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    
      <AdminLayout>
        <Routes>
          <Route path="/admin/add-item" element={<AddItemPage />} />
          <Route path="/admin/list-items" element={<ListItemsPage />} />
          <Route path="/admin/orders" element={<OrdersPage />} />
          <Route path="*" element={<AddItemPage />} />
        </Routes>
      </AdminLayout>
    
  );
}

export default App;
