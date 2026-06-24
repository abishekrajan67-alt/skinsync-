import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products, brands } from "../data";
import { undertoneGuide } from "../data/editorial";

export default function Results() {
  const location = useLocation();
  const answers = location.state || {};

  const undertone = answers.undertone || "neutral";
  const depth = answers.depth || "medium";
  const coverage = answers.coverage || "medium";
  const finish = answers.finish || "natural";
  const concerns = answers.concerns || [];

  const depthMap = { fair: [1, 2], light: [3, 4], medium: [5, 6], tan: [7, 8], brown: [9, 10], deep: [11, 12] };
  const depthRange = depthMap[depth] || [5, 6];

  const matches = products.map(p => {
    const matchShades = p.shades.filter(s => {
      const depthOk = s.depth >= depthRange[0] && s.depth <= depthRange[1];
      const toneOk = undertone === "neutral" || undertone === "olive" ? true : s.undertone === undertone || s.undertone === "neutral";
      const finishOk = finish === "natural" ? true : p.finish === finish;
      return depthOk && toneOk && finishOk;
    });
    return { ...p, matchedShades: matchShades.slice(0, 3), matchCount: matchShades.length };
  }).filter(p => p.matchCount > 0)
    .sort((a, b) => b.matchCount - a.count)
    .slice(0, 12);

  const guide = undertoneGuide[undertone];
  const hasAnswers = Object.keys(answers).length > 0;

  if (!hasAnswers) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <span className="text-6xl block mb-4">🎨</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">Take the Quiz First</h1>
          <p className="text-gray-500 mt-2 text-sm">Answer a few questions and we'll find your perfect shades.</p>
          <Link to="/quiz" className="mt-6 inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold text-sm rounded-full shadow-xl">Start the Quiz</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-b from-primary-50/60 to-secondary-50/30 pt-10 pb-8 sm:pt-14 sm:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
            <span className="text-5xl block mb-3">🎉</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Your Shade Matches Are Ready!</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base font-medium">
              Based on your {undertone} undertone, {depth} skin depth, {coverage} coverage, and {finish} finish preferences.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-primary-600 shadow-sm border border-primary-100 capitalize">{undertone} undertone</span>
              <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-primary-600 shadow-sm border border-primary-100 capitalize">{depth} skin</span>
              <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-primary-600 shadow-sm border border-primary-100 capitalize">{coverage} coverage</span>
              <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-primary-600 shadow-sm border border-primary-100 capitalize">{finish} finish</span>
            </div>
            <p className="text-xs text-gray-400 mt-3 font-medium">Found {matches.reduce((s, p) => s + p.matchCount, 0)} matching shades across {matches.length} products</p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-5 sm:space-y-6">
            {matches.map((p, i) => {
              const brand = brands.find(b => b.id === p.brandId);
              return (
                <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="bg-white rounded-2xl border border-primary-100/60 p-5 sm:p-6 hover:shadow-lg hover:shadow-primary-100/20 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-primary-50 shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {brand && <span className="text-[10px] font-bold text-primary-600 uppercase tracking-wider">{brand.name}</span>}
                        <span className="text-[10px] px-2 py-0.5 bg-primary-50 text-primary-600 rounded-full font-semibold capitalize">{p.type}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base">{p.name}</h3>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">{p.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {p.matchedShades.map(s => (
                          <div key={s.name} className="flex items-center gap-2 px-3 py-1.5 bg-primary-50/60 rounded-xl border border-primary-100/40">
                            <span className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: s.hex }} />
                            <span className="text-xs font-medium text-gray-700">{s.name}</span>
                          </div>
                        ))}
                        {p.matchCount > 3 && <span className="text-xs text-gray-400 self-center font-medium">+{p.matchCount - 3} more</span>}
                      </div>
                      {brand && brand.stores && (
                        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-primary-100/40">
                          <span className="text-[10px] text-gray-400 font-semibold uppercase self-center">Buy at:</span>
                          {brand.stores.map(store => (
                            <a key={store.name} href={store.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 text-xs font-semibold rounded-full hover:from-primary-100 hover:to-secondary-100 transition-all border border-primary-100/50">
                              {store.name}
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="space-y-5 sm:space-y-6">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-primary-100/60 p-5 sm:p-6">
              <h3 className="font-bold text-gray-900 text-sm">Your Undertone: {guide?.title || "Neutral"}</h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">{guide?.description}</p>
              <div className="flex gap-2 mt-3">
                {guide?.shades?.map(h => <span key={h} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: h }} />)}
              </div>
              <h4 className="text-xs font-bold text-gray-700 mt-4 mb-2">Shopping Tips:</h4>
              <ul className="space-y-1.5">
                {guide?.tips?.slice(0, 3).map((t, i) => (
                  <li key={i} className="text-[11px] text-gray-600 flex items-start gap-2">
                    <span className="text-primary-500 mt-0.5">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl border border-primary-100/60 p-5 sm:p-6">
              <h3 className="font-bold text-gray-900 text-sm">Your Preferences</h3>
              <div className="space-y-2 mt-3">
                {[
                  { label: "Undertone", value: undertone, color: "bg-primary-100 text-primary-700" },
                  { label: "Skin Depth", value: depth, color: "bg-secondary-100 text-secondary-700" },
                  { label: "Coverage", value: coverage, color: "bg-amber-100 text-amber-700" },
                  { label: "Finish", value: finish, color: "bg-emerald-100 text-emerald-700" },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-1.5">
                    <span className="text-xs text-gray-500 font-medium">{item.label}</span>
                    <span className={`text-xs font-bold capitalize px-2.5 py-0.5 rounded-full ${item.color}`}>{item.value}</span>
                  </div>
                ))}
                {concerns.length > 0 && (
                  <div className="pt-2 border-t border-primary-100/40">
                    <span className="text-xs text-gray-500 font-medium block mb-1.5">Concerns</span>
                    <div className="flex flex-wrap gap-1">
                      {concerns.map(c => <span key={c} className="text-[10px] px-2 py-0.5 bg-primary-50 text-primary-600 rounded-full font-medium capitalize">{c}</span>)}
                    </div>
                  </div>
                )}
              </div>
              <Link to="/quiz" className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-700">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                Retake Quiz
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100/60 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">💡</span>
                <h3 className="font-bold text-gray-900 text-sm">Pro Tip</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Always test foundation on your jawline, not your hand. Your face and neck may have different tones. Check in natural light before purchasing.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
