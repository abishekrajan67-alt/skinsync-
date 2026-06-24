import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = e => { e.preventDefault(); login(email, password); navigate("/"); };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl shadow-primary-100/40 border border-primary-100 p-8 sm:p-10">
          <div className="text-center mb-7">
            <motion.span className="text-4xl inline-block" animate={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}>💄</motion.span>
            <h1 className="mt-3 font-serif text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-sm text-gray-500 mt-0.5">Sign in to your Skin Sync account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" placeholder="john@example.com" />
            </div>
            <div className="relative">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Password</label>
              <input type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl text-sm focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" placeholder="••••••••" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-[2.15rem] text-gray-400 hover:text-gray-600">{show ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              )}</button>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" /><span className="text-xs text-gray-600">Remember me</span></label>
              <a href="#" className="text-xs text-primary-600 hover:text-primary-700 font-medium">Forgot?</a>
            </div>
            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full py-3.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold text-sm rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all shadow-lg shadow-primary-200/30">Sign In</motion.button>
          </form>
          <p className="mt-5 text-center text-xs text-gray-500">New here? <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-medium">Create account</Link></p>
          <div className="mt-5">
            <div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div><div className="relative flex justify-center"><span className="bg-white px-3 text-[10px] text-gray-400">or continue with</span></div></div>
            <div className="mt-3.5 grid grid-cols-3 gap-2.5">
              {["Google", "Facebook", "Apple"].map(p => (
                <motion.button key={p} whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center py-2.5 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition-all">{p}</motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
