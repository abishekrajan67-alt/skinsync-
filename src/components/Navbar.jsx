import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Quiz", path: "/quiz", icon: "🎨" },
    { name: "Learn", path: "/learn", icon: "📖" },
  ];

  return (
    <nav className="sticky top-0 z-50">
      <div className="bg-white/90 backdrop-blur-2xl border-b border-primary-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            <button className="lg:hidden p-2.5 rounded-xl hover:bg-primary-50 transition-colors" onClick={() => setMenuOpen(true)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>

            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-200/40">
                <span className="text-lg">🎨</span>
              </div>
              <div>
                <span className="font-serif text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent leading-none">Skin</span>
                <span className="font-serif text-xl font-light text-gray-700 leading-none ml-0.5">Sync</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map(item => (
                <Link key={item.name} to={item.path} className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 transition-all rounded-xl">
                  <span>{item.icon}</span>
                  {item.name}
                </Link>
              ))}
              <Link to="/learn#brands" className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 transition-all rounded-xl">
                <span>🏷️</span>
                Brands
              </Link>
              <Link to="/learn#faq" className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 transition-all rounded-xl">
                <span>❓</span>
                FAQ
              </Link>
            </div>

            <div className="flex items-center gap-1">
              {user ? (
                <div className="relative">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setProfileOpen(!profileOpen)} className="p-0.5 rounded-xl hover:bg-primary-50 transition-colors">
                    <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-primary-200/50">{user.name[0].toUpperCase()}</div>
                  </motion.button>
                  <AnimatePresence>
                    {profileOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                        <motion.div initial={{ opacity: 0, y: -6, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.96 }} className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-primary-100/60 py-2 z-20">
                          <div className="px-4 py-3 border-b border-gray-100"><p className="font-medium text-gray-900 text-sm">{user.name}</p><p className="text-xs text-gray-500 mt-0.5">{user.email}</p></div>
                          <Link to="/results" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 transition-colors"><span>🎨</span>Saved Matches</Link>
                          <button onClick={() => { logout(); setProfileOpen(false); }} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>Sign Out</button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link to="/login" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold rounded-full hover:from-primary-600 hover:to-secondary-600 transition-all shadow-lg shadow-primary-200/40">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block bg-gradient-to-r from-primary-50 via-secondary-50 to-primary-50 border-b border-primary-100/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-9 gap-6 text-[11px] font-medium text-gray-600">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary-400" /> 500+ Shades</span>
            <span className="w-px h-3 bg-primary-200/50" />
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary-400" /> 10+ Brands</span>
            <span className="w-px h-3 bg-primary-200/50" />
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Free to Use</span>
            <span className="w-px h-3 bg-primary-200/50" />
            <Link to="/learn#undertones" className="hover:text-primary-600 transition-colors">🔍 Learn Your Undertone</Link>
            <span className="w-px h-3 bg-primary-200/50" />
            <Link to="/learn#faq" className="hover:text-primary-600 transition-colors">❓ FAQs</Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setMenuOpen(false)} />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 w-80 max-w-[85vw] h-full bg-white/95 backdrop-blur-2xl z-50 shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="p-5 border-b border-primary-100/50 flex items-center justify-between">
                <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center"><span className="text-sm">🎨</span></div>
                  <span className="font-serif text-base font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Skin Sync</span>
                </Link>
                <motion.button whileHover={{ rotate: 90 }} onClick={() => setMenuOpen(false)} className="p-2 rounded-xl hover:bg-primary-50"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></motion.button>
              </div>
              <div className="py-4">
                {[
                  { name: "Shade Quiz", path: "/quiz", icon: "🎨", desc: "Find your perfect match" },
                  { name: "Learn", path: "/learn", icon: "📖", desc: "Undertones & tips" },
                  { name: "Brands", path: "/learn#brands", icon: "🏷️", desc: "All supported brands" },
                  { name: "FAQ", path: "/learn#faq", icon: "❓", desc: "Frequently asked" },
                ].map((item, i) => (
                  <motion.div key={item.name} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                    <Link to={item.path} onClick={() => setMenuOpen(false)} className="flex items-center gap-4 px-5 py-3.5 hover:bg-primary-50/50 transition-colors">
                      <span className="text-xl w-8 text-center">{item.icon}</span>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{item.name}</p>
                        <p className="text-[11px] text-gray-500 font-medium">{item.desc}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
                <div className="border-t border-gray-100 mt-6 pt-6 px-5">
                  {!user ? (
                    <Link to="/login" onClick={() => setMenuOpen(false)} className="block w-full py-3 text-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-primary-200/30">Sign In / Register</Link>
                  ) : (
                    <button onClick={() => { logout(); setMenuOpen(false); }} className="block w-full py-3 text-center bg-red-50 text-red-600 font-semibold text-sm rounded-xl">Sign Out</button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
