import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../data";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";
import { AnimatedPage, staggerContainer, fadeInUp, AnimatedSection } from "../components/Animations";

const tabs = ["Description", "Ingredients", "How to Use", "Reviews"];

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedShade, setSelectedShade] = useState(product?.shades?.[0] || "");
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl">😢</span>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Product Not Found</h2>
        <Link to="/products" className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl">Continue Shopping</Link>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const inWishlist = isInWishlist(product.id);
  const hasShades = product.shades && product.shades.length > 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const tabContent = [
    <div key="desc" className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
      <p>{product.description}</p>
      {product.tags && product.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {product.tags.map(t => <span key={t} className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full capitalize">{t.replace(/-/g, " ")}</span>)}
        </div>
      )}
    </div>,
    <div key="ingr" className="text-gray-600 text-sm leading-relaxed">
      <p>{product.ingredients}</p>
      <p className="text-xs text-gray-400 mt-2">*Ingredients may vary by batch. Check product packaging for the most current list.</p>
    </div>,
    <div key="how" className="text-gray-600 text-sm leading-relaxed">
      <p>{product.howToUse}</p>
      <div className="mt-4 p-4 bg-primary-50 rounded-xl">
        <p className="text-xs font-semibold text-primary-700 uppercase tracking-wider">💡 Pro Tip</p>
        <p className="text-xs text-gray-600 mt-1">For best results, follow up with a moisturizer suited to your skin type.</p>
      </div>
    </div>,
    <div key="reviews" className="space-y-5">
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
        <div className="text-center">
          <span className="text-3xl font-bold text-gray-900">{product.rating}</span>
          <div className="flex items-center gap-0.5 mt-1 justify-center">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-900 text-sm">Customer Reviews</p>
          <p className="text-xs text-gray-500">{product.reviews.toLocaleString()} verified reviews</p>
        </div>
      </div>
      {[1, 2].map(i => (
        <div key={i} className="border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center text-xs font-bold text-primary-700">P{i}</div>
            <span className="text-sm font-medium text-gray-900">Priya S.</span>
            <span className="text-xs text-gray-400">Verified Buyer</span>
          </div>
          <div className="flex items-center gap-0.5 mt-1">
            {[...Array(5)].map((_, j) => (
              <svg key={j} className={`w-3 h-3 ${j < 4 ? "text-yellow-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-1">{i === 1 ? "Absolutely love this product! My skin has never looked better. The texture is amazing and it absorbs quickly." : "Been using this for a month now and I can already see visible results. Will definitely repurchase."}</p>
        </div>
      ))}
      <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">Read all {product.reviews.toLocaleString()} reviews →</button>
    </div>,
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 flex-wrap">
        <Link to="/" className="hover:text-primary-600">Home</Link><span>/</span>
        <Link to="/products" className="hover:text-primary-600">Products</Link><span>/</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-primary-600 capitalize">{product.category}</Link><span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
        <div className="space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.discount > 0 && (
              <span className="absolute top-5 left-5 px-3 py-1.5 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-sm font-bold rounded-full shadow-lg">-{product.discount}% OFF</span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button key={i} className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${0 === i ? "border-primary-500 shadow-md" : "border-gray-200 hover:border-primary-300"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-primary-600 font-semibold uppercase tracking-wider">{product.brand}</p>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <span className="text-xs text-gray-500">{product.rating} · {product.reviews.toLocaleString()} reviews</span>
          </div>

          <div className="flex items-baseline gap-2 mt-5">
            <span className="text-2xl sm:text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-lg text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                <span className="text-xs font-semibold text-accent-600 bg-accent-50 px-2 py-0.5 rounded-full">Save ₹{(product.originalPrice - product.price).toLocaleString()}</span>
              </>
            )}
          </div>

          {product.concerns && product.concerns.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {product.concerns.map(c => {
                const found = concerns?.find?.(cc => cc.id === c);
                return found ? (
                  <span key={c} className="px-2.5 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">{found.icon} {found.name}</span>
                ) : null;
              })}
            </div>
          )}

          <p className="text-sm text-gray-600 mt-4 leading-relaxed">{product.description}</p>

          {hasShades && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-900 mb-2">Shade: <span className="text-primary-600">{selectedShade}</span></p>
              <div className="flex flex-wrap gap-2">
                {product.shades.map(s => (
                  <button key={s} onClick={() => setSelectedShade(s)} className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${selectedShade === s ? "bg-primary-500 text-white border-primary-500 shadow-md" : "bg-white text-gray-700 border-gray-200 hover:border-primary-300"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 mt-6">
            <span className={`inline-block w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
            <span className="text-xs text-gray-600">{product.inStock ? "In Stock" : "Currently Out of Stock"}</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 mt-6">
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 sm:px-4 py-3 hover:bg-gray-50 transition-colors text-gray-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg></button>
              <span className="px-3 sm:px-4 py-3 font-medium text-gray-900 min-w-[2.5rem] text-center border-x border-gray-200 text-sm">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 sm:px-4 py-3 hover:bg-gray-50 transition-colors text-gray-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></button>
            </div>
            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              disabled={!product.inStock}
              className={`flex-1 px-6 sm:px-8 py-3.5 rounded-xl font-semibold text-sm text-white transition-all shadow-lg shadow-primary-200/40 ${addedToCart ? "bg-green-500" : "bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {addedToCart ? "✓ Added to Cart!" : `Add to Cart — ₹${product.price.toLocaleString()}`}
            </motion.button>
            <motion.button
              onClick={() => toggleItem(product)}
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }}
              className={`p-3.5 rounded-xl border transition-all ${inWishlist ? "bg-red-50 border-red-200 text-red-500" : "border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200"}`}
            >
              <svg className="w-5 h-5" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </motion.button>
          </div>

          <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Free delivery above ₹499</span>
            <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> 30-day returns</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mb-12 lg:mb-16">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)} className={`relative px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === i ? "text-primary-600" : "text-gray-500 hover:text-gray-700"}`}>
              {tab}
              {activeTab === i && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />}
            </button>
          ))}
        </div>
        <div className="pt-6">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <div className="text-center mb-8">
            <span className="text-primary-600 font-semibold text-xs uppercase tracking-[0.2em]">Complete the Look</span>
            <h2 className="font-serif text-2xl font-bold text-gray-900 mt-1">You May Also Like</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {related.map(p => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
