// src/assets/adminStyles.js

// Shared Styles
const cardBase = "bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300";
const buttonBase = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

export const adminLayoutStyles = {
  container: "min-h-screen bg-gray-50/50 flex font-sans",
  sidebar: "hidden md:flex flex-col w-72 bg-emerald-950 text-white fixed h-full z-30 shadow-xl",
  sidebarMobile: "fixed inset-y-0 left-0 z-40 w-72 bg-emerald-950 text-white transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl",
  sidebarHeader: "h-20 flex items-center px-8 border-b border-emerald-900/50",
  sidebarBrand: "text-2xl font-bold tracking-tight text-white flex items-center gap-3",
  sidebarContent: "flex-1 overflow-y-auto py-6 px-4 space-y-1",
  sidebarFooter: "p-6 border-t border-emerald-900/50 bg-emerald-950",
  mainContent: "flex-1 md:ml-72 min-h-screen flex flex-col transition-all duration-300",
  topBar: "bg-white/80 backdrop-blur-md h-20 border-b border-gray-200/50 sticky top-0 z-20 px-4 sm:px-8 flex items-center justify-between shadow-sm",
  pageContent: "p-4 sm:p-8 flex-1 overflow-x-hidden max-w-[1600px] mx-auto w-full",
  
  // Navigation Links
  navLink: ({ isActive }) => 
    `flex items-center px-4 py-3.5 text-sm font-medium transition-all rounded-xl mb-1 ${
      isActive 
        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20 translate-x-1' 
        : 'text-emerald-100/70 hover:bg-emerald-900/50 hover:text-white hover:translate-x-1'
    }`,
  navIcon: "w-5 h-5 mr-3.5",
  
  // Mobile Toggle
  menuButton: "p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-emerald-600 md:hidden focus:ring-2 focus:ring-emerald-500 transition-colors",
  overlay: "fixed inset-0 bg-gray-900/50 z-30 md:hidden backdrop-blur-sm transition-opacity",
};

export const addItemPageStyles = {
  pageContainer: "max-w-5xl mx-auto",
  heading: "text-3xl font-bold text-gray-900 mb-8 tracking-tight",
  form: `${cardBase} p-8 sm:p-10 space-y-8`,
  gridContainer: "grid grid-cols-1 gap-8",
  priceGrid: "grid grid-cols-1 sm:grid-cols-2 gap-8",
  label: "block text-sm font-semibold text-gray-700 mb-2",
  input: "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all shadow-sm",
  textarea: "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all shadow-sm min-h-[140px]",
  imageUploadContainer: "relative border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group bg-gray-50/50",
  previewImage: "mx-auto h-56 object-contain rounded-lg shadow-md",
  removeButton: "absolute top-3 right-3 bg-white text-red-500 hover:text-red-600 p-2 rounded-full shadow-lg border border-gray-100 transition-transform hover:scale-110",
  uploadIcon: "mx-auto h-12 w-12 text-gray-400 group-hover:text-emerald-500 transition-colors mb-4",
  uploadText: "text-sm text-gray-500 font-medium",
  hiddenInput: "hidden",
  submitButton: `${buttonBase} w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 text-lg`,
};

