import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaFacebookF,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCode,
  FaBolt,
  FaLayerGroup,
  FaExternalLinkAlt,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaCloud,
  FaTools,
  FaGitAlt,
  FaLanguage,
  FaCubes,
  FaGraduationCap,
} from "react-icons/fa";
import { SiMongodb, SiTypescript, SiNextdotjs } from "react-icons/si";
import { HiArrowDown } from "react-icons/hi";
import portrait from "@/assets/Sumaiya_Jannat.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sumaiya Jannat — MERN Stack Developer Portfolio" },
      { name: "description", content: "Portfolio of Sumaiya Jannat, a MERN stack developer from Sylhet, Bangladesh, building modern web applications with React, Next.js, Node.js, and MongoDB." },
      { property: "og:title", content: "Sumaiya Jannat — MERN Stack Developer" },
      { property: "og:description", content: "MERN stack developer from Sylhet, Bangladesh." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

/* ---------- constants ---------- */
const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const SOCIALS = [
  { icon: FaGithub, href: "https://github.com/Sumaiya2209", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/sumaiya2209/", label: "LinkedIn" },
  { icon: FaFacebookF, href: "https://www.facebook.com/sumaiya.jannat.333461/", label: "Facebook" },
];

const SKILL_CATEGORIES = [
  { icon: FaReact, color: "primary", title: "Frontend", items: ["React.js", "Next.js 15", "React Native / Expo", "TypeScript", "JavaScript"] },
  { icon: FaNodeJs, color: "accent-green", title: "Backend", items: ["Node.js", "Express.js", "Serverless (Vercel)"] },
  { icon: SiMongodb, color: "accent-green", title: "Database", items: ["MongoDB (Atlas)"] },
  { icon: FaCloud, color: "accent-gold", title: "Cloud", items: ["Vercel", "Render", "Cloudinary"] },
  { icon: FaGitAlt, color: "primary", title: "DevOps", items: ["Git / GitHub", "EAS Build (Expo)", "ffmpeg"] },
  { icon: FaTools, color: "accent-gold", title: "Tools", items: ["GitHub Copilot", "VS Code"] },
  { icon: FaCubes, color: "accent-purple", title: "Frameworks & Libraries", items: ["Better Auth", "JWT", "Google OAuth", "Stripe", "Nodemailer", "WebSocket", "Groq / LLaMA"] },
  { icon: FaLanguage, color: "accent-green", title: "Languages", items: ["Bangla", "English"] },
];

const PROGRESS_SKILLS = [
  { name: "React / Next.js", pct: 90 },
  { name: "Node.js / Express", pct: 85 },
  { name: "MongoDB", pct: 80 },
  { name: "TypeScript", pct: 80 },
];

const PROJECTS = [
  {
    id: "scholarai",
    name: "ScholarAI",
    tagline: "Agentic AI research paper platform",
    category: "AI-Powered",
    description: "Students upload papers for admin review; once approved, papers go public. Groq LLM auto-generates summaries and key points; an AI chat assistant answers questions from paper content.",
    tech: ["Next.js 16", "TypeScript", "Tailwind v4", "TanStack Query", "Recharts", "Node/Express", "MongoDB", "Better Auth", "Groq (Llama 3.3 70B)", "Cloudinary"],
    github: "https://github.com/Sumaiya2209/scholarai-client",
    live: "https://scholarai-client.vercel.app",
    gradient: "from-[#F15A29] via-[#FF8A3D] to-[#FBBF24]",
  },
  {
    id: "medicare",
    name: "Medicare Connect",
    tagline: "Full-stack healthcare management platform",
    category: "Full-Stack",
    description: "Connects patients, doctors, and admins; digitizes the appointment lifecycle from doctor discovery to consultation and payment.",
    tech: ["Next.js 15", "Tailwind", "HeroUI v3", "Framer Motion", "Recharts", "Stripe.js", "Node/Express", "MongoDB Atlas", "Better Auth (JWT)"],
    github: "https://github.com/Sumaiya2209/medicare-client",
    live: null,
    gradient: "from-[#4ADE80] via-[#22D3EE] to-[#3B82F6]",
  },
  {
    id: "paws",
    name: "Paws & Home",
    tagline: "MERN pet adoption platform",
    category: "Full-Stack",
    description: "Browse pets, view profiles, submit adoption requests; shelters manage listings and approve or reject requests.",
    tech: ["React.js", "React Router", "Tailwind", "DaisyUI", "Firebase Auth", "React Hook Form", "TanStack Query", "Node.js", "Express.js", "MongoDB", "JWT"],
    github: "https://github.com/Sumaiya2209/Paws-frontend",
    live: "https://paws-frontend-three.vercel.app",
    gradient: "from-[#A855F7] via-[#EC4899] to-[#F15A29]",
  },
];

const FEATURES = [
  { icon: FaCode, ring: "primary", title: "Clean Code", desc: "Readable, typed, and maintainable — production-grade patterns from day one." },
  { icon: FaBolt, ring: "accent-green", title: "Fast & Scalable", desc: "Optimised MERN architectures that ship quickly and scale calmly under load." },
  { icon: FaLayerGroup, ring: "accent-gold", title: "Modern Stack", desc: "React, Next.js, Node, MongoDB, and AI-first tooling like Groq and Better Auth." },
];

const PROJECT_FILTERS = ["All", "Full-Stack", "AI-Powered"];

/* ---------- helpers ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

function ringColor(c: string) {
  return {
    primary: "ring-primary/40 text-primary bg-primary/10",
    "accent-green": "ring-[oklch(0.78_0.17_145)]/40 text-[oklch(0.78_0.17_145)] bg-[oklch(0.78_0.17_145)]/10",
    "accent-gold": "ring-[oklch(0.82_0.15_82)]/40 text-[oklch(0.82_0.15_82)] bg-[oklch(0.82_0.15_82)]/10",
    "accent-purple": "ring-[oklch(0.68_0.18_300)]/40 text-[oklch(0.68_0.18_300)] bg-[oklch(0.68_0.18_300)]/10",
  }[c] ?? "";
}

/* ============================= COMPONENTS ============================= */

function Preloader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1200);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          key="pre"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] as const }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl font-extrabold tracking-tight"
          >
            <span className="text-white">Sumaiya</span>
            <span className="text-primary">.</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] bg-primary"
    />
  );
}

