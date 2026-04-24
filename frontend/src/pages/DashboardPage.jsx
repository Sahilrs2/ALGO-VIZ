import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AlgorithmNode from "../components/AlgorithmNode";
import { SkeletonDashboard } from "../components/Skeletons";
import {
  Search, AlignLeft, Activity,
  Bookmark, Sparkles, TreePine, ScanSearch, ArrowRight,
  Cpu, Clock, BarChart3, Zap
} from "lucide-react";

export default function DashboardPage() {
  const [algorithms, setAlgorithms] = useState([]);
  const [visualizations, setVisualizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const { token } = useAuth();
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const algoRes = await axios.get(`${BASE_URL}/api/algorithms/available`);
        setAlgorithms(Array.isArray(algoRes.data) ? algoRes.data : []);

        if (token) {
          try {
            const vizRes = await axios.get(`${BASE_URL}/api/algorithms/saved`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setVisualizations(Array.isArray(vizRes.data) ? vizRes.data : []);
          } catch (error) {
            console.error("SAVED VIZ API ERROR:", error?.response?.data || error.message);
          }
        }
      } catch (error) {
        console.error("ALGO API ERROR:", error?.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const categories = [
    { id: "sorting", label: "Sorting", icon: AlignLeft },
    { id: "graph", label: "Graph", icon: Activity },
    { id: "tree", label: "Tree", icon: TreePine },
    { id: "search", label: "Search", icon: ScanSearch },
    { id: "dynamic", label: "Dynamic Programming", icon: Sparkles },
  ];

  const filteredAlgorithms = algorithms.filter(
    (algo) =>
      algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      algo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <SkeletonDashboard />;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* ===== HEADER ===== */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8 border-b border-border/40 pb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-blue-600/20 border border-accent/15 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Algorithm Dashboard
                </h1>
              </div>
            </div>
            <p className="text-muted text-sm max-w-xl ml-[52px]">
              Explore, visualize, and master algorithms through interactive neural computation nodes.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-80 shrink-0">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted/50" />
            </div>
            <input
              type="text"
              placeholder="Search algorithms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-premium pl-11 !rounded-xl !bg-surface/60"
            />
          </div>
        </motion.div>

        {/* ===== QUICK STATS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { icon: Cpu, label: "Algorithms", value: algorithms.length, color: "text-accent" },
            { icon: Bookmark, label: "Saved", value: visualizations.length, color: "text-emerald-400" },
            { icon: BarChart3, label: "Categories", value: categories.length, color: "text-purple-400" },
            { icon: Zap, label: "Status", value: "Active", color: "text-amber-400" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="card-neural p-5 flex items-center gap-4"
            >
              <div className={`w-10 h-10 rounded-xl bg-white/[0.03] border border-border/40 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted">{stat.label}</p>
                <p className="text-lg font-bold text-white font-mono">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ===== SAVED VISUALIZATIONS ===== */}
        <AnimatePresence>
          {visualizations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-6">
                <Bookmark className="w-4 h-4 text-emerald-400" />
                <h2 className="text-lg font-bold text-white">Saved Visualizations</h2>
                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-emerald-500/15">
                  {visualizations.length}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {visualizations.map((viz, index) => (
                  <motion.div
                    key={viz._id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
                    whileHover={{ y: -4, transition: { type: "spring", stiffness: 400 } }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/visualizer/${viz._id}`)}
                    className="card-neural cursor-pointer group p-5"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent/70">
                        {viz.category}
                      </span>
                      <Clock className="w-3.5 h-3.5 text-muted/30" />
                    </div>
                    <h4 className="font-bold text-sm mb-1.5 text-white">
                      {viz.algorithmName}
                    </h4>
                    <p className="text-[11px] text-muted mb-4">
                      {new Date(viz.savedAt).toLocaleDateString(undefined, {
                        year: "numeric", month: "short", day: "numeric",
                      })}
                    </p>
                    <div className="flex items-center text-[11px] font-semibold text-muted group-hover:text-accent mt-auto transition-colors duration-300">
                      View Replay
                      <ArrowRight className="w-3 h-3 ml-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== ALGORITHM LIBRARY ===== */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Cpu className="w-4 h-4 text-accent" />
            <h2 className="text-lg font-bold text-white">Neural Algorithm Library</h2>
            <span className="bg-accent/10 text-accent text-[10px] font-bold px-2.5 py-1 rounded-lg border border-accent/15">
              {filteredAlgorithms.length} nodes
            </span>
          </div>

          <div className="space-y-14">
            {categories.map((cat) => {
              const categoryAlgos = filteredAlgorithms.filter(
                (a) => a.category?.toLowerCase().trim() === cat.id
              );

              if (categoryAlgos.length === 0 && searchQuery) return null;

              const Icon = cat.icon;

              return (
                <div key={cat.id}>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-border/40 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-accent/70" />
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {cat.label}
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-border/40 to-transparent ml-2" />
                  </div>

                  {/* Algorithm Cards */}
                  {categoryAlgos.length === 0 ? (
                    <div className="rounded-2xl p-10 text-center border border-dashed border-border/30">
                      <p className="text-muted text-sm">No algorithms in this category yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {categoryAlgos.map((algo, index) => (
                        <AlgorithmNode
                          key={algo.id}
                          algo={algo}
                          category={cat.id}
                          index={index}
                          onClick={() => navigate(`/visualizer/${algo.id}`)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
