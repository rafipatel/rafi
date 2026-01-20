import { motion } from "framer-motion";
import { useScrollReveal, scrollVariants } from "@/hooks/use-scroll-reveal";
import InteractiveElement from "@/components/InteractiveElement";
import { skills, personalDetails, aboutMe, personalInfo } from "@/data/portfolioData";

const About = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/50" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={scrollVariants.floatUp.initial}
          animate={isInView ? scrollVariants.floatUp.animate : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Skills */}
          <InteractiveElement as="div" className="glass p-8 rounded-2xl">
            <motion.div
              initial={scrollVariants.scattered.initial}
              animate={isInView ? scrollVariants.scattered.animate : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <div>
                <div className="mb-6">
                  <p className="text-primary text-sm font-semibold mb-2">Name: <span className="text-foreground font-normal">{aboutMe.name}</span></p>
                  <p className="text-primary text-sm font-semibold mb-2">Job Role: <span className="text-foreground font-normal">{aboutMe.jobRole}</span></p>
                  <p className="text-primary text-sm font-semibold mb-2">Experience: <span className="text-foreground font-normal">{aboutMe.experience}</span></p>
                  <p className="text-primary text-sm font-semibold">Address: <span className="text-foreground font-normal">{aboutMe.address}</span></p>
                </div>

                <h3 className="text-xl font-bold text-primary mb-6">Skills</h3>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -30, rotate: -3 }}
                      animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
                      transition={{
                        duration: 0.7,
                        delay: 0.4 + index * 0.08,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-primary">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </InteractiveElement>

          {/* Right Column - About Text */}
          <motion.div
            initial={scrollVariants.scatteredRight.initial}
            animate={isInView ? scrollVariants.scatteredRight.animate : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed">
              {aboutMe.bio}
            </p>

            <div className="space-y-3">
              {personalDetails.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20, y: 10 }}
                  animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + index * 0.06,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="flex"
                >
                  <span className="text-primary font-semibold min-w-[140px]">{item.label}:</span>
                  <span className="text-foreground/80">{item.value}</span>
                </motion.div>
              ))}
            </div>

            <InteractiveElement as="div" className="pt-6">
              <motion.div
                initial={scrollVariants.depth.initial}
                animate={isInView ? scrollVariants.depth.animate : {}}
                transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="glass p-6 rounded-xl"
              >
                <p className="text-4xl font-bold text-primary mb-2">{personalInfo.projectsCompleted}</p>
                <p className="text-muted-foreground">Projects completed</p>
              </motion.div>
            </InteractiveElement>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;