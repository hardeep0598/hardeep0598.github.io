import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projectsData } from "../data";
import { Terminal, Cpu, ArrowRight, ExternalLink, GitBranch, ShieldAlert, BadgeCheck, Network } from "lucide-react";

export default function ProjectsSection() {
  const [activeProjId, setActiveProjId] = useState<string>("pdf-thumbnail-preview");

  const activeProj = projectsData.find((p) => p.id === activeProjId) || projectsData[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column - Projects Selector List (4 cols) */}
      <div className="lg:col-span-4 space-y-3">
        {projectsData.map((proj) => {
          const isActive = proj.id === activeProjId;
          return (
            <button
              key={proj.id}
              onClick={() => setActiveProjId(proj.id)}
              className={`w-full text-left p-5 rounded-xl border transition-all cursor-pointer block ${isActive
                  ? "bg-blue-600/10 border-blue-500/40 shadow-md"
                  : "bg-slate-950/25 border-slate-900 hover:border-slate-800"
                }`}
            >
              <div className="space-y-1">
                <span className={`text-[10px] font-mono tracking-wider block uppercase ${isActive ? "text-blue-400" : "text-slate-500"}`}>
                  {proj.category}
                </span>
                <h4 className={`font-display text-sm md:text-base font-semibold ${isActive ? "text-slate-100" : "text-slate-400"}`}>
                  {proj.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-1 font-mono">
                  {proj.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Right Column - Rich Interactive Details Panel (8 cols) */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProj.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-950/40 border border-slate-900 rounded-xl p-6 md:p-8 space-y-6"
          >
            {/* Header */}
            <div className="flex flex-col border-b border-slate-900 pb-5 text-left">
              <div className="space-y-1">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 uppercase tracking-widest inline-block">
                  {activeProj.category}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-slate-100 mt-2">
                  {activeProj.title}
                </h3>
                <p className="text-xs text-blue-400 font-mono italic">{activeProj.subtitle}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed text-left">
              {activeProj.description}
            </p>

            {/* Structured Details: Problem */}
            <div className="space-y-2 bg-slate-950 p-4 rounded-lg border border-slate-900 text-left">
              <div className="flex items-center space-x-2 text-[10px] text-red-400 font-mono font-bold uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>The Challenge</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {activeProj.problem}
              </p>
            </div>

            {/* Interactive Schematic Diagram */}
            <div className="space-y-3 bg-[#03050d] p-5 rounded-lg border border-slate-900 font-mono">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-[10px] text-slate-400 uppercase tracking-wider">
                  <Network className="w-3.5 h-3.5 text-blue-400" />
                  <span>System Architecture Flow</span>
                </div>
                <span className="text-[9px] text-slate-600">ARCH_BLUEPRINT</span>
              </div>

              {/* Expanded, highly legible architecture blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 pb-1 text-[10px] text-slate-300">
                {activeProj.architecture.map((step, sIdx) => {
                  const parts = step.split(":");
                  const title = parts[0]?.trim() || "Stage";
                  const desc = parts[1]?.trim() || "";
                  return (
                    <div key={sIdx} className="flex flex-col bg-slate-950/70 border border-slate-900/60 rounded-lg p-4 text-left hover:border-blue-500/20 transition-all shadow-inner relative">
                      <div className="absolute top-2 right-3 text-slate-700 text-[8px] font-mono">STAGE-0{sIdx + 1}</div>
                      <div className="flex items-center space-x-1.5 mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span className="font-semibold text-slate-200 tracking-tight leading-tight uppercase font-mono text-[10.5px]">{title}</span>
                      </div>
                      <p className="font-sans text-slate-400 text-[10.5px] leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Technologies Used</span>
              <div className="flex flex-wrap gap-2">
                {activeProj.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-mono hover:border-slate-500 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Challenges & Outcome Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 space-y-2">
                <span className="text-[9px] font-mono text-amber-500 uppercase tracking-wider font-semibold block">Key Challenge</span>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{activeProj.challenges}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 space-y-2">
                <div className="flex items-center space-x-1.5 text-[9px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  <span>Quantifiable Outcomes</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{activeProj.outcome}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
