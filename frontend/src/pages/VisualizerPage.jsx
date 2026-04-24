import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import VisualizerComponent from "../components/VisualizerComponent";
import AlgorithmControls from "../components/AlgorithmControls";
import StepDisplay from "../components/StepDisplay";
import { ArrowLeft, Play, Loader2, Cpu, AlertCircle, CheckCircle, Zap, Clock, BarChart3, ArrowRightLeft } from "lucide-react";

export default function VisualizerPage() {
  const { algorithmId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("5,2,8,1,9");
  const [visualization, setVisualization] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleExecute = async () => {
    if (!algorithmId) return;
    setLoading(true);
    setError("");
    setCurrentStep(0);

    try {
      const inputData = inputValue.split(",").map((x) => {
        const parsed = parseInt(x.trim());
        return isNaN(parsed) ? 0 : parsed;
      });

      const response = await axios.post(
        "http://localhost:5000/api/algorithms/execute",
        { algorithmId, inputData }
      );

      setVisualization(response.data);
      setIsPlaying(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to execute algorithm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPlaying || !visualization) return;
    const timer = setTimeout(() => {
      if (currentStep < visualization.steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, 1100 - speed);
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, visualization, speed]);

  const handleSave = async () => {
    if (!token) {
      alert("Please log in to save visualizations!");
      return;
    }
    if (!visualization || !algorithmId) return;
    try {
      await axios.post(
        "http://localhost:5000/api/algorithms/save",
        {
          algorithmId,
          algorithmName: visualization.algorithm,
          category: visualization.category,
          inputData: inputValue,
          steps: visualization.steps,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error2) {
      const errorMsg = error2.response?.data?.error || "Failed to save visualization";
      alert("Error: " + errorMsg);
    }
  };

  const currentStepData = visualization?.steps[currentStep];

  const formatAlgoName = (id) => {
    return id?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) || "Algorithm";
  };

  return (
    <div className="min-h-screen text-foreground">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-muted hover:text-accent transition-colors mb-6 text-sm font-medium w-fit group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </motion.button>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent/20 to-blue-600/20 border border-accent/15 flex items-center justify-center">
            <Cpu className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {formatAlgoName(algorithmId)}
            </h1>
            <p className="text-[11px] text-muted font-medium">Neural Visualizer Node</p>
          </div>
        </motion.div>

        {/* Save Success Toast */}
        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -20, x: "-50%" }}
              className="fixed top-20 left-1/2 z-50 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-5 py-3 rounded-xl text-sm font-medium backdrop-blur-xl shadow-elevated"
            >
              <CheckCircle className="w-4 h-4" />
              Visualization saved successfully
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ===== CONTROLS PANEL ===== */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card-neural p-6 space-y-6"
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-4 h-4 text-accent" />
                  <h2 className="text-sm font-bold text-white">Execution Config</h2>
                </div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-muted mb-2">
                  Input Array
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={loading || isPlaying}
                  className="input-premium disabled:opacity-40"
                  placeholder="5,2,8,1,9"
                />
                <p className="text-[10px] text-muted/60 mt-2">
                  Comma-separated integer values
                </p>
              </div>

              <motion.button
                onClick={handleExecute}
                disabled={loading}
                className="btn-primary w-full py-3.5 text-sm disabled:opacity-40 disabled:pointer-events-none"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  >
                    <Loader2 className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <>
                    <Play className="w-4 h-4" fill="currentColor" /> Execute Algorithm
                  </>
                )}
              </motion.button>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-start gap-3 bg-red-500/8 border border-red-500/15 text-red-400 p-4 rounded-xl text-sm"
                  >
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Metrics */}
              <AnimatePresence>
                {visualization && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5 pt-5 border-t border-border/30"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Time", value: visualization.timeComplexity, icon: Clock, color: "text-accent" },
                        { label: "Space", value: visualization.spaceComplexity, icon: BarChart3, color: "text-purple-400" },
                        { label: "Comparisons", value: visualization.comparisons, icon: Zap, color: "text-amber-400" },
                        { label: "Swaps", value: visualization.swaps, icon: ArrowRightLeft, color: "text-emerald-400" },
                      ].map((metric) => (
                        <div key={metric.label} className="bg-background/60 border border-border/30 rounded-xl p-3">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <metric.icon className={`w-3 h-3 ${metric.color}`} />
                            <p className="text-[9px] font-bold uppercase tracking-wider text-muted">
                              {metric.label}
                            </p>
                          </div>
                          <p className="text-sm font-bold font-mono text-white">
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <AlgorithmControls
                      isPlaying={isPlaying}
                      onPlayPause={() => setIsPlaying(!isPlaying)}
                      currentStep={currentStep}
                      totalSteps={visualization.steps.length}
                      onStepChange={setCurrentStep}
                      speed={speed}
                      onSpeedChange={setSpeed}
                      onSave={handleSave}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ===== VISUALIZATION PANEL ===== */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {visualization ? (
                <motion.div
                  key="viz"
                  className="space-y-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="card-neural p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                        <h2 className="text-base font-bold text-white">
                          {visualization.algorithm}
                        </h2>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/8 px-3 py-1.5 rounded-lg border border-accent/15">
                        {visualization.category}
                      </span>
                    </div>

                    <VisualizerComponent
                      data={visualization.finalResult}
                      currentStep={currentStepData}
                      steps={visualization.steps}
                      currentStepIndex={currentStep}
                    />
                  </div>

                  <StepDisplay
                    step={currentStepData}
                    stepNumber={currentStep + 1}
                    totalSteps={visualization.steps.length}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  className="card-neural p-16 flex flex-col items-center justify-center text-center min-h-[400px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Neural idle animation */}
                  <div className="relative mb-8">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center"
                      animate={{ rotate: [0, 3, -3, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Play className="w-6 h-6 text-accent/40" />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 rounded-2xl border border-accent/10"
                      animate={{ scale: [1, 1.3], opacity: [0.2, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">
                    Visualization Ready
                  </h3>
                  <p className="text-muted text-sm max-w-sm leading-relaxed">
                    Enter your input array on the left and click Execute to begin
                    the neural step-by-step visualization.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
