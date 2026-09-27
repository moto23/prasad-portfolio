export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -left-24 -top-28 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--pn-orb-a), transparent 68%)" }}
      />
      <div
        className="absolute -right-20 top-10 h-[460px] w-[460px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--pn-orb-b), transparent 68%)" }}
      />
      <div className="absolute inset-0 grid-fade" />
      <div className="noise absolute inset-0 opacity-[0.07] mix-blend-overlay dark:opacity-[0.12]" />
    </div>
  );
}
