const sections = [
  { id: "about", label: "About" },
  { id: "current", label: "Currently" },
  { id: "resume", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contributions", label: "Open Source" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const TopNav = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <nav
        aria-label="Sections"
        className="mx-auto max-w-6xl overflow-x-auto px-6"
      >
        <ul className="flex gap-6 py-3 text-sm">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default TopNav;
