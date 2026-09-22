import Contact from "./Contact";
import Experience from "./Experience";
import Moto from "./Moto";
import Projects from "./Projects";
import Skills from "./Skills";

// Section order preserved from the original site.
export default function Main() {
  return (
    <main>
      <Moto />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
