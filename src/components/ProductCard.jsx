import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProductCard({ product, index = 0 }) {
  const [showShades, setShowShades] = useState(false);
  const [imgHover, setImgHover] = useState(false);
  const inWishlist = false;
  const hasShades = product.shades && product.shades.length > 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 12) * 0.04 }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-primary-100/60 hover:border-primary-200/80 transition-all duration-500"
      onMouseEnter={() => setImgHover(true)}
      onMouseLeave={() => { setImgHover(false); setShowShades(false); }}
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary-50/80 to-secondary-50/80">
        <Link to={`/product/${product.id}`}>
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: imgHover ? 1.08 : 1 }}
            transition={{ duration: 0.6 }}
          />
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discount > 5 && (
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              className="px-2.5 py-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-bold rounded-r-full shadow-lg shadow-rose-200/40"
            >
              -{product.discount}% OFF
            </motion.span>
          )}
          {product.isNew && (
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
              className="px-2.5 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[10px] font-bold rounded-r-full shadow-lg shadow-purple-200/40"
            >
              NEW
            </motion.span>
          )}
          {product.isBestSeller && product.discount <= 5 && !product.isNew && (
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold rounded-r-full shadow-lg shadow-amber-200/40"
            >
              BESTSELLER
            </motion.span>
          )}
        </div>



        {hasShades && (
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <motion.div
              initial={false}
              animate={{ height: showShades ? "auto" : 28 }}
              className="overflow-hidden"
              onMouseEnter={() => setShowShades(true)}
              onMouseLeave={() => setShowShades(false)}
            >
              {showShades ? (
                <div className="bg-white/95 backdrop-blur-xl rounded-xl p-3 shadow-xl border border-primary-100/60">
                  <p className="text-[10px] font-semibold text-gray-500 mb-2 uppercase tracking-wider">{product.shades.length} Shades</p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.shades.slice(0, 6).map(s => (
                      <button key={s} className="text-[10px] px-2.5 py-1 bg-primary-50 text-primary-700 rounded-full hover:bg-primary-100 transition-colors font-medium truncate max-w-[90px]">{s}</button>
                    ))}
                    {product.shades.length > 6 && <span className="text-[10px] px-2.5 py-1 text-gray-400 font-medium">+{product.shades.length - 6}</span>}
                  </div>
                </div>
              ) : (
                <div className="bg-white/80 backdrop-blur-sm rounded-lg py-1.5 px-3 shadow-sm border border-primary-100/50 flex items-center justify-center gap-1.5 cursor-pointer hover:bg-white/95 transition-all">
                  <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                  <span className="text-[10px] font-medium text-gray-600">{product.shades.length} Shades</span>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>

      <div className="p-3.5 sm:p-4">
        <Link to={`/product/${product.id}`}>
          <p className="text-[10px] text-primary-600 font-semibold uppercase tracking-wider truncate">{product.brand}</p>
          <h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors leading-snug mt-0.5 min-h-[2.2rem]">{product.name}</h3>
        </Link>

        <div className="flex items-center gap-1.5 mt-1.5">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
              <svg key={i} className={`w-[11px] h-[11px] ${i <= Math.floor(product.rating) ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[10px] text-gray-400 font-medium">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="flex items-baseline gap-1.5 mt-2">
          <span className="text-sm sm:text-base font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="text-[10px] sm:text-xs text-gray-400 line-through font-medium">₹{product.originalPrice.toLocaleString()}</span>
          )}
          {product.discount > 0 && (
            <span className="text-[10px] font-semibold text-emerald-600 ml-auto">Save {product.discount}%</span>
          )}
        </div>


      </div>
    </motion.div>
  );
}
