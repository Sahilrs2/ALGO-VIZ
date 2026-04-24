import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

const routeTitles = {
  "/": "Home",
  "/dashboard": "Algorithm Dashboard",
  "/login": "Sign In",
  "/signup": "Create Account",
};

export default function Navbar() {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.startsWith("/visualizer/")) {
      const id = location.pathname.split("/visualizer/")[1];
      return id?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) || "Visualizer";
    }
    return routeTitles[location.pathname] || "AlgoViz";
  };

  return (
    <header className="glass-navbar sticky top-0 z-30 h-14">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left — Context Title */}
        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            <motion.h2
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="text-sm font-semibold text-white tracking-tight"
            >
              {getTitle()}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Right — System info */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/5 border border-accent/10">
            <Zap className="w-3 h-3 text-accent" />
            <span className="text-[11px] font-medium text-muted">Neural Engine Active</span>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[11px] text-muted">
            <span>system</span>
            <span className="text-border">/</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-white font-medium"
              >
                {getTitle().toLowerCase()}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
