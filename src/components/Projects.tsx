import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/portfolioData";

const Projects = () => {
  return (
    <section id="projects" className="mt-16 scroll-mt-20">
      <h2 className="mb-5 font-serif text-2xl font-semibold text-foreground">Projects</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project, index) => {
          const CardInner = (
            <>
              {project.image && (
                <div className="h-40 overflow-hidden border-b border-border bg-secondary">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="font-medium text-foreground">{project.title}</h3>
                  {project.link && (
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </div>
                <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.badges.map((badge, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="border-border text-xs font-normal text-muted-foreground"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          );

          const cls =
            "block overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-primary/40";

          return project.link ? (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cls}
            >
              {CardInner}
            </a>
          ) : (
            <div key={index} className={cls}>
              {CardInner}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
