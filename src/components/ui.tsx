import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useFinePointer } from "../hooks";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Magnetic({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();

  useEffect(() => {
    if ((reduce || !fine) && ref.current) ref.current.style.transform = "none";
  }, [reduce, fine]);

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || !fine || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) / 6;
    const y = (event.clientY - (rect.top + rect.height / 2)) / 6;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <div
      ref={ref}
      className={`transition-transform duration-200 ease-out ${className ?? "inline-flex"}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
}: {
  index: string;
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <Reveal className="mb-12 max-w-3xl md:mb-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
        {index} · {eyebrow}
      </p>
      <h2 className="mt-4 text-[clamp(2.1rem,4.4vw,3.6rem)] font-medium leading-[1.02] tracking-[-0.035em] text-balance">
        {title}
      </h2>
      {lede ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted">{lede}</p> : null}
    </Reveal>
  );
}

export function Mark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M4 24V8h6a5 5 0 0 1 0 10H4m16 6V8l8 16V8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
