import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (email) {
      console.log('Email submitted:', email);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-100">
      {/* Newsletter Section */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Left Section - Newsletter */}
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Ready to Get
              </h2>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Our New Stuff?
              </h2>
              
              <div className="flex gap-2 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="flex-1 px-4 py-2 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white text-sm"
                />
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm"
                >
                  Send
                </button>
              </div>
            </div>

            {/* Right Section - Info Text */}
            <div className="flex-1 max-w-md">
              <h3 className="text-sm font-semibold mb-3">
                Be First for reviews and trends
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                We'll share our latest lifestyle fandom opinions, and how create a imagination dream life shopping outfits that's right for you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Links and Social Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
            {/* About Column */}
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    Meet The Team
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Column */}
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    Return
                  </a>
                </li>
              </ul>
            </div>

            {/* Empty Column for spacing */}
            <div className="flex-1"></div>

            {/* Social Media */}
            <div className="flex-1 flex justify-end">
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Youtube className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>Copyright © 2026 MarketHub All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-900">
                Terms of Service
              </a>
              <a href="#" className="hover:text-gray-900">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}