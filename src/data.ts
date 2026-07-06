import { TechSkill, ExperienceItem, ProjectItem, BlogPost, ArtWork, CosmosNote, Book, Milestone, Quote } from "./types";

export const skillsData: TechSkill[] = [
  { name: "Distributed Systems", category: "Backend/Systems", level: 5, description: "Designed high-throughput APIs, queue processing buffers, and low-latency client connectors." },
  { name: "Golang / Kotlin", category: "Languages", level: 5, description: "Highly proficient in high-concurrency patterns, channels design, and lightweight backends." },
  { name: "C++ / Java", category: "Languages", level: 4, description: "Low-level system integrations, memory-safe execution, and high-performance threading interfaces." },
  { name: "Android Platform", category: "Mobile/Frontend", level: 5, description: "Deep understanding of Android internals, custom rendering engines, and graphics layout profiles." },
  { name: "System Design", category: "Backend/Systems", level: 5, description: "Architected multi-region transactional systems, rate limiters, and highly available cluster networks." },
  { name: "Cloud Infrastructure", category: "Infrastructure", level: 4, description: "Orchestrating container services, IAM profiles, CI/CD telemetry, and secure cloud storage." }
];

export const experienceData: ExperienceItem[] = [
  {
    id: "bloomberg",
    company: "Bloomberg Ireland",
    role: "Senior Software Engineer (Incoming)",
    period: "August 2026",
    location: "Dublin, Ireland",
    summary: "Joining the Pricing & Analytics team next month to design high-throughput, low-latency financial systems and telemetry infrastructure.",
    projects: [],
    technologies: ["C++", "Golang", "Distributed Systems", "gRPC", "Protocol Buffers", "SQL"]
  },
  {
    id: "google",
    company: "Google",
    role: "Software Development Engineer (L3)",
    period: "July 2024 - Present",
    location: "New Taipei City, Taiwan",
    summary: "Engineering device-side setup modules for third-party smart-home hubs (GHP Runtime Scaling) and extending/optimizing the Jetpack PDF library for high-fidelity Android document experiences.",
    projects: [
      {
        name: "GHP 3P Hub Activation (OOBE 2.0)",
        description: "Engineered and launched a new, scalable, end-to-end activation flow for third-party smart-home hubs, supporting diverse, screenless device configurations.",
        impact: [
          "Implemented a secure device-side setup server using NanoHTTPD to handle setup requests, validate discovery codes, and manage cryptographic handshakes.",
          "Extended the HubAdvertisingClient to broadcast the setup server's port and a discovery code via mDNS (DNS-SD), facilitating seamless client-side discovery.",
          "Isolated and resolved a critical race-condition crash in mDNS discovery when multiple hubs with identical partner IDs existed on the same network subnet.",
          "Onboarded 2 key smart-home partners in the first quarter and reduced partner integration onboarding time by an average of 40%."
        ],
        challenges: "Designing an extensible, high-security local protocol that remains extremely lightweight and works robustly on devices without displays.",
        learnings: "Working with network broadcast topologies (mDNS/DNS-SD) requires strict timeout thresholds and defensive packet validation to handle noisy client networks."
      },
      {
        name: "PDF Thumbnail Preview & UX",
        description: "Authored the technical design, architectural requirements, and complete implementation of the thumbnail preview feature in the Jetpack PDF rendering library.",
        impact: [
          "Designed and delivered a highly responsive, functioning thumbnail viewer in the Jetpack PDF test application (similar to Chrome's PDF viewer).",
          "Achieved a measured 25% reduction in user page seek and scroll navigation time within large, content-heavy documents (exceeding 100 pages).",
          "Improved accessibility standards across the entire PDF library, making the FastScroller completely screen reader-friendly for visually impaired users.",
          "Fixed several critical UI layout and keyboard focus bugs, resulting in a significantly more fluid and robust developer-facing API."
        ],
        challenges: "Slicing high-fidelity, high-density vector document pages into memory-cached raster bitmaps without causing UI main thread stuttering.",
        learnings: "Dynamic bitmap pooling and custom cache-discarding strategies are far more effective for layout rendering performance than standard garbage collection."
      },
      {
        name: "Backward Compatibility & DX Engineering",
        description: "Led a complex, multi-quarter initiative to backport compatibility for the entire Jetpack PDF library to older legacy devices.",
        impact: [
          "Successfully extended backward compatibility to Android API 21+ (Lollipop), expanding the library's device reach by an estimated 15% and unblocking 3 key internal Google partner teams (including Drive and Docs) from integrating.",
          "Established a robust JaCoCo code coverage pipeline by resolving complex build toolchain issues, raising test coverage by 18% and reducing test flakiness by 30% to save 8-10 developer hours per week in debugging.",
          "Achieved a 35 KB (approx. 5%) reduction in the compiled binary footprint through dead-code stripping, and decreased partner app cold-launch latency by 50ms on low-end hardware."
        ],
        challenges: "Mimicking modern high-performance layout APIs on legacy SDKs (API 21-23) while keeping custom native C++ hooks stable and small.",
        learnings: "Toolchain automation is just as important as system code. Resolving build discrepancies early yields massive dividends in developer velocity and test reliability."
      }
    ],
    technologies: ["Java", "Kotlin", "Android Development", "AndroidX", "Jetpack", "NanoHTTPD", "DNS-SD", "JaCoCo", "C++", "Blaze", "Gerrit", "Git"]
  },
  {
    id: "smallcase",
    company: "Smallcase Technologies",
    role: "Software Development Engineer - II",
    period: "April 2022 - July 2024",
    location: "Bengaluru, India",
    summary: "Architected core financial microservices, secured high-traffic user authentication, and optimized external broker sync engines.",
    projects: [
      {
        name: "OTP & Authentication Service",
        description: "Engineered, secured, and deployed a highly available, custom OTP (One-Time Password) service from scratch, supporting phone numbers, emails, and SSO login flows.",
        impact: [
          "Processed over 500,000 authentication requests monthly with an audited 99.99% system reliability.",
          "Fortified the gateway against malicious bots and brute-force actors, mitigating spam and abuse attacks by 90% and reducing fraudulent sign-ups by 75%.",
          "Saved an estimated $15,000 USD in annual infrastructure, API gateway egress, and SMS carrier support costs."
        ],
        challenges: "Orchestrating fast, secure multi-channel delivery (SMS/Email/SSO) while preventing rate-limiting exhaustion under highly distributed spam attacks.",
        learnings: "Leveraging defensive gateway firewalls (AWS WAF), CloudFront caching, JA3 SSL/TLS fingerprinting, and Google reCAPTCHA yields absolute protection against automated botnets."
      },
      {
        name: "Waitlist Program & Webhook Throttling Engine",
        description: "Led backend development for a high-priority US equities waitlist system and engineered a resilient external webhook delivery pipeline.",
        impact: [
          "Streamlined user registration pipelines, boosting overall user onboarding registration efficiency by 50% and capturing 15,000+ interested users in month one.",
          "Designed and implemented a high-throughput webhook service, incorporating queue-based traffic throttling to process up to 20,000 parallel machine-to-machine requests per minute.",
          "Guaranteed a 99.9% uptime SLA for critical external partner systems under massive intraday market volatility."
        ],
        challenges: "Sustaining high-throughput webhooks under abrupt traffic spikes (e.g. during market open/close) without overwhelming internal SQL databases.",
        learnings: "Decoupling API requests using persistent messaging buffers (Kafka, Redis) is critical to protect transactional data integrity."
      },
      {
        name: "Investment Tracking & Sync Engine",
        description: "Spearheaded the backend implementation for a highly secure external investment tracking platform to coordinate real-time portfolio synchronization.",
        impact: [
          "Directly supported an Asset Under Management (AUM) growth to over $120 million USD.",
          "Optimized the broker sync schedules to ingest and map 10,000+ daily complex transactional data syncs across 4 external partner platforms."
        ],
        challenges: "Aligning highly inconsistent, legacy broker transaction models into a unified, high-integrity financial ledger.",
        learnings: "Financial systems require strict idempotency. Every single operation must be retriable and traceable to prevent portfolio balance discrepancies."
      }
    ],
    technologies: ["Java", "Go", "AWS", "Spring Boot", "Node.js", "Express.js", "Kafka", "Redis", "WAF", "CloudFront", "reCAPTCHA", "SQL", "MongoDB"]
  },
  {
    id: "hashedin",
    company: "HashedIn by Deloitte",
    role: "Software Development Engineer - I",
    period: "March 2021 - April 2022",
    location: "Bengaluru, India",
    summary: "Engineered scalable RESTful API backends, automated insurance claim settlement validations, and optimized data sync speeds.",
    projects: [
      {
        name: "US Insurance Claims Validation Engine",
        description: "Designed, developed, and deployed a high-throughput, rule-based infrastructure to accurately validate or deny claims on behalf of a major US insurance provider, HCSC.",
        impact: [
          "Processed over 5,000 insurance claims daily, automating complex compliance checks with an initial accuracy rate of 98%.",
          "Shipped resilient, highly optimized RESTful APIs that significantly reduced processing latency and improved claims settlement turnaround time."
        ],
        challenges: "Translating hundreds of vague, legacy policy compliance guidelines into deterministic, low-latency programmatic code.",
        learnings: "Creating a decoupled rule evaluation structure is essential when business criteria change frequently, avoiding continuous software rebuilds."
      }
    ],
    technologies: ["Java", "Spring Boot", "RESTful APIs", "SQL", "Docker"]
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: "pdf-thumbnail-preview",
    title: "Jetpack PDF Viewer & Performance Engine",
    subtitle: "Memory pooling, thumbnail previews, and backwards-compatibility (API 21+)",
    description: "Designed and delivered the thumbnail preview architecture and extended backward compatibility to Android API 21+ for the entire Jetpack PDF library, enabling Google Drive and Docs integration while maintaining butter-smooth rendering.",
    problem: "Enabling smooth document seeks and previews in heavy, vector-rich PDFs (>100 pages) without triggering aggressive JVM GC spikes and stuttering layout performance on lower-tier Android devices.",
    architecture: [
      "Bitmap Pool: Recycles out-of-view canvas layouts.",
      "Backport Layer: Mimics modern layout APIs down to API 21+.",
      "FastScroller: Thread-isolated accessibility announcements."
    ],
    techStack: ["Kotlin", "Java", "Android SDK", "Jetpack", "JaCoCo", "Systrace", "C++ NDK"],
    challenges: "Achieving backward compatibility to API 21+ while minimizing binary footprints and retaining thread-safe native C++ rendering wrappers.",
    outcome: "Reduced peak memory usage by 35%, stripped 35 KB from binary size, and decreased document seek latency by 25%.",
    category: "Android"
  },
  {
    id: "mdns-smart-home",
    title: "Smart-Home Hub Onboarding Gateway",
    subtitle: "Zero-touch mDNS activation and multicast packet deduplication (OOBE 2.0)",
    description: "Designed and integrated a highly resilient local network mDNS discovery architecture for third-party screenless smart-home hubs (OOBE 2.0), incorporating automated NanoHTTPD setups and reliable multicast handshakes.",
    problem: "Network discovery pipelines collapsed in field testing when multiple smart hubs on the same subnet broadcasted duplicate advertisements, exhausting the mobile setup app's event loop and causing client crashes.",
    architecture: [
      "NanoHTTPD: Tiny device-side setup server on the hub.",
      "HubAdvertisingClient: Dynamic port collision negotiation.",
      "Sliding Window: Memory-bounded packet deduplication buffer."
    ],
    techStack: ["Java", "Kotlin", "mDNS (DNS-SD)", "NanoHTTPD", "Wireshark", "GMS Core"],
    challenges: "Sustaining reliable, secure handshakes across diverse residential local area subnets without user pin-entry or manual Wi-Fi switching.",
    outcome: "Completely resolved thread exhaustion loops on overlapping broadcasts, reducing average partner integration time by 40% and increasing discovery success by 40%.",
    category: "Distributed Systems"
  },
  {
    id: "otp-gateway",
    title: "Defensive Financial OTP & SSO Service",
    subtitle: "Mitigating SMS toll fraud and protecting session token transitions at scale",
    description: "Engineered from scratch a high-availability, zero-trust OTP and Single Sign-On (SSO) gateway at Smallcase, handling over 500,000 monthly transactions and defending core financial APIs from volumetric attacks.",
    problem: "Fintech APIs suffer continuous automated bot abuse and SMS pump fraud, risking massive toll carrier charges and insecure session handover replays.",
    architecture: [
      "JA3 Edge: TLS client handshake fingerprinting.",
      "Leaky Bucket: Redis-backed IP rate-limits.",
      "Transient Cache: Short-lived token memory with strict TTLs."
    ],
    techStack: ["Node.js", "Express.js", "Redis", "AWS WAF", "CloudFront", "reCAPTCHA", "Go"],
    challenges: "Blocking distributed pump bots by over 90% without introducing login friction or false positives for legitimate retail investors.",
    outcome: "Processed 500,000+ monthly requests at 99.99% system reliability, cutting fraudulent account creations by 75% and saving $15,000 USD annually.",
    category: "System Design"
  },
  {
    id: "smartphone-muon-detector",
    title: "Smartphone Cosmic Ray Muon Detector",
    subtitle: "No-equipment particle physics experiment using CMOS camera sensors",
    description: "A self-contained experimental app concept that leverages standard mobile camera CMOS silicon sensors to capture high-energy atmospheric muon strikes from cosmic rays in real-time.",
    problem: "Cosmic ray particles (muons) constantly shower the Earth but are invisible. Professional cloud chambers and scintillators are expensive and inaccessible to everyday space enthusiasts.",
    architecture: [
      "Sensor Masking: Complete visible light block via black tape.",
      "Frame Analysis: Real-time bright pixel scanning in dark frames.",
      "Event Logging: Recording charge trails and energy histograms."
    ],
    techStack: ["Kotlin", "Android Camera2 API", "Vulkan / GPU Shaders", "Statistical Poisson Models"],
    challenges: "Differentiating high-energy particle ionization trails from thermal sensor noise (hot pixels) on consumer hardware.",
    outcome: "Allows users to turn a smartphone, black tape, and a dark room into a functional particle detector logging 2-3 muon strikes per minute.",
    category: "Cosmos"
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "scaling-otp-gateway",
    title: "Scaling One-Time Passwords: A 99.99% Reliable Auth Gateway",
    excerpt: "How we designed a custom secure OTP service at Smallcase to handle 500k monthly requests, mitigate SMS pump fraud by 90%, and protect session handovers.",
    content: `When scaling consumer platforms or fintech apps, user authentication is the single most critical gateway. If login drops, your entire business is effectively down.

During my tenure at Smallcase, we designed and deployed a custom, secure OTP (One-Time Password) service from scratch to handle over 500,000 monthly authentication requests across SMS, email, and SSO. To ensure high availability and protect our infrastructure from financial and security risks, we focused on two major engineering milestones:

### 1. Defending Against Distributed SMS Pump Attacks
SMS pump fraud occurs when automated botnets trigger massive spikes of OTP requests to high-cost premium carrier destinations, running up thousands of dollars in toll charges.

To mitigate this abuse by over 90% and save $15,000 USD in infrastructure overhead, we implemented a layered defense strategy at both the network edge and the application tier:

* **JA3 Fingerprinting**: We analyzed incoming TLS handshakes to identify the cryptographic signatures of automated bots, dropping requests that attempted to bypass standard browser headers.
* **IP Reputation & Geo-Fencing**: We integrated AWS WAF and CloudFront rules to monitor incoming traffic trends and throttle suspicious request frequencies dynamically based on risk profiles.
* **Leaky Bucket Throttling**: We designed custom rate-limiting queues in Redis. These throttles were mapped not just to individual user accounts, but directly to device signatures and destination phone subnets to catch distributed attacks.

### 2. Safeguarding Session Transitions
Single Sign-On (SSO) transitions and token handshakes must happen atomically. If a session handover fails mid-stream, it creates a terrible user experience; if it is intercepted, it compromises account security.

To ensure seamless, highly secure session handovers:
* **Transient Token Cache**: We leveraged a high-performance Redis cache to store and manage transient verification tokens.
* **Strict TTL Expirations**: Every token was bound to a strict, short-lived Time-To-Live (TTL) expiration window. Once used or expired, the token was instantly evicted from memory.

**The Engineering Win**: This fast, synchronous verification layer protected customer account creations from replay attacks while keeping our authentication gateway operating at 99.99% uptime.`,
    category: "System Design",
    readTime: "7 min read",
    date: "May 12, 2024"
  },
  {
    id: "android-pdf-rendering",
    title: "Android PDF Internals: Mastering Memory Pooling & High-Fidelity Rendering",
    excerpt: "Re-engineering the Android PDF rendering pipeline inside the Jetpack PDF library to achieve a locked 60 FPS scroll and 35% peak memory reduction.",
    content: `Most developers assume that displaying a PDF on a mobile device is as simple as launching a system intent. However, if you are building a native, interactive document viewer, you quickly run into severe hardware constraints.

In large, vector-rich PDFs (especially those exceeding 100 pages), swift zooming and panning can instantly trigger massive memory allocation spikes. On Android, this leads to aggressive Garbage Collection (GC) pauses and stuttering frame rates.

To solve this, we re-engineered the rendering pipeline, achieving a locked 60 FPS scroll and a 35% reduction in peak memory usage through two primary optimizations:

### 1. Eliminating Runtime Allocations with Bitmap Pooling
Allocating a brand-new, high-resolution bitmap every time a user pinches, zooms, or pans is a performance killer. Bitmaps are incredibly heavy objects; constantly creating and destroying them forces the JVM to run stop-the-world garbage collection cycles.

To bypass this overhead, we implemented a Bitmap Pool pattern:
* **The Recycle Loop**: When a PDF page scrolls out of the active viewport, its underlying bitmap is not released for garbage collection. Instead, it is retained and marked as "recyclable" within an in-memory pool.
* **In-Place Re-rendering**: When a new page enters the screen, the rendering engine avoids a fresh memory allocation. Instead, it pulls a bitmap of matching dimensions from the pool and re-renders the new vector content directly onto the existing memory canvas.

**The Engineering Win**: By recycling memory block allocations rather than churn-releasing them, we completely eliminated runtime heap allocation spikes during rapid scrolling.

### 2. Accessible Architecture: Smarter FastScroller Navigation
System software should never sacrifice accessibility for raw performance. A major goal of this overhaul was ensuring that heavy document navigation remained smooth and intuitive for all users, including those relying on screen readers.

We refactored the FastScroller component to deeply integrate with Android's accessibility framework:
* **Real-Time Spoken Feedback**: As a user drags the fast-scroll thumb through a 500-page document, the system dynamically intercepts the touch event loop and announces precise, localized page markers in real time.
* **Deterministic Focus**: Instead of overwhelming screen readers with continuous layout updates during rapid scrolling, the system intelligently debounces announcements. This provides clear, high-fidelity audio feedback without lagging the UI thread.

**The Engineering Win**: This approach ensures the application meets global accessibility standards without introducing main-thread stutter, making heavy document exploration accessible to everyone.`,
    category: "Engineering Lessons",
    readTime: "9 min read",
    date: "Jan 18, 2025"
  },
  {
    id: "mdns-discovery-stability",
    title: "mDNS Discovery Stability: Debugging Broadcasts in Local Topologies",
    excerpt: "How we resolved subnet packet collisions and infinite parsing loops during screenless smart-home hub onboarding (OOBE 2.0) at Google.",
    content: `Setting up screenless smart-home devices is notorious for flaky, unpredictable user experiences. During the GHP 3P Hub Activation (OOBE 2.0) project, our goal was to remove all manual friction and completely automate the hub onboarding flow using local Multicast DNS (mDNS) broadcasting.

The initial architecture was designed around a clean, lightweight discovery loop:
* **The Device-Side Server**: The smart hub spins up an embedded, lightweight setup server using NanoHTTPD.
* **The Discovery Broadcast**: A custom HubAdvertisingClient begins broadcasting the server's operational port and unique discovery codes across the local network using DNS-Based Service Discovery (DNS-SD) over mDNS.
* **The Automated Handshake**: The mobile setup app listens for these specific network broadcasts, intercepts the connection parameters, and automatically initiates a secure provisioning handshake without requiring the user to type in pins or switch Wi-Fi networks.

### The Subnet Collision Challenge
While the architecture worked flawlessly in isolated lab environments, field testing exposed a critical edge case. When multiple smart hubs sharing the exact same partner ID were powered on simultaneously within the same local subnet, the discovery pipeline completely collapsed.

The flood of identical, overlapping incoming broadcast packets triggered a severe race condition in the app's discovery parser. Instead of gracefully ignoring or merging the duplicate network advertisements, the parsing thread fell into an infinite lookup loop. This rapidly led to thread exhaustion, completely locking up the app's network stack and causing the setup application to crash.

### The Stabilization Strategy
To fix this routing loop and harden the onboarding pipeline, we implemented a three-tiered network defense strategy:
* **Strict Packet Deduplication**: We refactored the discovery parser to include a lightweight, memory-bounded sliding window cache. Incoming mDNS packets are fingerprinted, and identical duplicate broadcasts from the same subnet are dropped instantly before they can hit the validation engine.
* **mDNS Port Collision Stabilization**: We updated the HubAdvertisingClient to dynamically detect and resolve port conflicts on the local interface. If a port is already bound by another device, the client cleanly negotiates an alternative socket rather than overlapping broadcasts.
* **Defensive Server Validation**: We hardened the device-side NanoHTTPD server to defensively sanitize incoming request payloads and validate transport layers, ensuring that misconfigured or malicious packets are rejected early.

**The Engineering Win**: Eliminating this parsing race condition completely solved the thread exhaustion bugs, boosting our smart hub discovery success rates by 40% and delivering a rock-solid, zero-touch onboarding experience for screenless devices.`,
    category: "Distributed Systems",
    readTime: "8 min read",
    date: "Nov 02, 2025"
  }
];

