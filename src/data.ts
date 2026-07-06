import { TechSkill, ExperienceItem, ProjectItem, BlogPost, ArtWork, CosmosNote, Book, Milestone, Quote } from "./types";

export const skillsData: TechSkill[] = [
  { name: "Distributed Systems", category: "Backend/Systems", level: 5, description: "Designed high-throughput APIs, queue processing buffers, and low-latency client connectors." },
  { name: "Golang / Go", category: "Languages", level: 5, description: "Highly proficient in high-concurrency patterns, channels design, and lightweight backends." },
  { name: "C++ / Java", category: "Languages", level: 4, description: "Low-level system integrations, memory-safe execution, and high-performance threading interfaces." },
  { name: "Android Platform", category: "Mobile/Frontend", level: 5, description: "Deep understanding of Android internals, custom rendering engines, and graphics layout profiles." },
  { name: "System Design", category: "Backend/Systems", level: 5, description: "Architected multi-region transactional systems, rate limiters, and highly available cluster networks." },
  { name: "Cloud Infrastructure", category: "Infrastructure", level: 4, description: "Orchestrating container services, IAM profiles, CI/CD telemetry, and secure cloud storage." }
];

export const experienceData: ExperienceItem[] = [
  {
    id: "bloomberg",
    company: "Bloomberg",
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
    id: "pdf-rendering",
    title: "Android PDF Rendering Engine",
    subtitle: "Low-level performance optimization on AOSP",
    description: "Re-engineered core thread scheduling and resource recycling profiles in the Android Open Source Project (AOSP) to enable butter-smooth rendering of complex PDF document components.",
    problem: "Existing document utilities on Android suffered massive memory spikes and stuttering frame rates during swift zooms on large files.",
    architecture: [
      "Dynamic bitmap pre-caching for surrounding layout pages.",
      "Offloading heavy vector math to native background threads via NDK.",
      "GPU-accelerated hardware layers allocation for smooth scale animations."
    ],
    techStack: ["Kotlin", "C++", "Android NDK", "AOSP Rendering API", "Systrace"],
    challenges: "Avoiding garbage-collection pauses during active zoom gestures on lower-spec hardware.",
    outcome: "Reduced peak memory usage by 35% and stabilized document scrolls to a locked 60 FPS.",
    category: "Android"
  },
  {
    id: "investment-apis",
    title: "Investment APIs & Concurrency Gateway",
    subtitle: "High-throughput financial basket transactions",
    description: "A robust transactional gateway engineered in Go to handle high-concurrency order placement and secure portfolio rebalancing across multiple external brokerages.",
    problem: "Heavy load spikes during market-open led to connection timeouts and ambiguous transaction states from partner servers.",
    architecture: [
      "Idempotency token registry using distributed Redis locks.",
      "Asynchronous retry buffers with jitter-controlled backoffs.",
      "Dynamic rate-limiting buckets adjusted by active broker response latencies."
    ],
    techStack: ["Golang", "Redis", "PostgreSQL", "gRPC", "Docker"],
    challenges: "Preventing duplicate orders when API connections dropped in mid-flight.",
    outcome: "Successfully processed thousands of portfolio buys per second with order errors dropping below 0.1%.",
    category: "Backend"
  },
  {
    id: "telemetry-logging",
    title: "High-Performance Telemetry & Data Logging",
    subtitle: "Real-time system state monitoring",
    description: "Designed a lightweight, memory-efficient diagnostic logging library in Go to capture thread execution timelines and memory allocation maps across production microservices.",
    problem: "Standard logging frameworks added excessive locking overhead, degrading service performance under high requests.",
    architecture: [
      "Lock-free ring-buffer queue to hand off logs to background writers.",
      "Asynchronous batching flush to memory-mapped local storage.",
      "Passive backpressure throttling to discard debug spans under high system load."
    ],
    techStack: ["Golang", "Linux Epoll", "mmap", "Benchmark Diagnostics"],
    challenges: "Logging microsecond execution metrics without causing CPU cache misses on critical business logic threads.",
    outcome: "Achieved telemetry gathering with < 1% CPU utilization, handling over 500,000 logs/sec locally.",
    category: "Distributed Systems"
  },
  {
    id: "astronomy-visualizer",
    title: "Astronomy Notebook & Orbit Simulator",
    subtitle: "Physics-inspired browser playground",
    description: "An elegant, interactive 2D orbital gravity simulation created to calculate and visually paint planetary movements, orbits, and planetary attractions in real-time.",
    problem: "Standard physics calculations in browsers easily bottleneck the main UI thread during multi-body simulations.",
    architecture: [
      "Run run-loop calculations inside light background Web Workers.",
      "Utilize Verlet integration for high-accuracy path calculations.",
      "Render orbits fluidly on high-DPI HTML Canvas overlays."
    ],
    techStack: ["React", "HTML5 Canvas", "Web Workers", "Verlet Physics", "Tailwind CSS"],
    challenges: "Ensuring orbital paths remain stable over extended runs without cumulative floating-point drift.",
    outcome: "Allows visitors to place custom mass hubs in space and interactively observe real-time gravitational slingshots at a smooth 60 FPS.",
    category: "System Design"
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "scaling-otp-gateway",
    title: "Scaling One-Time Passwords: A 99.99% Reliable Auth Gateway",
    excerpt: "How we designed a custom OTP and SSO service to support over 500k monthly requests, mitigate bot networks by 90%, and reduce fraudulent registrations.",
    content: `When scaling consumer platforms or fintech apps, user authentication is the single most critical gateway. If login drops, your entire business is effectively down.

In my tenure at Smallcase, we designed and deployed a custom, secure OTP (One-Time Password) service from scratch to handle over 500,000 monthly authentication requests across SMS, email, and SSO.

### 1. Defending Against Distributed SMS Pump Attacks
SMS pump fraud occurs when automated botnets trigger massive spikes of OTP requests to high-cost premium carrier destinations, running up thousands of dollars in toll charges. 

To mitigate this abuse by over 90% and save $15,000 USD in infrastructure overhead:
* **JA3 Fingerprinting**: We analyzed incoming TLS handshakes to spot automated bots bypassing standard browser headers.
* **IP Reputation & Geo-Fencing**: Integrated AWS WAF and CloudFront rules to throttle suspicious request frequencies dynamically.
* **Leaky Bucket Throttling**: Designed custom rate-limiting queues in Redis mapped to both device signatures and destination phone subnets.

### 2. Safeguarding Session Transitions
SSO transitions and token handshakes must happen atomically. By leveraging a high-performance Redis cache for transient verification tokens with strict TTL expirations, we ensured 99.99% uptime while protecting customer account creations from replay attacks.`,
    category: "System Design",
    readTime: "7 min read",
    date: "May 12, 2024"
  },
  {
    id: "android-pdf-rendering",
    title: "Android PDF Internals: Memory Pooling & High-Fidelity Rendering",
    excerpt: "A deep dive into vector rasterization, bitmap caching, and rendering layout performance optimization within the Jetpack PDF library.",
    content: `Most developers assume displaying a PDF document on mobile is as simple as launching an intent. But if you're building a native document experience within the Jetpack PDF library, you quickly encounter extreme hardware limits.

In large, vector-rich PDFs (exceeding 100 pages), swift zooming and panning can instantly trigger massive memory allocation spikes, resulting in Garbage Collection (GC) pauses and stuttering frame rates.

Here are the key systems optimizations we implemented to achieve a locked 60 FPS scroll and a 35% reduction in peak memory usage:

### 1. The Power of Bitmap Pooling
Allocating a high-resolution bitmap on every zoom change is a performance killer. Instead, we established a **Bitmap Pool**. 
* When a page scrolls out of view, its bitmap isn't garbage collected; it is marked as "recyclable."
* When a new page enters the viewport, we fetch a matching bitmap structure from the pool and re-render the vector content directly onto it.
* This completely bypasses expensive runtime heap allocations.

### 2. FastScroller Accessibility
Accessibility is a core pillar of system software. By making the FastScroller screen reader-friendly, we enabled visually impaired users to seamlessly navigate heavy documents with precise page spoken feedback, making the Android PDF viewer highly compliant with worldwide standards.`,
    category: "Engineering Lessons",
    readTime: "9 min read",
    date: "Jan 18, 2025"
  },
  {
    id: "mdns-discovery-stability",
    title: "mDNS Discovery Stability: Debugging Broadcasts in Local Topologies",
    excerpt: "Resolving discovery race conditions and memory leaks when broadcasting setup ports via HubAdvertisingClient and NanoHTTPD.",
    content: `Setting up screenless smart-home devices is notorious for flaky user experiences. During the GHP 3P Hub Activation (OOBE 2.0) project at Google, we aimed to completely automate hub onboarding using local mDNS (Multicast DNS) broadcasting.

The architecture was simple:
1. The smart hub hosts a lightweight device-side setup server using **NanoHTTPD**.
2. A custom **HubAdvertisingClient** broadcasts the server's port and discovery codes using DNS-SD (Service Discovery) over mDNS.
3. The setup app discovers this broadcast and automatically initiates the secure handshake.

### The Subnet Collision Challenge
During field testing, we noticed a critical crash occurring when multiple smart hubs with the same partner ID were active on the exact same local subnet. The incoming broadcast packets triggered a race condition in the discovery parser, leading to infinite lookup loops and thread exhaustion.

### The Stabilization Strategy
By implementing strict packet deduplication, stabilizing mDNS port collisions, and adding defensive packet validation on the device-side NanoHTTPD server, we resolved the race condition entirely. This boosted hub discovery success rates by 40% and established a rock-solid foundation for screenless smart-home onboarding.`,
    category: "Distributed Systems",
    readTime: "8 min read",
    date: "Nov 02, 2025"
  }
];

