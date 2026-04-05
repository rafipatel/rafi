import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
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
  brain: <Brain className="w-5 h-5" />,
  clapperboard: <Clapperboard className="w-5 h-5" />,
  rocket: <Rocket className="w-5 h-5" />,
  "book-open": <BookOpen className="w-5 h-5" />,
  "building-2": <Building2 className="w-5 h-5" />,
};

const CurrentlyWorkingOn = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="current" className="py-20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsla(173_80%_40%/0.06),transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-primary">
              What I'm focused on right now
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Currently{" "}
            <span className="gradient-text">Working On</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A snapshot of the projects, research, and learning I'm actively
            investing my time in — April 2026
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {currentlyWorkingOn.map((item, index) => (
            <motion.div
              key={item.title}
              className={index === 0 ? "md:col-span-2" : ""}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={
                isInView ? { opacity: 1, y: 0, scale: 1 } : {}
              }
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              <div
                className="glass rounded-2xl p-6 h-full group hover:shadow-[var(--shadow-elegant)] transition-all duration-500 relative overflow-hidden"
                style={
                  {
                    "--item-accent": `hsl(${item.accentColor})`,
                  } as React.CSSProperties
                }
              >
                {/* Accent glow on hover */}
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-2xl"
                  style={{
                    background: `hsl(${item.accentColor})`,
                  }}
                />

                {/* Header row */}
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    {/* SVG icon in accent-tinted circle */}
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        color: `hsl(${item.accentColor})`,
                        background: `hsl(${item.accentColor} / 0.12)`,
                        border: `1px solid hsl(${item.accentColor} / 0.2)`,
                      }}
                    >
                      {iconMap[item.iconName]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label={`Visit ${item.title}`}
                          >
                            <ExternalLink className="w-4 h-4 text-primary" />
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border flex-shrink-0"
                    style={{
                      color: `hsl(${item.accentColor})`,
                      borderColor: `hsl(${item.accentColor} / 0.3)`,
                      background: `hsl(${item.accentColor} / 0.08)`,
                    }}
                  >
                    {currentTypeLabels[item.type]}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed relative z-10">
                  {item.description}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 relative z-10">
                  {item.badges.map((badge) => (
                    <Badge
                      key={badge}
                      variant="outline"
                      className="text-xs border-primary/20 text-primary/80 hover:border-primary/40 transition-colors"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurrentlyWorkingOn;
