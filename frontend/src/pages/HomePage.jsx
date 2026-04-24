import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { ArrowRight, BarChart3, BookOpen, Play, Gauge, Cpu, Sparkles, Shield, Zap } from "lucide-react";
import { useRef } from "react";
import AISystemCore from "../components/AISystemCore";

// Word-by-word stagger text component
function AnimatedHeadline({ words, highlightIndices = [] }) {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 80, damping: 18 },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className="inline"
    >
      {words.map((word, i) => {
        const isHighlighted = highlightIndices.includes(i);
        return (
          <motion.span
            key={i}
            variants={child}
            className={`inline-block mr-[0.3em] ${
              isHighlighted
                ? "gradient-text"
                : "text-white"
            }`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

// Stats counter
function StatCard({ value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      className="text-center"
    >
      <p className="text-3xl md:text-4xl font-bold gradient-text mb-1">{value}</p>
      <p className="text-xs text-muted font-medium uppercase tracking-wider">{label}</p>
    </motion.div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const heroRef = useRef(null);

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const algorithms = [
    { icon: <BarChart3 className="w-6 h-6" />, name: "Sorting", count: 6, description: "Bubble, Quick, Merge, Insertion, Selection, Heap", color: "from-blue-500 to-indigo-600" },
    { icon: <BookOpen className="w-6 h-6" />, name: "Tree Traversal", count: 3, description: "Inorder, Preorder, Postorder", color: "from-emerald-500 to-teal-600" },
    { icon: <Play className="w-6 h-6" />, name: "Search", count: 2, description: "Linear, Binary", color: "from-amber-500 to-orange-600" },
    { icon: <Gauge className="w-6 h-6" />, name: "Graph", count: 4, description: "DFS, BFS, Dijkstra, Kruskal", color: "from-purple-500 to-pink-600" },
  ];

  const features = [
    { icon: <Zap className="w-5 h-5" />, title: "Step-by-Step Visualization", description: "Watch algorithms execute step by step with detailed explanations and real-time array manipulation." },
    { icon: <BarChart3 className="w-5 h-5" />, title: "Performance Metrics", description: "See time and space complexity, comparisons, and swaps tracked in real-time as algorithms run." },
    { icon: <Shield className="w-5 h-5" />, title: "Save & Compare", description: "Save your visualizations and compare algorithm performance side by side." },
    { icon: <Sparkles className="w-5 h-5" />, title: "Interactive Controls", description: "Control speed, pause, rewind, and step through executions at your own pace." },
  ];

  return (
    <div className="min-h-full overflow-hidden">

      {/* ===== HERO SECTION ===== */}
      <section
        ref={heroRef}
        className="relative min-h-[calc(100vh-56px)] flex items-center justify-center px-6 overflow-hidden"
      >
        {/* Ambient gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-[10%] left-[-10%] w-[60%] h-[60%] rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(79,140,255,0.06) 0%, transparent 70%)" }}
            animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(129,140,248,0.04) 0%, transparent 70%)" }}
            animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(79,140,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(79,140,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />

        {/* Hero Content */}
        <motion.div
          className="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          {/* Left — Text */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 120 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-semibold tracking-wide mb-8 bg-accent/5 border border-accent/15 text-accent"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Neural Algorithm Intelligence
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight">
              <AnimatedHeadline
                words={["Visualize", "Algorithms"]}
                highlightIndices={[0]}
              />
              <br />
              <AnimatedHeadline
                words={["Like", "Never", "Before"]}
                highlightIndices={[2]}
              />
            </h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-base text-muted max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              An AI-powered system for interactive, step-by-step algorithm visualization.
              Master data structures through intuitive neural learning.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, type: "spring", stiffness: 80 }}
              className="flex gap-4 justify-center lg:justify-start flex-wrap"
            >
              {user ? (
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 8px 40px rgba(79,140,255,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/dashboard")}
                  className="group btn-primary px-8 py-4 text-sm font-bold"
                >
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: "0 8px 40px rgba(79,140,255,0.3)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate("/signup")}
                    className="group btn-primary px-8 py-4 text-sm font-bold"
                  >
                    Get Started Free
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03, borderColor: "rgba(79,140,255,0.5)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate("/login")}
                    className="px-8 py-4 rounded-xl text-sm font-bold border border-border text-white/80 hover:bg-accent/5 transition-all duration-300"
                  >
                    Sign In
                  </motion.button>
                </>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="flex gap-10 justify-center lg:justify-start mt-12"
            >
              <StatCard value="17+" label="Algorithms" delay={1.5} />
              <StatCard value="4" label="Categories" delay={1.6} />
              <StatCard value="∞" label="Visualizations" delay={1.7} />
            </motion.div>
          </div>

          {/* Right — AI Core Visual */}
          <motion.div
            className="flex-shrink-0 hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.2, type: "spring" }}
          >
            <AISystemCore size={420} />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-5 h-8 border border-white/10 rounded-full flex justify-center pt-2">
              <motion.div
                className="w-1 h-2 bg-accent/40 rounded-full"
                animate={{ y: [0, 8, 0], opacity: [0.6, 0.1, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== ALGORITHMS SECTION ===== */}
      <section className="py-28 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wider mb-6 bg-accent/5 border border-accent/10 text-accent uppercase">
              <Cpu className="w-3 h-3" /> Algorithm Library
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Explore <span className="gradient-text">Neural Nodes</span>
            </h2>
            <p className="text-muted text-base max-w-lg mx-auto">
              A curated collection of algorithms, visualized as intelligent computation nodes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {algorithms.map((algo, index) => (
              <motion.div
                key={algo.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 100, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="card-neural cursor-pointer group"
                onClick={() => navigate(user ? "/dashboard" : "/signup")}
              >
                <div className="p-7 relative">
                  {/* Hover glow */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${algo.color} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500`} />

                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${algo.color} flex items-center justify-center text-white mb-5 shadow-lg`}>
                      {algo.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-1 text-white">{algo.name}</h3>
                    <p className="text-[11px] font-semibold text-accent mb-3">{algo.count} algorithms</p>
                    <p className="text-[13px] text-muted leading-relaxed">{algo.description}</p>
                  </div>

                  <motion.div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4 text-accent" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why <span className="gradient-text">AlgoViz</span>?
            </h2>
            <p className="text-muted text-base max-w-lg mx-auto">
              Built for developers and students who want to truly understand algorithms.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ type: "spring", stiffness: 100, delay: index * 0.08 }}
                className="card-neural p-7 flex gap-5 group hover:border-accent/20 transition-all duration-500"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-accent/8 border border-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/15 transition-all">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-[13px] text-muted leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-28 px-6 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80 }}
          className="max-w-3xl mx-auto text-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-blue-600/10 to-accent/10 rounded-3xl blur-3xl" />
          <div className="relative card-neural rounded-3xl p-14">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-blue-600/20 border border-accent/15 flex items-center justify-center mx-auto mb-6">
              <Cpu className="w-7 h-7 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to <span className="gradient-text">Visualize</span>?
            </h2>
            <p className="text-muted text-base mb-10 max-w-md mx-auto">
              Join the neural network. Master algorithms through interactive intelligence.
            </p>
            {!user && (
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 8px 40px rgba(79,140,255,0.3)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/signup")}
                className="btn-primary px-10 py-4 text-sm font-bold mx-auto"
              >
                Create Free Account <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
