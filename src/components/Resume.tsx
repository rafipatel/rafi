import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { experiences, education } from "@/data/portfolioData";

interface ResumeProps {
  onViewResume: () => void;
}

const Resume = ({ onViewResume }: ResumeProps) => {
  return (
    <section id="resume" className="mt-16 scroll-mt-20">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="font-serif text-2xl font-semibold text-foreground">Experience</h2>
        <Button variant="outline" size="sm" onClick={onViewResume}>
          <FileText className="mr-2 h-4 w-4" />
          Full CV
        </Button>
      </div>

      <div className="space-y-8 border-l border-border pl-5">
        {experiences.map((exp, index) => (
          <div key={index} className="relative">
            <span
              className="absolute -left-[23px] top-1.5 h-2 w-2 rounded-full bg-primary"
              aria-hidden="true"
            />
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {exp.date}
            </span>
            <h3 className="mt-1 font-medium text-foreground">{exp.title}</h3>
            {exp.link ? (
              <a
                href={exp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary transition-colors hover:underline"
              >
                {exp.company}
              </a>
            ) : (
              <span className="text-sm font-medium text-foreground/80">{exp.company}</span>
            )}
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
              {exp.points.map((point, i) => {
                const isHeader = point.startsWith("###");
                const clean = isHeader ? point.replace("###", "").trim() : point;
                return isHeader ? (
                  <li key={i} className="mt-3 font-semibold text-foreground first:mt-0">
                    {clean}
                  </li>
                ) : (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
                    <span>{clean}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <h3 className="mb-4 mt-10 font-serif text-xl font-semibold text-foreground">Education</h3>
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="rounded-md border border-border bg-card p-4">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {edu.date}
            </span>
            <h4 className="mt-1 font-medium text-foreground">{edu.title}</h4>
            <p className="text-sm text-foreground/80">{edu.institution}</p>
            <p className="text-sm text-muted-foreground">{edu.grade}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Resume;
