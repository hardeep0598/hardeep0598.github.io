import React, { useEffect, useRef, useState } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  originalX: number;
  originalY: number;
}

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, rx: 0, ry: 0, isHovering: false });
  const scrollRef = useRef({ current: 0, target: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle resizing accurately using ResizeObserver
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = height;
        initStars(width, height);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const initStars = (w: number, h: number) => {
      const starCount = Math.min(180, Math.floor((w * h) / 9000));
      const tempStars: Star[] = [];

      const colors = [
        "rgba(255, 255, 255, 0.8)", // Soft white
        "rgba(147, 197, 253, 0.8)", // Light electric blue
        "rgba(196, 181, 253, 0.8)", // Soft purple
        "rgba(253, 224, 71, 0.6)",  // Gold highlight
      ];

      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        tempStars.push({
          x,
          y,
          z: Math.random() * 0.5 + 0.5, // depth
          size: Math.random() * 1.5 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
          originalX: x,
          originalY: y,
        });
      }

      starsRef.current = tempStars;
    };

    // Track mouse
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.isHovering = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.isHovering = false;
    };

    // Track scroll
    const onScroll = () => {
      scrollRef.current.target = window.scrollY;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);
    canvas.addEventListener("mouseleave", onMouseLeave);

    // Initial setup
    const initialWidth = containerRef.current?.clientWidth || window.innerWidth;
    const initialHeight = containerRef.current?.clientHeight || window.innerHeight;
    canvas.width = initialWidth;
    canvas.height = initialHeight;
    initStars(initialWidth, initialHeight);

    let animationFrameId: number;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Clear with very subtle deep space background
      ctx.fillStyle = "#03050c";
      ctx.fillRect(0, 0, w, h);

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      mouse.rx += (mouse.x - mouse.rx) * 0.08;
      mouse.ry += (mouse.y - mouse.ry) * 0.08;

      // Smooth scroll interpolation
      const scroll = scrollRef.current;
      scroll.current += (scroll.target - scroll.current) * 0.1;

      // Draw faint background nebula glow (Apple meets NASA style)
      const gradient = ctx.createRadialGradient(
        w * 0.3 + Math.sin(Date.now() * 0.0001) * 100,
        h * 0.4 + Math.cos(Date.now() * 0.0001) * 100,
        0,
        w * 0.3,
        h * 0.4,
        Math.max(w, h) * 0.7
      );
      gradient.addColorStop(0, "rgba(22, 14, 53, 0.15)"); // Deep indigo nebula
      gradient.addColorStop(0.5, "rgba(8, 12, 36, 0.08)"); // Midnight blue
      gradient.addColorStop(1, "rgba(3, 5, 12, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Draw second warmer nebula (Gold/Nebula dust)
      const grad2 = ctx.createRadialGradient(
        w * 0.8 + Math.cos(Date.now() * 0.00008) * 80,
        h * 0.7 + Math.sin(Date.now() * 0.00008) * 80,
        0,
        w * 0.8,
        h * 0.7,
        Math.max(w, h) * 0.5
      );
      grad2.addColorStop(0, "rgba(124, 58, 237, 0.06)"); // Purple
      grad2.addColorStop(0.6, "rgba(234, 179, 8, 0.02)"); // Gold
      grad2.addColorStop(1, "rgba(3, 5, 12, 0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      // Render Stars
      const stars = starsRef.current;
      const len = stars.length;

      for (let i = 0; i < len; i++) {
        const s = stars[i];

        // Slowly move stars
        s.x += s.speedX;
        s.y += s.speedY;

        // Wrap around borders
        if (s.x < 0) s.x = w;
        if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h;
        if (s.y > h) s.y = 0;

        // Parallax offset from scroll & mouse
        const scrollOffset = scroll.current * s.z * 0.2;
        let xOffset = 0;
        let yOffset = 0;

        if (mouse.isHovering) {
          const dx = mouse.rx - s.x;
          const dy = mouse.ry - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            // Push stars slightly depending on distance
            const force = (180 - dist) / 180;
            xOffset = -dx * force * s.z * 0.12;
            yOffset = -dy * force * s.z * 0.12;
          }
        }

        const renderX = s.x + xOffset;
        // Keep stars within canvas bounds vertically, account for scroll parallax
        const renderY = ((s.y - scrollOffset + h * 10) % h);

        // Draw star
        ctx.beginPath();
        ctx.arc(renderX, renderY, s.size * (mouse.isHovering ? 1.1 : 1), 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();

        // Optional very faint glow for larger stars
        if (s.size > 1.2) {
          ctx.beginPath();
          ctx.arc(renderX, renderY, s.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = s.color.replace("0.8", "0.15").replace("0.6", "0.1");
          ctx.fill();
        }
      }

      // Render dynamic connecting constellation lines
      ctx.lineWidth = 0.45;
      for (let i = 0; i < len; i++) {
        const s1 = stars[i];
        const scrollOffset1 = scroll.current * s1.z * 0.2;
        const rX1 = s1.x + (mouse.isHovering ? -(mouse.rx - s1.x) * ((180 - Math.sqrt((mouse.rx - s1.x)**2 + (mouse.ry - s1.y)**2)) / 180) * s1.z * 0.12 : 0);
        const rY1 = ((s1.y - scrollOffset1 + h * 10) % h);

        // Limit checking to a few stars to keep performance high
        let connectionCount = 0;
        for (let j = i + 1; j < len; j++) {
          if (connectionCount > 3) break; // Limit connections per star
          const s2 = stars[j];
          const scrollOffset2 = scroll.current * s2.z * 0.2;
          const rX2 = s2.x + (mouse.isHovering ? -(mouse.rx - s2.x) * ((180 - Math.sqrt((mouse.rx - s2.x)**2 + (mouse.ry - s2.y)**2)) / 180) * s2.z * 0.12 : 0);
          const rY2 = ((s2.y - scrollOffset2 + h * 10) % h);

          const dx = rX1 - rX2;
          const dy = rY1 - rY2;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect stars if they are close and of similar depth
          if (dist < 100 && Math.abs(s1.z - s2.z) < 0.25) {
            connectionCount++;
            const alpha = ((100 - dist) / 100) * 0.15;
            ctx.beginPath();
            ctx.moveTo(rX1, rY1);
            ctx.lineTo(rX2, rY2);
            ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Draw subtle orbital paths matching "planetary motion"
      ctx.strokeStyle = "rgba(147, 197, 253, 0.02)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.5 - scroll.current * 0.1, w * 0.35, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(196, 181, 253, 0.015)";
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.5 - scroll.current * 0.1, w * 0.55, 0, Math.PI * 2);
      ctx.stroke();

      // Mouse interactive spot highlight
      if (mouse.isHovering) {
        const glowGlow = ctx.createRadialGradient(
          mouse.rx,
          mouse.ry,
          0,
          mouse.rx,
          mouse.ry,
          150
        );
        glowGlow.addColorStop(0, "rgba(147, 197, 253, 0.04)");
        glowGlow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glowGlow;
        ctx.beginPath();
        ctx.arc(mouse.rx, mouse.ry, 150, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <canvas id="cosmic-canvas" ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
}