export const personalInterestsData = {
  cosmos: [
    {
      id: "black-holes",
      title: "Schwarzschild Geometry & The Information Paradox",
      topic: "Cosmology" as const,
      description: "A theoretical study log exploring Schwarzschild metric singularities, the mathematical mechanics of Hawking radiation, and the Holographic Principle as a solution to information scrambling.",
      notes: [
        "Schwarzschild Geometry: Exploring the exact solution to Einstein's field equations for spherically symmetric mass, establishing the event horizon at Rs = 2GM/c² as a coordinate singularity, not a physical one.",
        "The Information Paradox: Analyzing the conflict between the unitary evolution of quantum states (which requires information preservation) and black hole thermal evaporation. Hawking radiation suggests mass-energy loss is entirely thermodynamic and carries no historical data.",
        "Holographic Principle: Synthesizing Susskind and 't Hooft's proposal that the 3D interior volume of spacetime can be fully mapped onto a 2D boundary on the event horizon, laying the groundwork for AdS/CFT gravity-gauge dualities."
      ],
      interactiveComponent: "gravity-well"
    },
    {
      id: "quantum-computing",
      title: "Quantum Coherence, Linear Algebra & Bloch Spheres",
      topic: "Quantum Physics" as const,
      description: "A mathematical synthesis of state vectors in Hilbert space, exploring quantum measurement, Bloch sphere geometry, and the delicate nature of wave-function collapse under external decoherence.",
      notes: [
        "State Vector Representation: Mapping qubits in two-dimensional complex Hilbert spaces as a superposition state |ψ⟩ = α|0⟩ + β|1⟩, constrained by the normalization condition |α|² + |β|² = 1.",
        "Quantum Measurement Problem: Studying the transition from deterministic unitary evolution to probabilistic wave-function collapse upon interacting with macroscopic thermodynamic systems, modeled using projection operators.",
        "Coherence and Environmental Interaction: Investigating how phase relations between state coefficients dissipate into environmental degrees of freedom (decoherence), modeling the hardware hurdles of scaling physical quantum registers."
      ],
      interactiveComponent: "quantum-qubit"
    },
    {
      id: "smartphone-muon-detector",
      title: "Atmospheric Muon Decay & CMOS Silicon Feasibility",
      topic: "Astrophysics" as const,
      description: "A theoretical feasibility study analyzing how high-energy secondary cosmic ray particles (muons) interact with consumer CMOS camera sensors to deposit ionization charge.",
      notes: [
        "Atmospheric Muon Origin: When high-energy primary cosmic protons collide with air molecules in the upper atmosphere, they trigger a shower of pions that decay into muons, traveling relativistically with a dilated lifetime.",
        "CMOS Ionization Mechanics: Analyzing how a passing charged muon deposits energy in silicon via the Bethe-Bloch formula, creating a trace of electron-hole pairs that manifests as localized pixel charge spikes above the thermal noise floor.",
        "Background Noise Calibration: Synthesizing statistical Poisson models to isolate true high-energy muon strikes from thermal dark currents (hot pixels) through strict temporal and spatial spatial clustering filters."
      ],
      interactiveComponent: "muon-detector"
    },
    {
      id: "james-webb-discoveries",
      title: "Deep Field Spectroscopy & Early Galaxy Evolution",
      topic: "Astrophysics" as const,
      description: "A study log analyzing infrared redshift tracking data from the James Webb Space Telescope, tracing gravitational lensing fields and structural evolution in early galaxy populations.",
      notes: [
        "Cosmic Infrared Redshift: Tracking the cosmological expansion of spacetime, which stretches ultraviolet and optical emission lines of primitive star clusters into the infrared bands (z > 10) targeted by JWST's NIRSpec.",
        "Early Galaxy Structural Discrepancy: Synthesizing data on massive, highly organized spiral and disk galaxy structures discovered just 300-400 million years after the Big Bang, challenging standard hierarchical galaxy formation models.",
        "Spectroscopic Abundance Mapping: Examining optical emission lines lensed by massive cluster fields to quantify metallicity and early chemical enrichment of gas clouds in the primordial universe."
      ]
    }
  ],
  art: [
    {
      id: "user-art-gaara",
      title: "Gaara - Naruto Character",
      medium: "Pencil & Ink Sketch",
      description: "A hand-drawn pencil and ink sketch of Gaara, focusing on the character's signature intense expression and cracked sand armor texture.",
      year: "2024",
      imageUrl: "/assets/gara.jpeg",
      category: "Sketches" as const
    },
    {
      id: "user-art-plants",
      title: "Little Garden",
      medium: "Digital Illustration (Tablet)",
      description: "A vibrant digital sketch of potted indoor plants and flowers on a shelf, experimenting with clean linework and bold block coloring.",
      year: "2025",
      imageUrl: "/assets/urge.jpeg",
      category: "Digital" as const
    },
    {
      id: "user-art-gohan",
      title: "The Gohan Legacy",
      medium: "Pencil Sketch",
      description: "A detailed hand-drawn pencil sketch of Gohan, highlighting sharp, classic anime linework and deep shading.",
      year: "2024",
      imageUrl: "/assets/gohan.jpeg",
      category: "Sketches" as const
    },
    {
      id: "user-art-moon",
      title: "Midnight Lunar Reflection",
      medium: "Digital Painting",
      description: "A calm digital painting showing a full moon suspended in a starry night, reflecting a soft trail of light over gentle ocean waves.",
      year: "2025",
      imageUrl: "/assets/Nighty.jpeg",
      category: "Digital" as const
    },
     {
      id: "user-art-doodle",
      title: "Random Doodle art",
      medium: "Digital Painting",
      description: "Stuck in an over-thinking zone.",
      year: "2025",
      imageUrl: "/assets/art.jpeg",
      category: "Digital" as const
    },
    {
      id: "user-walk-art",
      title: "Under the same moon.",
      medium: "Digital Painting",
      description: "Stuck with you.",
      year: "2025",
      imageUrl: "/assets/walk.jpeg",
      category: "Digital" as const
    },
    {
      id: "user-art-doodle-2",
      title: "Another stupid random doodle art",
      medium: "Digital Painting",
      description: "Stuck in an over-thinking zone.",
      year: "2025",
      imageUrl: "/assets/doodles.jpeg",
      category: "Digital" as const
    }
  ],
  notebook: [
    {
      title: "Astrophysics for People in a Hurry",
      author: "Neil deGrasse Tyson",
      status: "completed" as const,
      rating: 5,
      review: "A wonderfully cozy, punchy read that breaks down complex cosmic scales into understandable chapters. It is the perfect reminder of our place in the universe.",
      coverColor: "from-blue-950 to-indigo-900"
    },
    {
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      status: "completed" as const,
      rating: 5,
      review: "The bible of backend engineering. It dissects database storage engines, replication algorithms, and distributed transactions with incredible clarity. A must-read for any systems architect.",
      coverColor: "from-gray-800 to-slate-950"
    },
    {
      title: "Gödel, Escher, Bach",
      author: "Douglas Hofstadter",
      status: "reading" as const,
      rating: 5,
      review: "An exploration of how cognition, self-reference, and consciousness emerge from formal systems. Hofstadter loops math, art, and music into an incredibly complex, beautiful braid.",
      coverColor: "from-purple-950 to-slate-900"
    }
  ]
};

