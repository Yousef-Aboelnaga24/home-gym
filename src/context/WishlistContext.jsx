import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('gym-wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) {
      api.get('/wishlist').then(res => {
        const items = res.data.data || res.data;
        // Map products in wishlist to expected frontend structure
        setWishlist(items.map(p => p.product || p)); 
      }).catch(console.error);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('gym-wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const toggleWishlist = async (product) => {
    try {
      if (user) {
        await api.post(`/wishlist/${product.id}`);
      }
      setWishlist((prev) => {
        const exists = prev.find((item) => item.id === product.id);
        if (exists) {
          return prev.filter((item) => item.id !== product.id);
        }
        return [...prev, product];
      });
    } catch (err) {
      console.error('Failed to toggle wishlist', err);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
