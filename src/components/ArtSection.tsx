import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { personalInterestsData } from "../data";
import { Image, X, ZoomIn, Calendar, Layers } from "lucide-react";

export default function ArtSection() {
  const [filter, setFilter] = useState<string>("All");
  const [selectedArtId, setSelectedArtId] = useState<string | null>(null);

  const artItems = personalInterestsData.art;
  const categories = ["All", "Digital", "Sketches", "Generative", "Astrophotography"];

  const filteredArt = filter === "All" 
    ? artItems 
    : artItems.filter((art) => art.category === filter);

  const selectedArt = artItems.find((art) => art.id === selectedArtId);

  return (
    <div className="space-y-8 font-mono">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer border ${
              filter === cat
                ? "bg-purple-600/10 border-purple-500/50 text-purple-300"
                : "bg-slate-950/30 border-slate-900 text-slate-500 hover:border-slate-800 hover:text-slate-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Art */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredArt.map((art, idx) => (
            <motion.div
              key={art.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              onClick={() => setSelectedArtId(art.id)}
              className="group relative bg-slate-950/30 border border-slate-900 rounded-xl overflow-hidden cursor-pointer hover:border-slate-800 transition-all"
            >
              {/* Aspect ratio frame */}
              <div className="aspect-square relative w-full overflow-hidden bg-slate-950">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center p-4 space-y-2">
                    <ZoomIn className="w-5 h-5 text-purple-400 mx-auto animate-pulse" />
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">View Exhibition</span>
                  </div>
                </div>
              </div>

              {/* Text labels */}
              <div className="p-4 border-t border-slate-900/60 space-y-1 text-left">
                <span className="text-[9px] text-purple-400 uppercase tracking-wider">{art.category}</span>
                <h4 className="font-display font-semibold text-slate-200 text-xs sm:text-sm truncate">
                  {art.title}
                </h4>
                <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1 border-t border-slate-900/40">
                  <span className="truncate max-w-[70%] font-mono">{art.medium}</span>
                  <span className="font-mono">{art.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedArt && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-[#050816] border border-slate-800 rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl relative grid grid-cols-1 md:grid-cols-12"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArtId(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Column - Large Image */}
              <div className="md:col-span-7 bg-black flex items-center justify-center aspect-square md:aspect-auto md:h-[500px]">
                <img
                  src={selectedArt.imageUrl}
                  alt={selectedArt.title}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Right Column - Exhibition details */}
              <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between text-left space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest px-2 py-0.5 rounded bg-purple-950/20 border border-purple-900/30 inline-block">
                      {selectedArt.category}
                    </span>
                    <h3 className="font-display text-lg md:text-xl font-bold text-slate-100 mt-2">
                      {selectedArt.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans font-normal">
                    {selectedArt.description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-900/80 text-[11px] text-slate-500">
                  <div className="flex items-center space-x-2">
                    <Layers className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    <span>Medium: <strong className="text-slate-300 font-normal">{selectedArt.medium}</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    <span>Year of Creation: <strong className="text-slate-300 font-normal">{selectedArt.year}</strong></span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
