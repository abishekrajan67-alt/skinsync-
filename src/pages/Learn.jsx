import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products, brands } from "../data";
import { undertoneGuide, skinDepthGuide, brandsData, blogPosts, faqs } from "../data/editorial";

export default function Learn() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-50/60 to-secondary-50/30 pt-10 pb-8 sm:pt-14 sm:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary-600 font-bold text-[10px] uppercase tracking-[0.2em]">Educational Guide</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-1 tracking-tight">Learn About Your Skin</h1>
            <p className="text-gray-500 text-sm mt-1.5 max-w-xl mx-auto font-medium">Everything you need to know about undertones, skin depths, and finding your perfect shade.</p>
          </motion.div>
        </div>
      </section>

      <section id="undertones" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">Understanding Undertones</h2>
          <p className="text-gray-500 text-sm mt-1 font-medium">Your undertone is the natural colour beneath your skin's surface. It doesn't change with tan or sun exposure.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {Object.entries(undertoneGuide).map(([key, guide], i) => (
            <motion.div key={key} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="bg-white rounded-2xl border border-primary-100/60 p-5 sm:p-6 hover:shadow-lg hover:shadow-primary-100/20 transition-all">
              <div className="flex gap-2 mb-3">
                {guide.shades.map(h => <span key={h} className="w-7 h-7 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: h }} />)}
              </div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">{guide.title}</h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">{guide.description}</p>
              <h4 className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mt-4 mb-2">How to tell:</h4>
              <ul className="space-y-1">
                {guide.traits.map((t, j) => (
                  <li key={j} className="text-[11px] text-gray-600 flex items-start gap-2">
                    <span className="text-primary-500 mt-0.5 shrink-0">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-primary-50/40 to-secondary-50/20 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">Skin Depth Levels</h2>
            <p className="text-gray-500 text-sm mt-1 font-medium">Find your depth range — from fair to deep.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {Object.entries(skinDepthGuide).map(([key, guide], i) => (
              <motion.div key={key} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="bg-white rounded-2xl border border-primary-100/60 p-5 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-3 h-8 rounded-full" style={{ backgroundColor: guide.depths[0] <= 4 ? "#e8c8b0" : guide.depths[0] <= 7 ? "#c89870" : guide.depths[0] <= 10 ? "#8c6444" : "#4c2818" }} />
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{guide.title}</h3>
                    <p className="text-[10px] text-gray-400 font-medium">Depth {guide.depths[0]}-{guide.depths[1]}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{guide.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">Shade Matching Tips</h2>
          <p className="text-gray-500 text-sm mt-1 font-medium">Pro tips for finding your perfect foundation shade.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { icon: "👩‍⚖️", title: "Test on Your Jawline", desc: "Your face and neck may have different tones. Apply a stripe on your jawline — the right shade will disappear into your skin." },
            { icon: "☀️", title: "Check in Natural Light", desc: "Store lighting is deceptive. Walk to a window or step outside to check the shade in natural daylight before buying." },
            { icon: "🔄", title: "Oxidation is Real", desc: "Many foundations darken slightly after application (oxidation). If a shade looks perfect right away, it might be too dark in 5 minutes. Go one shade lighter." },
            { icon: "🫒", title: "Olive is Tricky", desc: "If foundations always look too pink or too orange, you're likely olive-toned. Look for 'olive', 'golden', or 'neutral' labels. Mixing two shades often works." },
            { icon: "🌙", title: "Concealer = 1 Shade Lighter", desc: "For under-eyes, choose a concealer one shade lighter than your foundation. For spot concealing, match exactly." },
            { icon: "🏷️", title: "Ignore the Name, Read the Tone", desc: "Shade names like 'Sand' or 'Caramel' vary wildly by brand. Focus on the undertone label (C/W/N) and depth number instead." },
          ].map((tip, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="bg-white rounded-2xl border border-primary-100/60 p-5 hover:shadow-lg hover:shadow-primary-100/20 transition-all">
              <span className="text-2xl block mb-3">{tip.icon}</span>
              <h3 className="font-bold text-gray-900 text-sm">{tip.title}</h3>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{tip.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="brands" className="bg-gradient-to-b from-secondary-50/30 to-primary-50/30 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">Brands We Match</h2>
            <p className="text-gray-500 text-sm mt-1 font-medium">Learn about each brand's shade range and what they're best for.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {brandsData.map((b, i) => {
              const brandProducts = products.filter(p => p.brandId === b.id);
              const totalShades = brandProducts.reduce((s, p) => s + p.shades.length, 0);
              return (
                <motion.div key={b.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="bg-white rounded-2xl border border-primary-100/60 p-5 hover:shadow-lg hover:shadow-primary-100/20 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-primary-50 shrink-0">
                      <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{b.name}</h3>
                      <span className="text-[10px] font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">{b.tag}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{b.description}</p>
                  <div className="flex items-center gap-3 mt-3 text-[11px] text-gray-500 font-medium">
                    <span>{brandProducts.length} products</span>
                    <span className="w-px h-3 bg-gray-200" />
                    <span>{totalShades} shades</span>
                  </div>
                  <Link to="/quiz" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700">
                    Find my {b.name} shade <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
        </div>
        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.details key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="group bg-white rounded-2xl border border-primary-100/60 overflow-hidden">
              <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none hover:bg-primary-50/30 transition-colors">
                <span className="text-sm font-bold text-gray-900">{faq.q}</span>
                <svg className="w-4 h-4 text-gray-400 shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            </motion.details>
          ))}
        </div>
      </section>

      <section id="blog" className="bg-gradient-to-b from-primary-50/40 to-white py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">From Our Blog</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {blogPosts.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group cursor-pointer">
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-primary-50 mb-3 shadow-sm">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-1 font-medium">
                  <span className="text-primary-600 font-bold">{post.category}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm group-hover:text-primary-600 transition-colors leading-snug">{post.title}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{post.excerpt}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary-900 via-secondary-900 to-primary-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">Ready to Find Your Perfect Shade?</h2>
          <p className="text-primary-200 mt-2 text-sm max-w-lg mx-auto">Take our 2-minute quiz and get matched to your ideal foundation, concealer, and skin tint shades.</p>
          <Link to="/quiz" className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary-700 font-bold text-sm rounded-full hover:bg-primary-50 transition-all shadow-2xl shadow-black/10">
            Start the Quiz <span className="text-lg">🎨</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
