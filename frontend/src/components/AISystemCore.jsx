import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

// Generate deterministic node positions in a circular/organic pattern
function generateNodes(count, radius) {
  const nodes = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const r = radius * Math.sqrt(i / count) * 0.85;
    const theta = i * goldenAngle;
    nodes.push({
      id: i,
      x: Math.cos(theta) * r,
      y: Math.sin(theta) * r,
      radius: 2 + Math.random() * 3,
      pulseDelay: Math.random() * 3,
      pulseSpeed: 2 + Math.random() * 2,
    });
  }
  return nodes;
}

// Generate connections between nearby nodes
function generateEdges(nodes, maxDist) {
  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        edges.push({ from: i, to: j, dist });
      }
    }
  }
  return edges;
}

export default function AISystemCore({ size = 400, className = "" }) {
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [nodes] = useState(() => generateNodes(40, size * 0.38));
  const [edges] = useState(() => generateEdges(nodes, size * 0.22));
  const animRef = useRef(null);
  const canvasRef = useRef(null);
  const timeRef = useRef(0);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setMouse({
      x: (e.clientX - cx) / (rect.width / 2),
      y: (e.clientY - cy) / (rect.height / 2),
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Canvas rendering for performance
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const draw = (timestamp) => {
      timeRef.current = timestamp * 0.001;
      const t = timeRef.current;
      const cx = size / 2;
      const cy = size / 2;

      ctx.clearRect(0, 0, size, size);

      // Parallax offset
      const px = mouse.x * 15;
      const py = mouse.y * 15;

      // Draw soft energy waves (rings)
      for (let ring = 0; ring < 3; ring++) {
        const ringRadius = 60 + ring * 50 + Math.sin(t * 0.5 + ring) * 8;
        const alpha = 0.03 + Math.sin(t * 0.8 + ring * 1.5) * 0.015;
        ctx.beginPath();
        ctx.arc(cx + px * 0.3, cy + py * 0.3, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(79, 140, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw edges
      edges.forEach((edge) => {
        const a = nodes[edge.from];
        const b = nodes[edge.to];
        const ax = cx + a.x + px * (0.5 + a.id * 0.01);
        const ay = cy + a.y + py * (0.5 + a.id * 0.01);
        const bx = cx + b.x + px * (0.5 + b.id * 0.01);
        const by = cy + b.y + py * (0.5 + b.id * 0.01);

        const pulse = Math.sin(t * 1.5 + edge.from * 0.3) * 0.5 + 0.5;
        const alpha = 0.04 + pulse * 0.06;

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = `rgba(79, 140, 255, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((node) => {
        const nx = cx + node.x + px * (0.5 + node.id * 0.01);
        const ny = cy + node.y + py * (0.5 + node.id * 0.01);
        const pulse = Math.sin(t * node.pulseSpeed + node.pulseDelay) * 0.5 + 0.5;
        const r = node.radius * (0.8 + pulse * 0.4);
        const alpha = 0.3 + pulse * 0.5;

        // Glow
        const gradient = ctx.createRadialGradient(nx, ny, 0, nx, ny, r * 4);
        gradient.addColorStop(0, `rgba(79, 140, 255, ${alpha * 0.3})`);
        gradient.addColorStop(1, "rgba(79, 140, 255, 0)");
        ctx.beginPath();
        ctx.arc(nx, ny, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.arc(nx, ny, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 140, 255, ${alpha})`;
        ctx.fill();
      });

      // Central bright node
      const coreR = 6 + Math.sin(t * 1.2) * 2;
      const coreGlow = ctx.createRadialGradient(
        cx + px * 0.3, cy + py * 0.3, 0,
        cx + px * 0.3, cy + py * 0.3, coreR * 8
      );
      coreGlow.addColorStop(0, "rgba(79, 140, 255, 0.4)");
      coreGlow.addColorStop(0.3, "rgba(79, 140, 255, 0.1)");
      coreGlow.addColorStop(1, "rgba(79, 140, 255, 0)");
      ctx.beginPath();
      ctx.arc(cx + px * 0.3, cy + py * 0.3, coreR * 8, 0, Math.PI * 2);
      ctx.fillStyle = coreGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx + px * 0.3, cy + py * 0.3, coreR, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(79, 140, 255, 0.8)";
      ctx.fill();

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [nodes, edges, mouse, size]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, type: "spring", stiffness: 60 }}
    >
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full pulse-ring"
        style={{
          background: "radial-gradient(circle, rgba(79, 140, 255, 0.05) 0%, transparent 70%)",
        }}
      />

      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
        className="relative z-10"
      />
    </motion.div>
  );
}
