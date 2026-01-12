import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize state from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('marketHub_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWish = localStorage.getItem('marketHub_wishlist');
    return savedWish ? JSON.parse(savedWish) : [];
  });

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('marketHub_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('marketHub_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // --- Cart Actions ---
  const addToCart = (product) => {
    setCart((prev) => {
      const isItemInCart = prev.find((item) => item.id === product.id);
      if (isItemInCart) {
        toast.success(`Increased ${product.title} quantity`);
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast.success(`${product.title} added to cart!`);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.error("Item removed from cart");
  };

  // --- Wishlist Actions ---
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const isExist = prev.find((item) => item.id === product.id);
      if (isExist) {
        toast("Removed from Wishlist", { icon: '🗑️' });
        return prev.filter((item) => item.id !== product.id);
      }
      toast("Saved to Wishlist", { icon: '❤️' });
      return [...prev, product];
    });
  };

  return (
    <CartContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, toggleWishlist }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);