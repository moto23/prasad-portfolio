import { motion, useReducedMotion } from "framer-motion";
import { experience } from "../data/content";
import { SectionHeading } from "./ui";

export function Experience() {
  const reduce = useReducedMotion();

  return (
    <section id="experience" tabIndex={-1} className="px-5 py-24 outline-none md:px-8 md:py-32">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading
          index="04"
          eyebrow="Experience"
          title="A short record of the work."
          lede="Backend services, real-time analytics, and AI-powered recommendations."
        />
        <ol className="relative ml-2 space-y-5 border-l border-line">
          {experience.map((item, index) => (
            <motion.li
              key={item.org}
              className="relative pl-6 md:pl-10"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.6, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className="absolute -left-[5px] top-8 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent" />
                <article className="rounded-[28px] border border-line bg-elev p-6 md:p-8">
                  <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                    <div>
                      <h3 className="text-2xl tracking-[-0.03em]">{item.role}</h3>
                      <p className="mt-1 text-muted">{item.org}</p>
                    </div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{item.period}</p>
                  </div>
                  <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-muted">
                    {item.points.map((point) => (
                      <li key={point} className="grid grid-cols-[auto_1fr] gap-3">
                        <span className="mt-2 h-1 w-1 rounded-full bg-accent" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
