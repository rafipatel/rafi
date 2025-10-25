import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Award, Target, Briefcase } from "lucide-react";

const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const achievements = [
    {
      icon: Target,
      title: "AI UK 2025 Invitation",
      date: "March 2025",
      description: "Invited as AI specialist to AIUK 2025 at The Alan Turing Institute by Harmony research team in recognition of contributions to their mental health production tool. Compensated £1,250 for two-day event.",
      link: "https://www.turing.ac.uk/ai-uk",
    },
    {
      icon: Award,
      title: "NLP Challenge Winner",
      date: "Jan 2025",
      description: "Won Harmony NLP Challenge with £250 prize by improving the algorithm for psychology survey question similarity ratings, reducing MAE from 24 to 20.544. Organised by researchers from UCL, Ulster University, and Fast Data Science.",
      link: "https://harmonydata.ac.uk/matching-challenge-winner-announcement/",
    },
    {
      icon: Trophy,
      title: "Research Internship",
      date: "July 2024",
      description: "Selected for AI/ML Research Internship at City, University of London utilising UK Cancer Research, and TracerX datasets (publication in progress).",
    },
    {
      icon: Briefcase,
      title: "Early Career Offer",
      date: "Jan 2023",
      description: "Offered a full-time role in the 3rd month of a 6-month internship based on exceptional performance and contributions at Webomates, Stamford, USA (remote).",
    },
  ];

  return (
    <section id="achievements" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Achievements</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass p-8 rounded-2xl hover:shadow-[var(--shadow-elegant)] transition-all duration-300 group"
              >
                {achievement.link ? (
                  <a href={achievement.link} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:animate-glow-pulse">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                          {achievement.title}
                        </h3>
                        <p className="text-secondary text-sm font-semibold mb-3">{achievement.date}</p>
                        <p className="text-muted-foreground leading-relaxed">{achievement.description}</p>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:animate-glow-pulse">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-foreground">{achievement.title}</h3>
                      <p className="text-secondary text-sm font-semibold mb-3">{achievement.date}</p>
                      <p className="text-muted-foreground leading-relaxed">{achievement.description}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;