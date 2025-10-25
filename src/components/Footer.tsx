import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 relative overflow-hidden border-t border-border/50">
      <div className="absolute inset-0 bg-gradient-to-t from-card/30 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            Made with{" "}
            <Heart className="w-4 h-4 text-destructive fill-destructive animate-pulse" />{" "}
            by <span className="text-primary font-semibold">Rafi Ahmed Patel</span>
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            Copyright © {currentYear} All rights reserved
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;