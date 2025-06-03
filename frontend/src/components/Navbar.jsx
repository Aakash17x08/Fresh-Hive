import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-xl font-semibold text-gray-800">
                            MyBrand
                        </Link>
                    </div>
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        <Link to="/" className="text-gray-800 hover:text-gray-600">
                            Home
                        </Link>
                        <Link to="/contact" className="text-gray-800 hover:text-gray-600">
                            Contact
                        </Link>
                        <Link to="/items" className="text-gray-800 hover:text-gray-600">
                            Items
                        </Link>
                        <Link to="/cart" className="text-gray-800 hover:text-gray-600">
                            Cart
                        </Link>
                    </div>
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/contact"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact
                        </Link>
                        <Link
                            to="/items"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100"
                            onClick={() => setIsOpen(false)}
                        >
                            Items
                        </Link>
                        <Link
                            to="/cart"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100"
                            onClick={() => setIsOpen(false)}
                        >
                            Cart
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
