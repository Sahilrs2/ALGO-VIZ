import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground font-body flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area — offset by sidebar width */}
      <div className="flex-1 ml-[72px] lg:ml-[240px] flex flex-col min-h-screen transition-[margin] duration-300">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 relative">
          {/* Ambient background gradient */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div
              className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.03]"
              style={{
                background: "radial-gradient(circle, rgba(79, 140, 255, 1) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute bottom-0 left-1/4 w-[500px] h-[500px] opacity-[0.02]"
              style={{
                background: "radial-gradient(circle, rgba(129, 140, 248, 1) 0%, transparent 70%)",
              }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 120, damping: 22 }}
              className="relative z-10 h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/40 py-6 bg-background/80 backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">A</span>
              </div>
              <span className="text-xs font-semibold text-muted">AlgoViz Neural Engine</span>
            </div>
            <p className="text-[11px] text-muted/60">
              © {new Date().getFullYear()} Algorithm Intelligence System. Built for learning.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
