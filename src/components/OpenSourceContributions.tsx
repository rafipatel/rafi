import { motion } from "framer-motion";
import { useScrollReveal, scrollVariants } from "@/hooks/use-scroll-reveal";
import { Code, Users, Mic, BookOpen } from "lucide-react";
import InteractiveElement from "@/components/InteractiveElement";
import { openSourceContributions } from "@/data/portfolioData";

const OpenSourceContributions = () => {
    const { ref, isInView } = useScrollReveal();

    const getIcon = (role: string) => {
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

    return (
        <section id="contributions" className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

            <div className="container mx-auto px-4 relative z-10" ref={ref}>
                <motion.div
                    initial={scrollVariants.floatUp.initial}
                    animate={isInView ? scrollVariants.floatUp.animate : {}}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="gradient-text">Open-Source Contributions</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {openSourceContributions.map((contribution, index) => {
                        const Icon = getIcon(contribution.role);
                        const variant = index % 2 === 0 ? scrollVariants.scattered : scrollVariants.scatteredRight;
                        return (
                            <InteractiveElement
                                key={index}
                                as={contribution.link ? "a" : "div"}
                                href={contribution.link}
                                target={contribution.link ? "_blank" : undefined}
                                rel={contribution.link ? "noopener noreferrer" : undefined}
                                className="block"
                            >
                                <motion.div
                                    initial={variant.initial}
                                    animate={isInView ? variant.animate : {}}
                                    transition={{
                                        duration: 0.8,
                                        delay: index * 0.12,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                    className="glass p-8 rounded-2xl h-full group"
                                >
                                    <div className="flex items-start space-x-4">
                                        <motion.div
                                            className="flex-shrink-0"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:animate-glow-pulse">
                                                <Icon className="w-8 h-8 text-primary" />
                                            </div>
                                        </motion.div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                                    {contribution.title}
                                                </h3>
                                                <span className="text-xs font-mono px-2 py-1 rounded bg-primary/20 text-primary">
                                                    {contribution.role}
                                                </span>
                                            </div>
                                            <p className="text-secondary text-sm font-semibold mb-3">{contribution.date}</p>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {contribution.description.split("**").map((part, i) =>
                                                    i % 2 === 1 ? <strong key={i} className="text-foreground">{part}</strong> : part
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </InteractiveElement>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default OpenSourceContributions;
