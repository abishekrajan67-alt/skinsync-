import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal, discount, clearCart } = useCart();
  const deliveryCharge = subtotal > 499 ? 0 : 49;
  const total = subtotal - discount + deliveryCharge;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <motion.span className="text-6xl inline-block" animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}>🛒</motion.span>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Your Bag is Empty</h2>
        <p className="mt-1 text-sm text-gray-500">Add products to start shopping!</p>
        <Link to="/products" className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all shadow-lg shadow-primary-200/40">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">Shopping Bag</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{items.length} {items.length === 1 ? "item" : "items"}</p>
        </div>
        <button onClick={clearCart} className="text-xs text-red-500 hover:text-red-600 font-medium">Clear All</button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          {items.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} layout className="flex gap-3 sm:gap-5 p-4 sm:p-5 bg-white rounded-2xl border border-primary-100">
              <Link to={`/product/${item.id}`} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-primary-50 shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] text-primary-600 font-semibold uppercase tracking-wider">{item.brand}</p>
                    <Link to={`/product/${item.id}`} className="text-xs sm:text-sm font-medium text-gray-900 hover:text-primary-600 line-clamp-1">{item.name}</Link>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="p-1 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3 sm:mt-4">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 sm:px-2.5 py-1.5 hover:bg-gray-50 text-gray-600"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg></button>
                    <span className="px-2.5 sm:px-3 py-1.5 font-medium text-gray-900 text-xs min-w-[1.5rem] text-center border-x border-gray-200">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 sm:px-2.5 py-1.5 hover:bg-gray-50 text-gray-600"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></button>
                  </div>
                  <div className="text-right">
                    <p className="text-sm sm:text-base font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                    {item.originalPrice > item.price && <p className="text-[10px] sm:text-xs text-gray-400 line-through">₹{(item.originalPrice * item.quantity).toLocaleString()}</p>}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-primary-100 p-5 sm:p-6 sticky top-28">
            <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
              {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discount.toLocaleString()}</span></div>}
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>{deliveryCharge === 0 ? <span className="text-green-600 font-medium">FREE</span> : `₹${deliveryCharge}`}</span>
              </div>
              {deliveryCharge > 0 && <p className="text-[10px] text-gray-400">Add ₹{(499 - subtotal).toLocaleString()} more for free shipping</p>}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between font-bold text-gray-900 text-base"><span>Total</span><span className="text-primary-600">₹{total.toLocaleString()}</span></div>
              </div>
            </div>
            <Link to="/checkout" className="mt-5 block w-full py-3.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold text-sm rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all text-center shadow-lg shadow-primary-200/40">
              Proceed to Checkout
            </Link>
            <Link to="/products" className="mt-2.5 block w-full text-center text-xs text-primary-600 hover:text-primary-700 font-medium">Continue Shopping →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
