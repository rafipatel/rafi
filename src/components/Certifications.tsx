import { Award } from "lucide-react";
import { certifications } from "@/data/portfolioData";

const Certifications = () => {
  return (
    <section id="certifications" className="mt-16 scroll-mt-20">
      <h2 className="mb-5 font-serif text-2xl font-semibold text-foreground">Certifications</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-md border border-border bg-card p-4 transition-colors hover:border-primary/40"
          >
            <Award className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                {cert.date}
              </span>
              <h3 className="font-medium text-foreground">{cert.title}</h3>
              <p className="text-sm text-foreground/80">{cert.organization}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {cert.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
