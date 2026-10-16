import Contact from "./Contact";
import Experience from "./Experience";
import Moments from "./Moments";
import Moto from "./Moto";
import Projects from "./Projects";
import Skills from "./Skills";

// Section order: About → Skills → Work → Experience → Moments → Contact
export default function Main() {
  return (
    <main>
      <Moto />
      <Skills />
      <Projects />
      <Experience />
      <Moments />
      <Contact />
    </main>
  );
}
