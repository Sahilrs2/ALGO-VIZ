import { motion } from "framer-motion";
import { Info, ArrowRightLeft, Eye, CheckCircle, Zap } from "lucide-react";

export default function StepDisplay({ step, stepNumber, totalSteps }) {
  if (!step) {
    return (
      <div className="mt-6 p-8 card-neural text-center">
        <div className="w-10 h-10 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center mx-auto mb-3">
          <Zap className="w-5 h-5 text-accent/40" />
        </div>
        <p className="text-muted text-sm">Execute an algorithm to see step details</p>
      </div>
    );
  }

  const getActionConfig = (action) => {
    switch (action) {
      case "compare":
        return { color: "text-amber-400", bg: "bg-amber-500/10", borderColor: "border-amber-500/20", icon: <Eye size={16} /> };
      case "swap":
      case "shift":
        return { color: "text-accent", bg: "bg-accent/10", borderColor: "border-accent/20", icon: <ArrowRightLeft size={16} /> };
      case "visit":
        return { color: "text-purple-400", bg: "bg-purple-500/10", borderColor: "border-purple-500/20", icon: <Zap size={16} /> };
      case "found":
        return { color: "text-emerald-400", bg: "bg-emerald-500/10", borderColor: "border-emerald-500/20", icon: <CheckCircle size={16} /> };
      default:
        return { color: "text-muted", bg: "bg-white/5", borderColor: "border-border", icon: <Info size={16} /> };
    }
  };

  const config = getActionConfig(step.action);

  return (
    <motion.div
      className="mt-6 card-neural p-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200 }}
      key={stepNumber}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/40">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl ${config.bg} border ${config.borderColor} flex items-center justify-center ${config.color}`}>
            {config.icon}
          </div>
          <div>
            <h3 className={`text-sm font-bold capitalize ${config.color}`}>
              {step.action.replace("-", " ")}
            </h3>
            <p className="text-[10px] text-muted">Operation #{stepNumber}</p>
          </div>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted bg-background/60 border border-border/50 px-3 py-1.5 rounded-lg font-mono">
          {stepNumber}/{totalSteps}
        </span>
      </div>

      {/* Explanation */}
      <p className="text-white/90 text-sm mb-5 leading-relaxed">{step.explanation}</p>

      {/* Data */}
      {step.indices.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          <div className="bg-background/60 border border-border/40 rounded-xl px-4 py-3 flex-1 min-w-[120px]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Indices</p>
            <p className="font-mono text-accent text-xs font-semibold">
              [{step.indices.join(", ")}]
            </p>
          </div>
          {step.values.length > 0 && (
            <div className="bg-background/60 border border-border/40 rounded-xl px-4 py-3 flex-1 min-w-[120px]">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Values</p>
              <p className="font-mono text-white text-xs font-semibold">
                [{step.values.join(", ")}]
              </p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
