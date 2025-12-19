import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiPackage, FiPlusCircle, FiShoppingBag, FiGrid, FiX } from 'react-icons/fi';
import { adminLayoutStyles as styles } from '../assets/adminStyles';

const AdminNavbar = ({ isMobileOpen, onClose }) => {
  const NavLinks = () => (
    <>
      <NavLink to="/admin/add-item" className={styles.navLink}>
        <FiPlusCircle className={styles.navIcon} />
        Add Products
      </NavLink>
      
      <NavLink to="/admin/list-items" className={styles.navLink}>
        <FiGrid className={styles.navIcon} />
        Inventory
      </NavLink>
      
      <NavLink to="/admin/orders" className={styles.navLink}>
        <FiShoppingBag className={styles.navIcon} />
        Orders
      </NavLink>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarBrand}>
            <div className="bg-emerald-800 p-1.5 rounded-lg">
              <FiPackage className="text-xl" />
            </div>
            FreshHive
          </div>
        </div>
        
        <nav className={styles.sidebarContent}>
          <NavLinks />
        </nav>
        
        <div className={styles.sidebarFooter}>
          <div className="text-xs text-emerald-300">
            &copy; 2025 FreshHive
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div className={`${styles.sidebarMobile} ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarBrand}>
            <FiPackage className="mr-2" /> FreshHive
          </div>
          <button onClick={onClose} className="ml-auto text-white p-2">
            <FiX size={24} />
          </button>
        </div>
        <nav className={styles.sidebarContent}>
          <NavLinks />
        </nav>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className={styles.overlay} onClick={onClose} />
      )}
    </>
  );
};

export default AdminNavbar;
