import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <motion.span className="text-6xl inline-block" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>🤍</motion.span>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Your Wishlist is Empty</h2>
        <p className="mt-1 text-sm text-gray-500">Save your favourites for later.</p>
        <Link to="/products" className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all shadow-lg shadow-primary-200/40">Explore Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">My Wishlist</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{items.length} {items.length === 1 ? "item" : "items"} saved</p>
      </div>
      <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {items.map((product, i) => (
          <motion.div key={product.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} layout>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
