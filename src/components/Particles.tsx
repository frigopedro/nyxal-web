"use client";

import { useCallback, useEffect, useRef } from "react";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
}

export function Particles({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  refresh = false,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const particles = useRef<Particle[]>([]);
  const width = useRef<number>(0);
  const height = useRef<number>(0);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationFrameId = useRef<number>(null);
  const isInitialized = useRef<boolean>(false);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (canvasContainerRef.current) {
      const rect = canvasContainerRef.current.getBoundingClientRect();
      const { clientWidth: w, clientHeight: h } = canvasContainerRef.current;
      const x = e.clientX - rect.left - w / 2;
      const y = e.clientY - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouse.current = { x, y };
      }
    }
  }, []);

  const resizeCanvas = useCallback(() => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      const { clientWidth, clientHeight } = canvasContainerRef.current;
      const dpr = window.devicePixelRatio || 1;
      canvasRef.current.width = clientWidth * dpr;
      canvasRef.current.height = clientHeight * dpr;
      context.current.scale(dpr, dpr);
      width.current = clientWidth;
      height.current = clientHeight;
    }
  }, []);

  const particleGenerator = useCallback(
    (x: number, y: number, hue: number): Particle => {
      return {
        x,
        y,
        translateX: 0,
        translateY: 0,
        size: Math.random() * 2 + 1,
        hue,
        saturation: Math.floor(Math.random() * 100),
        lightness: Math.floor(Math.random() * 60) + 20,
        alpha: Math.random(),
        ease: Math.random() * 0.05 + ease / 100,
      };
    },
    [ease]
  );

  const renderParticles = useCallback(() => {
    if (context.current && width.current && height.current) {
      context.current.clearRect(0, 0, width.current, height.current);
      particles.current.forEach((particle) => {
        const {
          x,
          y,
          translateX,
          translateY,
          size,
          hue,
          saturation,
          lightness,
          alpha,
        } = particle;
        context.current!.translate(translateX, translateY);
        context.current!.beginPath();
        context.current!.arc(x, y, size, 0, 2 * Math.PI);
        context.current!.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        context.current!.fill();
        context.current!.setTransform(1, 0, 0, 1, 0, 0);
      });
    }
  }, []);

  const animate = useCallback(() => {
    if (!isInitialized.current) return;

    particles.current.forEach((particle, i) => {
      const dx = (mouse.current.x - particle.x) / staticity;
      const dy = (mouse.current.y - particle.y) / staticity;
      particles.current[i].translateX += dx;
      particles.current[i].translateY += dy;
      particles.current[i].alpha = Math.min(
        Math.max(particles.current[i].alpha + (Math.random() - 0.5) * 0.01, 0),
        1
      );
    });
    renderParticles();
    animationFrameId.current = requestAnimationFrame(animate);
  }, [renderParticles, staticity]);

  const initializeParticles = useCallback(() => {
    if (width.current === 0 || height.current === 0) return;

    particles.current = [];
    for (let i = 0; i < quantity; i++) {
      const x = Math.random() * width.current;
      const y = Math.random() * height.current;
      // Update the particle color to use purple hues
      const hue = Math.floor(Math.random() * 60) + 260; // Purple hues
      particles.current.push(particleGenerator(x, y, hue));
    }
    isInitialized.current = true;
  }, [quantity, particleGenerator]);

  // Setup canvas and context
  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }

    const handleResize = () => {
      resizeCanvas();
      // Re-initialize particles after resize
      if (width.current > 0 && height.current > 0) {
        initializeParticles();
      }
    };

    handleResize(); // Initial setup
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      isInitialized.current = false;
    };
  }, [resizeCanvas, initializeParticles, onMouseMove]);

  // Start animation when component mounts
  useEffect(() => {
    // Wait for the next frame to ensure width and height are set
    const timeout = setTimeout(() => {
      if (width.current > 0 && height.current > 0) {
        initializeParticles();
        animate();
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [initializeParticles, animate]);

  // Handle refresh prop
  useEffect(() => {
    if (refresh && width.current > 0 && height.current > 0) {
      initializeParticles();
    }
  }, [refresh, initializeParticles]);

  return (
    <div
      className={className}
      ref={canvasContainerRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}

interface Particle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  hue: number;
  saturation: number;
  lightness: number;
  ease: number;
}
