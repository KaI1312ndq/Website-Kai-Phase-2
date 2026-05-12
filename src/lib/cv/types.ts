export type CVTemplate = "ats" | "visual" | "hybrid";

export type CVExperience = {
  id: string;
  role: string;
  company: string;
  location?: string;
  startDate: string;  // YYYY-MM
  endDate: string;    // YYYY-MM or "present"
  bullets: string[];
};

export type CVEducation = {
  id: string;
  school: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  activities?: string;
};

export type CVProject = {
  id: string;
  name: string;
  description: string;
  url?: string;
  tech?: string;
};

export type CVCertification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
};

export type CVData = {
  personal: {
    fullName: string;
    tagline: string;       // VD "Performance Marketer - 2 năm exp"
    email: string;
    phone: string;
    location?: string;     // VD "Hà Nội"
    linkedinUrl?: string;
    portfolioUrl?: string;
  };
  experience: CVExperience[];
  education: CVEducation[];
  skills: {
    hard: string[];
    soft: string[];
    languages: Array<{ name: string; level: string }>;
  };
  projects?: CVProject[];
  certifications?: CVCertification[];
  summary?: string;       // 2-3 câu intro
};

export const EMPTY_CV: CVData = {
  personal: { fullName: "", tagline: "", email: "", phone: "" },
  experience: [],
  education: [],
  skills: { hard: [], soft: [], languages: [] },
  projects: [],
  certifications: [],
  summary: "",
};

export type AIFeedback = {
  atsScore: number;          // 1-10
  strengths: string[];        // 3-5 items
  weaknesses: string[];       // 3-5 items
  suggestions: Array<{ section: string; original?: string; tip: string }>;
  generatedAt: string;
};

export type QuotaStatus = {
  freeDownloadsUsed: number;
  freeDownloadsRemaining: number;
  isPro: boolean;
  aiFeedbackUsed: number;
  aiFeedbackRemaining: number;
};
