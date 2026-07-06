import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast, elegant loading animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        onComplete();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div id= "boot-screen" className = "fixed inset-0 bg-[#03050c] z-50 flex flex-col items-center justify-center p-6 font-mono select-none" >
      <div className="max-w-xs w-full flex flex-col items-center space-y-6" >
        {/* Simple elegant glowing indicator */ }
        < div className = "relative w-12 h-12 flex items-center justify-center" >
          <motion.div 
            className="absolute inset-0 border-2 border-slate-900 rounded-full"
    />
    <motion.div 
            className="absolute inset-0 border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
  animate = {{ rotate: 360 }
}
transition = {{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
  < div className = "w-4 h-4 rounded-full bg-blue-500/20" />
    </div>

{/* Title */ }
<div className="text-center space-y-1" >
  <h1 className="text-slate-100 font-sans text-lg font-semibold tracking-wider" > Hardeep Kaur </h1>
    < p className = "text-slate-500 text-[10px] uppercase tracking-widest font-mono" > Portfolio & Journal </p>
      </div>

{/* Dynamic single simple progress bar */ }
<div className="w-full space-y-1.5 pt-2" >
  <div className="flex justify-between text-[9px] text-slate-500 font-mono tracking-wider" >
    <span>LOADING MODULES </span>
      < span > { Math.min(100, Math.floor(progress)) } % </span>
      </div>
      < div className = "w-full h-[2px] bg-slate-950 rounded-full overflow-hidden border border-slate-900/40" >
        <motion.div
              className="h-full bg-blue-500"
style = {{ width: `${progress}%` }}
            />
  </div>
  </div>
  </div>
  </div>
  );
}

