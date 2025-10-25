import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award } from "lucide-react";

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const certifications = [
    {
      date: "May 2025 - Present",
      title: "AI Agents Course",
      organization: "HuggingFace",
      description: "Advanced training in building autonomous AI agents, learning cutting-edge techniques in agent design, tool use, and multi-agent systems.",
    },
    {
      date: "Aug 2023",
      title: "Langchain for LLM Application Development",
      organization: "DeepLearning.ai",
      description: "Specialized course on building LLM-powered applications using Langchain framework, covering chains, agents, and memory systems.",
    },
    {
      date: "Oct 2022",
      title: "Neural Networks and Deep Learning",
      organization: "DeepLearning.ai, Coursera",
      description: "Comprehensive deep learning specialization covering neural network architectures, backpropagation, and optimization techniques.",
    },
    {
      date: "Jun 2022",
      title: "Machine Learning",
      organization: "Stanford Online (Andrew Ng), Coursera",
      description: "Foundational machine learning course covering supervised learning, unsupervised learning, and best practices in ML.",
    },
    {
      date: "Sep 2022",
      title: "Python Master Certification Course",
      organization: "Perfect E-Learning",
      description: "Advanced Python programming certification covering data structures, OOP, and software development best practices.",
    },
    {
      date: "Jan 2021",
      title: "Python and ML for Data Science",
      organization: "Kaggle",
      description: "Practical course on applying Python and machine learning techniques to data science problems and competitions.",
    },
  ];

  return (
    <section id="certifications" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Professional <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Continuous learning through industry-recognized courses and certifications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass p-6 rounded-xl hover:shadow-[var(--shadow-elegant)] transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center group-hover:animate-glow-pulse">
                    <Award className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-secondary text-xs font-semibold block mb-2">{cert.date}</span>
                  <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-2">{cert.organization}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{cert.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;