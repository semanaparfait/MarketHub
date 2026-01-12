import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { Sparkles, Tag, ShoppingCart, Filter, X, ChevronDown } from 'lucide-react'
import toast from 'react-hot-toast' // 1. Import toast

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then((response) => {
        // Get products from API
        let apiProducts = response.data.products;
        
        // Get custom products from localStorage
        const localStorageProducts = JSON.parse(localStorage.getItem('marketHub_products')) || [];
        
        // Combine API products with localStorage products
        const allProducts = [...apiProducts, ...localStorageProducts];
        
        setProducts(allProducts);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(allProducts.map(p => p.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      })
      .catch((error) => {
        setError("Could not connect to the server.");
        
        // Still load localStorage products if API fails
        const localStorageProducts = JSON.parse(localStorage.getItem('marketHub_products')) || [];
        setProducts(localStorageProducts);
        
        const uniqueCategories = [...new Set(localStorageProducts.map(p => p.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      });
  }, []);

  // Timer for Advert Scrolling
  useEffect(() => {
    if (products.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev === 2 ? 0 : prev + 1));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [products]);

  // 2. Add to Cart Function with Toaster
  const handleAddToCart = (product) => {
    // Get existing cart from localStorage or empty array
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    
    let updatedCart;
    if (existingItemIndex !== -1) {
      // Product exists, increase quantity
      updatedCart = existingCart.map((item, index) => 
        index === existingItemIndex 
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      toast.success(`Increased ${product.title.split(" ").slice(0, 2).join(" ")} quantity!`, {
        icon: '➕',
        style: {
          borderRadius: '15px',
          background: '#333',
          color: '#fff',
        },
      });
    } else {
      // Product doesn't exist, add new item with quantity 1
      updatedCart = [...existingCart, { ...product, cartId: Date.now(), quantity: 1 }];
      toast.success(`${product.title.split(" ").slice(0, 2).join(" ")} added to cart!`, {
        icon: '🛒',
        style: {
          borderRadius: '15px',
          background: '#333',
          color: '#fff',
        },
      });
    }
    
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    // Category filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    
    // Price range filter
    if (priceRange === 'under50' && product.price >= 50) return false;
    if (priceRange === '50to100' && (product.price < 50 || product.price > 100)) return false;
    if (priceRange === '100to500' && (product.price < 100 || product.price > 500)) return false;
    if (priceRange === 'over500' && product.price <= 500) return false;
    
    // Rating filter
    if (product.rating < minRating) return false;
    
    return true;
  });

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory('all');
    setPriceRange('all');
    setMinRating(0);
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen text-gray-400">Loading...</div>;

  const featuredProduct = products[activeIndex];

  return (
    <section className="bg-white">
      <Navbar />

      {/* --- Auto-Scrolling Spotlight Advert --- */}
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

        <div className="max-w-7xl mx-auto">

          {/* Key is added here to trigger a re-animation when product changes */}

          <div key={featuredProduct?.id} className="relative bg-white rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 flex flex-col md:flex-row items-center animate-fadeIn">

           

            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-50 -z-0"></div>

            <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 -z-0"></div>



            {/* Left: Content */}

            <div className="relative z-10 w-full md:w-1/2 p-8 md:p-16 flex flex-col items-start transition-all duration-500">

              <div className="flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">

                <Sparkles size={12} className="text-amber-400" />

                <span>Limited Edition #{activeIndex + 1}</span>

              </div>

             

              <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-none">

                {featuredProduct?.title.split(" ")[0]} <br />

                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400">

                  Collection.

                </span>

              </h1>

             

              <p className="text-gray-500 text-lg mb-8 max-w-sm h-20 overflow-hidden">

                {featuredProduct?.description}

              </p>



              <div className="flex items-center gap-6">

                <button className="bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95">

                  Shop Now — ${featuredProduct?.price}

                </button>

                <div className="flex flex-col">

                  <span className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Rating</span>

                  <span className="text-lg font-black">🌟 {featuredProduct?.rating} / 5.0</span>

                </div>

              </div>



              {/* Pagination Dots */}

              <div className="flex gap-2 mt-8">

                {[0, 1, 2].map((i) => (

                  <div key={i} className={`h-2 w-2 rounded-full transition-all duration-300 ${activeIndex === i ? "w-8 bg-black" : "bg-gray-300"}`}></div>

                ))}

              </div>

            </div>



            {/* Right: Floating Product Image */}

            <div className="relative z-10 w-full md:w-1/2 p-8 flex justify-center items-center">

              <div className="relative group">

                <div className="absolute inset-0 bg-gradient-to-tr from-amber-200 to-indigo-200 rounded-full blur-2xl opacity-30"></div>

               

                <img

                  src={featuredProduct?.images[0]}

                  alt="featured"

                  className="relative w-80 h-80 md:w-[450px] md:h-[450px] object-contain drop-shadow-[20px_20px_40px_rgba(0,0,0,0.1)] transform transition-all duration-700"

                />

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* --- Main Product Grid with Filters --- */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filter Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black">Filters</h3>
                <button onClick={resetFilters} className="text-sm text-gray-500 hover:text-black">Reset</button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-700 mb-3">Category</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="category" 
                      value="all"
                      checked={selectedCategory === 'all'}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-600">All Products</span>
                  </label>
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="category" 
                        value={cat}
                        checked={selectedCategory === cat}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-600 capitalize">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6 pb-6 border-b border-gray-100">
                <h4 className="text-sm font-bold text-gray-700 mb-3">Price Range</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="price" 
                      value="all"
                      checked={priceRange === 'all'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-600">All Prices</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="price" 
                      value="under50"
                      checked={priceRange === 'under50'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-600">Under $50</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="price" 
                      value="50to100"
                      checked={priceRange === '50to100'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-600">$50 - $100</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="price" 
                      value="100to500"
                      checked={priceRange === '100to500'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-600">$100 - $500</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="price" 
                      value="over500"
                      checked={priceRange === 'over500'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-600">Over $500</span>
                  </label>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-3">Minimum Rating</h4>
                <div className="space-y-2">
                  {[0, 3, 4, 4.5].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="rating" 
                        value={rating}
                        checked={minRating === rating}
                        onChange={(e) => setMinRating(parseFloat(e.target.value))}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-600">
                        {rating === 0 ? 'All Ratings' : `${rating}+ ⭐`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Button & Modal */}
          <div className="lg:hidden">
            <button 
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl font-bold hover:bg-gray-800 transition w-full justify-center mb-6"
            >
              <Filter size={20} />
              Filters
            </button>

            {/* Mobile Filter Modal */}
            {showFilters && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
                <div className="bg-white w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-black">Filters</h3>
                    <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-gray-100 rounded-full">
                      <X size={24} />
                    </button>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <h4 className="text-sm font-bold text-gray-700 mb-3">Category</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="mobile-category" 
                          value="all"
                          checked={selectedCategory === 'all'}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-600">All Products</span>
                      </label>
                      {categories.map((cat) => (
                        <label key={cat} className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="radio" 
                            name="mobile-category" 
                            value={cat}
                            checked={selectedCategory === cat}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-600 capitalize">{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <h4 className="text-sm font-bold text-gray-700 mb-3">Price Range</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="mobile-price" 
                          value="all"
                          checked={priceRange === 'all'}
                          onChange={(e) => setPriceRange(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-600">All Prices</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="mobile-price" 
                          value="under50"
                          checked={priceRange === 'under50'}
                          onChange={(e) => setPriceRange(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-600">Under $50</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="mobile-price" 
                          value="50to100"
                          checked={priceRange === '50to100'}
                          onChange={(e) => setPriceRange(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-600">$50 - $100</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="mobile-price" 
                          value="100to500"
                          checked={priceRange === '100to500'}
                          onChange={(e) => setPriceRange(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-600">$100 - $500</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="mobile-price" 
                          value="over500"
                          checked={priceRange === 'over500'}
                          onChange={(e) => setPriceRange(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-600">Over $500</span>
                      </label>
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-700 mb-3">Minimum Rating</h4>
                    <div className="space-y-2">
                      {[0, 3, 4, 4.5].map((rating) => (
                        <label key={rating} className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="radio" 
                            name="mobile-rating" 
                            value={rating}
                            checked={minRating === rating}
                            onChange={(e) => setMinRating(parseFloat(e.target.value))}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-600">
                            {rating === 0 ? 'All Ratings' : `${rating}+ ⭐`}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={resetFilters}
                      className="flex-1 bg-gray-100 text-black py-3 rounded-xl font-bold hover:bg-gray-200 transition"
                    >
                      Reset
                    </button>
                    <button 
                      onClick={() => setShowFilters(false)}
                      className="flex-1 bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black">Explore Collections</h2>
              <span className="text-gray-500 text-sm">{filteredProducts.length} products</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col">
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">{product.title}</h3>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xl font-black">${product.price}</span>
                      <span className="text-xs text-gray-400">⭐ {product.rating}</span>
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-black text-white text-xs font-bold py-3 rounded-xl hover:bg-gray-800 transition active:scale-95"
                      >
                        Add to Cart
                      </button>
                      <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                        <Tag size={18} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Home;