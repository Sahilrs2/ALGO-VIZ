import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

const categoryColors = {
  sorting: { from: "from-blue-500/20", to: "to-indigo-600/20", accent: "text-blue-400", border: "border-blue-500/20", glow: "rgba(59, 130, 246, 0.15)" },
  graph: { from: "from-purple-500/20", to: "to-pink-600/20", accent: "text-purple-400", border: "border-purple-500/20", glow: "rgba(168, 85, 247, 0.15)" },
  tree: { from: "from-emerald-500/20", to: "to-teal-600/20", accent: "text-emerald-400", border: "border-emerald-500/20", glow: "rgba(52, 211, 153, 0.15)" },
  search: { from: "from-amber-500/20", to: "to-orange-600/20", accent: "text-amber-400", border: "border-amber-500/20", glow: "rgba(245, 158, 11, 0.15)" },
  dynamic: { from: "from-cyan-500/20", to: "to-blue-600/20", accent: "text-cyan-400", border: "border-cyan-500/20", glow: "rgba(6, 182, 212, 0.15)" },
};

export default function AlgorithmNode({ algo, category, index, onClick }) {
  const colors = categoryColors[category] || categoryColors.sorting;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ type: "spring", stiffness: 100, damping: 18, delay: index * 0.06 }}
      whileHover={{
        y: -6,
        transition: { type: "spring", stiffness: 400, damping: 20 },
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="card-neural cursor-pointer group relative"
    >
      {/* Top gradient bar */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${colors.from} ${colors.to} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Hover glow background */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${colors.glow} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Category badge + node indicator */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-[10px] font-bold uppercase tracking-widest ${colors.accent} opacity-70`}>
            {category}
          </span>
          <motion.div
            className="w-2 h-2 rounded-full bg-accent/30"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{ duration: 2 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Algorithm name */}
        <h4 className="text-base font-bold text-white mb-2 group-hover:text-white transition-colors duration-300">
          {algo.name}
        </h4>

        {/* Description */}
        <p className="text-[13px] text-muted leading-relaxed mb-6 flex-grow line-clamp-3">
          {algo.description}
        </p>

        {/* Bottom action */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-1.5">
            <Zap className={`w-3 h-3 ${colors.accent} opacity-50`} />
            <span className="text-[11px] font-medium text-muted">Neural Node</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-muted group-hover:text-accent transition-colors duration-300">
            Execute
            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
