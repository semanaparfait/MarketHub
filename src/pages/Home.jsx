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
      <div className="grid  md:grid-cols-3 lg:grid-cols-3 gap-4 p-5 justify-items-center">
        {products.map((product) => (
            <div key={product.id} className='flex flex-col gap-1  w-fit  '>

          <div  className=" rounded   w-fit px-2 bg-gray-300">
            <img src={product.thumbnail} alt={product.title} className="w-1/3 object-cover rounded-2xl" />
          </div>
          <div className=' p-4'>

            <h1 className="font-bold">
            {product.title.split(" ").slice(0, 2).join(" ")}
            </h1>
            <div className='flex justify-between'>
            <p>🌟 {product.rating}</p>
            <p>${product.price}</p>
            </div>
          <div className='flex gap-4'>
            <button className='border rounded-2xl font-sm px-2 py-0.5 font-medium'>Add to Cart</button>
            <button className='bg-black rounded-2xl font-sm px-2 py-0.5 font-medium text-white'>Add to WishList</button>
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