export const personalInterestsData = {
  cosmos: [
    {
      id: "black-holes",
      title: "Black Holes & Relativity",
      topic: "Cosmology" as const,
      description: "My personal study logs exploring Hawking radiation, the informational paradox, and Schwarzschild geometry.",
      notes: [
        "Event Horizon: The coordinate boundary where escape velocity equals light speed. Rs = 2GM/c².",
        "The Information Paradox: Quantum mechanics requires information to be conserved (unitarity), but Hawking radiation suggests black holes evaporate completely. Where does the historical state data go?",
        "Holographic Principle: Leonard Susskind proposed that 3D volume information is encoded on the 2D boundary of the event horizon, much like a hologram."
      ],
      interactiveComponent: "gravity-well"
    },
    {
      id: "quantum-superposition",
      title: "Quantum Mechanics & Superposition",
      topic: "Quantum Physics" as const,
      description: "Notes exploring the linear algebra of qubits, Bloch spheres, and the absolute beauty of quantum coherence.",
      notes: [
        "Qubits exist as a superposition state |ψ⟩ = α|0⟩ + β|1⟩, where α and β are complex amplitudes.",
        "Entanglement represents a non-separable wave function. Measuring one particle collapses the state of both instantly, but transfers zero physical information faster than light.",
        "Coherence is highly fragile. Any external thermal vibration or interaction collapses the quantum state, making qubit scaling an incredible hardware challenge."
      ],
      interactiveComponent: "quantum-qubit"
    },
    {
      id: "james-webb-discoveries",
      title: "James Webb discoveries & Cosmology",
      topic: "Astrophysics" as const,
      description: "Tracking gravitational lensing, red-shifted ancient galaxy structures, and deep field infrared captures.",
      notes: [
        "Infrared Redshift: As space expands, ancient ultraviolet and visible starlight gets stretched into the infrared spectrum, which is fully observable by JWST.",
        "Mature Early Galaxies: Observations show highly structured galaxies existing just 300M years after the Big Bang, challenging standard speed-of-formation models.",
        "Exoplanet Spectroscopy: Measuring light filtering through planetary atmospheres to detect chemical biosignatures like methane and water vapor."
      ]
    }
  ],
  art: [
    {
      id: "user-art-gaara",
      title: "Gaara of the Sand",
      medium: "Pencil & Ink Sketch",
      description: "A hand-drawn pencil and ink sketch of Gaara, focusing on the character's signature intense expression and cracked sand armor texture.",
      year: "2024",
      imageUrl: "/input_file_0.png",
      category: "Sketches" as const
    },
    {
      id: "user-art-plants",
      title: "Serene Botanicals",
      medium: "Digital Illustration (Tablet)",
      description: "A vibrant digital sketch of potted indoor plants and flowers on a shelf, experimenting with clean linework and bold block coloring.",
      year: "2025",
      imageUrl: "/input_file_1.png",
      category: "Digital" as const
    },
    {
      id: "user-art-gohan",
      title: "The Gohan Legacy",
      medium: "Pencil Sketch",
      description: "A detailed hand-drawn pencil sketch of Gohan, highlighting sharp, classic anime linework and deep shading.",
      year: "2024",
      imageUrl: "/input_file_3.png",
      category: "Sketches" as const
    },
    {
      id: "user-art-patterns",
      title: "Geometric Cosmos",
      medium: "Colored Fineliner Design",
      description: "An intricate exploration of hand-drawn geometric patterns and symmetries, inspired by the mathematical structure of deep-sky alignments.",
      year: "2025",
      imageUrl: "/input_file_4.png",
      category: "Sketches" as const
    },
    {
      id: "user-art-moon",
      title: "Midnight Lunar Reflection",
      medium: "Digital Painting",
      description: "A calm digital painting showing a full moon suspended in a starry night, reflecting a soft trail of light over gentle ocean waves.",
      year: "2025",
      imageUrl: "/input_file_5.png",
      category: "Digital" as const
    },
    {
      id: "art-1",
      title: "The Pillars of Creation",
      medium: "Generative Canvas Sketch",
      description: "An abstract generative depiction of the stellar nursery, utilizing mathematical noise vectors to simulate the flow of cosmic dust and gas clouds in deep space.",
      year: "2025",
      imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop",
      category: "Generative" as const
    },
    {
      id: "art-2",
      title: "Singularity's Pull",
      medium: "Ink and Fine-Liner Sketch",
      description: "A hand-drawn sketch detailing the warping of spacetime around a Schwarzschild black hole. Drawn with high-density fine-liners to represent accretion disk shear lines.",
      year: "2024",
      imageUrl: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=800&auto=format&fit=crop",
      category: "Sketches" as const
    },
    {
      id: "art-3",
      title: "Andromeda Rising",
      medium: "Astrophotography (Stack of 40 exposures)",
      description: "My capture of the Andromeda Galaxy (M31) from a Class 3 dark sky site, processed using deep-sky stacking software to highlight the dust lanes and satellite galaxies.",
      year: "2025",
      imageUrl: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=800&auto=format&fit=crop",
      category: "Astrophotography" as const
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
    event: "Relocated to Google Bangalore & Taiwan",
    description: "Contributed low-level optimization, multi-threaded rendering stability, and document performance to the Android platform in Bangalore and Hsinchu.",
    type: "career"
  },
  {
    year: "2026",
    title: "Next Stop: Pricing & Analytics",
    event: "Joining Bloomberg Ireland",
    description: "Relocating to Dublin, Ireland as an Incoming Senior Software Engineer on the Pricing & Analytics team next month.",
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
    text: "Distributed systems are systems where the failure of a computer you didn't even know existed can render your own computer unusable.",
    author: "Leslie Lamport",
    category: "Engineering"
  }
];
