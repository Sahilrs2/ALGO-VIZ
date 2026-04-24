import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Home, LayoutDashboard, LogIn, UserPlus, LogOut,
  ChevronLeft, ChevronRight, Cpu, Zap
} from "lucide-react";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    ...(user
      ? [{ icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" }]
      : []),
  ];

  const authItems = user
    ? []
    : [
        { icon: LogIn, label: "Sign In", path: "/login" },
        { icon: UserPlus, label: "Sign Up", path: "/signup" },
      ];

  return (
    <motion.aside
      className="fixed left-0 top-0 bottom-0 z-40 glass-sidebar flex flex-col"
      animate={{ width: expanded ? 240 : 72 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-border/50 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center shrink-0 shadow-glow">
          <Cpu className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="text-lg font-bold tracking-tight text-white whitespace-nowrap"
            >
              AlgoViz
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* System Status Indicator */}
      <div className="px-4 py-4 shrink-0">
        <AnimatePresence>
          {expanded ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/5 border border-accent/10"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              <span className="text-[11px] font-medium text-muted">System Online</span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <AnimatePresence>
          {expanded && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[10px] font-semibold uppercase tracking-widest text-muted/50 px-3 mb-2"
            >
              Navigation
            </motion.p>
          )}
        </AnimatePresence>

        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "active text-white"
                  : "text-muted hover:text-white hover:bg-white/[0.03]"
              }`}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className={`w-[18px] h-[18px] shrink-0 ${active ? "text-accent" : ""}`} />
              <AnimatePresence>
                {expanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.15 }}
                    className="whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {active && expanded && (
                <motion.div
                  layoutId="sidebar-active-dot"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(79,140,255,0.6)]"
                />
              )}
            </motion.button>
          );
        })}

        {authItems.length > 0 && (
          <>
            <AnimatePresence>
              {expanded && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-semibold uppercase tracking-widest text-muted/50 px-3 mt-6 mb-2"
                >
                  Account
                </motion.p>
              )}
            </AnimatePresence>
            {authItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <motion.button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? "active text-white"
                      : "text-muted hover:text-white hover:bg-white/[0.03]"
                  }`}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className={`w-[18px] h-[18px] shrink-0 ${active ? "text-accent" : ""}`} />
                  <AnimatePresence>
                    {expanded && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.15 }}
                        className="whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </>
        )}
      </nav>

      {/* Bottom Section */}
      <div className="px-3 pb-4 space-y-2 shrink-0 border-t border-border/30 pt-4">
        {/* User info */}
        {user && (
          <div className={`flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.02] ${expanded ? "" : "justify-center"}`}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/30 to-blue-600/30 border border-accent/20 flex items-center justify-center text-xs font-bold text-accent shrink-0">
              {user.username?.charAt(0).toUpperCase()}
            </div>
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="min-w-0"
                >
                  <p className="text-sm font-semibold text-white truncate">{user.username}</p>
                  <p className="text-[10px] text-muted truncate">{user.email}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Logout */}
        {user && (
          <motion.button
            onClick={() => { logout(); navigate("/"); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="w-[18px] h-[18px] shrink-0" />
            <AnimatePresence>
              {expanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="whitespace-nowrap"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )}

        {/* Collapse toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-muted hover:text-white hover:bg-white/[0.03] transition-all text-xs"
        >
          {expanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
