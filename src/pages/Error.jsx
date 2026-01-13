import React from 'react';
import { X, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  const handleOkay = () => {
    console.log('Okay clicked'); 
  };

  const handleClose = () => {
    console.log('Close clicked');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="relative">
        {/* Stacked cards effect - back cards */}
        <div className="absolute inset-0 bg-cyan-300 rounded-2xl transform translate-x-3 translate-y-3 border-4 border-white"></div>
        <div className="absolute inset-0 bg-rose-400 rounded-2xl transform translate-x-6 translate-y-6 border-4 border-white"></div>
        
        {/* Main error card */}
        <div className="relative bg-rose-500 rounded-2xl border-4 border-white shadow-2xl w-80 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-white text-2xl font-bold tracking-wide">ERROR</h1>
            <button 
              onClick={handleClose}
              className="text-white hover:bg-rose-600 rounded p-1 transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-white/30 mb-6"></div>

          {/* Error message */}
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white/20 rounded-full p-2">
              <AlertCircle className="text-white" size={24} />
            </div>
            <p className="text-white text-sm font-medium tracking-wide">
              MOTIVATION NOT FOUND
            </p>
          </div>

          {/* Decorative line */}
          <div className="w-8 h-1 bg-white/40 rounded mb-6"></div>

          {/* Okay button */}
          <Link to="/">
          <button
            onClick={handleOkay}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-lg transition-colors uppercase tracking-wider"
          >
            Okay
          </button>
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-2 right-12 w-12 h-1 bg-white rounded"></div>
        <div className="absolute top-32 -right-2 w-1 h-8 bg-white rounded"></div>
      </div>
    </div>
  );
}