export const listItemsPageStyles = {
  pageContainer: "max-w-[1600px] mx-auto",
  headerContainer: "mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6",
  headerTitle: "text-3xl font-bold text-gray-900 tracking-tight",
  headerSubtitle: "text-gray-500 text-sm mt-1",
  statsGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
  contentContainer: `${cardBase} overflow-hidden ring-1 ring-black/5`,
  headerFlex: "p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-gray-50/30",
  headerTitleSmall: "text-xl font-bold text-gray-900",
  filterContainer: "flex items-center gap-4",
  filterSelectContainer: "relative min-w-[200px]",
  filterIconContainer: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400",
  filterIcon: "w-4 h-4",
  filterSelect: "w-full pl-11 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm cursor-pointer hover:border-emerald-400 transition-colors appearance-none",
  filterSelectArrow: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none",
  emptyStateContainer: "text-center py-20 px-6",
  emptyStateIconContainer: "mx-auto w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner",
  emptyStateIcon: "w-10 h-10 text-gray-400",
  emptyStateTitle: "text-xl font-bold text-gray-900 mb-2",
  emptyStateText: "text-gray-500 max-w-sm mx-auto",
  tableContainer: "overflow-x-auto",
  table: "w-full whitespace-nowrap",
  tableHead: "bg-gray-50/50 border-b border-gray-100",
  tableHeaderCell: "px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider",
  tableBody: "divide-y divide-gray-50",
  tableRowHover: "hover:bg-gray-50/50 transition-colors group",
  tableDataCell: "px-8 py-5 text-sm text-gray-700 align-middle",
  productCell: "flex items-center gap-4",
  productImage: "w-12 h-12 rounded-xl object-cover border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow",
  placeholderImage: "w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 text-xs font-bold border border-gray-100",
  productName: "font-semibold text-gray-900 text-base",
  productDescription: "text-xs text-gray-500 mt-1 truncate max-w-[200px]",
  categoryText: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100",
  price: "font-bold text-gray-900",
  oldPrice: "ml-2 text-xs text-gray-400 line-through",
  actionButtons: "flex items-center gap-2",
  editButton: "p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all hover:shadow-sm",
  deleteButton: "p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all hover:shadow-sm",
  
  // StatsCard styles
  statsCard: (border) => `${cardBase} p-6 border-l-[6px] ${border} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`,
  statsCardInner: "flex items-center gap-5",
  statsCardIconContainer: (color) => `p-4 rounded-2xl ${color} bg-opacity-10 shadow-sm`,
  statsCardIcon: (color) => `w-7 h-7 ${color.replace('bg-', 'text-').replace('100', '600')}`,
  statsCardLabel: "text-sm font-semibold text-gray-500 uppercase tracking-wide",
  statsCardValue: "text-3xl font-bold text-gray-900 mt-1 tracking-tight",
};

