import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { products, bannerSlides } from "../data";
import { brandsData, blogPosts } from "../data/editorial";

export default function Home() {
  const [slide, setSlide] = useState(0);
  useEffect(() => { const t = setInterval(() => setSlide(p => (p + 1) % bannerSlides.length), 6000); return () => clearInterval(t); }, []);

  const typewriters = shadesByType();
  const topBrands = brandsData.slice(0, 5);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/40 to-white">
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pb-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <motion.span initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-100/80 text-primary-700 text-xs font-bold rounded-full mb-5">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                India's #1 Shade Matching Tool
              </motion.span>
              <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }} className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.12] tracking-tight text-balance">
                Never Buy the Wrong Foundation Shade Again
              </motion.h1>
              <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="mt-4 text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed font-medium">
                Answer a few questions and get matched to your perfect foundation, concealer, and skin tint shades across 10+ brands — from Maybelline to Fenty.
              </motion.p>
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }} className="mt-7 flex flex-wrap gap-3">
                <Link to="/quiz" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-sm font-bold rounded-full hover:from-primary-700 hover:to-secondary-700 transition-all shadow-2xl shadow-primary-300/30 hover:shadow-primary-400/40">
                  Find Your Shade <span className="text-lg">🎨</span>
                </Link>
                <Link to="/learn" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary-600 text-sm font-bold rounded-full hover:bg-primary-50 transition-all shadow-lg border border-primary-200/60 hover:border-primary-300">
                  Learn About Undertones
                </Link>
              </motion.div>
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8 flex items-center gap-6 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> 500+ Shades</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary-400" /> 10+ Brands</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Free to Use</span>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-primary-100 via-secondary-100 to-primary-100 shadow-2xl shadow-primary-200/30">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.6),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.15),transparent_50%)]" />
                <img src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80" alt="Skin Sync" className="w-full h-full object-cover mix-blend-overlay opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🎨</div>
                    <p className="text-white font-bold text-2xl drop-shadow-lg">Your Shade Awaits</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 -right-4 flex justify-center gap-2">
                {bannerSlides.map((_, i) => (
                  <button key={i} onClick={() => setSlide(i)} className="relative h-2 cursor-pointer" style={{ width: i === slide ? 28 : 8 }}>
                    <span className={`absolute inset-0 rounded-full transition-all duration-300 ${i === slide ? "bg-primary-600" : "bg-primary-300/70 hover:bg-primary-400"}`} />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 pb-10 sm:pb-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: "🎨", label: "Take the Quiz", sub: "Answer 5 quick questions", color: "from-pink-100 to-rose-50" },
            { icon: "🔍", label: "Get Matched", sub: "Personalized shade picks", color: "from-purple-100 to-violet-50" },
            { icon: "🏷️", label: "Compare Brands", sub: "See your shade across brands", color: "from-emerald-100 to-green-50" },
            { icon: "🛍️", label: "Shop Affiliates", sub: "Nykaa • Amazon • Myntra", color: "from-amber-100 to-orange-50" },
          ].map((f, i) => (
            <motion.div key={f.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.06 }} className={`flex items-center gap-3 p-3.5 sm:p-4 bg-gradient-to-br ${f.color} rounded-2xl border border-white/60`}>
              <span className="text-xl sm:text-2xl">{f.icon}</span>
              <div><p className="text-xs sm:text-sm font-bold text-gray-900">{f.label}</p><p className="text-[10px] sm:text-xs text-gray-600 font-medium">{f.sub}</p></div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-primary-50/40 to-secondary-50/20 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-primary-600 font-bold text-[10px] uppercase tracking-[0.2em]">How It Works</span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-1 tracking-tight">Find Your Match in 3 Steps</h2>
            <p className="text-gray-500 text-sm mt-1.5 font-medium">No more guessing. No more wasted money.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              { step: "01", icon: "📝", title: "Take the Quiz", description: "Tell us about your skin tone, undertone, concerns, and finish preferences. Takes less than 2 minutes.", color: "from-primary-100 to-primary-50" },
              { step: "02", icon: "🎯", title: "Get Your Matches", description: "We recommend your perfect foundation, concealer, and skin tint shades across 10+ beauty brands.", color: "from-secondary-100 to-secondary-50" },
              { step: "03", icon: "🛒", title: "Shop with Confidence", description: "Click through to Nykaa, Amazon, or Myntra to purchase. You'll know the shade fits before you buy.", color: "from-amber-100 to-amber-50" },
            ].map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 sm:p-8 bg-white rounded-2xl border border-primary-100/60 hover:shadow-xl hover:shadow-primary-100/20 transition-all duration-300">
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl mb-4 shadow-lg`}>{s.icon}</div>
                <span className="text-[10px] font-bold text-primary-500 uppercase tracking-wider">{s.step}</span>
                <h3 className="font-serif text-lg font-bold text-gray-900 mt-1">{s.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed font-medium">{s.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/quiz" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-sm font-bold rounded-full hover:from-primary-700 hover:to-secondary-700 transition-all shadow-xl shadow-primary-300/30">
              Start the Quiz <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-primary-600 font-bold text-[10px] uppercase tracking-[0.2em]">Supported Brands</span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-1 tracking-tight">We Match Across</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {topBrands.map((b, i) => (
            <motion.div key={b.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Link to={`/learn#${b.id}`} className="group block p-5 bg-white rounded-2xl border border-primary-100/60 hover:border-primary-300/60 hover:shadow-xl hover:shadow-primary-100/20 transition-all duration-300 text-center">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50 mb-3">
                  <img src={b.image} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{b.name}</h3>
                <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-primary-50 text-primary-600 text-[10px] font-semibold rounded-full">{b.tag}</span>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/learn" className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 font-bold flex items-center justify-center gap-1.5 hover:gap-2 transition-all">
            View All 10+ Brands <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      <section className="bg-gradient-to-b from-secondary-50/30 to-primary-50/30 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-primary-600 font-bold text-[10px] uppercase tracking-[0.2em]">Shade Types We Cover</span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-1 tracking-tight">We Match All Base Makeup</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { type: "Foundation", icon: "💧", desc: "Liquid, stick, powder — full coverage, medium, or sheer. We match them all.", count: products.filter(p => p.type === "foundation").length },
              { type: "Concealer", icon: "👁️", desc: "Under-eye brightening, spot concealing, and colour correcting shades.", count: products.filter(p => p.type === "concealer").length },
              { type: "Skin Tint & BB Cream", icon: "🌤️", desc: "Lightweight, natural finish options for no-makeup makeup days.", count: 12 },
            ].map((item, i) => (
              <motion.div key={item.type} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-6 sm:p-8 bg-white rounded-2xl border border-primary-100/60 hover:shadow-xl transition-all duration-300 text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center text-2xl mb-4">{item.icon}</div>
                <h3 className="font-serif text-lg font-bold text-gray-900">{item.type}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">{item.desc}</p>
                <p className="text-primary-600 font-bold text-sm mt-3">{item.count} Products in Database</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="text-center mb-10">
          <span className="text-primary-600 font-bold text-[10px] uppercase tracking-[0.2em]">Learn & Explore</span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-1 tracking-tight">From Our Blog</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {blogPosts.map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group cursor-pointer">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-primary-50 mb-3 shadow-lg shadow-primary-100/10">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-1.5 font-medium">
                <span className="text-primary-600 font-bold">{post.category}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span>{post.readTime}</span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-primary-600 transition-colors leading-snug">{post.title}</h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed font-medium">{post.excerpt}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/learn" className="inline-flex items-center gap-2 px-7 py-3 bg-white text-primary-600 font-bold text-sm rounded-full hover:bg-primary-50 transition-all shadow-lg border border-primary-200/60">
            Read More <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary-900 via-secondary-900 to-primary-900 text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">Ready to Find Your Perfect Shade?</h2>
          <p className="text-primary-200 mt-3 text-sm sm:text-base max-w-xl mx-auto font-medium">Join thousands of Indian women who've stopped guessing and started glowing.</p>
          <Link to="/quiz" className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary-700 font-bold text-sm rounded-full hover:bg-primary-50 transition-all shadow-2xl shadow-black/10">
            Start the Quiz <span className="text-lg">🎨</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

function shadesByType() {
  const types = {};
  for (const p of products) {
    if (!types[p.type]) types[p.type] = 0;
    types[p.type] += p.shades.length;
  }
  return types;
}
