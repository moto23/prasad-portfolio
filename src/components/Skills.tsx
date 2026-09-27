import { motion, useReducedMotion } from "framer-motion";
import { skillGroups } from "../data/content";
import { SectionHeading } from "./ui";

export function Skills() {
  const reduce = useReducedMotion();

  return (
    <section id="skills" tabIndex={-1} className="px-5 py-24 outline-none md:px-8 md:py-32">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading
          index="03"
          eyebrow="Skills"
          title="A stack gathered from shipped work."
          lede="Grouped by where each tool sits. These are the ones I reach for when the problem is concrete."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {skillGroups.map((group, groupIndex) => (
            <motion.article
              key={group.label}
              className="rounded-[28px] border border-line bg-elev p-6 md:p-7"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.6, delay: groupIndex * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{group.label}</h3>
              <motion.ul
                className="mt-5 flex flex-wrap gap-2"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: reduce ? 0 : 0.035, delayChildren: 0.05 } },
                }}
              >
                {group.items.map((item) => (
                  <motion.li
                    key={item}
                    className="pill rounded-full px-3 py-1.5 text-sm text-ink"
                    variants={{
                      hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 8 },
                      show: { opacity: 1, y: 0 },
                    }}
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
