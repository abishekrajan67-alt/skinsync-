import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("gb_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("gb_wishlist", JSON.stringify(items));
  }, [items]);

  const toggleItem = (product) => {
    setItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => {
    return items.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ items, toggleItem, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
