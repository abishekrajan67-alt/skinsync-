import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { quizSteps } from "../data/editorial";
import { products, brands } from "../data";

export default function Quiz() {
  const navigate = useNavigate();
  const [mode, setMode] = useState(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState(1);

  const refBrands = useMemo(() => brands.filter(b => products.some(p => p.brandId === b.id)), []);
  const selectedBrand = answers.refBrand;
  const selectedProductId = answers.refProduct;
  const refProducts = useMemo(() => selectedBrand ? products.filter(p => p.brandId === selectedBrand) : [], [selectedBrand]);
  const refShades = useMemo(() => selectedProductId ? products.find(p => p.id === selectedProductId)?.shades || [] : [], [selectedProductId]);

  const refSteps = [
    { id: "refBrand", title: "Which Brand Do You Use?", subtitle: "Pick the brand of your current foundation or concealer.", type: "single", options: refBrands.map(b => ({ id: b.id, label: b.name, emoji: "🏷️", description: `${products.filter(p => p.brandId === b.id).length} products in our database` })) },
    { id: "refProduct", title: "Which Product?", subtitle: "Select the exact product you currently use.", type: "single", options: refProducts.map(p => ({ id: p.id, label: p.name, emoji: p.type === "foundation" ? "💄" : "👁️", description: `${p.shades.length} shades available` })) },
    { id: "refShade", title: "Which Shade?", subtitle: "Pick your current shade — we'll find your exact match across all brands.", type: "single", options: refShades.map(s => ({ id: s.name, label: s.name, emoji: "🎨", hex: s.hex, description: `${s.undertone} · depth ${s.depth}` })) },
  ];

  const steps = mode === "reference" ? refSteps : quizSteps;
  const current = steps[step];
  const isLast = mode === "reference" ? step === 2 : step === steps.length - 1;
  const progress = ((step + 1) / steps.length) * 100;

  function select(id) {
    if ((mode === "reference" || current.type === "single")) {
      setAnswers(p => ({ ...p, [current.id]: id }));
    } else {
      const prev = answers[current.id] || [];
      setAnswers(p => ({ ...p, [current.id]: prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id] }));
    }
  }

  function next() {
    if (isLast) {
      if (mode === "reference") {
        const shade = refShades.find(s => s.name === answers.refShade);
        navigate("/results", { state: { mode: "reference", refBrand: answers.refBrand, refProduct: answers.refProduct, refShade: answers.refShade, refHex: shade?.hex } });
      } else {
        navigate("/results", { state: { mode: "full", ...answers } });
      }
    } else {
      setDirection(1);
      setStep(s => s + 1);
    }
  }

  function prev() {
    if (step > 0) {
      setDirection(-1);
      setStep(s => s - 1);
    } else if (mode) {
      setMode(null);
      setStep(0);
      setAnswers({});
    }
  }

  const hasSelection = current?.type === "single"
    ? !!answers[current?.id]
    : (answers[current?.id] || []).length > 0;

  if (!mode) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gradient-to-b from-cream/60 via-white to-ivory/40 px-4 py-10">
        <div className="w-full max-w-lg">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <span className="text-5xl block mb-3">🎯</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Find Your Perfect Shade</h1>
            <p className="text-gray-500 mt-2 text-sm font-medium">Two ways to get started — pick the one that suits you.</p>
          </motion.div>
          <div className="space-y-4">
            <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} onClick={() => { setMode("reference"); setAnswers({}); setStep(0); }} className="w-full bg-white rounded-2xl border-2 border-primary-100/60 p-6 text-left hover:border-primary-300 hover:shadow-lg transition-all group">
              <div className="flex items-start gap-4">
                <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">🎨</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">I Know My Shade</h3>
                  <p className="text-sm text-gray-500 mt-1">Already use a foundation? Tell us what you wear and we'll find your exact match across all 10+ brands.</p>
                  <span className="inline-block mt-3 text-xs font-bold text-mahogany bg-primary-50 px-3 py-1 rounded-full">Cross-Brand Matching</span>
                </div>
              </div>
            </motion.button>
            <motion.button initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} onClick={() => { setMode("full"); setAnswers({}); setStep(0); }} className="w-full bg-white rounded-2xl border-2 border-primary-100/60 p-6 text-left hover:border-primary-300 hover:shadow-lg transition-all group">
              <div className="flex items-start gap-4">
                <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">🔍</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">Help Me Find My Shade</h3>
                  <p className="text-sm text-gray-500 mt-1">New to makeup? Answer 5 quick questions about your skin and preferences — we'll find your perfect match.</p>
                  <span className="inline-block mt-3 text-xs font-bold text-mahogany bg-primary-50 px-3 py-1 rounded-full">Personalized Quiz</span>
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gradient-to-b from-cream/60 via-white to-ivory/40 px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-400">
              {mode === "reference" ? "Quick Match" : "Full Quiz"} · Step {step + 1} of {steps.length}
            </span>
            <span className="text-xs font-semibold text-primary-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-primary-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-terracotta to-rose rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-primary-100/20 border border-primary-100/60"
          >
            <div className="text-center mb-8">
              <span className="text-4xl mb-3 block">
                {current?.id === "refBrand" ? "🏷️" : current?.id === "refProduct" ? "💄" : current?.id === "refShade" ? "🎨" : current?.options?.[0]?.emoji || "✨"}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">{current?.title}</h1>
              <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto font-medium">{current?.subtitle}</p>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {current?.options?.map(opt => {
                const isSelected = current?.type === "single"
                  ? answers[current?.id] === opt.id
                  : (answers[current?.id] || []).includes(opt.id);
                const isDisabled = (current?.id === "refProduct" && !selectedBrand) || (current?.id === "refShade" && !selectedProductId);

                return (
                  <motion.button
                    key={opt.id}
                    onClick={() => !isDisabled && select(opt.id)}
                    disabled={isDisabled}
                    whileHover={isDisabled ? {} : { scale: 1.005 }}
                    whileTap={isDisabled ? {} : { scale: 0.98 }}
                    className={`w-full flex items-center gap-4 p-4 sm:p-5 rounded-2xl border-2 transition-all text-left ${
                      isDisabled ? "opacity-30 cursor-not-allowed border-gray-100" :
                      isSelected
                        ? "border-primary-500 bg-primary-50/80 shadow-md shadow-primary-100/30"
                        : "border-primary-100/60 hover:border-primary-200 bg-white hover:bg-primary-50/30"
                    }`}
                  >
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                      isSelected ? "bg-primary-100" : isDisabled ? "bg-gray-50" : "bg-primary-50"
                    }`}>
                      {opt.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm sm:text-base ${isSelected ? "text-primary-700" : "text-gray-900"}`}>{opt.label}</span>
                        {opt.hex && <span className="w-4 h-4 rounded-full border border-gray-200 shrink-0" style={{ backgroundColor: opt.hex }} />}
                      </div>
                      {opt.description && <p className="text-xs text-gray-500 mt-0.5 font-medium line-clamp-1">{opt.description}</p>}
                    </div>
                    {current?.type === "single" && (
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? "border-primary-500" : isDisabled ? "border-gray-200" : "border-gray-300"
                      }`}>
                        {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-primary-500" />}
                      </div>
                    )}
                    {current?.type === "multiple" && (
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? "border-primary-500 bg-primary-500" : "border-gray-300"
                      }`}>
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-primary-100/50">
              <button
                onClick={prev}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors rounded-xl hover:bg-gray-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Back
              </button>
              <button
                onClick={next}
                disabled={!hasSelection}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-terracotta to-rose text-white text-sm font-bold rounded-xl hover:from-rose hover:to-crimson transition-all shadow-lg shadow-primary-200/30 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isLast ? (mode === "reference" ? "Find My Matches" : "See My Matches") : "Next"}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
