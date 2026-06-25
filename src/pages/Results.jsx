import { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products, brands } from "../data";
import { undertoneGuide } from "../data/editorial";

function hexToRgb(hex) {
  const h = hex?.replace("#", "") || "000000";
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}

function colorDistance(a, b) {
  const ca = hexToRgb(a), cb = hexToRgb(b);
  return Math.sqrt((ca.r - cb.r) ** 2 + (ca.g - cb.g) ** 2 + (ca.b - cb.b) ** 2);
}

function findClosestShades(refHex, allProducts, limit = 3) {
  const all = [];
  allProducts.forEach(p => {
    p.shades.forEach(s => {
      all.push({ ...s, dist: colorDistance(refHex, s.hex), product: p });
    });
  });
  all.sort((a, b) => a.dist - b.dist);
  const seen = new Set();
  const grouped = [];
  for (const s of all) {
    if (!seen.has(s.product.id)) {
      const productShades = all.filter(x => x.product.id === s.product.id).slice(0, limit);
      grouped.push({ ...s.product, matchedShades: productShades, matchCount: productShades.length, dist: s.dist });
      seen.add(s.product.id);
    }
  }
  return grouped.slice(0, 12);
}

export default function Results() {
  const location = useLocation();
  const answers = location.state || {};
  const mode = answers.mode || (answers.undertone ? "full" : null);

  const hasAnswers = mode && Object.keys(answers).length > 0;

  const fullResults = useMemo(() => {
    if (mode !== "full") return [];
    const undertone = answers.undertone || "neutral";
    const depth = answers.depth || "medium";
    const skinType = answers.skinType || "normal";
    const coverage = answers.coverage || "medium";
    const finish = answers.finish || "natural";
    const depthMap = { fair: [1, 2], light: [3, 4], medium: [5, 6], tan: [7, 8], brown: [9, 10], deep: [11, 12] };
    const depthRange = depthMap[depth] || [5, 6];
    const coverageCompat = { sheer: ["medium", "medium-full", "full"], light: ["medium", "medium-full"], medium: ["medium", "medium-full"], full: ["medium-full", "full"] };
    return products.map(p => {
      let score = 0;
      if (p.skinTypes?.includes(skinType)) score += 3;
      else if (p.skinTypes?.includes("all")) score += 1;
      if (finish === "natural" || p.finish === finish) score += 2;
      else if (p.finish === "natural") score += 1;
      const covRange = coverageCompat[coverage] || ["medium", "medium-full"];
      if (covRange.includes(p.coverage)) score += 1;
      const matchShades = p.shades.filter(s => {
        const depthOk = s.depth >= depthRange[0] && s.depth <= depthRange[1];
        const toneOk = undertone === "neutral" || undertone === "olive" ? true : s.undertone === undertone || s.undertone === "neutral";
        return depthOk && toneOk;
      });
      return { ...p, score, matchedShades: matchShades.slice(0, 3), matchCount: matchShades.length };
    }).filter(p => p.matchCount > 0)
      .sort((a, b) => b.score - a.score || b.matchCount - a.matchCount)
      .slice(0, 12);
  }, [mode, answers]);

  const refResults = useMemo(() => {
    if (mode !== "reference" || !answers.refHex) return [];
    return findClosestShades(answers.refHex, products);
  }, [mode, answers]);

  const matches = mode === "reference" ? refResults : fullResults;
  const guide = undertoneGuide[answers.undertone];

  if (!hasAnswers) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <span className="text-6xl block mb-4">🎨</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">Take the Quiz First</h1>
          <p className="text-gray-500 mt-2 text-sm">Answer a few questions and we'll find your perfect shades.</p>
          <Link to="/quiz" className="mt-6 inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-terracotta to-rose text-white font-bold text-sm rounded-full shadow-xl">Start the Quiz</Link>
        </div>
      </div>
    );
  }

  const refBrand = mode === "reference" ? brands.find(b => b.id === answers.refBrand) : null;
  const refProductData = mode === "reference" ? products.find(p => p.id === answers.refProduct) : null;

  return (
    <div>
      <section className="bg-gradient-to-b from-cream/80 to-ivory/50 pt-10 pb-8 sm:pt-14 sm:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
            {mode === "reference" ? (
              <>
                <span className="text-5xl block mb-3">🔄</span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Your Cross-Brand Matches</h1>
                <p className="text-gray-600 mt-2 text-sm sm:text-base font-medium">
                  Based on <strong>{answers.refShade}</strong> in <strong>{refBrand?.name || "your brand"}</strong> {refProductData ? `(${refProductData.name})` : ""}
                </p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <span className="w-6 h-6 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: answers.refHex }} />
                  <span className="text-xs text-gray-500 font-medium">{answers.refShade}</span>
                </div>
                <p className="text-xs text-gray-400 mt-3 font-medium">Found {matches.reduce((s, p) => s + p.matchCount, 0)} matching shades across {matches.length} products</p>
              </>
            ) : (
              <>
                <span className="text-5xl block mb-3">🎉</span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Your Shade Matches Are Ready!</h1>
                <p className="text-gray-600 mt-2 text-sm sm:text-base font-medium">
                  Based on your {answers.skinType || "normal"} skin, {answers.undertone || "neutral"} undertone, {answers.depth || "medium"} depth, {answers.coverage || "medium"} coverage, and {answers.finish || "natural"} finish.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                  {["skinType", "undertone", "depth", "coverage", "finish"].map(k => (
                    <span key={k} className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-mahogany shadow-sm border border-primary-100 capitalize">{answers[k] || "normal"} {k === "skinType" ? "skin" : k}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3 font-medium">Found {matches.reduce((s, p) => s + p.matchCount, 0)} matching shades across {matches.length} products</p>
              </>
            )}
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
                        {brand && <span className="text-[10px] font-bold text-mahogany uppercase tracking-wider">{brand.name}</span>}
                        <span className="text-[10px] px-2 py-0.5 bg-primary-50 text-mahogany rounded-full font-semibold capitalize">{p.type}</span>
                        {i === 0 && (
                          <span className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-full font-bold">{mode === "reference" ? "Closest Match" : "Best Match"}</span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base">{p.name}</h3>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">{p.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {p.matchedShades.map(s => (
                          <a key={s.name} href={p.stores?.[0]?.url || "#"} target="_blank" rel="noopener noreferrer" title={`Buy ${s.name} at ${p.stores?.[0]?.name || "store"}`} className="flex items-center gap-2 px-3 py-1.5 bg-primary-50/60 rounded-xl border border-primary-100/40 hover:bg-primary-100 transition-colors">
                            <span className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: s.hex }} />
                            <span className="text-xs font-medium text-gray-700">{s.name}</span>
                            {mode === "reference" && s.dist !== undefined && (
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${s.dist < 30 ? "bg-green-100 text-green-600" : s.dist < 60 ? "bg-amber-100 text-amber-600" : "bg-orange-100 text-orange-600"}`}>
                                {s.dist < 30 ? "Perfect" : s.dist < 60 ? "Close" : "Nearby"}
                              </span>
                            )}
                          </a>
                        ))}
                        {p.matchCount > 3 && <span className="text-xs text-gray-400 self-center font-medium">+{p.matchCount - 3} more</span>}
                      </div>
                      {p.stores && p.stores.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-primary-100/40">
                          <span className="text-[10px] text-gray-400 font-semibold uppercase self-center">Buy at:</span>
                          {p.stores.map(store => (
                            <a key={store.name} href={store.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-cream to-ivory text-mahogany text-xs font-semibold rounded-full hover:from-sand hover:to-blush-cream transition-all border border-primary-100/50">
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
            {mode === "reference" && refProductData && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-primary-100/60 p-5 sm:p-6">
                <h3 className="font-bold text-gray-900 text-sm">Your Reference Shade</h3>
                <div className="flex items-center gap-3 mt-3 p-3 bg-primary-50 rounded-xl">
                  <span className="w-10 h-10 rounded-full border-2 border-white shadow-sm shrink-0" style={{ backgroundColor: answers.refHex }} />
                  <div>
                    <span className="text-sm font-bold text-gray-900">{answers.refShade}</span>
                    <p className="text-xs text-gray-500">{refBrand?.name} · {refProductData.name}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3 leading-relaxed">We found shades across all brands that match your reference shade's colour. The "Perfect" tag means the colour distance is minimal.</p>
              </motion.div>
            )}

            {mode !== "reference" && guide && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-primary-100/60 p-5 sm:p-6">
                <h3 className="font-bold text-gray-900 text-sm">Your Undertone: {guide.title}</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">{guide.description}</p>
                <div className="flex gap-2 mt-3">
                  {guide.shades?.map(h => <span key={h} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: h }} />)}
                </div>
                <h4 className="text-xs font-bold text-gray-700 mt-4 mb-2">Shopping Tips:</h4>
                <ul className="space-y-1.5">
                  {guide.tips?.slice(0, 3).map((t, i) => (
                    <li key={i} className="text-[11px] text-gray-600 flex items-start gap-2"><span className="text-caramel mt-0.5">•</span><span>{t}</span></li>
                  ))}
                </ul>
              </motion.div>
            )}

            {mode !== "reference" && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-cream to-ivory rounded-2xl border border-primary-100/60 p-5 sm:p-6">
                <h3 className="font-bold text-gray-900 text-sm">Your Preferences</h3>
                <div className="space-y-2 mt-3">
                  {[
                    { label: "Skin Type", value: answers.skinType || "normal", color: "bg-blue-100 text-blue-700" },
                    { label: "Undertone", value: answers.undertone || "neutral", color: "bg-primary-100 text-primary-700" },
                    { label: "Depth", value: answers.depth || "medium", color: "bg-secondary-100 text-secondary-700" },
                    { label: "Coverage", value: answers.coverage || "medium", color: "bg-amber-100 text-amber-700" },
                    { label: "Finish", value: answers.finish || "natural", color: "bg-emerald-100 text-emerald-700" },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between py-1.5">
                      <span className="text-xs text-gray-500 font-medium">{item.label}</span>
                      <span className={`text-xs font-bold capitalize px-2.5 py-0.5 rounded-full ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100/60 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">💡</span>
                <h3 className="font-bold text-gray-900 text-sm">Pro Tip</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {mode === "reference"
                  ? "Colour matching is based on hex values — always test in natural light before buying. Different formulas (matte vs dewy) can make the same shade look different on skin."
                  : "Always test foundation on your jawline, not your hand. Your face and neck may have different tones. Check in natural light before purchasing."}
              </p>
            </motion.div>

            <div className="text-center">
              <Link to="/quiz" className="inline-flex items-center gap-1.5 text-xs font-semibold text-mahogany hover:text-primary-700">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                {mode === "reference" ? "Try Full Quiz" : "Retake Quiz"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
