import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  FileText,
  BookOpen,
  Sparkles,
  Cpu,
  ChevronRight,
  Command,
  ChevronLeft,
  Terminal,
  Compass,
  Image,
  MapPin,
  Activity,
  Check,
  BookOpenCheck,
  Facebook,
  Instagram,
  Globe,
} from "lucide-react";

// Components
import StarfieldCanvas from "./components/StarfieldCanvas";
import BootScreen from "./components/BootScreen";
import CommandPalette from "./components/CommandPalette";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import CosmosSection from "./components/CosmosSection";
import ArtSection from "./components/ArtSection";
import { ArticleReader } from "./components/ArticleReader";

// Data
import {
  blogPosts,
  milestonesTimeline,
  quotesData,
  personalInterestsData,
  skillsData,
} from "./data";
import { BlogPost } from "./types";

export default function App() {
  const [isBooted, setIsBooted] = useState(false);
  const [activeInterestTab, setActiveInterestTab] = useState<
    "cosmos" | "art" | "notebook"
  >("cosmos");
  const [currentQuoteIdx, setCurrentQuoteIdx] = useState(0);
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [milkTeaCount, setMilkTeaCount] = useState(2);

  // Rotate quotes every 8 seconds
  useEffect(() => {
    if (!isBooted) return;
    const interval = setInterval(() => {
      setCurrentQuoteIdx((prev) => (prev + 1) % quotesData.length);
    }, 8500);
    return () => clearInterval(interval);
  }, [isBooted]);

  // Jump to specific element anchor
  const scrollToSection = (id: string, subtab?: string) => {
    if (subtab) {
      setActiveInterestTab(subtab as any);
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleNextQuote = () => {
    setCurrentQuoteIdx((prev) => (prev + 1) % quotesData.length);
  };

  const handlePrevQuote = () => {
    setCurrentQuoteIdx(
      (prev) => (prev - 1 + quotesData.length) % quotesData.length,
    );
  };

  const currentQuote = quotesData[currentQuoteIdx];

  if (!isBooted) {
    return <BootScreen onComplete={() => setIsBooted(true)} />;
  }

  return (
    <div className="relative min-h-screen text-slate-300 font-sans bg-[#03050c] overflow-x-hidden selection:bg-blue-500/10 selection:text-blue-100">
      {/* Dynamic Starfield Canvas Background */}
      <StarfieldCanvas />

      {/* Floating Header */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 inset-x-0 z-40 bg-[#040612]/75 backdrop-blur-md border-b border-slate-900/40"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo / Identity */}
          <div
            onClick={() => scrollToSection("hero")}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center relative overflow-hidden bg-slate-950">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <div className="absolute inset-0 border border-dashed border-slate-700 rounded-full group-hover:rotate-185 transition-transform duration-1000" />
            </div>
            <div className="text-left">
              <span className="font-display font-bold tracking-tight text-slate-100 text-sm block group-hover:text-blue-400 transition-colors">
                Hardeep Kaur
              </span>
              <span className="font-mono text-[9px] text-slate-500 block uppercase tracking-wider leading-none">
                PORTFOLIO & JOURNAL
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 font-mono text-[11px] text-slate-400">
            <button
              onClick={() => scrollToSection("about")}
              className="px-3.5 py-1.5 hover:text-slate-100 transition-colors cursor-pointer"
            >
              {" "}
              STORY{" "}
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="px-3.5 py-1.5 hover:text-slate-100 transition-colors cursor-pointer"
            >
              {" "}
              EXPERIENCE{" "}
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="px-3.5 py-1.5 hover:text-slate-100 transition-colors cursor-pointer"
            >
              {" "}
              PROJECTS{" "}
            </button>
            <button
              onClick={() => scrollToSection("blog")}
              className="px-3.5 py-1.5 hover:text-slate-100 transition-colors cursor-pointer"
            >
              {" "}
              WRITING{" "}
            </button>
            <button
              onClick={() => scrollToSection("interests")}
              className="px-3.5 py-1.5 hover:text-slate-100 transition-colors cursor-pointer"
            >
              {" "}
              CURIOSITY HUB{" "}
            </button>
            <button
              onClick={() => scrollToSection("timeline")}
              className="px-3.5 py-1.5 hover:text-slate-100 transition-colors cursor-pointer"
            >
              {" "}
              THE JOURNEY{" "}
            </button>
          </nav>

          {/* Right actions (Resume download & Quick command helper) */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => scrollToSection("contact")}
              className="px-4 py-1.5 rounded-full border border-slate-800 hover:border-slate-500 text-[10px] font-mono text-slate-400 hover:text-slate-100 transition-all cursor-pointer bg-slate-950/20"
            >
              SAY HELLO
            </button>
            <span className="text-[10px] font-mono text-slate-600 border border-slate-900 px-1.5 py-0.5 rounded bg-slate-950/40">
              ⌘K
            </span>
          </div>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-slate-900 bg-slate-950/40 text-slate-400"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-16 inset-x-0 bg-[#040612]/95 backdrop-blur-lg border-b border-slate-900 z-30 font-mono text-xs text-left"
          >
            <div className="px-6 py-4 flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("about")}
                className="text-slate-300 py-1 text-left"
              >
                {" "}
                STORY{" "}
              </button>
              <button
                onClick={() => scrollToSection("experience")}
                className="text-slate-300 py-1 text-left"
              >
                {" "}
                EXPERIENCE{" "}
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-slate-300 py-1 text-left"
              >
                {" "}
                PROJECTS{" "}
              </button>
              <button
                onClick={() => scrollToSection("blog")}
                className="text-slate-300 py-1 text-left"
              >
                {" "}
                WRITING{" "}
              </button>
              <button
                onClick={() => scrollToSection("interests")}
                className="text-slate-300 py-1 text-left"
              >
                {" "}
                CURIOSITY HUB{" "}
              </button>
              <button
                onClick={() => scrollToSection("timeline")}
                className="text-slate-300 py-1 text-left"
              >
                {" "}
                THE JOURNEY{" "}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-slate-300 py-1 text-left"
              >
                {" "}
                SAY HELLO{" "}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-12 overflow-hidden"
      >
        {/* Subtle decorative orbits in hero */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full border border-slate-900/60 absolute animate-pulse" />
          <div className="w-[500px] md:w-[850px] h-[500px] md:h-[850px] rounded-full border border-dashed border-slate-900/30 absolute" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column - Beautiful typography and introduction */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full text-[10px] font-mono text-blue-300 uppercase tracking-widest"
            >
              <Activity className="w-3.5 h-3.5 animate-pulse text-blue-400" />
              <span>Currently: Software Engineer @Google Taiwan </span>
            </motion.div>

            {/* Custom Welcome Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-100 leading-[1.1]"
              >
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-amber-300 bg-clip-text text-transparent">
                  Hardeep
                </span>{" "}
                👋
              </motion.h1>

              <div className="space-y-4 text-sm md:text-base text-slate-400 font-sans leading-relaxed pt-2">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25 }}
                  className="font-display text-lg sm:text-xl font-medium tracking-tight text-slate-200 leading-snug"
                >
                  Software engineer.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="text-slate-400 font-medium"
                >
                  Currently in Taiwan.Soon moving to Ireland.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35 }}
                >
                  I build software, read about the universe, and write down
                  things I find interesting.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="text-blue-400 font-mono text-xs uppercase tracking-widest font-semibold pt-1"
                >
                  This website is where those worlds meet.
                </motion.p>
              </div>
            </div>

            {/* Action Call buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-2"
            >
              <button
                onClick={() => scrollToSection("projects")}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-100 text-slate-950 font-medium text-xs tracking-wider uppercase hover:bg-slate-200 transition-all flex items-center justify-center space-x-2 shadow-lg cursor-pointer font-mono"
              >
                <span>View My Work </span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToSection("interests")}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-slate-800 hover:border-slate-600 bg-slate-950/30 text-slate-400 hover:text-slate-100 text-xs tracking-wider uppercase transition-all flex items-center justify-center space-x-2 cursor-pointer font-mono"
              >
                <span>Read My Notes </span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </button>
            </motion.div>
          </div>

          {/* Right Column - Premium Profile Image Card & "Currently" Dashboard Widgets */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full max-w-md mx-auto">
            
            {/* Interactive Photo Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative group w-full aspect-[2/3] max-w-[280px] sm:max-w-[320px] mx-auto mb-4"
            >
              {/* Background offset card border shadow frame */}
              <div className="absolute inset-0 border-2 border-purple-500/80 rounded-2xl translate-x-4 translate-y-4 group-hover:translate-x-2.5 group-hover:translate-y-2.5 transition-transform duration-300 ease-out z-0" />

              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/80 w-full h-full z-10 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
                <img
                  src="public/assets/Hardeep-Kaur.jpg"
                  alt="Hardeep Kaur"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:brightness-105 transition-all duration-500 scale-100 group-hover:scale-105"
                />

                {/* Visual scan line effect overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* "Currently Live Status" Bento Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="bg-slate-950/85 border border-slate-900 rounded-2xl p-5 md:p-6 space-y-4 text-left shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-display font-semibold text-slate-200 uppercase tracking-wider">
                    {" "}
                    Currently{" "}
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                    {" "}
                    Live{" "}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                {/* Living */}
                <div className="flex items-start justify-between gap-4">
                  <span className="text-slate-500 font-mono"> Living </span>
                  <span className="text-slate-200 font-medium text-right">
                    {" "}
                    New Taipei City, Taiwan{" "}
                  </span>
                </div>

                {/* Next Stop */}
                <div className="flex items-start justify-between gap-4">
                  <span className="text-slate-500 font-mono"> Next stop </span>
                  <span className="text-slate-200 font-medium text-right text-blue-400">
                    {" "}
                    Dublin, Ireland{" "}
                  </span>
                </div>

                {/* Working */}
                <div className="flex items-start justify-between gap-4">
                  <span className="text-slate-500 font-mono"> Working </span>
                  <span className="text-slate-200 font-medium text-right">
                    {" "}
                    Google{" "}
                  </span>
                </div>

                {/* Reading */}
                <div className="flex items-start justify-between gap-4">
                  <span className="text-slate-500 font-mono shrink-0">
                    {" "}
                    Reading{" "}
                  </span>
                  <span className="text-slate-200 text-right font-medium">
                    {" "}
                    Astrophysics for People in a Hurry{" "}
                  </span>
                </div>

                {/* Curious about */}
                <div className="flex items-start justify-between gap-4">
                  <span className="text-slate-500 font-mono shrink-0">
                    {" "}
                    Curious about{" "}
                  </span>
                  <span className="text-slate-200 text-right font-medium text-purple-400">
                    {" "}
                    Chaos Theory{" "}
                  </span>
                </div>

                {/* Milk Tea Count Interactive */}
                <div className="flex items-center justify-between border-t border-slate-900/60 pt-3">
                  <div className="flex flex-col">
                    <span className="text-slate-500 font-mono text-[10px]">
                      🧋 Milk Tea Intake{" "}
                    </span>
                    <span className="text-slate-400 text-[9px] italic">
                      {" "}
                      Fueling exploration{" "}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-200 font-bold font-mono text-[11px]">
                      {milkTeaCount} {milkTeaCount === 1 ? "cup" : "cups"}
                    </span>
                    <button
                      onClick={() => setMilkTeaCount((prev) => prev + 1)}
                      className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 text-blue-400 text-[9px] font-mono font-bold uppercase transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      + Sip
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1 text-[9px] text-slate-600 font-mono tracking-widest uppercase">
          <span className="animate-bounce text-blue-400">↓</span>
          <span> Inbound Orbit </span>
        </div>
      </section>

      {/* About Me Section */}
      <section
        id="about"
        className="py-24 border-t border-slate-900/60 max-w-7xl mx-auto px-6 relative"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Bio text (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-blue-400 tracking-widest uppercase block">
                01_BIOGRAPHY{" "}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-100">
                Software engineer. Lifelong learner.
              </h2>
            </div>

            <div className="space-y-4 font-sans text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              <p>
                I'm a Software Engineer at{" "}
                <strong className="text-slate-200 font-semibold">Google</strong>{" "}
                working on the Google Home platform. Soon, I'll be joining the
                Pricing & Analytics team at{" "}
                <strong className="text-slate-200 font-semibold">
                  {" "}
                  Bloomberg Ireland{" "}
                </strong>
                .
              </p>
              <p>
                My professional experience covers Android internals, high -
                performance SDKs, secure authentication backends, and
                distributed systems. I specialize in building reliable, low -
                latency architectures and optimizing performance pipelines.
              </p>
              <p>
                Outside of software engineering, I am endlessly fascinated by
                cosmology, black holes, and general relativity.I spend my free
                time sketching, exploring astrophotography, and reading up on
                deep - space physics.
              </p>
            </div>

            {/* Social chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href="https://github.com/hardeep0598"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-slate-900 bg-slate-950/20 text-[10px] text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-all font-mono"
              >
                <Github className="w-3.5 h-3.5 text-blue-400" />
                <span>GitHub </span>
              </a>
              <a
                href="https://www.linkedin.com/in/hardeepkaur0598/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-slate-900 bg-slate-950/20 text-[10px] text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-all font-mono"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn </span>
              </a>
              <a
                href="https://www.instagram.com/icosmoetic/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-slate-900 bg-slate-950/20 text-[10px] text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-all font-mono"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>Instagram(Personal) </span>
              </a>
              <a
                href="https://www.instagram.com/krhardeep/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-slate-900 bg-slate-950/20 text-[10px] text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-all font-mono"
              >
                <Instagram className="w-3.5 h-3.5 text-purple-400" />
                <span>Instagram(Art Archive) </span>
              </a>
              <a
                href="https://www.quora.com/profile/Hardeep-Kaur-230"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-slate-900 bg-slate-950/20 text-[10px] text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-all font-mono"
              >
                <Globe className="w-3.5 h-3.5 text-red-400" />
                <span>Quora </span>
              </a>
              <a
                href="https://medium.com/@hardeep-kaur"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-slate-900 bg-slate-950/20 text-[10px] text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-all font-mono"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>Medium </span>
              </a>
              <a
                href="https://www.facebook.com/hardeepkaur0598"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-slate-900 bg-slate-950/20 text-[10px] text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-all font-mono"
              >
                <Facebook className="w-3.5 h-3.5 text-blue-500" />
                <span>Facebook </span>
              </a>
              <button
                onClick={() => scrollToSection("contact")}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-slate-900 bg-slate-950/20 text-[10px] text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-all font-mono cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Direct Transmission </span>
              </button>
            </div>
          </div>

          {/* Quick Stats Grid & Skills (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950/20 border border-slate-900/80 rounded-xl p-6 md:p-8 space-y-8 text-left">
            <span className="font-mono text-[10px] text-slate-500 tracking-wider block uppercase">
              {" "}
              SYSTEM CORES(CAPABILITIES){" "}
            </span>

            {/* Micro bento grid of milestones */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-[#050816] border border-slate-900 rounded-lg">
                <span className="font-mono text-[9px] text-slate-500 block">
                  {" "}
                  LANGUAGES{" "}
                </span>
                <span className="font-display font-bold text-slate-200 block text-lg mt-1">
                  {" "}
                  Go / C++{" "}
                </span>
                <span className="text-[9px] text-blue-400 font-mono block mt-1">
                  {" "}
                  Java / Kotlin{" "}
                </span>
              </div>
              <div className="p-4 bg-[#050816] border border-slate-900 rounded-lg">
                <span className="font-mono text-[9px] text-slate-500 block">
                  {" "}
                  SYSTEMS{" "}
                </span>
                <span className="font-display font-bold text-slate-200 block text-lg mt-1">
                  {" "}
                  Distributed{" "}
                </span>
                <span className="text-[9px] text-purple-400 font-mono block mt-1">
                  {" "}
                  Low - Latency API{" "}
                </span>
              </div>
              <div className="p-4 bg-[#050816] border border-slate-900 rounded-lg">
                <span className="font-mono text-[9px] text-slate-500 block">
                  {" "}
                  DATABASES{" "}
                </span>
                <span className="font-display font-bold text-slate-200 block text-lg mt-1">
                  {" "}
                  SQL / NoSQL{" "}
                </span>
                <span className="text-[9px] text-amber-400 font-mono block mt-1">
                  {" "}
                  MongoDB / Redis / Kafka{" "}
                </span>
              </div>
              <div className="p-4 bg-[#050816] border border-slate-900 rounded-lg">
                <span className="font-mono text-[9px] text-slate-500 block">
                  {" "}
                  SYSTEMS DESIGN{" "}
                </span>
                <span className="font-display font-bold text-slate-200 block text-lg mt-1">
                  {" "}
                  gRPC / REST{" "}
                </span>
                <span className="text-[9px] text-emerald-400 font-mono block mt-1">
                  {" "}
                  Protocol Buffers / API{" "}
                </span>
              </div>
            </div>

            {/* Interactive map of technologies */}
            <div className="space-y-4">
              <span className="font-mono text-[10px] text-slate-500 tracking-wider block uppercase">
                {" "}
                ACTIVE TELEMETRY OF SKILLS{" "}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skillsData.slice(0, 6).map((skill) => (
                  <div
                    key={skill.name}
                    className="space-y-1 bg-slate-950/60 p-3 rounded border border-slate-900"
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-slate-300 font-semibold">
                        {" "}
                        {skill.name}{" "}
                      </span>
                      <span className="text-slate-500"> {skill.category} </span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-normal font-sans pt-1">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section
        id="experience"
        className="py-24 border-t border-slate-900/60 max-w-7xl mx-auto px-6 relative"
      >
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-2 text-center">
            <span className="font-mono text-[10px] text-blue-400 tracking-widest uppercase block">
              02_EXPERIENCE{" "}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-100">
              Career Journey
            </h2>
            <p className="max-w-md mx-auto text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
              Engineering reliable distributed platforms and solving complex
              infrastructure bottlenecks at top - tier companies.
            </p>
          </div>

          <ExperienceSection />
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-24 border-t border-slate-900/60 max-w-7xl mx-auto px-6 relative"
      >
        <div className="space-y-12">
          <div className="space-y-2 text-center">
            <span className="font-mono text-[10px] text-blue-400 tracking-widest uppercase block">
              03_PROJECTS{" "}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-100">
              Featured Projects
            </h2>
            <p className="max-w-md mx-auto text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
              Custom engineering systems addressing concurrency pipelines, file
              parsers, and low - latency APIs.
            </p>
          </div>

          <ProjectsSection />
        </div>
      </section>

      {/* Technical Writing (Blog) Section */}
      <section
        id="blog"
        className="py-24 border-t border-slate-900/60 max-w-7xl mx-auto px-6 relative"
      >
        <div className="space-y-12">
          <div className="space-y-2 text-center">
            <span className="font-mono text-[10px] text-blue-400 tracking-widest uppercase block">
              04_TECHNICAL_WRITING{" "}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-100">
              Technical Writing
            </h2>
            <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
              Deep dives into system internals, auth gateways, and some other learnings. Originally published on my {" "}
              <a
                href="https://medium.com/@hardeep-kaur"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors font-medium"
              >
                Medium Profile
              </a>{" "}
              or {" "}
              <a
                href="https://hardeep0598.github.io/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors font-medium"
              >
                Personal Blog
              </a>
              .
            </p>
          </div>

          {/* Blog posts list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-slate-950/20 border border-slate-900 rounded-xl p-6 hover:border-slate-800 hover:bg-slate-900/20 transition-all flex flex-col justify-between text-left"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span>{post.date} </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 uppercase tracking-wider">
                      {" "}
                      {post.category}{" "}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-semibold text-slate-100 tracking-tight leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-900/80 mt-6 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-500"> {post.readTime} </span>
                  <button
                    onClick={() => setReadingPost(post)}
                    className="text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Read Note </span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curiosity Hub Section */}
      <section
        id="interests"
        className="py-24 border-t border-slate-900/60 max-w-7xl mx-auto px-6 relative"
      >
        <div className="space-y-12">
          <div className="space-y-2 text-center">
            <span className="font-mono text-[10px] text-purple-400 tracking-widest uppercase block">
              05_BEYOND_ENGINEERING{" "}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-100">
              Curiosity Hub
            </h2>
            <p className="max-w-md mx-auto text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
              Where physics meets creative arts.Read my research study logs,
              view my gallery sketches, or browse my personal digital notebook.
            </p>
          </div>

          {/* Learning Philosophy Disclaimer */}
          <div className="max-w-2xl mx-auto p-5 bg-purple-950/10 border border-purple-900/25 rounded-xl text-center text-xs text-slate-400 font-sans leading-relaxed">
            <span className="font-mono text-[10px] text-purple-400 tracking-wider uppercase font-bold block mb-1">
              {" "}
              Learning Philosophy{" "}
            </span>
            This hub serves as an interactive catalog for tracking my
            intellectual journey, conceptual visualization, and ongoing learning of
            complex physical phenomena.
          </div>

          {/* Tab Selector */}
          <div className="flex border-b border-slate-900 max-w-lg mx-auto">
            <button
              onClick={() => setActiveInterestTab("cosmos")}
              className={`flex-1 pb-3 text-center text-xs font-mono tracking-widest uppercase transition-all cursor-pointer ${
                activeInterestTab === "cosmos"
                  ? "border-b-2 border-purple-500 text-purple-300 font-semibold"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Cosmos & Physics
            </button>
            <button
              onClick={() => setActiveInterestTab("art")}
              className={`flex-1 pb-3 text-center text-xs font-mono tracking-widest uppercase transition-all cursor-pointer ${
                activeInterestTab === "art"
                  ? "border-b-2 border-purple-500 text-purple-300 font-semibold"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Art Gallery
            </button>
            <button
              onClick={() => setActiveInterestTab("notebook")}
              className={`flex-1 pb-3 text-center text-xs font-mono tracking-widest uppercase transition-all cursor-pointer ${
                activeInterestTab === "notebook"
                  ? "border-b-2 border-purple-500 text-purple-300 font-semibold"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Reading Journal
            </button>
          </div>

          {/* Dynamic Tab Render */}
          <div className="pt-4">
            {activeInterestTab === "cosmos" && <CosmosSection />}
            {activeInterestTab === "art" && <ArtSection />}

            {activeInterestTab === "notebook" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto font-mono text-left">
                {personalInterestsData.notebook.map((book) => (
                  <div
                    key={book.title}
                    className="bg-slate-950/35 border border-slate-900 rounded-xl p-6 flex flex-col justify-between hover:border-slate-800 transition-all"
                  >
                    <div className="space-y-4">
                      {/* Curated mini book cover representation */}
                      <div
                        className={`h-36 rounded-lg bg-gradient-to-br ${book.coverColor} border border-slate-800/80 p-4 flex flex-col justify-between text-[11px]`}
                      >
                        <span className="text-slate-500 text-[9px] uppercase tracking-wider">
                          {" "}
                          BOOK_CATALOG{" "}
                        </span>
                        <div>
                          <h4 className="font-display font-bold text-slate-100 text-sm leading-tight">
                            {" "}
                            {book.title}{" "}
                          </h4>
                          <span className="text-slate-400 text-[10px] mt-0.5 block">
                            {" "}
                            {book.author}{" "}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-500">
                          {" "}
                          READING STATUS:{" "}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded uppercase tracking-wider text-[8px] ${
                            book.status === "completed"
                              ? "bg-emerald-950/40 text-emerald-400 border border-emerald-900/30"
                              : book.status === "reading"
                                ? "bg-blue-950/40 text-blue-400 border border-blue-900/30 animate-pulse"
                                : "bg-slate-900 text-slate-500"
                          }`}
                        >
                          {book.status}
                        </span>
                      </div>

                      {book.review && (
                        <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                          {book.review}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-900/60 mt-4 flex items-center justify-between text-[10px]">
                      <span className="text-slate-600"> SUMMARY ARCHIVE </span>
                      {book.rating && (
                        <div className="flex items-center space-x-1 text-amber-500">
                          {Array.from({ length: book.rating }).map(
                            (_, rIdx) => (
                              <span key={rIdx}>★</span>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section
        id="timeline"
        className="py-24 border-t border-slate-900/60 max-w-7xl mx-auto px-6 relative"
      >
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-2 text-center">
            <span className="font-mono text-[10px] text-blue-400 tracking-widest uppercase block">
              06_JOURNEY_TIMELINE{" "}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-100">
              The Journey Timeline
            </h2>
            <p className="max-w-md mx-auto text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
              Reflections and historical milestones of my professional career,
              learning checkpoints, and astronomy observations.
            </p>
          </div>

          {/* Clean, spacious travel timeline */}
          <div className="relative border-l-2 border-slate-900/40 ml-6 md:ml-32 space-y-16 py-8">
            {milestonesTimeline.map((milestone, idx) => (
              <div key={idx} className="relative pl-10 text-left group">
                {/* Year Label - Aligned left on Desktop, nested above on Mobile */}
                <div className="absolute -left-[14px] md:-left-28 top-0 flex items-center md:justify-end md:w-20">
                  <span className="font-mono text-xs md:text-sm font-bold bg-[#03050c] px-3 py-1 border border-slate-800/80 rounded-full text-blue-400 shadow-sm">
                    {milestone.year}
                  </span>
                </div>

                {/* Content Block */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                    <span className="font-mono text-[9px] text-purple-400 uppercase tracking-widest bg-purple-950/20 border border-purple-900/30 px-2.5 py-0.5 rounded w-max">
                      {milestone.event}
                    </span>
                    <h4 className="font-display text-slate-100 text-sm md:text-base font-bold tracking-tight">
                      {milestone.title}
                    </h4>
                  </div>

                  <p className="font-sans text-xs md:text-sm text-slate-400 leading-relaxed max-w-xl">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quotes & Wisdom Section */}
      <section className="py-24 border-t border-slate-900/60 bg-slate-950/15 relative">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8 font-mono">
          <div className="relative h-44 flex flex-col justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuoteIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <span className="text-[9px] text-amber-400 uppercase tracking-widest block border border-amber-900/30 bg-amber-950/10 px-2.5 py-1 rounded-full w-max mx-auto">
                  {currentQuote.category} Quote
                </span>
                <p className="font-display text-base md:text-xl text-slate-100 font-normal italic leading-relaxed max-w-2xl mx-auto">
                  {currentQuote.text}
                </p>
                <span className="text-slate-500 text-[10px] block font-mono">
                  — {currentQuote.author}{" "}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* quote slider indicators */}
          <div className="flex items-center justify-center space-x-4 pt-4 text-slate-600">
            <button
              onClick={handlePrevQuote}
              className="p-1 rounded bg-slate-950 border border-slate-900 text-slate-500 hover:text-slate-300 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex space-x-1">
              {quotesData.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentQuoteIdx ? "bg-blue-400" : "bg-slate-900"}`}
                />
              ))}
            </div>
            <button
              onClick={handleNextQuote}
              className="p-1 rounded bg-slate-950 border border-slate-900 text-slate-500 hover:text-slate-300 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 border-t border-slate-900/60 max-w-7xl mx-auto px-6 relative"
      >
        <div className="max-w-xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <span className="font-mono text-[10px] text-blue-400 tracking-widest uppercase block">
              07_CONTACT{" "}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-100">
              Say Hello
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
              My inbox is always open.Whether you want to discuss distributed
              systems engineering, astrophysics, books, or potential
              collaborations—feel free to drop a line!
            </p>
          </div>

          {/* Minimal contact action */}
          <div className="bg-slate-950/45 border border-slate-900 rounded-xl p-8 max-w-sm mx-auto">
            <div className="flex items-center justify-center space-x-3 text-sm text-slate-300 font-mono">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>hardeepkaur.hkdev@gmail.com</span>
            </div>

            <div className="mt-5 flex justify-center">
              <a
                href="mailto:hardeepkaur.hkdev@gmail.com"
                className="px-6 py-2.5 rounded-full bg-blue-500 hover:bg-blue-600 text-slate-100 font-medium text-xs uppercase tracking-wider transition-all inline-block cursor-pointer font-mono"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900/60 py-8 bg-[#02040b]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-600 font-mono gap-4">
          <div>
            <span>
              © {new Date().getFullYear()} HARDEEP KAUR • ALL RIGHTS
              RESERVED{" "}
            </span>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-2">
            <a
              href="https://github.com/hardeep0598"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-400 transition-colors"
            >
              {" "}
              GITHUB{" "}
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-400 transition-colors"
            >
              {" "}
              LINKEDIN{" "}
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-400 transition-colors"
            >
              {" "}
              INSTAGRAM(PERSONAL){" "}
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-400 transition-colors"
            >
              {" "}
              INSTAGRAM(ART ARCHIVE){" "}
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-400 transition-colors"
            >
              {" "}
              TWITTER{" "}
            </a>
            <a
              href="https://quora.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-400 transition-colors"
            >
              {" "}
              QUORA{" "}
            </a>
            <button
              onClick={() => scrollToSection("hero")}
              className="hover:text-slate-400 transition-colors cursor-pointer"
            >
              {" "}
              BACK TO TOP{" "}
            </button>
          </div>
        </div>
      </footer>

      {/* Global Command Palette Keyboard Trigger */}
      <CommandPalette onNavigate={scrollToSection} />

      {/* Technical Writing Full-Screen Reading Overlay */}
      <AnimatePresence>
        {readingPost && (
          <ArticleReader
            post={readingPost}
            onClose={() => setReadingPost(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
