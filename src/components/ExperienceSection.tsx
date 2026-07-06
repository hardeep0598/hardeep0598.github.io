import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { experienceData } from "../data";
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Cpu, Award, Zap } from "lucide-react";

export default function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<string | null>("bloomberg"); // Default expand the first one (Bloomberg)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-8">
      <div className="relative border-l border-slate-800 ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
        {experienceData.map((exp, idx) => {
          const isExpanded = expandedId === exp.id;
          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 flex items-center justify-center">
                <div className={`w-3.5 h-3.5 rounded-full border-2 ${
                  isExpanded ? "bg-blue-400 border-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]" : "bg-[#050816] border-slate-700"
                } transition-all duration-300 z-10`} />
              </div>

              {/* Card wrapper */}
              <div 
                className={`group border rounded-xl overflow-hidden transition-all duration-300 ${
                  isExpanded 
                    ? "bg-slate-900/40 border-slate-700/60 shadow-xl" 
                    : "bg-slate-950/20 border-slate-900 hover:border-slate-800"
                }`}
              >
                {/* Header (Trigger) */}
                <div
                  onClick={() => toggleExpand(exp.id)}
                  className="p-6 md:p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-display text-lg md:text-xl font-medium text-slate-100 group-hover:text-blue-400 transition-colors">
                        {exp.company}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-mono font-medium">
                        {exp.location}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400 font-mono">
                      <span className="flex items-center space-x-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                        <span>{exp.role}</span>
                      </span>
                      <span className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-purple-400" />
                        <span>{exp.period}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 border-t border-slate-900/60 md:border-none pt-4 md:pt-0">
                    <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                      {isExpanded ? "Read Less" : "View Highlights"}
                    </span>
                    <div className={`p-1.5 rounded-lg border transition-colors ${
                      isExpanded ? "bg-blue-500/10 border-blue-500/30 text-blue-400" : "bg-slate-900 border-slate-800 text-slate-400 group-hover:text-slate-200"
                    }`}>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8 pt-2 border-t border-slate-900/80 space-y-6 text-xs text-slate-300 leading-relaxed font-sans">
                        {/* Brief Summary */}
                        <p className="text-slate-400 text-sm italic border-l border-blue-500/40 pl-4 py-0.5 font-sans">
                          &ldquo;{exp.summary}&rdquo;
                        </p>

                        {/* Projects Breakdown */}
                        <div className="space-y-6">
                          {exp.projects.map((proj, pIdx) => (
                            <div key={pIdx} className="bg-slate-950/45 rounded-lg border border-slate-900 p-5 md:p-6 space-y-4">
                              <div className="flex items-center space-x-2">
                                <Cpu className="w-4 h-4 text-purple-400" />
                                <span className="font-display font-medium text-slate-200 text-sm">
                                  Project: {proj.name}
                                </span>
                              </div>

                              <p className="text-slate-400">{proj.description}</p>

                              {/* Impact Points */}
                              <div className="space-y-1.5">
                                <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">Impact & Milestones</span>
                                <ul className="space-y-1.5 list-none pl-1">
                                  {proj.impact.map((imp, impIdx) => (
                                    <li key={impIdx} className="flex items-start space-x-2.5 text-slate-300">
                                      <Award className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                                      <span>{imp}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Challenge & Learning Grid */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                <div className="space-y-1 bg-slate-950 p-3.5 rounded border border-slate-900/60">
                                  <span className="text-[9px] font-mono text-red-400 block uppercase tracking-wider font-semibold">Engineering Challenge</span>
                                  <p className="text-slate-400 leading-normal">{proj.challenges}</p>
                                </div>
                                <div className="space-y-1 bg-slate-950 p-3.5 rounded border border-slate-900/60">
                                  <span className="text-[9px] font-mono text-emerald-400 block uppercase tracking-wider font-semibold">Lessons & Architecture Insights</span>
                                  <p className="text-slate-400 leading-normal">{proj.learnings}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Technologies */}
                        <div className="space-y-2 pt-2">
                          <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">Technologies Used</span>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <span 
                                key={tech}
                                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-mono hover:border-slate-600 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
