import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { profile } from "../data/content";
import { Reveal, SectionHeading } from "./ui";

const facts = [
  { label: "Based", value: profile.location },
  { label: "Study", value: `${profile.degree} · ${profile.school}` },
  { label: "Focus", value: "Product, backend, applied AI" },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [18, -18]);

  return (
    <section id="about" ref={ref} tabIndex={-1} className="px-5 py-24 outline-none md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <Reveal>
          <figure>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line shadow-[var(--pn-shadow)]">
              <motion.img
                src="/portrait.png"
                loading="lazy"
                decoding="async"
                alt="Portrait of Prasad Nathe"
                style={{ y }}
                className="absolute inset-x-0 -top-6 h-[115%] w-full max-w-none object-cover object-[center_18%]"
              />
              <figcaption className="glass absolute bottom-4 left-4 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em]">
                Pune, India
              </figcaption>
            </div>
          </figure>
        </Reveal>
        <div>
          <SectionHeading
            index="02"
            eyebrow="About"
            title="Thoughtful interfaces. Dependable systems."
          />
          <Reveal delay={0.05}>
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              <p>
                I’m a software engineer based in Pune, working across backend engineering, full-stack development,
                and applied AI. I care about the details that make a system useful and reliable.
              </p>
              <p>
                That has meant an e-learning marketplace with server-checked payments, a KYC copilot that reads the
                paperwork, and a GitHub analytics API that reports what a team actually shipped.
              </p>
              <p>
                At Infosys and KGamify, I worked on financial analytics, microservices, and recommendations.
                My B.Tech in Information Technology from VIIT Pune grounds that work in computer science fundamentals.
              </p>
            </div>
          </Reveal>
          <dl className="mt-10 grid gap-3 sm:grid-cols-3">
            {facts.map((fact) => (
              <Reveal key={fact.label} className="h-full rounded-2xl border border-line bg-elev p-4">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{fact.label}</dt>
                  <dd className="mt-2 text-sm leading-snug">{fact.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
