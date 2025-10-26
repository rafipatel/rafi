import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
};

const FloatingPaint = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  // Use a ref for the animation frame to cancel it on unmount
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;

    const colors = ["#ff4b5c", "#56cfe1", "#ffb703", "#8ac926", "#1982c4"];

    const addParticles = (x: number, y: number) => {
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 8 + 2,
          opacity: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMoving = true;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      if (!ctx) return;

      // --- THEME-AWARE FIX ---
      // Check if the <html> element has the 'dark' class
      const isDarkMode = document.documentElement.classList.contains('dark');
      // Set the fade color based on the theme
      const fadeColor = isDarkMode
        ? 'rgba(0, 0, 0, 0.05)'   // Fade to black in dark mode
        : 'rgba(255, 255, 255, 0.05)'; // Fade to white in light mode

      // Apply the fade effect
      ctx.fillStyle = fadeColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // --- END FIX ---

      if (isMoving) {
        addParticles(mouseX, mouseY);
        isMoving = false; // only spawn particles when cursor moves
      }

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= 0.01; // slowly fade out

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // We can safely cache the RGB conversion or do it here
        ctx.fillStyle = `rgba(${hexToRgb(p.color)},${p.opacity})`;
        ctx.fill();
      });

      // remove faded particles
      particlesRef.current = particlesRef.current.filter(p => p.opacity > 0);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start the animation
    animate();

    return () => {
      // Clean up listeners and animation frame
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // helper to convert hex color to rgb
  const hexToRgb = (hex: string) => {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
  };

  return <canvas ref={canvasRef} className="fixed inset-0 z-[1] pointer-events-none" />;
};

export default FloatingPaint;