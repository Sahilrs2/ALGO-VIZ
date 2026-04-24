import { motion } from "framer-motion";
import { Play, Pause, Save, RotateCcw, Zap } from "lucide-react";

export default function AlgorithmControls({
  isPlaying,
  onPlayPause,
  currentStep,
  totalSteps,
  onStepChange,
  speed,
  onSpeedChange,
  onSave,
}) {
  const progress = totalSteps > 1 ? ((currentStep) / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="space-y-5">
      {/* Play Controls */}
      <div className="flex gap-3">
        <motion.button
          onClick={onPlayPause}
          className="flex-1 btn-primary py-2.5 text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isPlaying ? (
            <><Pause size={15} fill="currentColor" /> Pause</>
          ) : (
            <><Play size={15} fill="currentColor" /> Play</>
          )}
        </motion.button>
        <motion.button
          onClick={onSave}
          className="flex-1 btn-secondary py-2.5 text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Save size={15} /> Save
        </motion.button>
      </div>

      {/* Step Slider */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-accent" />
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
              Step {currentStep + 1} / {totalSteps}
            </p>
          </div>
          <button
            onClick={() => onStepChange(0)}
            className="text-[10px] font-bold uppercase tracking-wider text-muted hover:text-accent transition-colors flex items-center gap-1"
          >
            <RotateCcw size={10} /> Reset
          </button>
        </div>

        {/* Progress bar */}
        <div className="relative h-1 bg-border/50 rounded-full mb-2 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-blue-400 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          />
        </div>

        <input
          type="range"
          min="0"
          max={totalSteps - 1}
          value={currentStep}
          onChange={(e) => onStepChange(parseInt(e.target.value))}
          disabled={isPlaying}
          className="w-full disabled:opacity-40"
        />
      </div>

      {/* Speed Control */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
            Speed
          </p>
          <span className="text-[10px] font-mono font-bold text-accent">
            {((speed / 1000) * 100).toFixed(0)}%
          </span>
        </div>
        <input
          type="range"
          min="100"
          max="1000"
          value={speed}
          onChange={(e) => onSpeedChange(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}
