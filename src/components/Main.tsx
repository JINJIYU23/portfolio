import Contact from "./Contact";
import Experience from "./Experience";
import Moto from "./Moto";
import Projects from "./Projects";
import Skills from "./Skills";
import Work from "./Work";

// 실무(Work)를 프로젝트보다 앞에 둔다.
export default function Main() {
  return (
    <main>
      <Moto />
      <Skills />
      <Work />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
