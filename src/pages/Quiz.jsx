import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { quizSteps } from "../data/editorial";

export default function Quiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState(1);

  const current = quizSteps[step];
  const isLast = step === quizSteps.length - 1;
  const progress = ((step + 1) / quizSteps.length) * 100;

  function select(id) {
    if (current.type === "single") {
      setAnswers(p => ({ ...p, [current.id]: id }));
    } else {
      const prev = answers[current.id] || [];
      setAnswers(p => ({ ...p, [current.id]: prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id] }));
    }
  }

  function next() {
    if (isLast) {
      navigate("/results", { state: answers });
    } else {
      setDirection(1);
      setStep(s => s + 1);
    }
  }

  function prev() {
    if (step > 0) {
      setDirection(-1);
      setStep(s => s - 1);
    }
  }

  const hasSelection = current.type === "single"
    ? !!answers[current.id]
    : (answers[current.id] || []).length > 0;

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gradient-to-b from-cream/60 via-white to-ivory/40 px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-400">Step {step + 1} of {quizSteps.length}</span>
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
              <span className="text-4xl mb-3 block">{current.options[0]?.emoji || "✨"}</span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">{current.title}</h1>
              <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto font-medium">{current.subtitle}</p>
            </div>

            <div className="space-y-3">
              {current.options.map(opt => {
                const isSelected = current.type === "single"
                  ? answers[current.id] === opt.id
                  : (answers[current.id] || []).includes(opt.id);

                return (
                  <motion.button
                    key={opt.id}
                    onClick={() => select(opt.id)}
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-4 p-4 sm:p-5 rounded-2xl border-2 transition-all text-left ${
                      isSelected
                        ? "border-primary-500 bg-primary-50/80 shadow-md shadow-primary-100/30"
                        : "border-primary-100/60 hover:border-primary-200 bg-white hover:bg-primary-50/30"
                    }`}
                  >
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                      isSelected ? "bg-primary-100" : "bg-primary-50"
                    }`}>
                      {opt.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className={`font-bold text-sm sm:text-base ${isSelected ? "text-primary-700" : "text-gray-900"}`}>{opt.label}</span>
                      {opt.description && <p className="text-xs text-gray-500 mt-0.5 font-medium line-clamp-1">{opt.description}</p>}
                    </div>
                    {current.type === "single" && (
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? "border-primary-500" : "border-gray-300"
                      }`}>
                        {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-primary-500" />}
                      </div>
                    )}
                    {current.type === "multiple" && (
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
                disabled={step === 0}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-xl hover:bg-gray-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Back
              </button>
              <button
                onClick={next}
                disabled={!hasSelection}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-terracotta to-rose text-white text-sm font-bold rounded-xl hover:from-rose hover:to-crimson transition-all shadow-lg shadow-primary-200/30 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isLast ? "See My Matches" : "Next"}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
