import { certifications, profile } from "../data/content";
import { SectionHeading } from "./ui";

export function Stats() {
  return (
    <section id="achievements" tabIndex={-1} className="band px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading index="06" eyebrow="Achievements" title="Practice, recognition, and progress." />
        <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["500+", "DSA problems solved"],
            ["400+", "Users served at KGamify"],
            ["90%", "Unit test coverage at Infosys"],
            ["6", "Repositories analysed in DevDynamics"],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="text-sm text-muted">{label}</dt>
              <dd className="mt-3 text-5xl font-medium tracking-tight tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <article className="rounded-[28px] border border-line bg-elev p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">GFG Hackathon 2025</p>
            <h3 className="mt-3 text-2xl tracking-tight">1st Runner-Up</h3>
            <p className="mt-3 leading-relaxed text-muted">Built an LLM + RAG code reviewer for detecting bugs and security flaws.</p>
          </article>
          <article className="rounded-[28px] border border-line bg-elev p-6 md:p-8">
            <h3 className="text-xl tracking-tight">Certifications</h3>
            <ul className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
              {certifications.map((name) => <li key={name} className="border-l-2 border-accent pl-4">{name}</li>)}
            </ul>
          </article>
        </div>
        <a className="btn btn-ghost mt-8" href={profile.leetcode} target="_blank" rel="noreferrer">LeetCode profile ↗</a>
      </div>
    </section>
  );
}
