import { motion } from "framer-motion";

export function SkeletonCard({ className = "" }) {
  return (
    <div className={`card-neural p-6 space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="skeleton h-3 w-16" />
        <div className="skeleton h-4 w-4 rounded-full" />
      </div>
      <div className="skeleton h-5 w-3/4" />
      <div className="space-y-2">
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-5/6" />
      </div>
      <div className="skeleton h-3 w-24 mt-2" />
    </div>
  );
}

export function SkeletonGrid({ count = 6, className = "" }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
        >
          <SkeletonCard />
        </motion.div>
      ))}
    </div>
  );
}

export function SkeletonLine({ width = "w-full", height = "h-3", className = "" }) {
  return <div className={`skeleton ${width} ${height} ${className}`} />;
}

export function SkeletonDashboard() {
  return (
    <div className="min-h-screen px-6 py-10 space-y-12">
      {/* Header skeleton */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-border/30 pb-8">
        <div className="space-y-3">
          <div className="skeleton h-8 w-64" />
          <div className="skeleton h-4 w-96" />
        </div>
        <div className="skeleton h-12 w-80 rounded-xl" />
      </div>

      {/* Cards skeleton */}
      <div className="space-y-3">
        <div className="skeleton h-5 w-40" />
        <SkeletonGrid count={6} />
      </div>
    </div>
  );
}
