import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Checkout() {
  const { items, subtotal, discount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "", email: user?.email || "", phone: "",
    address: "", city: "", state: "", pincode: "", paymentMethod: "cod",
  });

  const delivery = subtotal > 499 ? 0 : 49;
  const total = subtotal - discount + delivery;

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (step === 1) {
      if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) return;
      setStep(2);
      return;
    }
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="w-20 h-20 mx-auto bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 font-serif text-3xl font-bold text-gray-900">Order Placed! ✨</motion.h2>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-2 text-sm text-gray-600">Your beauty essentials are on their way!</motion.p>
        <Link to="/products" className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all shadow-lg shadow-primary-200/40">Continue Shopping</Link>
      </div>
    );
  }

  if (items.length === 0) { navigate("/cart"); return null; }

  const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all bg-white";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link to="/cart" className="hover:text-primary-600">Cart</Link><span>/</span><span className="text-gray-900 font-medium">Checkout</span>
      </div>
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-primary-100 p-5 sm:p-7">
            <div className="flex items-center gap-3 mb-6">
              <motion.span animate={step === 1 ? { scale: [1, 1.1, 1] } : {}} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 1 ? "bg-primary-500 text-white" : "bg-green-100 text-green-600"}`}>{step === 1 ? "1" : "✓"}</motion.span>
              <div><p className="font-medium text-gray-900 text-sm">Shipping</p><p className="text-xs text-gray-500">Delivery address</p></div>
            </div>
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.form key="ship" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <div><label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label><input type="text" name="name" value={form.name} onChange={handleChange} required className={inputClass} placeholder="John Doe" /></div>
                    <div><label className="block text-xs font-medium text-gray-700 mb-1">Phone *</label><input type="tel" name="phone" value={form.phone} onChange={handleChange} required className={inputClass} placeholder="+91 98765 43210" /></div>
                  </div>
                  <div><label className="block text-xs font-medium text-gray-700 mb-1">Email</label><input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="john@example.com" /></div>
                  <div><label className="block text-xs font-medium text-gray-700 mb-1">Address *</label><textarea name="address" value={form.address} onChange={handleChange} required rows={3} className={inputClass} placeholder="Flat / House No., Street, Area" /></div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                    <div><label className="block text-xs font-medium text-gray-700 mb-1">City *</label><input type="text" name="city" value={form.city} onChange={handleChange} required className={inputClass} placeholder="Mumbai" /></div>
                    <div><label className="block text-xs font-medium text-gray-700 mb-1">State</label><input type="text" name="state" value={form.state} onChange={handleChange} className={inputClass} placeholder="Maharashtra" /></div>
                    <div><label className="block text-xs font-medium text-gray-700 mb-1">Pincode *</label><input type="text" name="pincode" value={form.pincode} onChange={handleChange} required className={inputClass} placeholder="400001" /></div>
                  </div>
                  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full mt-2 py-3.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold text-sm rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all shadow-lg shadow-primary-200/30">Continue to Payment</motion.button>
                </motion.form>
              ) : (
                <motion.div key="pay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="bg-gray-50 rounded-xl p-4 text-xs space-y-1">
                    <p><span className="font-medium">Delivering to:</span> {form.name}, {form.phone}</p>
                    <p className="text-gray-500">{form.address}, {form.city}, {form.state} - {form.pincode}</p>
                    <button onClick={() => setStep(1)} className="text-primary-600 hover:underline text-[11px] mt-1 inline-block">Edit</button>
                  </div>
                  <div className="mt-7">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold">2</span>
                      <p className="font-medium text-gray-900 text-sm">Payment Method</p>
                    </div>
                    <div className="space-y-2.5">
                      {[
                        { v: "cod", l: "Cash on Delivery", d: "Pay when you receive" },
                        { v: "card", l: "Credit / Debit Card", d: "Visa, Mastercard, RuPay" },
                        { v: "upi", l: "UPI", d: "Google Pay, PhonePe, Paytm" },
                      ].map((m, i) => (
                        <motion.label key={m.v} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className={`flex items-center gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all ${form.paymentMethod === m.v ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-primary-200"}`}>
                          <input type="radio" name="paymentMethod" value={m.v} checked={form.paymentMethod === m.v} onChange={handleChange} className="w-4 h-4 text-primary-600" />
                          <div><p className="font-medium text-gray-900 text-sm">{m.l}</p><p className="text-xs text-gray-500">{m.d}</p></div>
                        </motion.label>
                      ))}
                    </div>
                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit} className="w-full mt-6 py-3.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all shadow-lg shadow-primary-200/30 text-sm">
                      Place Order — ₹{total.toLocaleString()}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-primary-100 p-5 sm:p-6 sticky top-28">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-4">Order Summary</h3>
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary-50 overflow-hidden shrink-0"><img src={item.image} alt={item.name} className="w-full h-full object-cover" /></div>
                  <div className="flex-1 min-w-0"><p className="text-xs font-medium text-gray-900 line-clamp-1">{item.name}</p><p className="text-[10px] text-gray-500">Qty: {item.quantity}</p><p className="text-xs font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p></div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-4 pt-4 space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
              {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discount.toLocaleString()}</span></div>}
              <div className="flex justify-between text-gray-600"><span>Delivery</span><span>{delivery === 0 ? <span className="text-green-600 font-medium">Free</span> : `₹${delivery}`}</span></div>
              <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900 text-sm"><span>Total</span><span className="text-primary-600">₹{total.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
