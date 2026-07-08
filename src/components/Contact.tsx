import { Mail, Phone } from "lucide-react";
import { socialLinks, personalInfo } from "@/data/portfolioData";

const Contact = () => {
  return (
    <section id="contact" className="mt-16 scroll-mt-20">
      <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">Get in touch</h2>
      <p className="mb-4 text-[15px] leading-7 text-muted-foreground">
        Open to conversations about AI/ML research, engineering roles, and collaboration.
        The quickest way to reach me is email — or find me via the links in the sidebar.
      </p>
      <div className="space-y-2 text-sm">
        <a
          href={`mailto:${socialLinks.email}`}
          className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
        >
          <Mail className="h-4 w-4" />
          {socialLinks.email}
        </a>
        <a
          href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}
          className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
        >
          <Phone className="h-4 w-4" />
          {personalInfo.phone}
        </a>
      </div>
    </section>
  );
};

export default Contact;
