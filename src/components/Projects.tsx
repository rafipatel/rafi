import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "Feedhire - AI Job Discovery Platform",
      description: "Co-founded unique AI global job discovery platform. Leveraged NLP and open-source LLMs for automated job post extraction. Dockerized services for cloud deployment on Oracle. Grew to 500+ users within 2 months with traffic from US, UK, and India.",
      badges: ["NLP", "LLM", "Production"],
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80",
    },
    {
      title: "VideoTrans - Video Translation Pipeline",
      description: "End-to-end video translation and voice cloning pipeline using Whisper large-v3 for transcription, Google Translate, and Chatterbox multilingual TTS for voice cloning. Supports 11+ languages with temporal alignment and automated audio-video synchronization.",
      badges: ["Computer Vision", "NLP", "Voice Clone"],
      link: "https://huggingface.co/spaces/Rafii/VideoTrans",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    },
    {
      title: "AI UK 2025 Showcase",
      description: "Invited by the Harmony NLP research team to attend AIUK 2025 — the UK's national showcase of AI and data science hosted by The Alan Turing Institute. Compensated £1,250 for contributing to mental health AI research.",
      badges: ["AI UK", "The Alan Turing Institute", "Recognition"],
      link: "https://www.turing.ac.uk/ai-uk",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    },
    {
      title: "NLP Challenge Winner",
      description: "Won Natural Language Processing competition with £250 prize by improving psychology survey question similarity algorithm, reducing MAE from 24 to 20.544. Organized by researchers from UCL, Ulster University, and Fast Data Science.",
      badges: ["NLP", "Competition", "Research"],
      link: "https://harmonydata.ac.uk/matching-challenge-winner-announcement/",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    },
    {
      title: "Medical AI Research",
      description: "ML in Lung Cancer research project, led research on integrating evolutionary cancer trees with machine learning for improved lung cancer survival prediction. Collaborated with researchers from Oxford University and City, University of London.",
      badges: ["Machine Learning", "Medical AI", "Research"],
      link: "https://drive.google.com/file/d/1cTheOGj38NBJrVf2i9XaaAm81jER86iy/view?usp=sharing",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    },
    {
      title: "AI Defect Predictor",
      description: "Defect detection in web pages, worked on improvement of an AI system that resulted in faster releases and considerable reduction in production defects. Implemented using AWS services and advanced ML techniques.",
      badges: ["AWS", "Machine Learning", "Production"],
      link: "https://www.webomates.com/aihealing/",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    },
    {
      title: "F1llama - Fine-tuned LLM",
      description: "Fine-tuned Meta-Llama-3-8B model with Low-Rank Adaptation (LoRA) achieving domain-specific adaptability with 200+ downloads. Demonstrates expertise in large language model fine-tuning and deployment.",
      badges: ["LLM", "Fine-tuning", "LoRA"],
      link: "https://huggingface.co/Rafii/f1llama/",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    },
    {
      title: "Image Super Resolution using GANs",
      description: "Implemented advanced GAN architectures (SRResNet and SRGAN) for image super-resolution, achieving high-quality upscaling of low-resolution images with remarkable detail preservation and also presented the first baselines for the Frechet Inception Distance (FID).",
      badges: ["Computer Vision", "GANs", "Deep Learning"],
      link: "https://github.com/rafipatel/Image-Super-Resolution-using-GANs",
      image: "https://images.unsplash.com/photo-1508615263227-e0a5f63c11c7?w=800&q=80",
    },
    {
      title: "Chatbot using Seq2Seq & Transformer",
      description: "Employs Seq2Seq and Transformer architectures with attention mechanisms to enable coherent and contextually relevant conversations. Applications span customer service, healthcare, and education sectors.",
      badges: ["NLP", "Transformer", "PyTorch"],
      link: "https://github.com/rafipatel/transformer-pytorch-chatbot",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
    },
    {
      title: "Neural Network from Scratch",
      description: "Implemented feedforward neural network from scratch using NumPy, exploring architectures, regularization, and optimizers. Built LSTM in PyTorch for temperature forecasting, gaining deeper intuition on neural network behavior and training.",
      badges: ["Deep Learning", "NumPy", "PyTorch"],
      link: "https://github.com/yasirbarlas/neural-network-from-scratch",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    },
    {
      title: "Deep Reinforcement Learning",
      description: "Implemented and analyzed reinforcement learning algorithms from Q-learning to DQN and Double DQN with prioritized experience replay. Explored parameter sensitivity, convergence, and transition from tabular methods to deep learning-based RL.",
      badges: ["Reinforcement Learning", "Deep Learning", "Q-Learning"],
      link: "https://github.com/rafipatel/Deep-Reinforcement-Learning/tree/main",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    },
  ];

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Highlighting some of my most impactful and innovative projects in AI and Machine Learning
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="glass rounded-2xl overflow-hidden group hover:shadow-[var(--shadow-elegant)] transition-all duration-300"
            >
              {project.link ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute top-4 right-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                        <ExternalLink className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.badges.map((badge, i) => (
                        <Badge key={i} variant="outline" className="text-xs border-primary/30 text-primary">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </a>
              ) : (
                <>
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-60" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-3 text-foreground">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.badges.map((badge, i) => (
                        <Badge key={i} variant="outline" className="text-xs border-primary/30 text-primary">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;