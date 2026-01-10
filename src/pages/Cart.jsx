import React, { useState, useEffect } from 'react';
import { Trash2, ShoppingBag, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);

    // 1. Load cart items from localStorage on mount
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(savedCart);
    }, []);

    // 2. Remove Item Function
    const removeItem = (cartId) => {
        const updatedCart = cartItems.filter(item => item.cartId !== cartId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        toast.error("Item removed from cart");
    };

    // 3. Calculate Total Price
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);

    return (
        <section className="bg-gray-50 min-h-screen flex flex-col">
            <Navbar />
            
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
                <div className="flex items-center gap-4 mb-10">
                    <Link to="/" className="p-2 hover:bg-white rounded-full transition shadow-sm">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Your Shopping Bag</h1>
                </div>

                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        
                        {/* Left: Product List */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.cartId} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex items-center gap-6 group transition-hover">
                                    <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
                                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                    
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
                                        <p className="text-gray-400 text-sm mb-2">{item.category}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xl font-black text-black">${item.price}</span>
                                            <button 
                                                onClick={() => removeItem(item.cartId)}
                                                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right: Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-black text-white p-10 rounded-[40px] shadow-2xl sticky top-24">
                                <h2 className="text-2xl font-bold mb-8">Order Summary</h2>
                                
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-gray-400">
                                        <span>Subtotal</span>
                                        <span>${totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Shipping</span>
                                        <span className="text-green-400">FREE</span>
                                    </div>
                                    <div className="border-t border-gray-800 pt-4 flex justify-between text-xl font-bold">
                                        <span>Total</span>
                                        <span className="text-amber-400">${totalPrice}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => toast.success("Checkout feature coming soon!")}
                                    className="w-full bg-amber-500 text-black py-4 rounded-2xl font-black text-lg hover:bg-amber-400 transition transform active:scale-95"
                                >
                                    Proceed to Checkout
                                </button>
                                
                                <p className="text-center text-[10px] text-gray-500 mt-6 uppercase tracking-widest font-bold">
                                    Secure checkout powered by MarketHub
                                </p>
                            </div>
                        </div>

                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-20 bg-white rounded-[48px] border border-dashed border-gray-200">
                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag size={40} className="text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your bag is empty</h2>
                        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                        <Link to="/" className="inline-block bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition shadow-lg">
                            Start Shopping
                        </Link>
                    </div>
                )}
            </main>

            <Footer />
        </section>
    );
}