export const ordersPageStyles = {
  pageContainer: "max-w-[1600px] mx-auto",
  headerContainer: "mb-8",
  headerTitle: "text-3xl font-bold text-gray-900 tracking-tight",
  headerSubtitle: "text-gray-500 text-sm mt-1",
  
  // Stats & Table (Matching ListItems)
  statsGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
  statsCard: (border) => `${cardBase} p-6 border-l-[6px] ${border} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`,
  statsCardInner: "flex items-center gap-5",
  statsCardIconContainer: (color) => `p-4 rounded-2xl ${color} bg-opacity-10 shadow-sm`,
  statsCardIcon: (color) => `w-7 h-7 ${color.replace('bg-', 'text-').replace('100', '600')}`,
  statsCardLabel: "text-sm font-semibold text-gray-500 uppercase tracking-wide",
  statsCardValue: "text-3xl font-bold text-gray-900 mt-1 tracking-tight",
  
  contentContainer: `${cardBase} overflow-hidden ring-1 ring-black/5`,
  table: "w-full whitespace-nowrap",
  tableHead: "bg-gray-50/50 border-b border-gray-100",
  tableHeaderCell: "px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider",
  tableBody: "divide-y divide-gray-50",
  tableRowHover: "hover:bg-gray-50/50 transition-colors group",
  tableDataCell: "px-8 py-5 text-sm text-gray-700 align-middle",
  orderId: "font-mono text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded",
  
  emptyStateCell: "p-0",
  emptyStateContainer: "text-center py-20 px-6",
  emptyStateIcon: "w-10 h-10 text-gray-400 mx-auto mb-4",
  emptyStateTitle: "text-xl font-bold text-gray-900 mb-2",
  emptyStateText: "text-gray-500",

  statusBadge: (status) => {
    const styles = {
      'Pending': 'bg-amber-100 text-amber-700 border border-amber-200 ring-1 ring-amber-500/10',
      'Processing': 'bg-blue-100 text-blue-700 border border-blue-200 ring-1 ring-blue-500/10',
      'Shipped': 'bg-indigo-100 text-indigo-700 border border-indigo-200 ring-1 ring-indigo-500/10',
      'Delivered': 'bg-emerald-100 text-emerald-700 border border-emerald-200 ring-1 ring-emerald-500/10',
      'Cancelled': 'bg-red-100 text-red-700 border border-red-200 ring-1 ring-red-500/10',
      'default': 'bg-gray-100 text-gray-700 border border-gray-200'
    };
    return `inline-flex px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || styles.default}`;
  },
  
  paymentBadge: (status) => {
    const styles = {
      'Paid': 'bg-emerald-100 text-emerald-700 border border-emerald-200 ring-1 ring-emerald-500/10',
      'Unpaid': 'bg-red-100 text-red-700 border border-red-200 ring-1 ring-red-500/10',
      'default': 'bg-gray-100 text-gray-700 border border-gray-200'
    };
    return `inline-flex px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || styles.default}`;
  },

  actionButtons: "flex items-center gap-2",
  viewButton: `${buttonBase} px-3 py-1.5 bg-white text-emerald-600 hover:bg-emerald-50 text-xs rounded-lg border border-emerald-200 shadow-sm hover:shadow`,
  completeButton: (disabled) => `${buttonBase} px-3 py-1.5 text-xs rounded-lg border shadow-sm ${
    disabled 
      ? 'bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed' 
      : 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 hover:shadow'
  }`,
  cancelButton: (disabled) => `${buttonBase} px-3 py-1.5 text-xs rounded-lg border shadow-sm ${
    disabled 
      ? 'bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed' 
      : 'bg-white text-red-600 border-red-200 hover:bg-red-50 hover:shadow'
  }`,
  
  // Modal Styles
  modalOverlay: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in",
  modalContainer: "bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col animate-slide-up ring-1 ring-black/5",
  modalHeader: "flex items-center justify-between p-8 border-b border-gray-100 bg-gray-50/50",
  modalHeaderTitle: "text-2xl font-bold text-gray-900 tracking-tight",
  modalHeaderClose: "p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors",
  modalBody: "flex-1 overflow-y-auto p-8 space-y-8 bg-white",
  modalGrid: "grid grid-cols-1 lg:grid-cols-2 gap-8",
  modalSection: "bg-gray-50/50 rounded-2xl p-6 border border-gray-100 h-full",
  modalSectionTitle: "text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2.5",
  modalIcon: "text-emerald-600 w-5 h-5",
  modalInfoBox: "space-y-4",
  modalNoteBox: "p-4 bg-amber-50 rounded-xl border border-amber-100 text-sm text-amber-800",
  modalStatusControl: "bg-white p-6 rounded-2xl border border-gray-200 shadow-sm",
  modalSelect: "w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none shadow-sm transition-all cursor-pointer",
  
  modalOrderSummary: "space-y-6",
  modalOrderItem: (index, length) => `flex items-center gap-5 py-4 ${index !== length - 1 ? 'border-b border-gray-100' : ''}`,
  modalOrderImage: "w-16 h-16 rounded-xl object-cover border border-gray-100 shadow-sm",
  modalPlaceholderImage: "w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center text-xs text-gray-400 font-medium",
  
  modalOrderTotalSection: "mt-6 pt-6 border-t border-gray-100 space-y-3",
  modalOrderTotalRow: "flex justify-between text-sm text-gray-600",
  modalOrderTotalRowLast: "flex justify-between pt-4 border-t border-gray-100 mt-2 text-lg font-bold text-gray-900",
  
  modalFooter: "p-8 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-4",
  modalFooterButton: `${buttonBase} px-6 py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl shadow-sm text-sm`,
  modalFooterPrimaryButton: `${buttonBase} px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 text-sm`,
};
