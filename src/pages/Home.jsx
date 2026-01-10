import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New error state

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Could not connect to the server. Please check your internet.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-10">Loading MarketHub Products...</div>;
  
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <section>
      <Navbar />
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8 max-w-7xl mx-auto">
  {products.map((product) => (
    <div 
      key={product.id} 
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Image Container with Aspect Ratio and Overlay */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        
        {/* Floating Badge (e.g., Rating) */}
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <span className="text-amber-500 text-sm">★</span>
          <span className="text-xs font-bold text-gray-700">{product.rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-900 leading-tight">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h3>
          <span className="text-xl font-black text-black">${product.price}</span>
        </div>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-6">
          {product.description}
        </p>

        {/* Modern Button Group */}
        <div className="flex gap-2 mt-auto">
          <button 
            className="flex-1 bg-black text-white text-xs font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors active:scale-95 duration-200"
          >
            Add to Cart
          </button>
          <button 
            className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors active:scale-95 duration-200"
            aria-label="Add to wishlist"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
      <Footer />
    </section>
  );
}

export default Home