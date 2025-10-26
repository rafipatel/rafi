import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface ResumeProps {
  onViewResume: () => void;
}

const Resume = ({ onViewResume }: ResumeProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      date: "Sep 2025 - Present",
      title: "ML Engineer (Independent Contractor)",
      company: "Mercor",
      link: "https://www.mercor.com/",
      points: [
        "Contributing to Meta AI Research's expansion of OpenAI's MLE-bench by converting Kaggle and ML competition challenges into standardized Docker-containerized benchmark tasks.",
        "Extended MLE-bench with recent datasets from leading ML conferences (NeurIPS, ICML, ICLR) spanning CV, NLP, time-series, and tabular domains.",
        "Merged 2+ pull requests implementing task conversions with setup scripts, evaluation metrics, and reproducible environments.",
      ],
    },
    {
      date: "Mar 2025 - Present",
      title: "Founding ML Research Engineer",
      company: "Curify-AI",
      link: "https://www.curify-ai.com/en/about",
      points: [
        "Implementing end-to-end video translation pipelines with transcription, translation, voice cloning, and lip-sync synchronization.",
        "Built and deployed FastAPI microservices (ChatterBox multilingual TTS, WhisperX transcription, PaddleOCR) with Docker on Azure cloud.",
        "Integrated state-of-the-art models including ElevenLabs and XTTS for voice cloning.",
      ],
    },
    {
      date: "July-Oct 2024",
      title: "Research Intern (AI / ML)",
      company: "City, University of London",
      link: "https://www.city.ac.uk/",
      points: [
        "Integrated clinical and phylogenetic data to enhance machine learning models for predicting survival in lung cancer patients.",
        "Applied 5 different AI/ML model techniques to improve patient's survival prediction.",
        "Presented findings at weekly research meetings and subsequently submitted results (publication in progress).",
      ],
    },
    {
      date: "Sep 2022 - Sep 2023",
      title: "Artificial Intelligence (AI) Engineer",
      company: "Webomates",
      link: "https://www.webomates.com",
      points: [
        "Worked on AI Defect Predictor tool, which led to an 11x increase in release speed, a 73% reduction in production defects, and a 50% reduction in costs.",
        "Deployed multiple NLP and computer vision models, which are currently operational in production.",
        "Recognised for exceptional contributions and promoted by the 3rd month of a 6-month internship.",
      ],
    },
    {
      date: "Oct 2021 - Jan 2022",
      title: "Machine Learning Engineer Intern",
      company: "ResoluteAI Software",
      link: "https://resoluteaisoftware.in/",
      points: [
        "Developed a U-NET Neural Network architecture to detect defects in fabric videos.",
        "Organised a webinar, instructed, and led a team of interns in image annotation tasks.",
      ],
    },
  ];

  const education = [
    {
      date: "2023-2024",
      title: "Master of Science in Artificial Intelligence (MSc AI)",
      institution: "City, University of London",
      grade: "Grade: Merit (68.5)",
    },
    {
      date: "2019-2021",
      title: "Bachelor of Science in Information Technology (BSc IT)",
      institution: "University of Mumbai",
      grade: "Grade: 8.5 CGPA",
    },
    {
      date: "2016-2019",
      title: "Diploma in Mechanical Engineering",
      institution: "Maharashtra State Board",
      grade: "Grade: Distinction",
    },
  ];

  return (
    <section id="resume" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-background to-background" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            My <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            With nearly 2 years of experience in developing and deploying AI solutions. Specializing in machine learning, computer vision, and NLP.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-12 text-center text-primary"
          >
            Experience
          </motion.h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-accent to-primary opacity-30" />
            
            {/* Timeline items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className={`relative flex flex-col md:flex-row ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    } items-center gap-8`}
                  >
                    {/* Content card */}
                    <div className="w-full md:w-[calc(50%-2rem)]">
                      <div className="glass p-6 rounded-xl hover:shadow-[var(--shadow-elegant)] transition-all duration-300 group">
                        <span className="text-secondary text-sm font-semibold block mb-2">{exp.date}</span>
                        <h4 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{exp.title}</h4>
                        {exp.link ? (
                          <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors font-medium">
                            {exp.company} →
                          </a>
                        ) : (
                          <span className="text-primary font-medium">{exp.company}</span>
                        )}
                        <ul className="mt-4 space-y-2 text-muted-foreground text-sm">
                          {exp.points.map((point, i) => (
                            <li key={i} className="flex">
                              <span className="text-primary mr-2 flex-shrink-0">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg z-10">
                      <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                    </div>
                    
                    {/* Empty space for alternating layout */}
                    <div className="hidden md:block w-[calc(50%-2rem)]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mb-12">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-3xl font-bold mb-8 text-center text-primary"
          >
            Education
          </motion.h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="glass p-6 rounded-xl hover:shadow-[var(--shadow-elegant)] transition-all duration-300 group"
              >
                <span className="text-secondary text-sm font-semibold block mb-2">{edu.date}</span>
                <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{edu.title}</h4>
                <p className="text-primary mb-2 font-medium">{edu.institution}</p>
                <p className="text-muted-foreground text-sm">{edu.grade}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View Resume Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={onViewResume}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground"
          >
            <FileText className="mr-2 h-5 w-5" />
            View Full Resume
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;