import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/content";
import { Magnetic } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

const notes = [
  { k: "01", title: "Full-stack products", body: "Interfaces, authentication, and payments." },
  { k: "02", title: "Backend systems", body: "APIs, data models, and real-time analytics." },
  { k: "03", title: "AI / GenAI", body: "Document intelligence, retrieval, and recommendations." },
  { k: "04", title: "Distributed systems", body: "Microservices, caching, and asynchronous processing." },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      tabIndex={-1}
      className="relative isolate flex min-h-[100svh] items-center px-5 pb-16 pt-28 md:px-8"

    >
      <div className="hero-spot pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid w-full max-w-[1180px] items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div>
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border border-line bg-elev px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="status-dot h-1.5 w-1.5 rounded-full bg-accent" />
            Open to engineering roles · Pune
          </motion.p>
          <motion.h1
            className="mt-6 text-[clamp(4.2rem,11vw,7.6rem)] font-medium leading-[0.84] tracking-[-0.055em]"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.05, ease }}
          >
            Prasad{" "}
            <span className="block">Nathe</span>
          </motion.h1>
          <motion.p
            className="gradient-text mt-6 max-w-xl font-serif text-[clamp(1.55rem,3vw,2.15rem)] italic leading-snug"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease }}
          >
            Software Engineer building scalable systems and intelligent products.
          </motion.p>
          <motion.p
            className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            From real-time financial analytics to AI paperwork copilots — I connect thoughtful interfaces
            with reliable services and data.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease }}
          >
            <Magnetic>
              <a href="#work" className="btn btn-primary">
                Selected work <ArrowUpRight size={16} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn btn-ghost">
                Contact
              </a>
            </Magnetic>
            <div className="ml-1 flex items-center gap-1">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer me"
                aria-label="GitHub"
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink"
              >
                <Github size={16} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer me"
                aria-label="LinkedIn"
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink"
              >
                <Linkedin size={16} />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink">
                <Mail size={16} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.aside
          className="glass relative overflow-hidden rounded-[28px] p-6 md:p-7"
          data-hot
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease }}
        >
          <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40" aria-hidden="true">
            <div className="orbit absolute inset-0 rounded-full border border-line">
              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_16px_var(--pn-accent)]" />
            </div>
            <div className="orbit-slow absolute inset-5 rounded-full border border-line">
              <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-iris" />
            </div>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Engineering focus</p>
          <p className="mt-3 max-w-[16ch] text-2xl leading-tight tracking-[-0.03em]">
            {profile.role}
            <span className="mt-1 block font-serif text-xl italic text-muted">{profile.focus}</span>
          </p>
          <ul className="mt-8 space-y-5">
            {notes.map((note) => (
              <li key={note.k} className="grid grid-cols-[auto_1fr] gap-4">
                <span className="font-mono text-[11px] text-accent">{note.k}</span>
                <div>
                  <p className="text-sm font-medium">{note.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{note.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
            Backend · Full-Stack · AI / GenAI · Distributed Systems
          </p>
        </motion.aside>
      </div>
    </section>
  );
}
