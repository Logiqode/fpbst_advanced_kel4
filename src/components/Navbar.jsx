import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Desktop Navbar (visible >=481px) */}
        <div className="hidden md:flex items-center flex-grow">
          {/* Expense Tracker Link */}
          <Link to="/dashboard" className="text-white text-xl font-bold">
            Expense Tracker
          </Link>
          
          {/* Navigation Links (Expenses) */}
          <ul className="flex space-x-4 ml-5">
            <li><Link to="/expenses" className="text-white hover:text-gray-400">Expenses</Link></li>
          </ul>
        </div>

        {/* Mobile Menu Button (visible <480px) */}
        <div className="flex md:hidden items-center justify-between w-full">
          {/* Expense Tracker Link */}
          <Link to="/dashboard" className="text-white text-xl font-bold">
            Expense Tracker
          </Link>
          
          {/* Hamburger Menu Icon */}
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none ml-auto"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (visible <480px when open) */}
      <div
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-gray-800 mt-2`}
      >
        {/* Full-width clickable items */}
        <div className="flex flex-col items-start space-y-2">
          {/* Expenses Link */}
          <Link
            to="/expenses"
            className="block w-full px-4 py-2 text-white hover:bg-gray-600"
          >
            Expenses
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
