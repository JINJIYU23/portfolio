// Hallmark · nav: N5 Floating pill · knobs: width=content-sized, backdrop=blur+saturate, anchor=top-centred
export default function Nav() {
  return (
    <nav className="nav-pill" aria-label="주요 메뉴">
      <a className="nav-pill__wordmark" href="#top">
        JIYU
      </a>
      <ul className="nav-pill__links">
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#experience">Experience</a>
        </li>
      </ul>
      <a className="nav-pill__cta" href="#contact">
        Contact
      </a>
    </nav>
  );
}
