import Contact from "./Contact";
import Experience from "./Experience";
import Moments from "./Moments";
import Moto from "./Moto";
import Projects from "./Projects";
import Skills from "./Skills";
import Work from "./Work";

// Section order: Experience (the hero thread runs down its spine) → About (ID card drops off the end)
// → Skills → Work (실무, 프로젝트보다 앞) → Projects → Moments → Contact
export default function Main() {
  return (
    <main>
      <Experience />
      <Moto />
      <Skills />
      <Work />
      <Projects />
      <Moments />
      <Contact />
    </main>
  );
}
