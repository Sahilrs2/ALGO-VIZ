import { motion } from "framer-motion";

export default function VisualizerComponent({ data, currentStep, currentStepIndex }) {
  const isArray = Array.isArray(data);

  const getBarColor = (index) => {
    if (!currentStep) return "from-slate-600/40 to-slate-700/40 border-border/50";
    if (currentStep.indices?.includes(index)) {
      if (currentStep.action === "swap" || currentStep.action === "shift") {
        return "from-accent to-blue-500 border-accent/60";
      }
      if (currentStep.action === "found") {
        return "from-emerald-400 to-emerald-500 border-emerald-400/60";
      }
      if (currentStep.action === "compare") {
        return "from-amber-400/80 to-amber-500/80 border-amber-400/40";
      }
      return "from-purple-400/80 to-purple-500/80 border-purple-400/40";
    }
    return "from-slate-600/30 to-slate-700/30 border-border/30";
  };

  const getTextColor = (index) => {
    if (!currentStep) return "text-muted/60";
    if (currentStep.indices?.includes(index)) {
      return "text-white font-bold";
    }
    return "text-muted/50";
  };

  const getGlow = (index) => {
    if (!currentStep || !currentStep.indices?.includes(index)) return "";
    if (currentStep.action === "swap" || currentStep.action === "shift") {
      return "drop-shadow-[0_0_12px_rgba(79,140,255,0.5)]";
    }
    if (currentStep.action === "found") {
      return "drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]";
    }
    return "drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]";
  };

  if (isArray) {
    const maxValue = Math.max(...data, 1);

    return (
      <div className="w-full h-80 flex items-end justify-center gap-[6px] p-6 bg-background/60 rounded-2xl border border-border/40 overflow-x-auto">
        {data.map((value, index) => {
          const height = (value / maxValue) * 220;
          const active = currentStep?.indices?.includes(index);
          return (
            <motion.div
              key={`${index}-${currentStepIndex}`}
              className="flex flex-col items-center justify-end min-w-[28px] relative"
              animate={{ height: `${height + 30}px` }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {/* Value label */}
              <motion.span
                className={`text-[10px] font-mono mb-2 ${getTextColor(index)}`}
                animate={{
                  y: active ? -6 : 0,
                  scale: active ? 1.15 : 1,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {value}
              </motion.span>

              {/* Bar */}
              <motion.div
                className={`w-full rounded-t-lg border-t border-l border-r flex-1 bg-gradient-to-t ${getBarColor(index)} ${getGlow(index)} transition-all duration-300`}
                animate={{
                  scaleY: active ? 1.04 : 1,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ originY: 1 }}
              />

              {/* Index label */}
              <span className="text-[8px] text-muted/30 mt-2 font-mono">{index}</span>
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full h-80 flex items-center justify-center p-8 bg-background/60 rounded-2xl border border-border/40">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" }}
      >
        {typeof data === "number" ? (
          <>
            <p className="text-5xl font-bold gradient-text mb-4 font-mono">
              {data}
            </p>
            <p className="text-muted text-sm font-medium">Found at index {data}</p>
          </>
        ) : (
          <>
            <p className="text-lg font-bold text-white mb-3">
              Result
            </p>
            <p className="text-muted text-sm font-mono bg-surface/60 px-5 py-3 rounded-xl border border-border/40">
              {JSON.stringify(data)}
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
