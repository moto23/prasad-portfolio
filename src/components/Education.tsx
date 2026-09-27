import { coursework, profile } from "../data/content";
import { Reveal, SectionHeading } from "./ui";

export function Education() {
  return (
    <section id="education" tabIndex={-1} className="px-5 py-24 outline-none md:px-8 md:py-32">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading index="05" eyebrow="Education" title="A foundation in information technology." />
        <Reveal>
          <article className="rounded-[28px] border border-line bg-elev p-6 md:p-8">
            <h3 className="text-2xl tracking-tight">{profile.degree}</h3>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-muted">
              <p>{profile.school} · {profile.educationPeriod}</p>
              <p className="font-medium text-accent">CGPA {profile.cgpa}</p>
            </div>
            <p className="mt-8 font-mono text-xs uppercase tracking-widest text-faint">Relevant coursework</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {coursework.map((item) => <li key={item} className="pill rounded-full px-3 py-2 text-sm">{item}</li>)}
            </ul>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
