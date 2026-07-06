export interface TechSkill {
  name: string;
  category: "Languages" | "Backend/Systems" | "Infrastructure" | "Mobile/Frontend";
  level: number; // 1 to 5
  description: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  projects: {
    name: string;
    description: string;
    impact: string[];
    challenges: string;
    learnings: string;
  }[];
  technologies: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  architecture: string[]; // Steps/stages in flow
  techStack: string[];
  challenges: string;
  outcome: string;
  githubUrl?: string;
  demoUrl?: string;
  category: "Distributed Systems" | "Backend" | "System Design" | "Android";
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: "System Design" | "Distributed Systems" | "Databases" | "Concurrency" | "Engineering Lessons";
  readTime: string;
  date: string;
}

export interface ArtWork {
  id: string;
  title: string;
  medium: string;
  description: string;
  year: string;
  imageUrl: string; // Generative art or description-based fallback
  category: "Digital" | "Sketches" | "Generative" | "Astrophotography";
}

export interface CosmosNote {
  id: string;
  title: string;
  topic: "Cosmology" | "Quantum Physics" | "Astrophysics" | "General Relativity";
  description: string;
  notes: string[];
  interactiveComponent?: string; // Identifier for interactive widgets
}

export interface Book {
  title: string;
  author: string;
  status: "reading" | "completed" | "queued";
  rating?: number;
  review?: string;
  coverColor: string;
}

export interface Milestone {
  year: string;
  title: string;
  event: string;
  description: string;
  type: "academic" | "career" | "personal" | "cosmic";
}

export interface Quote {
  text: string;
  author: string;
  category: "Engineering" | "Cosmos" | "Philosophy";
}
