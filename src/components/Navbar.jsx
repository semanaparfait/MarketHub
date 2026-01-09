import React from 'react';
import { Home, Search, ShoppingCart, User } from 'lucide-react';


export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Home className="w-5 h-5" />
            {/* <img src={logo} alt="" className='w-1/3' /> */}
            <span className="text-xl font-bold">MarketHub</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
              Rewards
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
              Shop
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
              Why
            </a>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}