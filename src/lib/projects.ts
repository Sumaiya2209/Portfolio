import scholaraiImg from "@/assets/scholarai.png";
import medicareImg from "@/assets/medicare.png";
import pawsImg from "@/assets/paws.png";

export type Project = {
  id: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  tech: string[];
  stack: string[];
  challenges: string[];
  improvements: string[];
  github: string;
  live: string | null;
  image: string;
};

export const PROJECTS: Project[] = [
  {
    id: "scholarai",
    name: "ScholarAI",
    tagline: "Agentic AI research paper platform",
    category: "AI-Powered",
    description:
      "Students upload papers for admin review; once approved, papers go public. Groq LLM auto-generates summaries and key points; an AI chat assistant answers questions from paper content.",
    tech: [
      "Next.js 16",
      "TypeScript",
      "Tailwind v4",
      "TanStack Query",
      "Recharts",
      "Node/Express",
      "MongoDB",
      "Better Auth",
      "Groq (Llama 3.3 70B)",
      "Cloudinary",
    ],
    stack: ["Next.js 16", "TypeScript", "Tailwind v4", "Recharts", "MongoDB", "Groq LLM"],
    challenges: [
      "Integrating Groq for reliable document summarization.",
      "Designing review flows for secure student upload approvals.",
    ],
    improvements: [
      "Add user dashboards for paper analytics.",
      "Support multi-language paper summarization.",
    ],
    github: "https://github.com/Sumaiya2209/scholarai-client",
    live: "https://scholarai-client.vercel.app",
    image: scholaraiImg,
  },
  {
    id: "medicare",
    name: "Medicare Connect",
    tagline: "Full-stack healthcare management platform",
    category: "Full-Stack",
    description:
      "Connects patients, doctors, and admins; digitizes the appointment lifecycle from doctor discovery to consultation and payment.",
    tech: ["Next.js 15", "Tailwind", "HeroUI v3", "Framer Motion", "Recharts", "Stripe.js", "Node/Express", "MongoDB Atlas", "Better Auth (JWT)"],
    stack: ["Next.js", "Tailwind", "Node.js", "Express", "MongoDB Atlas", "Stripe"],
    challenges: [
      "Building a reliable appointment booking workflow.",
      "Ensuring user role separation for doctors, patients, and admins.",
    ],
    improvements: [
      "Implement in-app messaging between patients and doctors.",
      "Add patient medical record versioning.",
    ],
    github: "https://github.com/Sumaiya2209/medicare-client",
    live: "https://medicare-client-five.vercel.app",
    image: medicareImg,
  },
  {
    id: "paws",
    name: "Paws & Home",
    tagline: "MERN pet adoption platform",
    category: "Full-Stack",
    description:
      "Browse pets, view profiles, submit adoption requests; shelters manage listings and approve or reject requests.",
    tech: ["React.js", "React Router", "Tailwind", "DaisyUI", "Firebase Auth", "React Hook Form", "TanStack Query", "Node.js", "Express.js", "MongoDB", "JWT"],
    stack: ["React", "Tailwind", "Node.js", "Express", "MongoDB", "Firebase Auth"],
    challenges: [
      "Designing a pet adoption flow that feels trustworthy.",
      "Syncing shelter approvals with user requests in real time.",
    ],
    improvements: [
      "Add push notifications for request status updates.",
      "Introduce a shelter admin analytics dashboard.",
    ],
    github: "https://github.com/Sumaiya2209/Paws-frontend",
    live: "https://paws-frontend-three.vercel.app",
    image: pawsImg,
  },
];

export const getProjectById = (id?: string) => PROJECTS.find((project) => project.id === id);
