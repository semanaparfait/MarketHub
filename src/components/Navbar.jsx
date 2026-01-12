import React, { useState, useEffect } from 'react';
import { Home, Search, ShoppingCart, User, LogOut, LayoutDashboard, ChevronDown, CakeSliceIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [cartCount, setCartCount] = useState(0); // 1. State for Cart Count

  useEffect(() => {
    // Load user data
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }

    // 2. Function to update count from localStorage
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    // Initial load
    updateCartCount();

    // 3. Listen for changes (this helps if adding from the same page)
    window.addEventListener('storage', updateCartCount);
    
    // Custom event listener for same-window updates
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserData(null);
    setIsOpen(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Home className="w-5 h-5 text-black" />
            <span className="text-xl font-bold tracking-tight">MarketHub</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-black transition-colors text-sm font-medium">Home</Link>
            <Link to="/rewards" className="text-gray-600 hover:text-black transition-colors text-sm font-medium">Rewards</Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <CakeSliceIcon className="w-5 h-5 text-gray-700" />
            </button>
            
            {/* 4. Updated Cart Icon with Badge */}
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative group">
              <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-black" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </Link>
            

            <div className="border-l border-gray-200 h-6 mx-2"></div>

            {!userData ? (
              <Link to="/account" className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition">
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center space-x-2 p-1 pr-3 hover:bg-gray-100 rounded-full transition border border-transparent hover:border-gray-200"
                >
                  <img src={userData.image} alt="Profile" className="w-8 h-8 rounded-full bg-gray-200 border border-gray-100 object-cover" />
                  <span className="text-sm font-semibold text-gray-700 hidden sm:block">{userData.firstName}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 overflow-hidden animate-in slide-in-from-top-2">
                      <div className="px-4 py-2 border-b border-gray-50 mb-1">
                        <p className="text-xs text-gray-400 font-medium uppercase">My Account</p>
                      </div>
                      <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition">
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 w-full text-left transition">
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}