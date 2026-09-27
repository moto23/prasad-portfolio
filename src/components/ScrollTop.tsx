import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollTop() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          type="button"
          aria-label="Scroll to top"
          className="glass fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full text-ink"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          onClick={() => {
            document.getElementById("home")?.focus({ preventScroll: true });
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
          }}
        >
          <ArrowUp size={16} />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