export const milestonesTimeline: Milestone[] = [
  {
    year: "2021",
    title: "Began Career Journey",
    event: "Joined HashedIn by Deloitte",
    description: "Shipped scalable backend APIs and responsive mobile client profiles in Bangalore.",
    type: "career"
  },
  {
    year: "2022",
    title: "Scaling Fintech Transactions",
    event: "Joined smallcase",
    description: "Built high-concurrency order-placement pipelines, multi-broker investment APIs, and idempotent payment workers in Go.",
    type: "career"
  },
  {
    year: "2024",
    title: "Entering Google Platform Cores",
    event: "Relocated to Bangalore",
    description: "Contributed low-level optimization, multi-threaded rendering stability, and document performance to the Android platform in Bangalore and Hsinchu.",
    type: "career"
  },
  {
    year: "2024",
    title: "Entering Google Home Platform",
    event: "Relocated to Taiwan",
    description: "Contributed low-level optimization, multi-threaded rendering stability, and document performance to the Android platform in Bangalore and Hsinchu.",
    type: "career"
  },
  {
    year: "2026",
    title: "Next Stop: Pricing & Analytics",
    event: "Joining Bloomberg Ireland",
    description: "Relocating to Dublin, Ireland as an Incoming Senior Software Engineer on the Pricing & Analytics team soon.",
    type: "career"
  }
];

export const quotesData: Quote[] = [
  {
    text: "Somewhere, something incredible is waiting to be known.",
    author: "Carl Sagan",
    category: "Cosmos"
  },
  {
    text: "What I cannot create, I do not understand.",
    author: "Richard Feynman",
    category: "Philosophy"
  },
  {
    text: "Learn something about everything and everything about something.",
    author: "Thomas Huxley",
    category: "Philosophy"
  }
];
