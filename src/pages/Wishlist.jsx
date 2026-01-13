import React from 'react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

export default function Wishlist() {
  const { wishlist, addToCart, toggleWishlist } = useCart();

  if (wishlist.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="mb-8">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-16 h-16 text-gray-300" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Your Wishlist is Empty</h1>
              <p className="text-gray-600 text-lg mb-8">Save items you love and they'll appear here for easy access!</p>
            </div>
            <a href="/" className="inline-block bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95">
              Start Shopping
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          {/* Header Section */}
          <div className="mb-12 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="bg-red-100 p-3 rounded-2xl hidden">
                <Heart className="w-6 h-6 text-red-500" fill="currentColor" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900">My Wishlist</h1>
            </div>
            <p className="text-gray-600 text-lg">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {wishlist.map((item) => (
              <div key={item.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <img
                    src={item.thumbnail || item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Floating Heart Badge */}
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors group/heart"
                      title="Remove from wishlist"
                    >
                      <Heart className="w-5 h-5 text-red-500 group-hover/heart:scale-110 transition-transform" fill="currentColor" />
                    </button>
                  </div>
                  
                  {/* Stock/Rating Badge */}
                  {item.rating && (
                    <div className="absolute bottom-3 left-3">
                      <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <span>⭐</span>
                        <span>{parseFloat(item.rating).toFixed(1)}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-lg group-hover:text-black transition-colors">
                    {item.title}
                  </h3>
                  
                  {item.description && (
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  
                  {/* Price Section */}
                  <div className="flex items-end justify-between mb-6 mt-auto">
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Price</p>
                      <span className="text-2xl font-black text-gray-900">
                        ${parseFloat(item.price).toFixed(2)}
                      </span>
                    </div>
                    {item.category && (
                      <span className="text-xs text-gray-400 capitalize bg-gray-100 px-3 py-1 rounded-full font-semibold">
                        {item.category}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => addToCart(item)}
                      className="flex-1 bg-black text-white text-sm font-bold py-3 rounded-xl hover:bg-gray-800 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="bg-red-50 text-red-600 px-4 py-3 rounded-xl hover:bg-red-100 transition-all active:scale-95 flex items-center justify-center"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
