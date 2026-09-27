import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { sectionIds, sections } from "../data/content";
import { useActiveSection } from "../hooks";
import { useTheme } from "../theme";
import { Magnetic, Mark } from "./ui";

export function Navbar() {
  const active = useActiveSection(sectionIds);
  const { theme, toggle } = useTheme();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    const desktop = window.matchMedia("(min-width: 1280px)");
    const onResize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", onResize);
    onResize();
    return () => {
      document.body.style.overflow = previous;
      desktop.removeEventListener("change", onResize);
      menuButton.current?.focus();
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <motion.div
        className="h-px origin-left bg-accent"
        style={{ scaleX: reduce ? scrollYProgress : scaleX }}
      />
      <div className="px-3 pt-3 md:px-5">
        <div
          className={`mx-auto flex h-16 max-w-[1180px] items-center justify-between rounded-full px-3 transition-colors md:px-4 ${
            scrolled || open ? "glass" : "border border-transparent"
          }`}
        >
          <a href="#home" className="flex items-center gap-2.5 rounded-full pl-1.5 text-ink" aria-label="Prasad Nathe, home">
            <Mark className="h-7 w-7 text-accent" />
            <span className="hidden text-sm font-medium tracking-[-0.02em] min-[420px]:inline">Prasad Nathe</span>
          </a>

          <nav className="hidden items-center gap-1 min-[1280px]:flex" aria-label="Primary">
            {sections.map((section) => {
              const current = active === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-current={current ? "location" : undefined}
                  className={`relative rounded-full px-3 py-2 text-sm ${current ? "text-ink" : "text-muted"}`}
                >
                  {current ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-[var(--pn-accent-soft)]"
                      transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ) : null}
                  <span className="relative z-10">{section.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={theme === "dark"}
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Magnetic className="hidden sm:inline-flex">
              <a href="#contact" className="btn btn-primary">
                Let’s talk
              </a>
            </Magnetic>
            <button
              ref={menuButton}
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-line min-[1280px]:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(true)}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </div>

      {createPortal(
        open ? (
          <motion.dialog
            ref={dialog}
            onCancel={(event) => { event.preventDefault(); setOpen(false); }}
            onKeyDown={(event) => {
              if (event.key !== "Tab") return;
              const items = event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]");
              const first = items[0];
              const last = items[items.length - 1];
              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last?.focus();
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first?.focus();
              }
            }}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[80] bg-bg min-[1280px]:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="text-sm font-medium">Menu</span>
              <button
                type="button"
                className="grid h-11 w-11 place-items-center rounded-full border border-line"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex flex-col px-6 pt-6" aria-label="Mobile">
              {sections.map((section, index) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => {
                    setOpen(false);
                    requestAnimationFrame(() => document.getElementById(section.id)?.focus({ preventScroll: true }));
                  }}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : 0.04 * index, duration: reduce ? 0 : 0.35 }}
                  className={`border-b border-line py-4 text-3xl tracking-[-0.04em] ${
                    active === section.id ? "text-accent" : "text-ink"
                  }`}
                  aria-current={active === section.id ? "location" : undefined}
                >
                  {section.label}
                </motion.a>
              ))}
            </nav>
          </motion.dialog>
        ) : null,
        document.body,
      )}
    </header>
  );
}
