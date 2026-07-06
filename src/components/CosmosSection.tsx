import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { personalInterestsData } from "../data";
import { BookOpen, Compass, Zap, RotateCcw, AlertCircle, HelpCircle } from "lucide-react";

export default function CosmosSection() {
  const [selectedNoteId, setSelectedNoteId] = useState<string>("black-holes");
  
  // Quantum Simulator State
  const [theta, setTheta] = useState(45); // in degrees
  const [measureResult, setMeasureResult] = useState<string | null>(null);
  const [prob0, setProb0] = useState(50);
  const [prob1, setProb1] = useState(50);
  const [measurementHistory, setMeasurementHistory] = useState<string[]>([]);

  const activeNote = personalInterestsData.cosmos.find((n) => n.id === selectedNoteId) || personalInterestsData.cosmos[0];

  // Calculate qubit state amplitude probabilities
  const handleThetaChange = (val: number) => {
    setTheta(val);
    const rad = (val * Math.PI) / 180;
    // P(0) = cos^2(theta / 2), P(1) = sin^2(theta / 2)
    const p0 = Math.pow(Math.cos(rad / 2), 2) * 100;
    const p1 = Math.pow(Math.sin(rad / 2), 2) * 100;
    setProb0(Math.round(p0 * 10) / 10);
    setProb1(Math.round(p1 * 10) / 10);
    setMeasureResult(null); // Clear previous measurement
  };

  // Measure qubit (collapse wave function)
  const triggerMeasurement = () => {
    const roll = Math.random() * 100;
    const outcome = roll < prob0 ? "|0⟩ (Spin Up)" : "|1⟩ (Spin Down)";
    setMeasureResult(outcome);
    setMeasurementHistory((prev) => [outcome.substring(0, 3), ...prev.slice(0, 14)]);
  };

  const resetQuantumSystem = () => {
    setTheta(45);
    setProb0(50);
    setProb1(50);
    setMeasureResult(null);
    setMeasurementHistory([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-mono">
      {/* Left Column - Topics Selector */}
      <div className="lg:col-span-4 space-y-3">
        {personalInterestsData.cosmos.map((note) => {
          const isActive = note.id === selectedNoteId;
          return (
            <button
              key={note.id}
              onClick={() => setSelectedNoteId(note.id)}
              className={`w-full text-left p-5 rounded-xl border transition-all cursor-pointer block ${
                isActive
                  ? "bg-purple-600/10 border-purple-500/40 shadow-md"
                  : "bg-slate-950/25 border-slate-900 hover:border-slate-800"
              }`}
            >
              <div className="space-y-1">
                <span className={`text-[10px] tracking-wider block uppercase ${isActive ? "text-purple-400" : "text-slate-500"}`}>
                  {note.topic}
                </span>
                <h4 className={`font-display text-sm md:text-base font-semibold ${isActive ? "text-slate-100" : "text-slate-400"}`}>
                  {note.title}
                </h4>
              </div>
            </button>
          );
        })}
      </div>

      {/* Right Column - Note Content & Interactive Sandbox */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNote.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-950/40 border border-slate-900 rounded-xl p-6 md:p-8 space-y-6"
          >
            {/* Note title */}
            <div className="border-b border-slate-900 pb-4 space-y-2 text-left">
              <span className="text-[10px] uppercase text-purple-400 px-2 py-0.5 rounded bg-purple-950/20 border border-purple-900/30">
                {activeNote.topic} LOGS
              </span>
              <h3 className="font-display text-lg md:text-xl font-semibold text-slate-100 pt-1">
                {activeNote.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">{activeNote.description}</p>
            </div>

            {/* Notebook margins */}
            <div className="relative border-l-2 border-dashed border-slate-800 pl-5 space-y-4 text-xs text-slate-300">
              {activeNote.notes.map((bullet, bIdx) => (
                <div key={bIdx} className="relative py-1 leading-relaxed">
                  <div className="absolute -left-[27px] top-2 w-2 h-2 rounded-full bg-purple-500/30 border border-purple-500" />
                  <p className="font-sans text-slate-400">{bullet}</p>
                </div>
              ))}
            </div>

            {/* Interactive Physics Sandbox Section */}
            {activeNote.id === "quantum-computing" && (
              <div className="mt-8 border border-slate-900/80 bg-slate-950 p-6 rounded-lg space-y-6">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                  <div className="flex items-center space-x-2">
                    <Compass className="w-4 h-4 text-purple-400 animate-spin" />
                    <span className="text-[11px] uppercase tracking-wider text-slate-200">Quantum Qubit Simulator</span>
                  </div>
                  <button 
                    onClick={resetQuantumSystem}
                    className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Bloch sphere cross-section visualization */}
                  <div className="md:col-span-4 flex flex-col items-center justify-center space-y-3">
                    <div className="relative w-28 h-28 border border-dashed border-slate-700 rounded-full flex items-center justify-center">
                      {/* X & Y axis */}
                      <div className="absolute inset-0 flex items-center"><div className="w-full h-[1px] bg-slate-800/80" /></div>
                      <div className="absolute inset-0 flex justify-center"><div className="h-full w-[1px] bg-slate-800/80" /></div>
                      <span className="absolute -top-4 text-[9px] text-slate-500">|0⟩</span>
                      <span className="absolute -bottom-4 text-[9px] text-slate-500">|1⟩</span>

                      {/* State Vector Line */}
                      <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <line
                          x1="50%"
                          y1="50%"
                          x2={`${50 + 40 * Math.cos((theta * Math.PI) / 180)}%`}
                          y2={`${50 + 40 * Math.sin((theta * Math.PI) / 180)}%`}
                          stroke="#a855f7"
                          strokeWidth="2"
                        />
                        <circle
                          cx={`${50 + 40 * Math.cos((theta * Math.PI) / 180)}%`}
                          cy={`${50 + 40 * Math.sin((theta * Math.PI) / 180)}%`}
                          r="3"
                          fill="#c084fc"
                        />
                      </svg>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono mt-2">Vector θ = {theta}°</span>
                  </div>

                  {/* Qubit State Control sliders */}
                  <div className="md:col-span-8 space-y-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-500">COHERENCE ROTATION SPEED (θ)</span>
                        <span className="text-purple-400 font-bold">{theta}°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="180"
                        value={theta}
                        onChange={(e) => handleThetaChange(Number(e.target.value))}
                        className="w-full accent-purple-500 h-1 bg-slate-900 rounded"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center text-[11px] py-1 bg-slate-900/40 p-3 rounded border border-slate-900">
                      <div>
                        <span className="text-slate-500 block text-[9px]">P(|0⟩) (Spin Up)</span>
                        <span className="font-bold text-slate-200 text-sm font-mono">{prob0}%</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px]">P(|1⟩) (Spin Down)</span>
                        <span className="font-bold text-slate-200 text-sm font-mono">{prob1}%</span>
                      </div>
                    </div>

                    <div className="flex gap-2 items-center">
                      <button
                        onClick={triggerMeasurement}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 border border-purple-500 text-slate-100 font-bold px-3 py-2 rounded text-[11px] uppercase cursor-pointer text-center"
                      >
                        Measure State
                      </button>
                    </div>

                    {/* Result and history logs */}
                    {measureResult && (
                      <div className="bg-slate-900 p-3 rounded border border-purple-900/40 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">WAVE-FUNCTION COLLAPSE:</span>
                        <span className="text-emerald-400 font-bold animate-pulse">{measureResult}</span>
                      </div>
                    )}

                    {measurementHistory.length > 0 && (
                      <div className="flex items-center space-x-1.5 text-[9px]">
                        <span className="text-slate-600 shrink-0">HISTORY:</span>
                        <div className="flex flex-wrap gap-1">
                          {measurementHistory.map((h, hIdx) => (
                            <span key={hIdx} className="px-1 py-0.5 rounded bg-slate-900 border border-slate-800 text-[8px] text-slate-400">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Schwarzschild radius calculator for Black holes note */}
            {activeNote.id === "black-holes" && (
              <div className="mt-8 border border-slate-900/80 bg-slate-950 p-6 rounded-lg space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-900 pb-3">
                  <Compass className="w-4 h-4 text-purple-400 animate-pulse" />
                  <span className="text-[11px] uppercase tracking-wider text-slate-200">Interactive Singularity Calibrator</span>
                </div>
                <div className="text-xs space-y-3">
                  <p className="text-slate-400 font-sans leading-normal">
                    Calculate what size a physical object must be compressed down to in order to breach its event horizon limit and collapse into a gravitational singularity.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-center">
                    <div className="p-3 bg-slate-900 rounded border border-slate-900">
                      <span className="text-[9px] text-slate-500 block">PLANET EARTH MASS</span>
                      <span className="font-bold text-slate-300 block mt-1">5.97 × 10²⁴ kg</span>
                      <span className="text-[9px] text-purple-400 block mt-1">Horizon = 8.87 mm</span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded border border-slate-900">
                      <span className="text-[9px] text-slate-500 block">OUR SUN MASS</span>
                      <span className="font-bold text-slate-300 block mt-1">1.98 × 10³⁰ kg</span>
                      <span className="text-[9px] text-purple-400 block mt-1">Horizon = 2.95 km</span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded border border-slate-900">
                      <span className="text-[9px] text-slate-500 block">MILKY WAY BLACKHOLE</span>
                      <span className="font-bold text-slate-300 block mt-1">8.2 × 10³⁶ kg</span>
                      <span className="text-[9px] text-purple-400 block mt-1">Horizon = 12.2 M km</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
