import React, { useState } from 'react';
import { Package, Home, Music, Smartphone, HardDrive, Sparkles, Award, Tag } from 'lucide-react';

export default function CategoriesMenu() {
  const [selectedCategory, setSelectedCategory] = useState('All Product');

  const categories = [
    { name: 'All Product', icon: Package, hasDropdown: false, badge: 2 },
    { name: 'For Home', icon: Home, hasDropdown: false },
    { name: 'For Music', icon: Music, hasDropdown: false },
    { name: 'For iPhone', icon: Smartphone, hasDropdown: false },
    { name: 'For Storage', icon: HardDrive, hasDropdown: false },
    { name: 'New Arrival', icon: Sparkles, hasDropdown: true },
    { name: 'Best Seller', icon: Award, hasDropdown: true },
    { name: 'On Discount', icon: Tag, hasDropdown: true },
  ];

  return (
    <div className="w-64 bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Category</h2>
      
      <div className="space-y-1">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.name;
          
          return (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                isSelected 
                  ? 'bg-red-50 text-red-500' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} />
                <span className="text-sm font-medium">{category.name}</span>
              </div>
              
              <div className="flex items-center gap-2">
                {category.badge && (
                  <span className="bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    {category.badge}
                  </span>
                )}
                {category.hasDropdown && (
                  <svg 
                    className="w-4 h-4 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}