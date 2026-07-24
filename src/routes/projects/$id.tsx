import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaExternalLinkAlt, FaGithub, FaArrowLeft } from "react-icons/fa";
import { Link } from "@tanstack/react-router";
import { getProjectById, PROJECTS } from "@/lib/projects";

export const Route = createFileRoute("/projects/$id")({
  head: ({ params }) => {
    const project = getProjectById(params.id);
    return {
      meta: [
        { title: project ? `${project.name} — Project Details` : "Project not found" },
        { name: "description", content: project?.description ?? "Project details page" },
      ],
    };
  },
  component: ProjectDetails,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, inView };
}

function ProjectDetails() {
  const { ref, inView } = useReveal();
  const params = Route.useParams();
  const project = useMemo(() => getProjectById(params.id), [params.id]);

  if (!project) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-24 lg:px-10">
        <div className="rounded-3xl bg-card p-12 text-center shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]">
          <h1 className="mb-4 text-4xl font-bold text-white">Project Not Found</h1>
          <p className="mb-8 text-sm text-muted-foreground">The project you are looking for does not exist or the URL is invalid.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            <FaArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main id="project-details" ref={ref} className="mx-auto max-w-6xl px-6 py-24 lg:px-10">
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={{
          hidden: fadeUp.hidden,
          show: fadeUp.show,
        }}
        className="mb-10 flex flex-col gap-6 rounded-3xl bg-card p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Project Details</p>
            <h1 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">{project.name}</h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{project.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Live Demo
                <FaExternalLinkAlt className="h-3.5 w-3.5" />
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              GitHub Client
            </a>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <img src={project.image} alt={`${project.name} screenshot`} className="mb-6 w-full rounded-3xl object-cover shadow-2xl" />
            <div className="mb-6 rounded-3xl bg-background/70 p-6">
              <h2 className="mb-4 text-xl font-bold text-white">Project Overview</h2>
              <p className="text-sm leading-relaxed text-white/70">{project.description}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl bg-background/70 p-6">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Challenges</h3>
                <ul className="space-y-3 text-sm text-white/70">
                  {project.challenges.map((challenge) => (
                    <li key={challenge} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-background/70 p-6">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Future Improvements</h3>
                <ul className="space-y-3 text-sm text-white/70">
                  {project.improvements.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="space-y-6 rounded-3xl bg-background/70 p-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/80">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">All Tools & Technologies</h3>
              <div className="grid gap-2">
                {project.tech.map((item) => (
                  <span key={item} className="rounded-2xl bg-card px-4 py-2 text-sm text-white/70">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-card p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Quick Links</h3>
              <div className="flex flex-col gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
                >
                  Back to portfolio
                </Link>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Visit live site
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
