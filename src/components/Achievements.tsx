import { Trophy, Award, Target, Briefcase, type LucideIcon } from "lucide-react";
import { achievements } from "@/data/portfolioData";

const iconMap: Record<string, LucideIcon> = {
  target: Target,
  award: Award,
  trophy: Trophy,
  briefcase: Briefcase,
};

const Achievements = () => {
  return (
    <section id="achievements" className="mt-16 scroll-mt-20">
      <h2 className="mb-5 font-serif text-2xl font-semibold text-foreground">Achievements</h2>

      <div className="space-y-4">
        {achievements.map((item, index) => {
          const Icon = iconMap[item.iconName] ?? Trophy;
          const inner = (
            <div className="flex items-start gap-4 rounded-md border border-border bg-card p-5 transition-colors hover:border-primary/40">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-primary/5 text-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="font-medium text-foreground">{item.title}</h3>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          );
          return item.link ? (
            <a
              key={index}
              href={item.link}
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

export default Achievements;