function LogoMark() {
  return (
    <a href="#home" className="flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[0_8px_24px_-8px_oklch(0.68_0.18_40/0.6)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M13 2 3 14h7l-1 8 10-12h-7z" />
        </svg>
      </span>
      <span>
        <span className="text-white">Suma</span>
        <span className="text-primary">iya</span>
      </span>
    </a>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      const y = window.scrollY + 120;
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) setActive(n.id);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/70 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <LogoMark />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`group relative text-sm font-medium transition-colors ${
                active === n.id ? "text-primary" : "text-white/80 hover:text-primary"
              }`}
            >
              {n.label}
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300 ${
                  active === n.id ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full border-2 border-primary px-5 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground md:inline-flex"
        >
          Contact Me
        </a>

        <button
          onClick={() => setOpen((o) => !o)}
          className="grid h-10 w-10 place-items-center rounded-lg bg-card md:hidden"
          aria-label="Menu"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-white transition-all ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-white transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-white transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[72px] z-40 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-6 px-8 py-10">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.id}
                  href={`#${n.id}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setOpen(false)}
                  className="text-3xl font-display font-bold text-white hover:text-primary"
                >
                  {n.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV.length * 0.08 }}
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex w-fit rounded-full border-2 border-primary px-6 py-3 text-sm font-semibold text-primary"
              >
                Contact Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function ConfettiDots({ className = "" }: { className?: string }) {
  const dots = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: 4 + Math.random() * 6,
        c: ["bg-primary", "bg-[oklch(0.78_0.17_145)]", "bg-[oklch(0.82_0.15_82)]", "bg-[oklch(0.68_0.18_300)]"][i % 4],
        d: Math.random() * 2,
      })),
    [],
  );
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {dots.map((d) => (
        <motion.span
          key={d.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.6, y: [10, -6, 10] }}
          transition={{ duration: 5 + d.d, repeat: Infinity, delay: d.d }}
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.s, height: d.s }}
          className={`absolute rounded-full ${d.c}`}
        />
      ))}
    </div>
  );
}

function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 40" className={className} fill="none">
      <path
        d="M2 20 Q 20 2, 40 20 T 80 20 T 120 20 T 160 20 T 198 20"
        stroke="oklch(0.82 0.15 82)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TornPhoto({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 -m-2 rounded-[32px] bg-white torn-mask" aria-hidden />
      <div className="relative torn-mask overflow-hidden">
        <img src={src} alt={alt} className="h-full w-full object-cover" width={800} height={1000} />
      </div>
    </div>
  );
}

function TechBadge({
  label,
  color,
  className,
  delay = 0,
  Icon,
}: {
  label: string;
  color: string;
  className: string;
  delay?: number;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: { duration: 3 + delay, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className={`absolute z-10 flex items-center gap-2 rounded-2xl px-3 py-2 shadow-2xl backdrop-blur ${className}`}
      style={{ backgroundColor: color }}
    >
      <Icon className="h-5 w-5 text-white" />
      <span className="text-xs font-semibold text-white">{label}</span>
    </motion.div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <ConfettiDots />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-8 lg:px-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.15, delayChildren: 1.2 } } }}
        >
          <motion.p variants={fadeUp} className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            <span className="h-px w-8 bg-primary" /> Hello, I'm
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-display text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Sumaiya <br /> Jannat.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 text-2xl font-medium text-white/90 sm:text-3xl">
            A <span className="text-primary">MERN Stack Developer</span> <br className="hidden sm:block" />
            From <span className="text-[oklch(0.78_0.17_145)]">Sylhet</span>.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            I build modern, user-focused web applications using JavaScript, TypeScript, and the MERN stack — and sharpen my algorithmic thinking through competitive programming in C++.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-10px_oklch(0.68_0.18_40/0.7)] transition-transform hover:-translate-y-0.5"
            >
              View My Work
              <FaExternalLinkAlt className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </a>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full bg-card text-white/80 transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 1.4 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-md"
        >
          <div className="absolute inset-6 rounded-[40px] bg-gradient-to-br from-primary/30 via-transparent to-[oklch(0.78_0.17_145)]/20 blur-3xl" />
          <TornPhoto src={portrait} alt="Sumaiya Jannat" className="relative h-full w-full" />

          <TechBadge label="React" color="#61DAFB" className="-left-4 top-16 sm:-left-8" delay={0} Icon={FaReact} />
          <TechBadge label="Node" color="#3C873A" className="-right-2 top-1/3 sm:-right-6" delay={0.5} Icon={FaNodeJs} />
          <TechBadge label="Mongo" color="#116149" className="-left-2 bottom-24 sm:-left-6" delay={1} Icon={SiMongodb} />
          <TechBadge label="TS" color="#3178C6" className="-right-4 bottom-16 sm:-right-8" delay={1.5} Icon={SiTypescript} />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-white/60"
          >
            <span>Scroll</span>
            <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
              <HiArrowDown className="h-5 w-5" />
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
      <Squiggle className="pointer-events-none absolute right-8 top-24 hidden w-40 opacity-70 lg:block" />
    </section>
  );
}

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, inView };
}

function FeatureStrip() {
  const { ref, inView } = useReveal();
  return (
    <section ref={ref} className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
      <div className="grid gap-6 md:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group rounded-3xl bg-card p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]"
          >
            <motion.div
              whileHover={{ rotate: 8, scale: 1.08 }}
              className={`mb-6 grid h-16 w-16 place-items-center rounded-2xl ring-2 ${ringColor(f.ring)}`}
            >
              <f.icon className="h-7 w-7" />
            </motion.div>
            <h3 className="mb-2 text-xl font-bold text-white">{f.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function About() {
  const { ref, inView } = useReveal();
  return (
    <section id="about" ref={ref} className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <ConfettiDots className="opacity-40" />
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] as const }}
          className="relative mx-auto aspect-[4/5] w-full max-w-md"
        >
          <TornPhoto src={portrait} alt="Sumaiya Jannat about" className="h-full w-full" />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute -left-4 top-10 rounded-2xl bg-card px-5 py-4 shadow-2xl sm:-left-8"
          >
            <div className="font-display text-3xl font-extrabold text-[oklch(0.78_0.17_145)]">3+</div>
            <div className="text-xs text-muted-foreground">Projects Shipped</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="absolute -right-4 bottom-14 rounded-2xl bg-card px-5 py-4 shadow-2xl sm:-right-8"
          >
            <div className="font-display text-3xl font-extrabold text-[oklch(0.82_0.15_82)]">MERN</div>
            <div className="text-xs text-muted-foreground">Full-Stack Focus</div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="mb-3 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            <span className="h-px w-8 bg-primary" /> I'm a Developer
          </p>
          <h2 className="mb-6 font-display text-4xl font-extrabold text-white sm:text-5xl">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="mb-6 text-base leading-relaxed text-muted-foreground">
            I'm Sumaiya Jannat, a MERN stack developer from Sylhet. I build modern, user-focused web applications using JavaScript, TypeScript and the MERN stack. I'm also actively involved in competitive programming with C++, solving problems on Codeforces to sharpen my algorithmic thinking.
          </p>
          <div className="mb-8 grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-white/50">Location:</span> <span className="text-white">Sylhet, BD</span></div>
            <div><span className="text-white/50">Email:</span> <span className="text-white">sumaiyajannat2209@gmail.com</span></div>
            <div><span className="text-white/50">Phone:</span> <span className="text-white">01533029643</span></div>
            <div><span className="text-white/50">Study:</span> <span className="text-white">B.Sc. CSE, NEUB</span></div>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-10px_oklch(0.68_0.18_40/0.7)] transition-transform hover:-translate-y-0.5"
          >
            Let's Connect
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProgressBar({ name, pct, delay }: { name: string; pct: number; delay: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setCount(Math.round(p * pct));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const to = setTimeout(() => (raf = requestAnimationFrame(tick)), delay * 1000);
    return () => {
      clearTimeout(to);
      cancelAnimationFrame(raf);
    };
  }, [inView, pct, delay]);
  return (
    <div ref={ref}>
      <div className="mb-2 flex justify-between text-sm font-semibold">
        <span className="text-white">{name}</span>
        <span className="text-primary">{count}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] as const }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-[oklch(0.82_0.15_82)]"
        />
      </div>
    </div>
  );
}

function Skills() {
  const { ref, inView } = useReveal();
  return (
    <section id="skills" ref={ref} className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="mb-3 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            <span className="h-px w-8 bg-primary" /> My Skills
          </p>
          <h2 className="mb-6 font-display text-4xl font-extrabold text-white sm:text-5xl">
            Crafting with <span className="text-primary">Precision</span>
          </h2>
          <p className="mb-10 max-w-lg text-muted-foreground">
            A snapshot of the tools I reach for most. I care about typed, tested code and interfaces that feel calm to use.
          </p>
          <div className="space-y-6">
            {PROGRESS_SKILLS.map((s, i) => (
              <ProgressBar key={s.name} name={s.name} pct={s.pct} delay={i * 0.15} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-md"
        >
          <div className="absolute -top-6 left-6 right-6 h-8 rounded-full bg-gradient-to-r from-primary via-[oklch(0.82_0.15_82)] to-[oklch(0.78_0.17_145)] opacity-80 blur-sm" />
          <TornPhoto src={portrait} alt="Skills portrait" className="h-full w-full" />
        </motion.div>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SKILL_CATEGORIES.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.06 }}
            whileHover={{ y: -6 }}
            className="group rounded-3xl bg-card p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] transition-shadow hover:shadow-[0_30px_80px_-30px_oklch(0.68_0.18_40/0.4)]"
          >
            <div className={`mb-4 grid h-12 w-12 place-items-center rounded-xl ring-2 ${ringColor(c.color)} transition-transform group-hover:scale-110`}>
              <c.icon className="h-5 w-5" />
            </div>
            <h3 className="mb-3 text-lg font-bold text-white">{c.title}</h3>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {c.items.map((it) => (
                <li key={it} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {it}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const { ref, inView } = useReveal();
  const visible = PROJECTS.filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="projects" ref={ref} className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <ConfettiDots className="opacity-30" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
      >
        <div>
          <p className="mb-3 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            <span className="h-px w-8 bg-primary" /> Selected Work
          </p>
          <h2 className="font-display text-4xl font-extrabold text-white sm:text-5xl">
            Recent <span className="text-primary">Projects</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 rounded-full bg-card p-1.5">
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                filter === f ? "bg-primary text-primary-foreground shadow-lg" : "text-white/70 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.article
              layout
              key={p.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-3xl bg-card"
            >
              <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${p.gradient}`}>
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                  <div className="font-display text-4xl font-extrabold text-white/95 drop-shadow-lg">
                    {p.name.split(" ")[0]}
                  </div>
                </div>
                <div className="absolute inset-0 flex items-end justify-center gap-3 bg-black/70 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
                  >
                    <FaGithub className="h-3.5 w-3.5" /> GitHub
                  </a>
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:-translate-y-0.5"
                    >
                      <FaExternalLinkAlt className="h-3 w-3" /> Live
                    </a>
                  )}
                </div>
              </div>
              <div className="p-6">
                <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">{p.category}</div>
                <h3 className="mb-2 text-xl font-bold text-white">{p.name}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{p.tagline}</p>
                <p className="mb-4 text-sm leading-relaxed text-white/70">{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 6).map((t) => (
                    <span key={t} className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
                      {t}
                    </span>
                  ))}
                  {p.tech.length > 6 && (
                    <span className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/50">
                      +{p.tech.length - 6}
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function Education() {
  const { ref, inView } = useReveal();
  return (
    <section id="education" ref={ref} className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">Education</p>
        <h2 className="font-display text-4xl font-extrabold text-white sm:text-5xl">
          Currently <span className="text-primary">Learning</span>
        </h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mx-auto flex max-w-2xl items-center gap-6 rounded-3xl bg-card p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]"
      >
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary ring-2 ring-primary/30">
          <FaGraduationCap className="h-7 w-7" />
        </div>
        <div className="min-w-0">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">4th Year Undergraduate</div>
          <h3 className="text-xl font-bold text-white">B.Sc. (Engg) in CSE</h3>
          <p className="text-sm text-muted-foreground">North East University Bangladesh</p>
        </div>
      </motion.div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Currently open to opportunities — internships, junior roles, and interesting collaborations.
      </p>
    </section>
  );
}

function Contact() {
  const { ref, inView } = useReveal();
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" ref={ref} className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="mb-3 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            <span className="h-px w-8 bg-primary" /> Get in Touch
          </p>
          <h2 className="mb-6 font-display text-4xl font-extrabold text-white sm:text-5xl">
            Let's Build <span className="text-primary">Together</span>
          </h2>
          <p className="mb-10 max-w-md text-muted-foreground">
            Have a project, a question, or just want to say hi? Drop a message — I'll get back within a day or two.
          </p>
          <ul className="space-y-5">
            {[
              { icon: FaEnvelope, label: "Email", value: "sumaiyajannat2209@gmail.com", href: "mailto:sumaiyajannat2209@gmail.com", color: "primary" },
              { icon: FaPhone, label: "Phone", value: "01533029643", href: "tel:01533029643", color: "accent-green" },
              { icon: FaMapMarkerAlt, label: "Location", value: "Sylhet, Bangladesh", color: "accent-gold" },
            ].map((c) => {
              const inner = (
                <>
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ring-2 ${ringColor(c.color)}`}>
                    <c.icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wider text-white/50">{c.label}</span>
                    <span className="block truncate text-sm font-semibold text-white">{c.value}</span>
                  </span>
                </>
              );
              return (
                <li key={c.label} className="flex items-center gap-4">
                  {c.href ? (
                    <a href={c.href} className="flex items-center gap-4 transition-opacity hover:opacity-80">{inner}</a>
                  ) : (
                    inner
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-full bg-card text-white/80 transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const body = encodeURIComponent(String(data.get("message") ?? ""));
            const subject = encodeURIComponent(`Portfolio inquiry from ${data.get("name") ?? ""}`);
            window.location.href = `mailto:sumaiyajannat2209@gmail.com?subject=${subject}&body=${body}`;
            setSent(true);
            setTimeout(() => setSent(false), 3000);
          }}
          className="rounded-3xl bg-card p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]"
        >
          <div className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/60">Name</span>
                <input required name="name" type="text" className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white outline-none ring-primary/40 transition focus:ring-2" placeholder="Your name" />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/60">Email</span>
                <input required name="email" type="email" className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white outline-none ring-primary/40 transition focus:ring-2" placeholder="you@example.com" />
              </label>
            </div>
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/60">Message</span>
              <textarea required name="message" rows={5} className="w-full resize-none rounded-xl bg-white/5 px-4 py-3 text-sm text-white outline-none ring-primary/40 transition focus:ring-2" placeholder="Tell me about the project…" />
            </label>
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-10px_oklch(0.68_0.18_40/0.7)]"
            >
              {sent ? "Opening mail…" : "Send Message"}
              <FaExternalLinkAlt className="h-3 w-3" />
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10">
      <Squiggle className="pointer-events-none absolute left-8 top-4 hidden w-28 opacity-40 md:block" />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row lg:px-10">
        <LogoMark />
        <div className="flex gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="grid h-10 w-10 place-items-center rounded-full bg-card text-white/70 transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
            >
              <s.icon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Sumaiya Jannat. Built with React & Framer Motion.
        </p>
      </div>
    </footer>
  );
}

function Portfolio() {
  return (
    <div className="relative min-h-screen bg-background">
      <Preloader />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <FeatureStrip />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
