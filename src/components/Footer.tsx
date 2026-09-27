import { profile, sections } from "../data/content";

export function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-4xl italic tracking-[-0.03em]">Prasad Nathe</p>
          <p className="mt-2 text-sm text-muted">
            {profile.role} · {profile.location}
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted" aria-label="Footer">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="hover:text-ink">
              {section.label}
            </a>
          ))}
        </nav>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">© {new Date().getFullYear()} Prasad Nathe</p>
      </div>
    </footer>
  );
}
