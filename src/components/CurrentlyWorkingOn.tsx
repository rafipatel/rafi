import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Clapperboard,
  Rocket,
  BookOpen,
  Building2,
  Brain,
} from "lucide-react";
import {
  currentlyWorkingOn,
  currentTypeLabels,
  type CurrentItemData,
} from "@/data/portfolioData";

const iconMap: Record<CurrentItemData["iconName"], React.ReactNode> = {
  brain: <Brain className="h-4 w-4" />,
  clapperboard: <Clapperboard className="h-4 w-4" />,
  rocket: <Rocket className="h-4 w-4" />,
  "book-open": <BookOpen className="h-4 w-4" />,
  "building-2": <Building2 className="h-4 w-4" />,
};

const CurrentlyWorkingOn = () => {
  return (
    <section id="current" className="mt-16 scroll-mt-20">
      <div className="mb-5 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
        <h2 className="font-serif text-2xl font-semibold text-foreground">Currently</h2>
      </div>

      <div className="space-y-4">
        {currentlyWorkingOn.map((item) => (
          <div
            key={item.title}
            className="rounded-md border border-border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <div className="mb-2 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-primary/5 text-primary">
                  {iconMap[item.iconName]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground">{item.title}</h3>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${item.title}`}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                </div>
              </div>
              <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {currentTypeLabels[item.type]}
              </span>
            </div>

            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {item.badges.map((badge) => (
                <Badge
                  key={badge}
                  variant="outline"
                  className="border-border text-xs font-normal text-muted-foreground"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CurrentlyWorkingOn;
