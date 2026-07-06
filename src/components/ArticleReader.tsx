import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Clock,
  BookOpen,
  Shield,
  Layers,
  Terminal,
  AlertTriangle,
  CheckCircle,
  Lock,
  Globe,
  Server,
  Check,
  ArrowRight,
  ArrowDown,
  Activity,
  Settings,
  RefreshCw,
  Key,
  HelpCircle,
  ChevronRight,
  User,
  Cpu,
  Smartphone,
  Network,
  Database,
  Trash,
  Play,
  Pause,
  Volume2,
  TrendingUp,
  Coins
} from "lucide-react";
import { BlogPost } from "../types";

interface ArticleReaderProps {
  post: BlogPost;
  onClose: () => void;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({ post, onClose }) => {
  // --- STATE FOR SCALING OTP GATEWAY SIMULATOR ---
  const [protectionEnabled, setProtectionEnabled] = useState(true);
  const [otpTrafficType, setOtpTrafficType] = useState<"normal" | "attack">("normal");
  const [otpIsSimulating, setOtpIsSimulating] = useState(false);
  const [otpLogs, setOtpLogs] = useState<Array<{ id: number; text: string; status: "success" | "blocked" | "info" }>>([]);
  const [otpBlocked, setOtpBlocked] = useState(0);
  const [otpAllowed, setOtpAllowed] = useState(0);
  const [otpSmsCost, setOtpSmsCost] = useState(0);
  const logIdRef = useRef(0);
  const otpSimIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- STATE FOR SSO Handover STEP ---
  const [ssoStep, setSsoStep] = useState(0);
  const [ssoToken, setSsoToken] = useState("");
  const [ssoMessage, setSsoMessage] = useState("Click 'Initiate SSO Handoff' to simulate a token transition.");

  // --- STATE FOR BITMAP POOL SIMULATOR ---
  const [pdfPage, setPdfPage] = useState(1);
  const [bitmapPooling, setBitmapPooling] = useState(true);
  const [heapMemory, setHeapMemory] = useState(15.2); // MBs
  const [memorySpikes, setMemorySpikes] = useState(0);
  const [bitmapsInPool, setBitmapsInPool] = useState<Array<{ id: string; lastUsedPage: number; color: string }>>([
    { id: "BMP-Alpha", lastUsedPage: 1, color: "bg-teal-500" },
    { id: "BMP-Beta", lastUsedPage: 0, color: "bg-emerald-500" },
    { id: "BMP-Gamma", lastUsedPage: 0, color: "bg-indigo-500" }
  ]);
  const [gcFlashes, setGcFlashes] = useState(false);

  // --- STATE FOR ACCESSIBILITY SCROLLER ---
  const [scrollerPosition, setScrollerPosition] = useState(10);
  const [scrollerMode, setScrollerMode] = useState<"standard" | "debounced">("debounced");
  const [screenReaderSpeech, setScreenReaderSpeech] = useState<string[]>(["FastScroller initialized."]);

  // --- STATE FOR mDNS SUBNET PACKETS ---
  const [mdnsDeduplication, setMdnsDeduplication] = useState(true);
  const [mdnsPortConflict, setMdnsPortConflict] = useState(true);
  const [mdnsServerValidation, setMdnsServerValidation] = useState(true);
  const [mdnsIsSimulating, setMdnsIsSimulating] = useState(false);
  const [mdnsThreads, setMdnsThreads] = useState(12); // normal %
  const [mdnsPacketsParsed, setMdnsPacketsParsed] = useState(0);
  const [mdnsPacketsDropped, setMdnsPacketsDropped] = useState(0);
  const [mdnsStatus, setMdnsStatus] = useState<"idle" | "success" | "crashed">("idle");
  const [mdnsActivePackets, setMdnsActivePackets] = useState<Array<{ id: number; hubId: string; payload: string; isDuplicate: boolean; x: number; y: number }>>([]);
  const mdnsSimIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const mdnsPacketIdRef = useRef(0);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (otpSimIntervalRef.current) clearInterval(otpSimIntervalRef.current);
      if (mdnsSimIntervalRef.current) clearInterval(mdnsSimIntervalRef.current);
    };
  }, []);

  // --- HANDLERS FOR OTP GATEWAY SIMULATOR ---
  const triggerOtpSimulation = () => {
    if (otpIsSimulating) {
      if (otpSimIntervalRef.current) clearInterval(otpSimIntervalRef.current);
      setOtpIsSimulating(false);
      return;
    }

    setOtpIsSimulating(true);
    const addLog = (text: string, status: "success" | "blocked" | "info") => {
      setOtpLogs(prev => [{ id: logIdRef.current++, text, status }, ...prev.slice(0, 8)]);
    };

    addLog(`Initiating gateway simulation with ${otpTrafficType.toUpperCase()} traffic...`, "info");

    otpSimIntervalRef.current = setInterval(() => {
      const isBot = otpTrafficType === "attack" ? Math.random() < 0.85 : Math.random() < 0.15;
      const deviceFingerprint = isBot ? "JA3: 771-ChromeBotSignature" : "JA3: 771-ChromeDesktop112";
      const clientIp = isBot
        ? `198.51.100.${Math.floor(Math.random() * 254 + 1)}`
        : `157.45.23.${Math.floor(Math.random() * 254 + 1)}`;
      const targetPhone = isBot ? `+1 900 555 ${Math.floor(Math.random() * 9000 + 1000)}` : `+91 98765 ${Math.floor(Math.random() * 90000 + 10000)}`;

      if (isBot && protectionEnabled) {
        // Blocked by protection layers
        setOtpBlocked(prev => prev + 1);
        const reason = Math.random() < 0.5 ? "Blocked by JA3 Bot Fingerprint" : "Leaky Bucket IP Limit exceeded";
        addLog(`🚨 BLOCKED: Request to ${targetPhone} from IP ${clientIp}. Reason: ${reason}`, "blocked");
      } else {
        // Allowed request
        setOtpAllowed(prev => prev + 1);
        setOtpSmsCost(prev => prev + 0.02);
        addLog(`✓ ALLOWED: Dispatched OTP SMS code to ${targetPhone} via Carrier gateway`, "success");
      }
    }, 1200);
  };

  const changeOtpTraffic = (type: "normal" | "attack") => {
    setOtpTrafficType(type);
    if (otpIsSimulating) {
      if (otpSimIntervalRef.current) clearInterval(otpSimIntervalRef.current);
      setOtpIsSimulating(false);
      setTimeout(() => triggerOtpSimulation(), 200);
    }
  };

  // --- HANDLERS FOR SSO TRANSITION ---
  const handleSSOStep = () => {
    const steps = [
      {
        message: "Step 1: User requests login. Client App generates state data and hashes temporal signature.",
        token: "No token yet..."
      },
      {
        message: "Step 2: Core server generates a one-time cryptographic verification token with a secure 10s TTL, inserting it instantly into Redis.",
        token: "tok_sso_smallcase_" + Math.random().toString(36).substring(2, 10).toUpperCase()
      },
      {
        message: "Step 3: User transitions to the target broker platform carrying the temporal verification token in the redirect header.",
        token: "tok_sso_smallcase_" + Math.random().toString(36).substring(2, 10).toUpperCase()
      },
      {
        message: "Step 4: Target broker validates token back to Smallcase API. Verification succeeds, token is instantly evicted from Redis cache memory to avoid replaying.",
        token: "[ EXPIRED / EVICTED ]"
      }
    ];

    const nextStep = (ssoStep + 1) % 5;
    setSsoStep(nextStep);
    if (nextStep === 0) {
      setSsoToken("");
      setSsoMessage("Flow reset. Click 'Initiate SSO Handoff' to run the transition again.");
    } else {
      const stepData = steps[nextStep - 1];
      setSsoToken(stepData.token);
      setSsoMessage(stepData.message);
    }
  };

  // --- HANDLERS FOR BITMAP RENDERING SIMULATION ---
  const handlePageChange = (direction: "next" | "prev") => {
    const nextPage = direction === "next" ? Math.min(6, pdfPage + 1) : Math.max(1, pdfPage - 1);
    if (nextPage === pdfPage) return;

    setPdfPage(nextPage);

    if (bitmapPooling) {
      // In pooling mode, reuse one of the 3 bitmaps. Minimal memory impact.
      setBitmapsInPool(prev => {
        const nextPool = [...prev];
        // Sort pool so that the oldest used bitmap gets reused
        nextPool.sort((a, b) => a.lastUsedPage - b.lastUsedPage);
        // Recycle the oldest one for this page
        nextPool[0].lastUsedPage = nextPage;
        return nextPool;
      });
      setHeapMemory(prev => Math.max(14.8, 15.0 + Math.random() * 0.4));
    } else {
      // Direct allocations trigger spikes & GC cycles
      setMemorySpikes(prev => prev + 1);
      setHeapMemory(prev => {
        const withSpike = prev + 8.5;
        // Trigger simulated GC after a short delay
        setTimeout(() => {
          setGcFlashes(true);
          setTimeout(() => {
            setGcFlashes(false);
            setHeapMemory(15.2);
          }, 600);
        }, 800);
        return withSpike;
      });
    }
  };

  // --- HANDLERS FOR ACCESSIBILITY FAST SCROLLER ---
  const handleScrollerDrag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setScrollerPosition(val);

    if (scrollerMode === "debounced") {
      // Only speak at clean intervals (every 10 pages)
      const pageAnnounced = Math.floor(val * 5);
      if (pageAnnounced % 50 === 0 || pageAnnounced === 500) {
        setScreenReaderSpeech(prev => [
          `📢 Speech [Debounced]: "Page ${pageAnnounced} of 500. Local section: ${pageAnnounced < 150 ? "Intro" : pageAnnounced < 350 ? "Core Specs" : "Appendix"}"`,
          ...prev.slice(0, 4)
        ]);
      }
    } else {
      // Continuous speech storm! UI thread stutter simulation
      const pageAnnounced = Math.floor(val * 5);
      setScreenReaderSpeech(prev => [
        `🚨 Speech [RAW]: "Page ${pageAnnounced}..."`,
        `🚨 Speech [RAW]: "Page ${Math.max(0, pageAnnounced - 1)}..."`,
        `🚨 Speech [RAW]: "Page ${Math.max(0, pageAnnounced - 2)}..."`,
        ...prev.slice(0, 4)
      ]);
    }
  };

  // --- HANDLERS FOR mDNS SIMULATOR ---
  const toggleMdnsSimulation = () => {
    if (mdnsIsSimulating) {
      if (mdnsSimIntervalRef.current) clearInterval(mdnsSimIntervalRef.current);
      setMdnsIsSimulating(false);
      setMdnsActivePackets([]);
      setMdnsStatus("idle");
      return;
    }

    setMdnsIsSimulating(true);
    setMdnsStatus("idle");
    setMdnsThreads(15);
    setMdnsPacketsParsed(0);
    setMdnsPacketsDropped(0);

    mdnsSimIntervalRef.current = setInterval(() => {
      // Generate packets from 3 smart hub targets
      const hubList = ["HUB-Setup-A", "HUB-Setup-B", "HUB-Setup-C"];
      // Randomly pick a hub. If no port collision stabilization, they all broadcast same port 8080,
      // otherwise they have separate ports 8081, 8082...
      const chosenHub = hubList[Math.floor(Math.random() * 3)];
      const port = mdnsPortConflict ? (chosenHub === "HUB-Setup-A" ? "8080" : chosenHub === "HUB-Setup-B" ? "8081" : "8082") : "8080";

      const newPacket = {
        id: mdnsPacketIdRef.current++,
        hubId: chosenHub,
        payload: `mDNS _http._tcp.local. HUB_ID:${chosenHub} PORT:${port}`,
        isDuplicate: Math.random() < 0.6, // duplicate broadcast
        x: Math.random() * 30 + 10, // flight offset
        y: Math.random() * 80 + 10
      };

      setMdnsActivePackets(prev => [...prev, newPacket]);

      // Animate packet flight and processing
      setTimeout(() => {
        setMdnsActivePackets(prev => prev.filter(p => p.id !== newPacket.id));

        if (newPacket.isDuplicate && mdnsDeduplication) {
          // Cleanly drop packet before processing
          setMdnsPacketsDropped(prev => prev + 1);
        } else {
          setMdnsPacketsParsed(prev => {
            const nextCount = prev + 1;
            // Check for crash condition when deduplication is off
            if (!mdnsDeduplication && nextCount > 15) {
              setMdnsStatus("crashed");
              setMdnsThreads(100);
              if (mdnsSimIntervalRef.current) clearInterval(mdnsSimIntervalRef.current);
            }
            return nextCount;
          });

          setMdnsThreads(prev => {
            if (!mdnsDeduplication) {
              const nextThreads = Math.min(100, prev + 8);
              return nextThreads;
            }
            return Math.min(45, prev + Math.random() * 2);
          });
        }
      }, 1000);

      // Successfully complete setup after 18 clean packets if not crashed
      setMdnsPacketsParsed(current => {
        if (current >= 18 && !mdnsDeduplication) {
          // Fallback, already crashed
        } else if (current >= 18 && mdnsStatus === "idle") {
          setMdnsStatus("success");
          setMdnsThreads(12);
          if (mdnsSimIntervalRef.current) clearInterval(mdnsSimIntervalRef.current);
        }
        return current;
      });

    }, 350);
  };

  // --- CORE RENDER SWITCH ---
  const renderCustomContent = () => {
    switch (post.id) {
      case "scaling-otp-gateway":
        return (
          <div className= "space-y-8 font-sans max-w-3xl mx-auto text-slate-300" >
          {/* Introduction */ }
          < div className = "space-y-4" >
            <h3 className="text-xl font-display font-semibold text-slate-100 tracking-tight" > Introduction </h3>
              < p className = "leading-relaxed text-slate-300" >
                When scaling consumer platforms or fintech apps, user authentication is the single most critical gateway.If login drops, your entire business is effectively down.
              </p>
                  < p className = "leading-relaxed text-slate-300" >
                    During my tenure at Smallcase, we designed and deployed a custom, secure OTP(One - Time Password) service from scratch to handle over 500,000 monthly authentication requests across SMS, email, and SSO.To ensure high availability and protect our infrastructure from financial and security risks, we focused on two major engineering milestones:
        </p>
          </div>

          < hr className = "border-slate-900 my-8" />

            {/* SECTION 1: Distributed SMS Pump Attacks */ }
            < div className = "space-y-6" >
              <h3 className="text-xl font-display font-semibold text-slate-100 tracking-tight flex items-center gap-2" >
                <span className="p-1.5 rounded bg-blue-500/10 text-blue-400" > <Shield className="w-5 h-5" /> </span>
        1. Defending Against Distributed SMS Pump Attacks
          </h3>
          < p className = "leading-relaxed text-slate-300" >
            SMS pump fraud occurs when automated botnets trigger massive spikes of OTP requests to high - cost premium carrier destinations, running up thousands of dollars in toll charges.
              </p>
              < p className = "leading-relaxed text-slate-300" >
                To mitigate this abuse by over 90 % and save $15,000 USD in infrastructure overhead, we implemented a layered defense strategy at both the network edge and the application tier:
        </p>

          < div className = "grid grid-cols-1 md:grid-cols-3 gap-4 my-4" >
            <div className="bg-[#030612] border border-blue-900/20 p-4 rounded-xl space-y-2" >
              <span className="text-xs font-mono text-blue-400 font-bold block uppercase" > JA3 Fingerprinting </span>
                < p className = "text-[11px] text-slate-400 leading-relaxed" >
                  We analyzed incoming TLS handshakes to identify the cryptographic signatures of automated bots, dropping requests that attempted to bypass standard browser headers.
                  </p>
                    </div>
                    < div className = "bg-[#030612] border border-blue-900/20 p-4 rounded-xl space-y-2" >
                      <span className="text-xs font-mono text-blue-400 font-bold block uppercase" > IP Reputation & Geo - Fencing </span>
                        < p className = "text-[11px] text-slate-400 leading-relaxed" >
                          We integrated AWS WAF and CloudFront rules to monitor incoming traffic trends and throttle suspicious request frequencies dynamically based on risk profiles.
                  </p>
                            </div>
                            < div className = "bg-[#030612] border border-blue-900/20 p-4 rounded-xl space-y-2" >
                              <span className="text-xs font-mono text-blue-400 font-bold block uppercase" > Leaky Bucket Throttling </span>
                                < p className = "text-[11px] text-slate-400 leading-relaxed" >
                                  We designed custom rate - limiting queues in Redis.These throttles were mapped not just to individual user accounts, but directly to device signatures and destination phone subnets to catch distributed attacks.
                  </p>
                                    </div>
                                    </div>

        {/* INTERACTIVE COMPONENT: SMS PUMP SIMULATOR */ }
        <div className="bg-[#02040a] border border-slate-900 rounded-xl p-5 md:p-6 my-6 relative overflow-hidden" >
          <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider mb-4 text-center" >
            Live Interactive Sandbox: SMS Pump & Rate Limiting Pipeline
              </span>

              < div className = "grid grid-cols-1 lg:grid-cols-12 gap-6" >
                {/* Controls (5 cols) */ }
                < div className = "lg:col-span-5 space-y-4" >
                  <div className="p-3.5 bg-slate-950/80 border border-slate-900 rounded-lg space-y-3 text-xs" >
                    <span className="font-mono text-slate-400 block font-bold" > SIMULATION SETTINGS </span>

                      < div className = "flex items-center justify-between" >
                        <span className="text-slate-400" > Layer Security Filters: </span>
                          < button
        onClick = {() => setProtectionEnabled(!protectionEnabled)}
className = {`px-3 py-1 rounded text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer ${protectionEnabled
    ? "bg-blue-950 text-blue-400 border border-blue-900/40"
    : "bg-red-950/60 text-red-400 border border-red-900/30"
  }`}
                        >
  { protectionEnabled? "ACTIVE (ON)": "DISABLED (OFF)" }
  </button>
  </div>

  < div className = "space-y-1" >
    <span className="text-slate-500 text-[10px] block" > TRAFFIC PATTERN: </span>
      < div className = "grid grid-cols-2 gap-2" >
        <button
                            onClick={ () => changeOtpTraffic("normal") }
className = {`py-1 rounded text-[10px] font-mono uppercase cursor-pointer ${otpTrafficType === "normal"
    ? "bg-slate-900 text-slate-100 font-bold border border-slate-700"
    : "bg-slate-950 text-slate-500 border border-transparent hover:text-slate-300"
  }`}
                          >
  Normal Users
    </button>
    < button
onClick = {() => changeOtpTraffic("attack")}
className = {`py-1 rounded text-[10px] font-mono uppercase cursor-pointer ${otpTrafficType === "attack"
    ? "bg-red-950/40 text-red-400 font-bold border border-red-900/40"
    : "bg-slate-950 text-slate-500 border border-transparent hover:text-slate-300"
  }`}
                          >
  Botnet Burst
    </button>
    </div>
    </div>

    < button
onClick = { triggerOtpSimulation }
className = {`w-full py-2 rounded font-mono text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${otpIsSimulating
    ? "bg-amber-950/60 text-amber-400 border border-amber-900/40"
    : "bg-blue-600 text-white hover:bg-blue-500"
  }`}
                      >
  { otpIsSimulating?<Pause className = "w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
{ otpIsSimulating ? "Pause Simulator" : "Activate Traffic Stream" }
</button>
  </div>

{/* Stats */ }
<div className="grid grid-cols-3 gap-2 text-center" >
  <div className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-900" >
    <span className="text-[9px] text-slate-500 block uppercase font-mono" > Allowed </span>
      < span className = "text-sm font-mono font-bold text-emerald-400" > { otpAllowed } </span>
        </div>
        < div className = "bg-slate-950/50 p-2.5 rounded-lg border border-slate-900" >
          <span className="text-[9px] text-slate-500 block uppercase font-mono" > Blocked </span>
            < span className = "text-sm font-mono font-bold text-red-400" > { otpBlocked } </span>
              </div>
              < div className = "bg-slate-950/50 p-2.5 rounded-lg border border-slate-900" >
                <span className="text-[9px] text-slate-500 block uppercase font-mono" > Carrier Cost </span>
                  < span className = "text-sm font-mono font-bold text-amber-500" > ${ otpSmsCost.toFixed(2) } </span>
                    </div>
                    </div>
                    </div>

{/* Monitor Console (7 cols) */ }
<div className="lg:col-span-7 flex flex-col h-48 bg-slate-950 border border-slate-900 rounded-lg p-3 text-left font-mono" >
  <span className="text-[9px] text-slate-500 uppercase border-b border-slate-900 pb-1.5 mb-2 block font-bold flex items-center gap-1.5" >
    <Activity className="w-3 h-3 text-blue-400 animate-pulse" />
      Live Gateway Transaction Log
        </span>
        < div className = "flex-1 overflow-y-auto space-y-1.5 text-[10px] scrollbar-thin" >
          {
            otpLogs.length === 0 ? (
              <div className= "h-full flex items-center justify-center text-slate-600 text-[11px] italic" >
              Click 'Activate Traffic Stream' to stream requests
              </ div >
                      ) : (
  <AnimatePresence initial= { false} >
  {
    otpLogs.map(log => (
      <motion.div
                              key= { log.id }
                              initial = {{ opacity: 0, x: -10 }}
animate = {{ opacity: 1, x: 0 }}
className = {`leading-normal border-l-2 pl-2 py-0.5 ${log.status === "blocked"
    ? "border-red-500 text-red-400 bg-red-950/5"
    : log.status === "success"
      ? "border-emerald-500 text-emerald-400 bg-emerald-950/5"
      : "border-blue-500 text-blue-400 bg-blue-950/5"
  }`}
                            >
  { log.text }
  </motion.div>
                          ))}
</AnimatePresence>
                      )}
</div>
  </div>
  </div>
  </div>
  </div>

  < hr className = "border-slate-900 my-8" />

    {/* SECTION 2: Safeguarding Session Transitions */ }
    < div className = "space-y-6" >
      <h3 className="text-xl font-display font-semibold text-slate-100 tracking-tight flex items-center gap-2" >
        <span className="p-1.5 rounded bg-blue-500/10 text-blue-400" > <Lock className="w-5 h-5" /> </span>
2. Safeguarding Session Transitions
  </h3>
  < p className = "leading-relaxed text-slate-300" >
    Single Sign - On(SSO) transitions and token handshakes must happen atomically.If a session handover fails mid - stream, it creates a terrible user experience; if it is intercepted, it compromises account security.
              </p>
      < p className = "leading-relaxed text-slate-300" >
        To ensure seamless, highly secure session handovers:
</p>
  < ul className = "space-y-2.5 pl-5 list-disc text-slate-300" >
    <li>
    <strong className="text-slate-100" > Transient Token Cache </strong>: We leveraged a high-performance Redis cache to store and manage transient verification tokens.
      </li>
      < li >
      <strong className="text-slate-100" > Strict TTL Expirations </strong>: Every token was bound to a strict, short-lived Time-To-Live (TTL) expiration window (e.g. 10 seconds). Once used or expired, the token was instantly evicted from memory.
        </li>
        </ul>

{/* INTERACTIVE TIMELINE COMPONENT FOR SSO HANDOFF */ }
<div className="bg-[#030612] border border-slate-900 rounded-xl p-6 my-6 text-center" >
  <span className="text-[10px] font-mono text-slate-500 block mb-5 uppercase tracking-wider" >
    Interactive Node Step - Through: Secure SSO Transition Pipeline
      </span>

      < div className = "flex flex-col md:flex-row items-center justify-around gap-4 mb-6 relative" >
        {/* Step Nodes */ }
        < div className = {`p-3 rounded-lg border text-left space-y-1 flex-1 w-full max-w-xs transition-all ${ssoStep === 1 ? "border-blue-500 bg-blue-950/20 shadow-lg shadow-blue-950/10" : "border-slate-900 bg-slate-950/40"
          }`}>
            <span className="text-[9px] font-mono text-slate-500 block" > NODE A </span>
              < span className = "font-bold text-slate-200 block text-xs" > Client Application </span>
                < span className = "text-[10px] text-slate-500 block leading-tight" > Requests token with credentials </span>
                </div>

                < ArrowRight className = "w-4 h-4 text-slate-700 hidden md:block shrink-0" />
                  <ArrowDown className="w-4 h-4 text-slate-700 md:hidden shrink-0" />

                    <div className={
                      `p-3 rounded-lg border text-left space-y-1 flex-1 w-full max-w-xs transition-all ${ssoStep === 2 ? "border-blue-500 bg-blue-950/20 shadow-lg shadow-blue-950/10" : "border-slate-900 bg-slate-950/40"
                      }`
}>
  <span className="text-[9px] font-mono text-slate-500 block" > NODE B </span>
    < span className = "font-bold text-slate-200 block text-xs" > Redis Session Cache </span>
      < span className = "text-[10px] text-slate-500 block leading-tight" > Stores Token(10s TTL expiration) </span>
        </div>

        < ArrowRight className = "w-4 h-4 text-slate-700 hidden md:block shrink-0" />
          <ArrowDown className="w-4 h-4 text-slate-700 md:hidden shrink-0" />

            <div className={
              `p-3 rounded-lg border text-left space-y-1 flex-1 w-full max-w-xs transition-all ${ssoStep === 3 || ssoStep === 4 ? "border-blue-500 bg-blue-950/20 shadow-lg shadow-blue-950/10" : "border-slate-900 bg-slate-950/40"
              }`
}>
  <span className="text-[9px] font-mono text-slate-500 block" > NODE C </span>
    < span className = "font-bold text-slate-200 block text-xs" > Target Integration Broker </span>
      < span className = "text-[10px] text-slate-500 block leading-tight" > Verifies and immediately consumes token </span>
        </div>
        </div>

        < div className = "bg-slate-950 border border-slate-900 rounded-lg p-4 max-w-xl mx-auto space-y-3" >
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 border-b border-slate-900 pb-2" >
            <span>SSO TRANSITION MONITOR </span>
              < span className = "bg-blue-950 text-blue-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider" >
                { ssoStep === 4 ? "COMPLETE (SECURE)" : ssoStep > 0 ? `Stage ${ssoStep}/4` : "IDLE"}
</span>
  </div>

  < p className = "text-xs text-slate-300 font-sans leading-relaxed text-left" >
    { ssoMessage }
    </p>

    < div className = "flex items-center gap-3 bg-[#020409] px-3 py-2 rounded border border-slate-900 font-mono text-xs text-left" >
      <span className="text-slate-500 text-[10px]" > VERIFICATION_TOKEN: </span>
        < span className = {`font-bold shrink-0 ${ssoStep === 4 ? "text-red-500" : ssoStep > 0 ? "text-emerald-400" : "text-slate-600"}`}>
          { ssoToken || "[ Awaiting handoff... ]"}
</span>
  </div>

  < button
onClick = { handleSSOStep }
className = "mt-2 px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase transition-colors cursor-pointer"
  >
  { ssoStep === 0 ? "Initiate SSO Handoff" : ssoStep === 4 ? "Reset Simulation" : "Proceed to Next Step"}
</button>
  </div>
  </div>

  < div className = "bg-gradient-to-r from-blue-950/10 to-slate-950 border border-blue-900/30 p-5 rounded-lg space-y-2" >
    <p className="text-sm font-semibold text-slate-100 flex items-center gap-1.5 font-display uppercase tracking-wide" >
      <CheckCircle className="w-5 h-5 text-blue-400" />
        The Engineering Win
          </p>
          < p className = "text-xs text-slate-400 leading-relaxed font-sans" >
            By recycling and rate - limiting memory block allocations, caching transient handovers with strict short - lived TTLs, and filtering traffic at both the CloudFront edge and core, we saved over $15,000 USD in billing while keeping our gateway operating at a locked 99.99 % operational uptime.
                </p>
              </div>
              </div>
              </div>
        );

      case "android-pdf-rendering":
return (
  <div className= "space-y-8 font-sans max-w-3xl mx-auto text-slate-300" >
  {/* Introduction */ }
  < div className = "space-y-4" >
    <h3 className="text-xl font-display font-semibold text-slate-100 tracking-tight" > Introduction </h3>
      < p className = "leading-relaxed text-slate-300" >
        Most developers assume that displaying a PDF on a mobile device is as simple as launching a system intent.However, if you are building a native, interactive document viewer, you quickly run into severe hardware constraints.
              </p>
          < p className = "leading-relaxed text-slate-300" >
            In large, vector - rich PDFs(especially those exceeding 100 pages), swift zooming and panning can instantly trigger massive memory allocation spikes.On Android, this leads to aggressive Garbage Collection(GC) pauses and stuttering frame rates.
              </p>
              < p className = "leading-relaxed text-slate-300" >
                To solve this, we re - engineered the rendering pipeline, achieving a locked 60 FPS scroll and a 35 % reduction in peak memory usage through two primary optimizations:
</p>
  </div>

  < hr className = "border-slate-900 my-8" />

    {/* SECTION 1: Eliminating Runtime Allocations with Bitmap Pooling */ }
    < div className = "space-y-6" >
      <h3 className="text-xl font-display font-semibold text-slate-100 tracking-tight flex items-center gap-2" >
        <span className="p-1.5 rounded bg-emerald-500/10 text-emerald-400" > <Cpu className="w-5 h-5" /> </span>
1. Eliminating Runtime Allocations with Bitmap Pooling
  </h3>
  < p className = "leading-relaxed text-slate-300" >
    Allocating a brand - new, high - resolution bitmap every time a user pinches, zooms, or pans is a performance killer.Bitmaps are incredibly heavy objects; constantly creating and destroying them forces the JVM to run stop - the - world garbage collection cycles.
              </p>
      < p className = "leading-relaxed text-slate-300" >
        To bypass this overhead, we implemented a Bitmap Pool pattern:
</p>
  < ul className = "space-y-2.5 pl-5 list-disc text-slate-300" >
    <li>
    <strong className="text-slate-100" > The Recycle Loop </strong>: When a PDF page scrolls out of the active viewport, its underlying bitmap is not released for garbage collection. Instead, it is retained and marked as "recyclable" within an in-memory pool.
      </li>
      < li >
      <strong className="text-slate-100" > In - Place Re - rendering </strong>: When a new page enters the screen, the rendering engine avoids a fresh memory allocation. Instead, it pulls a bitmap of matching dimensions from the pool and re-renders the new vector content directly onto the existing memory canvas.
        </li>
        </ul>

{/* INTERACTIVE COMPONENT: BITMAP POOL MEMORY SIMULATOR */ }
<div className="bg-[#02040a] border border-slate-900 rounded-xl p-5 md:p-6 my-6 text-center" >
  <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider mb-5" >
    Interactive Simulator: Bitmap Pool vs Traditional Allocator
      </span>

      < div className = "grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch" >
        {/* Controls & Metrics (5 cols) */ }
        < div className = "md:col-span-5 flex flex-col justify-between space-y-4" >
          <div className="bg-slate-950/80 border border-slate-900 p-3.5 rounded-lg text-left text-xs space-y-3" >
            <span className="font-mono text-slate-400 block font-bold" > RECYCLER CONFIG </span>

              < div className = "flex items-center justify-between" >
                <span className="text-slate-400" > Bitmap Pooling: </span>
                  < button
onClick = {() => setBitmapPooling(!bitmapPooling)}
className = {`px-3 py-1 rounded text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer ${bitmapPooling
    ? "bg-emerald-950 text-emerald-400 border border-emerald-900/40"
    : "bg-red-950/60 text-red-400 border border-red-900/30"
  }`}
                        >
  { bitmapPooling? "ENABLED": "DISABLED" }
  </button>
  </div>

  < div className = "space-y-1" >
    <span className="text-slate-500 text-[9px] block" > FLIP DOCUMENT PAGE: </span>
      < div className = "grid grid-cols-2 gap-2" >
        <button
                            onClick={ () => handlePageChange("prev") }
disabled = { pdfPage === 1}
className = "py-1 rounded text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100 disabled:opacity-30 cursor-pointer"
  >
                            ← Prev Page
  </button>
  < button
onClick = {() => handlePageChange("next")}
disabled = { pdfPage === 6}
className = "py-1 rounded text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100 disabled:opacity-30 cursor-pointer"
  >
  Next Page →
</button>
  </div>
  </div>
  </div>

{/* Live Memory Gauge */ }
<div className="bg-slate-950/50 border border-slate-900 rounded-lg p-3 text-left space-y-2 relative overflow-hidden" >
  { gcFlashes && (
    <div className="absolute inset-0 bg-red-950/25 flex items-center justify-center animate-pulse" >
      <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest animate-bounce" >
                            ⚠️ JVM GARBAGE COLLECTION RUNNING(LAG)
  </span>
  </div>
                      )}

<div className="flex justify-between items-center text-[10px] font-mono text-slate-500" >
  <span>HEAP ALLOCATOR METRIC </span>
    < span className = "font-bold text-slate-300" > { heapMemory.toFixed(1) } MB </span>
      </div>

{/* Bar Gauge */ }
<div className="w-full h-3.5 bg-slate-950 border border-slate-900 rounded-full overflow-hidden relative" >
  <div 
                          className={ `h-full transition-all duration-300 ${bitmapPooling ? "bg-emerald-500" : "bg-red-500 animate-pulse"}` }
style = {{ width: `${Math.min(100, (heapMemory / 40) * 100)}%` }}
                        />
  </div>

  < div className = "flex justify-between text-[9px] font-mono text-slate-500" >
    <span>GC Allocation Spikes: </span>
      < span className = {`font-bold ${memorySpikes > 0 ? "text-red-400" : "text-emerald-400"}`}>
        { memorySpikes } spikes
          </span>
          </div>
          </div>
          </div>

{/* Visual Render Canvas (7 cols) */ }
<div className="md:col-span-7 bg-slate-950 border border-slate-900 rounded-lg p-4 flex flex-col justify-between text-left relative overflow-hidden" >
  <div className="absolute top-2 right-3 text-[9px] font-mono text-slate-500 uppercase tracking-wide" >
    Active Rendering Canvas
      </div>

{/* Book Viewport Mockup */ }
<div className="flex-1 flex items-center justify-center py-6" >
  <div className="relative w-44 h-56 bg-slate-900 rounded-md border border-slate-800 flex flex-col justify-between p-3 shadow-xl" >
    <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 border-b border-slate-800 pb-1" >
      <span>DOCUMENT VIEW </span>
        < span > PAGE { pdfPage } /6</span >
          </div>

{/* Render lines */ }
<div className="flex-1 flex flex-col justify-center space-y-2 mt-2" >
  <div className="h-2 w-11/12 bg-slate-800 rounded animate-pulse" />
    <div className="h-2 w-full bg-slate-800 rounded animate-pulse" />
      <div className="h-2 w-10/12 bg-slate-800 rounded animate-pulse" />
        <div className="h-2 w-8/12 bg-slate-800 rounded animate-pulse" />
          </div>

{/* Vector overlay stamp */ }
<div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-emerald-950/40 border border-emerald-900/30 text-[8px] font-mono text-emerald-400" >
  { bitmapPooling? "Recycled Mem: Match Found": "Fresh Allocate: Heap Write" }
  </div>
  </div>
  </div>

{/* Pool representation */ }
<div className="pt-2 border-t border-slate-900/60 mt-2" >
  <span className="text-[9px] font-mono text-slate-500 block uppercase mb-1.5" > In - Memory Bitmap Pool: </span>
    < div className = "flex gap-2 text-[9px] font-mono" >
    {
      bitmapsInPool.map((bmp) => (
        <div 
                            key= { bmp.id } 
                            className = {`px-2 py-1 rounded flex items-center gap-1 border border-slate-800 ${bmp.lastUsedPage === pdfPage ? "bg-emerald-950/30 text-emerald-400 border-emerald-800/40" : "bg-slate-900/50 text-slate-400"
          }`}
      >
      <span className={ `w-1.5 h-1.5 rounded-full ${bmp.color}` } />
        < span > { bmp.id } </span>
{ bmp.lastUsedPage > 0 && <span className="text-slate-500 text-[8px]" > Page { bmp.lastUsedPage } </span> }
</div>
                        ))}
</div>
  </div>
  </div>
  </div>
  </div>

  < p className = "text-sm text-slate-300 leading-relaxed font-sans" >
    By recycling memory block allocations rather than constant garbage collector churn, we completely eliminated runtime heap allocation spikes and locked the scrolling performance at a smooth, stutter - free 60 FPS.
              </p>
      </div>

      < hr className = "border-slate-900 my-8" />

        {/* SECTION 2: Smarter FastScroller Accessibility */ }
        < div className = "space-y-6" >
          <h3 className="text-xl font-display font-semibold text-slate-100 tracking-tight flex items-center gap-2" >
            <span className="p-1.5 rounded bg-emerald-500/10 text-emerald-400" > <Smartphone className="w-5 h-5" /> </span>
2. Accessible Architecture: Smarter FastScroller Navigation
  </h3>
  < p className = "leading-relaxed text-slate-300" >
    System software should never sacrifice accessibility for raw performance.A major goal of this overhaul was ensuring that heavy document navigation remained smooth and intuitive for all users, including those relying on screen readers.
              </p>
      < p className = "leading-relaxed text-slate-300" >
        We refactored the FastScroller component to deeply integrate with Android's accessibility framework:
          </p>

          < div className = "grid grid-cols-1 md:grid-cols-2 gap-4" >
            <div className="bg-[#030612] border border-slate-900 p-4 rounded-xl space-y-1.5" >
              <span className="text-xs font-mono text-emerald-400 font-bold block uppercase" > Real - Time Spoken Feedback </span>
                < p className = "text-[11px] text-slate-400 leading-relaxed" >
                  As a user drags the fast - scroll thumb through a 500 - page document, the system dynamically intercepts the touch event loop and announces precise, localized page markers in real time.
                  </p>
                    </div>
                    < div className = "bg-[#030612] border border-slate-900 p-4 rounded-xl space-y-1.5" >
                      <span className="text-xs font-mono text-emerald-400 font-bold block uppercase" > Deterministic Focus </span>
                        < p className = "text-[11px] text-slate-400 leading-relaxed" >
                          Instead of overwhelming screen readers with continuous layout updates during rapid scrolling, the system intelligently debounces announcements.This provides clear, high - fidelity audio feedback without lagging the UI thread.
                  </p>
                            </div>
                            </div>

{/* INTERACTIVE ACCESSIBILITY SCROLLER */ }
<div className="bg-[#02040a] border border-slate-900 rounded-xl p-5 md:p-6 my-6" >
  <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider mb-5 text-center" >
    Accessibility Sandbox: FastScroller Announcement Debouncer
      </span>

      < div className = "grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch" >
        {/* Left slider column (5 cols) */ }
        < div className = "md:col-span-5 flex flex-col justify-between space-y-4" >
          <div className="bg-slate-950/80 border border-slate-900 p-3.5 rounded-lg text-left text-xs space-y-3" >
            <span className="font-mono text-slate-400 block font-bold" > SCROLLER CONFIG </span>

              < div className = "flex items-center justify-between" >
                <span className="text-slate-400" > Speech Throttling: </span>
                  < div className = "flex bg-slate-950 border border-slate-800 rounded p-0.5" >
                    <button
                            onClick={ () => setScrollerMode("standard") }
className = {`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase transition-colors cursor-pointer ${scrollerMode === "standard" ? "bg-red-950 text-red-400" : "text-slate-500 hover:text-slate-300"
  }`}
                          >
  Raw
  </button>
  < button
onClick = {() => setScrollerMode("debounced")}
className = {`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase transition-colors cursor-pointer ${scrollerMode === "debounced" ? "bg-emerald-950 text-emerald-400" : "text-slate-500 hover:text-slate-300"
  }`}
                          >
  Debounced
  </button>
  </div>
  </div>

  < div className = "space-y-1.5 pt-1" >
    <span className="text-slate-500 text-[9px] block" > DRAG FAST - SCROLL THUMB: </span>
      < input
type = "range"
min = "1"
max = "100"
value = { scrollerPosition }
onChange = { handleScrollerDrag }
className = "w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
  />
  <div className="flex justify-between text-[10px] font-mono text-slate-500" >
    <span>Page 1 </span>
      < span className = "text-emerald-400 font-bold" > Page { scrollerPosition * 5 } / 500</span >
        <span>Page 500 </span>
          </div>
          </div>
          </div>
          </div>

{/* Speech Log (7 cols) */ }
<div className="md:col-span-7 bg-slate-950 border border-slate-900 rounded-lg p-3 text-left font-mono h-40 flex flex-col justify-between" >
  <span className="text-[9px] text-slate-500 uppercase border-b border-slate-900 pb-1 mb-2 block font-bold flex items-center gap-1" >
    <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
      Auditory Accessibility Stream Output
        </span>
        < div className = "flex-1 overflow-y-auto space-y-1 text-[10px]" >
        {
          screenReaderSpeech.map((speech, idx) => (
            <div 
                          key= { idx } 
                          className = {`pl-2 border-l py-0.5 ${speech.startsWith("🚨")
                ? "border-red-500/50 text-red-400 bg-red-950/5 animate-pulse"
                : "border-emerald-500/50 text-emerald-400 bg-emerald-950/5"
              }`}
          >
          { speech }
          </div>
                      ))}
</div>
  </div>
  </div>
  </div>

  < div className = "bg-gradient-to-r from-emerald-950/10 to-slate-950 border border-emerald-900/30 p-5 rounded-lg space-y-2" >
    <p className="text-sm font-semibold text-slate-100 flex items-center gap-1.5 font-display uppercase tracking-wide" >
      <CheckCircle className="w-5 h-5 text-emerald-400" />
        The Engineering Win
          </p>
          < p className = "text-xs text-slate-400 leading-relaxed font-sans" >
            Integrating our FastScroller announcement loops directly with Android's accessibility tree, but throttling spoken page calls to a debounced 200ms sliding window, enabled beautiful, screen-reader compliant audio feedback without introducing main-thread lagging.
              </p>
              </div>
              </div>
              </div>
        );

      case "mdns-discovery-stability":
return (
  <div className= "space-y-8 font-sans max-w-3xl mx-auto text-slate-300" >
  {/* Introduction */ }
  < div className = "space-y-4" >
    <h3 className="text-xl font-display font-semibold text-slate-100 tracking-tight" > Introduction </h3>
      < p className = "leading-relaxed text-slate-300" >
        Setting up screenless smart - home devices is notorious for flaky, unpredictable user experiences.During the GHP 3P Hub Activation(OOBE 2.0) project, our goal was to remove all manual friction and completely automate the hub onboarding flow using local Multicast DNS (mDNS) broadcasting.
              </p>
          < p className = "leading-relaxed text-slate-300" >
            The initial architecture was designed around a clean, lightweight discovery loop:
</p>
  < ul className = "space-y-2 pl-5 list-disc text-slate-300" >
    <li>
    <strong className="text-slate-100" > The Device - Side Server </strong>: The smart hub spins up an embedded, lightweight setup server using NanoHTTPD.
      </li>
      < li >
      <strong className="text-slate-100" > The Discovery Broadcast </strong>: A custom HubAdvertisingClient begins broadcasting the server's operational port and unique discovery codes across the local network using DNS-Based Service Discovery (DNS-SD) over mDNS.
        </li>
        < li >
        <strong className="text-slate-100" > The Automated Handshake </strong>: The mobile setup app listens for these specific network broadcasts, intercepts the connection parameters, and automatically initiates a secure provisioning handshake without requiring the user to type in pins or switch Wi-Fi networks.
          </li>
          </ul>
          </div>

          < hr className = "border-slate-900 my-8" />

            {/* Subnet Collision Challenge */ }
            < div className = "space-y-4" >
              <h3 className="text-xl font-display font-semibold text-slate-100 tracking-tight flex items-center gap-2" >
                <span className="p-1 px-1.5 rounded bg-red-500/10 text-red-400" > <AlertTriangle className="w-4 h-4" /> </span>
                The Subnet Collision Challenge
  </h3>
  < p className = "leading-relaxed text-slate-300" >
    While the architecture worked flawlessly in isolated lab environments, field testing exposed a critical edge case. When multiple smart hubs sharing the exact same partner ID were powered on simultaneously within the same local subnet, the discovery pipeline completely collapsed.
              </p>
      < p className = "leading-relaxed text-slate-300" >
        The flood of identical, overlapping incoming broadcast packets triggered a severe race condition in the app's discovery parser. Instead of gracefully ignoring or merging the duplicate network advertisements, the parsing thread fell into an infinite lookup loop. This rapidly led to thread exhaustion, completely locking up the app's network stack and causing the setup application to crash.
              </p>
          </div>

          < hr className = "border-slate-900 my-8" />

            {/* Stabilization Strategy */ }
            < div className = "space-y-6" >
              <h3 className="text-xl font-display font-semibold text-slate-100 tracking-tight flex items-center gap-2" >
                <span className="p-1.5 rounded bg-blue-500/10 text-blue-400" > <Network className="w-5 h-5" /> </span>
                The Stabilization Strategy
  </h3>
  < p className = "leading-relaxed text-slate-300" >
    To fix this routing loop and harden the onboarding pipeline, we implemented a three - tiered network defense strategy:
</p>

  < div className = "grid grid-cols-1 md:grid-cols-3 gap-4 my-4" >
    <div className="bg-[#030612] border border-blue-900/20 p-4 rounded-xl space-y-1.5" >
      <span className="text-xs font-mono text-blue-400 font-bold block uppercase" > Strict Packet Deduplication </span>
        < p className = "text-[11px] text-slate-400 leading-relaxed" >
          We refactored the discovery parser to include a lightweight, memory - bounded sliding window cache.Incoming mDNS packets are fingerprinted, and identical duplicate broadcasts from the same subnet are dropped instantly.
                  </p>
            </div>
            < div className = "bg-[#030612] border border-blue-900/20 p-4 rounded-xl space-y-1.5" >
              <span className="text-xs font-mono text-blue-400 font-bold block uppercase" > mDNS Port Collision Stabilization </span>
                < p className = "text-[11px] text-slate-400 leading-relaxed" >
                  We updated the HubAdvertisingClient to dynamically detect and resolve port conflicts on the local interface.If a port is bound, the client cleanly negotiates an alternative socket.
                  </p>
                    </div>
                    < div className = "bg-[#030612] border border-blue-900/20 p-4 rounded-xl space-y-1.5" >
                      <span className="text-xs font-mono text-blue-400 font-bold block uppercase" > Defensive Server Validation </span>
                        < p className = "text-[11px] text-slate-400 leading-relaxed" >
                          We hardened the device - side NanoHTTPD server to defensively sanitize incoming request payloads and validate transport layers, ensuring malicious packets are rejected early.
                  </p>
                            </div>
                            </div>

{/* INTERACTIVE SIMULATOR FOR mDNS PACKETS */ }
<div className="bg-[#02040a] border border-slate-900 rounded-xl p-5 md:p-6 my-6 relative overflow-hidden" >
  <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider mb-5 text-center" >
    Live Interactive Sandbox: mDNS Subnet Packet Storm
      </span>

      < div className = "grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" >
        {/* Left Column Controls (5 cols) */ }
        < div className = "lg:col-span-5 flex flex-col justify-between space-y-4" >
          <div className="bg-slate-950/80 border border-slate-900 p-3.5 rounded-lg text-left text-xs space-y-3" >
            <span className="font-mono text-slate-400 block font-bold" > HUB SECURITY FLAGS </span>

              < div className = "flex items-center justify-between" >
                <span className="text-slate-400" > Packet Deduplication: </span>
                  < input
type = "checkbox"
checked = { mdnsDeduplication }
onChange = {(e) => setMdnsDeduplication(e.target.checked)}
className = "w-4 h-4 rounded text-blue-500 accent-blue-500 cursor-pointer"
  />
  </div>

  < div className = "flex items-center justify-between" >
    <span className="text-slate-400" > mDNS Port Collision Negotiator: </span>
      < input
type = "checkbox"
checked = { mdnsPortConflict }
onChange = {(e) => setMdnsPortConflict(e.target.checked)}
className = "w-4 h-4 rounded text-blue-500 accent-blue-500 cursor-pointer"
  />
  </div>

  < button
onClick = { toggleMdnsSimulation }
className = {`w-full py-2 rounded font-mono text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${mdnsIsSimulating
    ? "bg-amber-950/60 text-amber-400 border border-amber-900/40"
    : "bg-blue-600 text-white hover:bg-blue-500"
  }`}
                      >
  { mdnsIsSimulating?<Pause className = "w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
{ mdnsIsSimulating ? "Stop Simulation" : "Trigger Setup Broadcasts" }
</button>
  </div>

{/* Stats */ }
<div className="grid grid-cols-2 gap-2 text-center text-xs" >
  <div className="bg-slate-950/50 p-2 border border-slate-900" >
    <span className="text-[9px] text-slate-500 block uppercase font-mono" > Parsed Packets </span>
      < span className = "text-xs font-mono font-bold text-emerald-400" > { mdnsPacketsParsed } </span>
        </div>
        < div className = "bg-slate-950/50 p-2 border border-slate-900" >
          <span className="text-[9px] text-slate-500 block uppercase font-mono" > Dropped Duplicates </span>
            < span className = "text-xs font-mono font-bold text-blue-400" > { mdnsPacketsDropped } </span>
              </div>
              </div>
              </div>

{/* Right Column Visualizations (7 cols) */ }
<div className="lg:col-span-7 bg-slate-950 border border-slate-900 rounded-lg p-3 text-left font-mono flex flex-col justify-between h-56 relative overflow-hidden" >

  {/* Status badges */ }
  < div className = "flex justify-between items-center text-[9px] text-slate-500 border-b border-slate-900 pb-1.5 mb-2" >
    <span>mDNS SUBNET MONITOR </span>
      < span className = {`px-2 py-0.5 rounded uppercase tracking-wider font-bold ${mdnsStatus === "crashed"
          ? "bg-red-950 text-red-400 border border-red-900/40"
          : mdnsStatus === "success"
            ? "bg-emerald-950 text-emerald-400 border border-emerald-900/40"
            : "bg-slate-900 text-slate-400"
        }`}>
          { mdnsStatus === "crashed" ? "❌ CRASHED (Thread Exhaustion)" : mdnsStatus === "success" ? "✓ SUCCESS (Handshake Ok)" : "● SCANNING"}
</span>
  </div>

{/* Thread utility monitor */ }
<div className="space-y-1 mb-2" >
  <div className="flex justify-between items-center text-[9px] text-slate-500" >
    <span>CPU PARSING THREAD QUEUE UTILIZATION </span>
      < span className = { mdnsThreads > 80 ? "text-red-400 font-bold animate-pulse" : "text-slate-300"}>
        { mdnsThreads } %
        </span>
        </div>
        < div className = "w-full h-2 bg-slate-950 border border-slate-900 rounded-full overflow-hidden" >
          <div 
                          className={ `h-full transition-all duration-300 ${mdnsThreads > 80 ? "bg-red-500 animate-pulse" : mdnsThreads > 45 ? "bg-amber-500" : "bg-blue-500"}` }
style = {{ width: `${mdnsThreads}%` }}
                        />
  </div>
  </div>

{/* Live flying packets visualization */ }
<div className="flex-1 bg-[#010309] border border-slate-900 rounded relative overflow-hidden" >
  { mdnsIsSimulating && mdnsStatus === "idle" && (
    <div className="absolute inset-0 flex items-center justify-between px-6 text-[8px] text-slate-600" >
      <span>Hub Hubs </span>
        < span > Setup Application Parser </span>
          </div>
                      )}

{/* Packet streams */ }
{
  mdnsActivePackets.map(p => (
    <motion.div
                          key= { p.id }
                          initial = {{ x: 10, y: p.y, opacity: 1 }}
animate = {{ x: 260, opacity: 0 }}
transition = {{ duration: 1.0, ease: "linear" }}
className = {`absolute w-2.5 h-2.5 rounded-full ${p.isDuplicate ? "bg-blue-400" : "bg-indigo-400"
  }`}
                        />
                      ))}

{
  mdnsStatus === "crashed" && (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-950/20 backdrop-blur-xs text-center p-2 text-[10px]" >
      <AlertTriangle className="w-5 h-5 text-red-500 mb-1 animate-bounce" />
        <span className="text-slate-200 font-bold block" > Thread Pool Locked </span>
          < span className = "text-slate-500 text-[8px]" > Overlap packets flooded CPU threads.Deduplication recommended.</span>
            </div>
                      )
}

{
  mdnsStatus === "success" && (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-950/20 backdrop-blur-xs text-center p-2 text-[10px]" >
      <CheckCircle className="w-5 h-5 text-emerald-400 mb-1" />
        <span className="text-slate-200 font-bold block" > Automated Onboarding Complete </span>
          < span className = "text-slate-500 text-[8px]" > Device Handshake resolved with 0 friction </span>
            </div>
                      )
}
</div>
  </div>
  </div>
  </div>

  < div className = "bg-gradient-to-r from-blue-950/10 to-slate-950 border border-blue-900/30 p-5 rounded-lg space-y-2" >
    <p className="text-sm font-semibold text-slate-100 flex items-center gap-1.5 font-display uppercase tracking-wide" >
      <CheckCircle className="w-5 h-5 text-blue-400" />
        The Engineering Win
          </p>
          < p className = "text-xs text-slate-400 leading-relaxed font-sans" >
            Eliminating this parsing race condition completely solved the thread exhaustion bugs, boosting our smart hub discovery success rates by 40 % and delivering a rock - solid, zero - touch onboarding experience for screenless devices.
                </p>
              </div>
              </div>
              </div>
        );

      default:
// Standard Layout
return (
  <div className= "space-y-6 font-sans" >
  {
    post.content.split("\n\n").map((para, pIdx) => {
      if (para.startsWith("### ")) {
        return (
          <h4 key= { pIdx } className = "font-display text-base font-semibold text-slate-100 pt-4 tracking-tight" >
            { para.replace("### ", "") }
            </h4>
                );
  }
if (para.startsWith("* ")) {
  return (
    <ul key= { pIdx } className = "list-disc pl-5 space-y-2" >
    {
      para.split("\n").map((li, lIdx) => (
        <li key= { lIdx } className = "text-slate-400 text-xs sm:text-sm" > { li.replace("* ", "") } </li>
      ))
    }
      </ul>
                );
}
return (
  <p key= { pIdx } className = "text-slate-400 text-xs sm:text-sm leading-relaxed" >
    { para }
    </p>
              );
            })}
</div>
        );
    }
  };

return (
  <div className= "fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4" >
  <motion.div
        initial={ { opacity: 0, scale: 0.95 } }
animate = {{ opacity: 1, scale: 1 }}
exit = {{ opacity: 0, scale: 0.95 }}
transition = {{ duration: 0.3 }}
className = "bg-[#050816] border border-slate-800 rounded-xl max-w-4xl w-full h-[85vh] flex flex-col justify-between shadow-2xl overflow-hidden font-sans text-left"
  >
  {/* Header */ }
  < div className = "flex items-center justify-between px-6 py-4 border-b border-slate-900 text-left bg-slate-950/50" >
    <div className="space-y-1" >
      <span className="text-[9px] text-blue-400 uppercase tracking-widest font-mono" > { post.category } Note </span>
        < h3 className = "font-display font-semibold text-slate-100 text-base sm:text-lg leading-snug line-clamp-1" > { post.title } </h3>
          </div>
          < button
onClick = { onClose }
className = "p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-200 transition-colors cursor-pointer ml-4"
  >
  <X className="w-4 h-4" />
    </button>
    </div>

{/* Scrollable Article Body */ }
<div className="flex-1 overflow-y-auto p-6 md:p-10 text-left text-sm text-slate-300 space-y-6 leading-relaxed" >
  {/* Article Header info */ }
  < div className = "flex items-center gap-4 text-xs text-slate-500 font-mono pb-4 border-b border-slate-900/60" >
    <div className="flex items-center gap-1.5" >
      <Clock className="w-3.5 h-3.5" />
        <span>{ post.readTime } </span>
        </div>
        < div className = "flex items-center gap-1.5" >
          <BookOpen className="w-3.5 h-3.5" />
            <span>{ post.date } </span>
            </div>
            </div>

{/* Core Content */ }
{ renderCustomContent() }
</div>

{/* Footer */ }
<div className="flex justify-between items-center px-6 py-4 bg-slate-950/50 border-t border-slate-900 text-[10px] text-slate-500 font-mono" >
  <span>SECURE SYSTEM ARCHIVE TRANSLATION </span>
    < span > SYSTEM VERIFIED ✓</span>
      </div>
      </motion.div>
      </div>
  );
};
