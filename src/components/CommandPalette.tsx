import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Terminal, ArrowRight, BookOpen, Compass, Image, Mail, Cpu, Calendar, Globe } from "lucide-react";

interface CommandPaletteProps {
  onNavigate: (sectionId: string, subtab?: string) => void;
}

interface CommandItem {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  action: () => void;
}

export default function CommandPalette({ onNavigate }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const commands: CommandItem[] = [
    {
      id: "nav-home",
      title: "Navigation: Home",
      description: "Jump to the top introduction and landing page",
      category: "Navigation",
      icon: Globe,
      action: () => { onNavigate("hero"); setIsOpen(false); }
    },
    {
      id: "nav-about",
      title: "Navigation: Story (About Me)",
      description: "Discover Hardeep's background and personal story",
      category: "Navigation",
      icon: BookOpen,
      action: () => { onNavigate("about"); setIsOpen(false); }
    },
    {
      id: "nav-experience",
      title: "Navigation: Career Journey (Experience)",
      description: "Explore engineering milestones at Google, Bloomberg, smallcase",
      category: "Navigation",
      icon: Calendar,
      action: () => { onNavigate("experience"); setIsOpen(false); }
    },
    {
      id: "nav-engineering",
      title: "Navigation: Skills & Competencies",
      description: "Review core capabilities, languages, and skills",
      category: "Navigation",
      icon: Cpu,
      action: () => { onNavigate("about"); setIsOpen(false); }
    },
    {
      id: "nav-projects",
      title: "Navigation: Featured Projects",
      description: "Review custom built file parsers, APIs, and systems",
      category: "Navigation",
      icon: Terminal,
      action: () => { onNavigate("projects"); setIsOpen(false); }
    },
    {
      id: "nav-blog",
      title: "Navigation: Technical Writing (Notes)",
      description: "Read articles on LSM-Trees, PDF rendering, and system design",
      category: "Navigation",
      icon: BookOpen,
      action: () => { onNavigate("blog"); setIsOpen(false); }
    },
    {
      id: "nav-interests-cosmos",
      title: "Interests: Cosmos & Astrophysics Notes",
      description: "Read space, cosmology, and physics notebooks",
      category: "Curiosity Hub",
      icon: Compass,
      action: () => { onNavigate("interests", "cosmos"); setIsOpen(false); }
    },
    {
      id: "nav-interests-art",
      title: "Interests: Creative Art Gallery",
      description: "View hand-sketches, paintings, and astrophotography",
      category: "Curiosity Hub",
      icon: Image,
      action: () => { onNavigate("interests", "art"); setIsOpen(false); }
    },
    {
      id: "nav-interests-books",
      title: "Interests: Reading Journal (Books)",
      description: "Browse reading logs and book reviews",
      category: "Curiosity Hub",
      icon: BookOpen,
      action: () => { onNavigate("interests", "notebook"); setIsOpen(false); }
    },
    {
      id: "nav-contact",
      title: "Navigation: Say Hello (Contact)",
      description: "Send an email directly to Hardeep's inbox",
      category: "Navigation",
      icon: Mail,
      action: () => { onNavigate("contact"); setIsOpen(false); }
    }
  ];

  // Filter commands
  const filtered = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.description.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Keyboard navigation within list
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filtered]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  return (
    <>
      {/* Visual floating button trigger */}
      <button
        onClick={() => setIsOpen(true)}
        id="cmd-palette-trigger"
        className="fixed bottom-6 right-6 z-40 flex items-center space-x-2 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 px-3 py-2 rounded-lg text-xs font-mono shadow-lg transition-all cursor-pointer backdrop-blur-md hidden md:flex"
      >
        <span>COMMAND CONSOLE</span>
        <kbd className="bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 text-[10px] font-sans">⌘K</kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              ref={containerRef}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-[#050816]/95 border border-slate-800/60 rounded-xl w-full max-w-xl shadow-2xl overflow-hidden font-mono"
            >
              {/* Search Bar */}
              <div className="flex items-center space-x-3 px-4 py-3.5 border-b border-slate-900">
                <Search className="w-4 h-4 text-slate-500 shrink-0" />
                <input
                  type="text"
                  placeholder="Type a command or section..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent text-slate-200 text-sm focus:outline-none w-full placeholder-slate-600"
                  autoFocus
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-[10px] text-slate-500 hover:text-slate-300 border border-slate-900 rounded px-1.5 py-0.5"
                >
                  ESC
                </button>
              </div>

              {/* Suggestions List */}
              <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                {filtered.length > 0 ? (
                  filtered.map((cmd, index) => {
                    const IconComp = cmd.icon;
                    const isSelected = index === selectedIndex;
                    return (
                      <div
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all ${
                          isSelected ? "bg-blue-600/10 text-blue-200 border border-blue-500/20" : "text-slate-400 hover:text-slate-300 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center space-x-3 text-xs text-left">
                          <IconComp className={`w-4 h-4 shrink-0 ${isSelected ? "text-blue-400" : "text-slate-500"}`} />
                          <div>
                            <span className={`block font-medium text-[11px] ${isSelected ? "text-slate-100" : "text-slate-300"}`}>
                              {cmd.title}
                            </span>
                            <span className="text-[10px] text-slate-500 block leading-tight mt-0.5">
                              {cmd.description}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {isSelected && <ArrowRight className="w-3.5 h-3.5 text-blue-400 animate-pulse" />}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6 text-xs text-slate-600">
                    No system matches found for &ldquo;{search}&rdquo;
                  </div>
                )}
              </div>

              {/* Palette Footer */}
              <div className="flex justify-between items-center px-4 py-2 bg-slate-950/60 border-t border-slate-900 text-[10px] text-slate-500">
                <span>Use ↑↓ keys to steer, Enter to activate</span>
                <span>SYSTEM DIALOG</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
