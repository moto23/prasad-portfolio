import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./theme";
import { Atmosphere } from "./components/Atmosphere";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Work } from "./components/Work";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Education } from "./components/Education";
import { Stats } from "./components/Stats";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ScrollTop } from "./components/ScrollTop";

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <a href="#content" className="skip">
          Skip to content
        </a>
        <Atmosphere />
        <div className="relative z-10">
          <Navbar />
          <main id="content" tabIndex={-1}>
            <Hero />
            <Work />
            <About />
            <Skills />
            <Experience />
            <Education />
            <Stats />
            <Contact />
          </main>
          <Footer />
          <ScrollTop />
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}
