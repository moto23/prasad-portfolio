import { useState, type FormEvent } from "react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { profile } from "../data/content";
import { Magnetic, Reveal, SectionHeading } from "./ui";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", email: "", message: "" };

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (fields.name.trim().length < 2) errors.name = "Add your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errors.email = "Use a real email address.";
  if (fields.message.trim().length < 12) errors.message = "A sentence or two is enough.";
  return errors;
}

export function Contact() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [copyStatus, setCopyStatus] = useState("Copy address");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate(fields);
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      const field = event.currentTarget.elements.namedItem(first);
      if (field instanceof HTMLElement) field.focus();
      setSent(false);
      return;
    }
    const subject = encodeURIComponent(`Portfolio inquiry from ${fields.name.trim()}`);
    const body = encodeURIComponent(`${fields.message.trim()}\n\n— ${fields.name.trim()}\n${fields.email.trim()}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyStatus("Copied");

    } catch {
      setCopyStatus("Copy unavailable — select the address or use Open in mail.");
    }
  };

  return (
    <section id="contact" tabIndex={-1} className="px-5 py-24 outline-none md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            index="07"
            eyebrow="Contact"
            title="If the work fits, write."
            lede="Hiring, a collaboration, or a system that needs a careful engineer. I read every note."
          />
          <Reveal>
            <ul className="space-y-3 text-sm">
              <li>
                <button type="button" aria-label="Copy email address" onClick={copyEmail} className="inline-flex items-center gap-3 text-left">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-line">
                    <Mail size={16} />
                  </span>
                  <span>
                    <span className="block text-ink">{profile.email}</span>
                    <span className="text-muted" role="status">{copyStatus}</span>
                  </span>
                </button>
              </li>
              <li>
                <a href={profile.phoneHref} className="inline-flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-line">
                    <Phone size={16} />
                  </span>
                  <span>{profile.phone}</span>
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer me" className="inline-flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-line">
                    <Linkedin size={16} />
                  </span>
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a href={profile.github} target="_blank" rel="noreferrer me" className="inline-flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-line">
                    <Github size={16} />
                  </span>
                  <span>github.com/{profile.githubUser}</span>
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <form onSubmit={onSubmit} noValidate className="glass rounded-[28px] p-5 md:p-7">
            <div className="grid gap-4">
              <label className="grid gap-2 text-sm">
                <span id="name-label">Name</span>
                <input
                  className="field"
                  name="name"
                  aria-labelledby="name-label"
                  required
                  autoComplete="name"
                  value={fields.name}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  onChange={(event) => setFields((current) => ({ ...current, name: event.target.value }))}
                />
                {errors.name ? (
                  <span id="name-error" className="text-danger">
                    {errors.name}
                  </span>
                ) : null}
              </label>
              <label className="grid gap-2 text-sm">
                <span id="email-label">Email</span>
                <input
                  className="field"
                  type="email"
                  name="email"
                  aria-labelledby="email-label"
                  required
                  autoComplete="email"
                  value={fields.email}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  onChange={(event) => setFields((current) => ({ ...current, email: event.target.value }))}
                />
                {errors.email ? (
                  <span id="email-error" className="text-danger">
                    {errors.email}
                  </span>
                ) : null}
              </label>
              <label className="grid gap-2 text-sm">
                <span id="message-label">Message</span>
                <textarea
                  className="field min-h-36 resize-y"
                  name="message"
                  aria-labelledby="message-label"
                  required
                  value={fields.message}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  onChange={(event) => setFields((current) => ({ ...current, message: event.target.value }))}
                />
                {errors.message ? (
                  <span id="message-error" className="text-danger">
                    {errors.message}
                  </span>
                ) : null}
              </label>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Magnetic>
                <button type="submit" className="btn btn-primary">
                  Open in mail
                </button>
              </Magnetic>
              <p className="text-sm text-muted" role="status">
                {sent ? "Your mail app should open with this note." : "Opens a draft in your email app; send it there."}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
