import { useEffect, useRef } from "react";

const NODES = 40; // Controls mesh density, adjust as needed
const LINE_DISTANCE = 80; // Tweak 3: Reduced distance for more focused line clusters
const MOUSE_INFLUENCE = 1.0; // Keeps the stronger movement from before

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouse = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Init nodes
    nodesRef.current = Array.from({ length: NODES }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Theme-aware lines
      const isDark = document.documentElement.classList.contains("dark");
      
      // Tweak 1a: Aggressively increased light mode opacity to 0.40
      ctx.strokeStyle = isDark ? "rgba(60, 180, 255, 0.11)" : "rgba(40,60,80,0.40)";

      // Update and draw all nodes
      const nodes = nodesRef.current;
      nodes.forEach(n => {
        // Attract nodes slightly toward mouse
        if (mouse.current.x !== null && mouse.current.y !== null) {
          const dx = mouse.current.x - n.x;
          const dy = mouse.current.y - n.y;
          n.vx += dx * MOUSE_INFLUENCE * 0.001; 
          n.vy += dy * MOUSE_INFLUENCE * 0.001;
        }
        n.x += n.vx;
        n.y += n.vy;

        // Slow "friction"
        n.vx *= 0.98;
        n.vy *= 0.98;

        // Wrap edges
        if (n.x < 0) n.x += canvas.width;
        if (n.x > canvas.width) n.x -= canvas.width;
        if (n.y < 0) n.y += canvas.height;
        if (n.y > canvas.height) n.y -= canvas.height;
      });

      // Draw lines if nodes are close
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINE_DISTANCE) {
            ctx.globalAlpha = 1 - dist / LINE_DISTANCE;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      // Draw nodes as faint circles
      nodes.forEach(n => {
        ctx.beginPath();
        // Tweak 2: Increased node radius from 2 to 3
        ctx.arc(n.x, n.y, 3, 0, Math.PI * 2); 
        // Tweak 1b: Aggressively increased light mode opacity to 0.60
        ctx.fillStyle = isDark ? "rgba(80,220,255,0.18)" : "rgba(70,120,180,0.60)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }
    animate();

    function onMouseMove(e: MouseEvent) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    }
    function onMouseLeave() {
      mouse.current.x = null;
      mouse.current.y = null;
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", onMouseLeave);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] pointer-events-none"
    />
  );
};

export default AnimatedBackground;