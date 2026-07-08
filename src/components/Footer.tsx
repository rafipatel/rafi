import { personalInfo, lastUpdated } from "@/data/portfolioData";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border pt-6 text-sm text-muted-foreground">
      <p>
        Maintained with <span className="font-medium text-foreground">Rafa</span>, an AI
        assistant for {personalInfo.name.split(" ")[0]}. Last updated {lastUpdated}.
      </p>
      <p className="mt-1 text-xs text-muted-foreground/70">
        © {currentYear} {personalInfo.name}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
