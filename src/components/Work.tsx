import type { PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "../data/content";
import { Reveal, SectionHeading } from "./ui";

function ProjectVisual({ project, index }: { project: Project; index: number }) {
  return (
    <div className="project-visual flex h-full min-h-64 flex-col justify-between gap-8 p-6 md:p-8">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        <span>{project.category}</span><span>0{index + 1}</span>
      </div>
      <div className="space-y-3">
        {project.flow?.map((step, stepIndex) => (
          <div key={step} className="flex items-center gap-4">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line font-mono text-xs text-accent">{stepIndex + 1}</span>
            <span className="min-w-0 flex-1 rounded-xl border border-line bg-elev px-4 py-3 text-sm">{step}</span>
          </div>
        ))}
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">System overview</p>
    </div>
  );
}

function onGlow(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--gx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--gy", `${event.clientY - rect.top}px`);
}

function Card({ project, index }: { project: Project; index: number }) {
  const featured = index === 0;
  return (
    <article
      className={`project-card group h-full p-4 md:p-5 ${featured ? "md:grid md:grid-cols-2 md:items-stretch md:gap-6" : ""}`}
      onPointerMove={onGlow}
    >
      {project.flow ? (
        <div className="relative overflow-hidden rounded-[22px] border border-line">
          <ProjectVisual project={project} index={index} />
        </div>
      ) : null}
      <div className="relative z-10 flex flex-col px-1 pb-2 pt-5 md:px-2 md:pt-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-[1.65rem] font-medium tracking-[-0.03em] transition-colors group-hover:text-accent">
            {project.name}
          </h3>
          <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{project.year}</span>
        </div>
        {project.outcome ? <p className="mt-3 text-sm font-medium text-accent">{project.outcome}</p> : null}
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li key={item} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              aria-label={`${project.name} live site`}
            >
              Live <ArrowUpRight size={15} />
            </a>
          ) : null}
          <a
            href={project.code}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
            aria-label={`${project.name} source code`}
          >
            Source <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section id="work" tabIndex={-1} className="px-5 py-24 outline-none md:px-8 md:py-32">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading
          index="01"
          eyebrow="Selected work"
          title="From complex problems to working products."
          lede="Document intelligence, developer analytics, and learning platforms — built across the stack."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {projects.slice(0, 3).map((project, index) => (
            <Reveal key={project.name} className={index === 0 ? "md:col-span-2" : ""} delay={index === 0 ? 0 : 0.05}>
              <Card project={project} index={index} />
            </Reveal>
          ))}
        </div>
        <div className="mt-12">
          <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-faint">More engineering work</h3>
          <div className="grid gap-5 lg:grid-cols-3">
            {projects.slice(3).map((project, index) => (
              <Reveal key={project.name}><Card project={project} index={index + 3} /></Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
