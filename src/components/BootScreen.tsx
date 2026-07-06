import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Shield, Cpu, RefreshCw, Zap, Check } from "lucide-react";

interface BootScreenProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  { id: 1, text: "INITIALIZING HARDEEP KAUR'S SPACE OBSERVATORY WORKSPACE...", icon: Terminal, color: "text-blue-400" },
  { id: 2, text: "LOADING DISTRIBUTED SYSTEM CAREER RECORDS (HASHEDIN, SMALLCASE)...", icon: Cpu, color: "text-purple-400" },
  { id: 3, text: "ESTABLISHING CORE TELEMETRY LINKS (GOOGLE CORE ENGINE, BLOOMBERG)...", icon: RefreshCw, color: "text-blue-400" },
  { id: 4, text: "CALIBRATING ASTRONOMY AND PHYSICS NOTEBOOK MODULES...", icon: Zap, color: "text-amber-400" },
  { id: 5, text: "LOADING DIGITAL ART PORTFOLIO AND GALACTIC EXPOSURES...", icon: Shield, color: "text-emerald-400" },
  { id: 6, text: "SYNCHRONIZING NIGHT-SKY COGNITIVE PATHWAYS...", icon: Zap, color: "text-amber-400" },
  { id: 7, text: "ALL PERSONAL PORTFOLIO BEACONS COMPLETED AND ACTIVE. WELCOME.", icon: Check, color: "text-emerald-400" }
];

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isSkipped, setIsSkipped] = useState(false);

  // Staggered log display
  useEffect(() => {
    if (currentStep < BOOT_LOGS.length) {
      const currentLog = BOOT_LOGS[currentStep];
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, currentLog.text]);
        setCurrentStep((prev) => prev + 1);
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Smooth continuous progress bar loading
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate near end
        const increment = prev > 70 ? Math.random() * 8 + 4 : Math.random() * 4 + 1;
        return Math.min(100, prev + increment);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // Complete screen boot once both logs and progress finish
  useEffect(() => {
    if (currentStep >= BOOT_LOGS.length && progress >= 100 && !isSkipped) {
      const endTimer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(endTimer);
    }
  }, [currentStep, progress, onComplete, isSkipped]);

  const handleSkip = () => {
    setIsSkipped(true);
    onComplete();
  };

  return (
    <div id="boot-screen" className="fixed inset-0 bg-[#040612] z-50 flex flex-col justify-between p-6 md:p-12 font-mono text-xs text-slate-400 select-none">
      {/* Top Section - Ship Telemetry */}
      <div className="flex justify-between items-start w-full border-b border-slate-900 pb-4">
        <div>
          <span className="text-slate-600 block">SYSTEM STATUS:</span>
          <span className="text-blue-400 font-bold tracking-widest animate-pulse">WARPING CORE BOOT SEQUENCE...</span>
        </div>
        <div className="text-right">
          <span className="text-slate-600 block">LOCAL ENGINE TIME:</span>
          <span className="text-slate-300 font-mono">
            {new Date().toISOString().replace("T", " ").substring(0, 19)} UTC
          </span>
        </div>
      </div>

      {/* Middle Section - Boot Logs and Progress */}
      <div className="max-w-2xl w-full mx-auto my-auto flex flex-col space-y-6">
        <div className="flex items-center space-y-2 flex-col justify-center mb-8">
          <div className="relative w-16 h-16 flex items-center justify-center border border-slate-800 rounded-full">
            <motion.div 
              className="absolute inset-1 border border-dashed border-blue-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            />
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 opacity-85 blur-xs" />
          </div>
          <span className="font-display tracking-widest text-slate-100 text-lg uppercase mt-4">NAV-HS-0598 v4.0</span>
          <span className="text-slate-500 tracking-wider text-[10px]">HARDEEP DIGITAL OBSERVATORY</span>
        </div>

        {/* Scrollable telemetry console logs */}
        <div className="bg-[#050816] border border-slate-900 rounded-lg p-5 h-56 overflow-y-auto space-y-3 flex flex-col">
          <AnimatePresence initial={false}>
            {logs.map((log, index) => {
              const stepIcon = BOOT_LOGS[index]?.icon || Terminal;
              const stepColor = BOOT_LOGS[index]?.color || "text-slate-400";
              const IconComp = stepIcon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-start space-x-3 text-[11px] leading-relaxed"
                >
                  <IconComp className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${stepColor}`} />
                  <span className={index === BOOT_LOGS.length - 1 ? "text-emerald-400 font-semibold" : "text-slate-300"}>
                    {log}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Progress bar container */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[10px] text-slate-500 tracking-wider">
            <span>CALIBRATING TRANSLATION BEACONS</span>
            <span className="font-bold text-slate-300">{Math.floor(progress)}%</span>
          </div>
          <div className="w-full h-[3px] bg-slate-900 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-amber-400 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Section - Skip actions */}
      <div className="flex justify-between items-center border-t border-slate-900 pt-4 w-full">
        <span className="text-[10px] text-slate-600">
          DESIGNED WITH INTENT & MINIMALISM • TARGET INTENT DETECTED
        </span>
        <button
          onClick={handleSkip}
          id="skip-boot-button"
          className="px-4 py-1.5 rounded-full border border-slate-800 text-[10px] text-slate-400 hover:border-slate-400 hover:text-slate-100 transition-colors cursor-pointer bg-slate-950/40"
        >
          SKIP SEQUENCE
        </button>
      </div>
    </div>
  );
}
