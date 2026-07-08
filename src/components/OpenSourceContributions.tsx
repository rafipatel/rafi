import { Code, Users, Mic, BookOpen, type LucideIcon } from "lucide-react";
import { openSourceContributions } from "@/data/portfolioData";

const getIcon = (role: string): LucideIcon => {
  switch (role.toLowerCase()) {
    case "contributor":
      return Code;
    case "guest speaker":
      return Mic;
    case "author":
      return BookOpen;
    default:
      return Users;
  }
};

const OpenSourceContributions = () => {
  return (
    <section id="contributions" className="mt-16 scroll-mt-20">
      <h2 className="mb-5 font-serif text-2xl font-semibold text-foreground">Open Source</h2>

      <div className="space-y-4">
        {openSourceContributions.map((contribution, index) => {
          const Icon = getIcon(contribution.role);
          const inner = (
            <div className="flex items-start gap-4 rounded-md border border-border bg-card p-5 transition-colors hover:border-primary/40">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-primary/5 text-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="font-medium text-foreground">{contribution.title}</h3>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">
                    {contribution.role}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{contribution.date}</span>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {contribution.description.split("**").map((part, i) =>
                    i % 2 === 1 ? (
                      <strong key={i} className="font-medium text-foreground">
                        {part}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              </div>
            </div>
          );
          return contribution.link ? (
            <a
              key={index}
              href={contribution.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {inner}
            </a>
          ) : (
            <div key={index}>{inner}</div>
          );
        })}
      </div>
    </section>
  );
};

export default OpenSourceContributions;
