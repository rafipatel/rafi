import { motion } from "framer-motion";
import { Code, Github } from "lucide-react";
import { socialLinks } from "@/data/portfolioData";

const SourceCodeBadge = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="fixed top-24 right-6 z-40 hidden lg:block"
        >
            <a
                href={socialLinks.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-3 glass px-4 py-2 rounded-full border border-primary/20 hover:border-primary/50 transition-all duration-300 shadow-[var(--shadow-elegant)] hover:shadow-primary/20"
            >
                {/* Animated Ring */}
                <span className="absolute inset-0 rounded-full border border-primary/10 group-hover:scale-110 group-hover:opacity-0 transition-all duration-500" />

                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-sm rounded-full animate-pulse" />
                    <Github className="w-5 h-5 text-primary relative z-10" />
                </div>

                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold group-hover:text-primary transition-colors">Open Source</span>
                    <span className="text-xs font-bold text-foreground">Click to View Source Code</span>
                </div>

                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                    <Code className="w-4 h-4 text-primary group-hover:text-primary-foreground" />
                </div>
            </a>
        </motion.div>
    );
};

export default SourceCodeBadge;
