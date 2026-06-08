"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import Link from "next/link";

type Point = { x: number; y: number };

interface WaveConfig {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
}

const highlightPills = ["Real-time tracking", "12-month forecasting", "No bank linking"] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function GlowyWavesHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const computeThemeColors = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      const resolveColor = (variables: string[], alpha = 1) => {
        const tempEl = document.createElement("div");
        tempEl.style.position = "absolute";
        tempEl.style.visibility = "hidden";
        tempEl.style.width = "1px";
        tempEl.style.height = "1px";
        document.body.appendChild(tempEl);
        let color = `rgba(255, 255, 255, ${alpha})`;
        for (const variable of variables) {
          const value = rootStyles.getPropertyValue(variable).trim();
          if (value) {
            tempEl.style.backgroundColor = `var(${variable})`;
            const computedColor = getComputedStyle(tempEl).backgroundColor;
            if (computedColor && computedColor !== "rgba(0, 0, 0, 0)") {
              if (alpha < 1) {
                const m = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                color = m ? `rgba(${m[1]}, ${m[2]}, ${m[3]}, ${alpha})` : computedColor;
              } else {
                color = computedColor;
              }
              break;
            }
          }
        }
        document.body.removeChild(tempEl);
        return color;
      };

      return {
        backgroundTop: resolveColor(["--background"], 1),
        backgroundBottom: resolveColor(["--muted", "--background"], 0.95),
        wavePalette: [
          { offset: 0, amplitude: 70, frequency: 0.003, color: resolveColor(["--primary"], 0.8), opacity: 0.45 },
          { offset: Math.PI / 2, amplitude: 90, frequency: 0.0026, color: resolveColor(["--accent", "--primary"], 0.7), opacity: 0.35 },
          { offset: Math.PI, amplitude: 60, frequency: 0.0034, color: resolveColor(["--secondary", "--foreground"], 0.65), opacity: 0.3 },
          { offset: Math.PI * 1.5, amplitude: 80, frequency: 0.0022, color: resolveColor(["--primary-foreground", "--foreground"], 0.25), opacity: 0.25 },
          { offset: Math.PI * 2, amplitude: 55, frequency: 0.004, color: resolveColor(["--foreground"], 0.2), opacity: 0.2 },
        ] satisfies WaveConfig[],
      };
    };

    let themeColors = computeThemeColors();
    const observer = new MutationObserver(() => { themeColors = computeThemeColors(); });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouseInfluence = prefersReducedMotion ? 10 : 70;
    const influenceRadius = prefersReducedMotion ? 160 : 320;
    const smoothing = prefersReducedMotion ? 0.04 : 0.1;

    const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    const recenterMouse = () => {
      const c = { x: canvas.width / 2, y: canvas.height / 2 };
      mouseRef.current = c; targetMouseRef.current = c;
    };
    const handleResize = () => { resizeCanvas(); recenterMouse(); };

    resizeCanvas(); recenterMouse();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", (e) => { targetMouseRef.current = { x: e.clientX, y: e.clientY }; });
    window.addEventListener("mouseleave", recenterMouse);

    const drawWave = (wave: WaveConfig) => {
      ctx.save(); ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += 4) {
        const dx = x - mouseRef.current.x;
        const dy = canvas.height / 2 - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / influenceRadius);
        const mouseEffect = influence * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset);
        const y = canvas.height / 2
          + Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude
          + Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45)
          + mouseEffect;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur = 35;
      ctx.shadowColor = wave.color;
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      time += 1;
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * smoothing;
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, themeColors.backgroundTop);
      grad.addColorStop(1, themeColors.backgroundBottom);
      ctx.fillStyle = grad; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      themeColors.wavePalette.forEach(drawWave);
      animationId = window.requestAnimationFrame(animate);
    };
    animationId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-background"
      aria-label="Hero section"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-foreground/[0.035] blur-[140px] dark:bg-primary/[0.08]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-foreground/[0.025] blur-[120px] dark:bg-foreground/[0.05]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-24 text-center md:px-8 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full">
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-foreground/70 backdrop-blur dark:border-border/60 dark:bg-background/70 dark:text-foreground/80"
          >
            <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
            Now in open beta
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mb-6 text-4xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl"
          >
            Know exactly where{" "}
            <span className="bg-gradient-to-r from-primary via-primary/60 to-foreground/80 bg-clip-text text-transparent">
              your money goes.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mb-10 max-w-2xl text-lg text-foreground/60 md:text-xl"
          >
            Track subscriptions, analyze spending, and forecast your financial future — all without linking your bank account.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/signin"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-semibold uppercase tracking-[0.15em] text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
            >
              Start for free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/60 px-8 py-3 text-base text-foreground/80 backdrop-blur transition-all hover:border-border/60 hover:bg-background/70 dark:border-border/50 dark:bg-background/40 dark:text-foreground/70 dark:hover:bg-background/50"
            >
              Sign in to your account
            </Link>
          </motion.div>

          <motion.ul
            variants={itemVariants}
            className="mb-12 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-foreground/60 dark:text-foreground/70"
          >
            {highlightPills.map((pill) => (
              <li
                key={pill}
                className="rounded-full border border-border/40 bg-background/60 px-4 py-2 backdrop-blur dark:border-border/60 dark:bg-background/70"
              >
                {pill}
              </li>
            ))}
          </motion.ul>

        </motion.div>
      </div>
    </section>
  );
}
