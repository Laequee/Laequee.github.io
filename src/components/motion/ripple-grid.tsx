"use client";

import { useEffect, useRef } from "react";

const GAP = 26;
const BASE_R = 1.1;
const REACH = 150;
const RING_SPEED = 520;
const RING_WIDTH = 60;

/**
 * A field of dots behind the hero, read as a network: dots swell and tint
 * near the pointer, and a click sends a ring outward through the field.
 * Canvas, no library. Runs only while on screen; reduced-motion visitors get
 * one static frame.
 */
export function RippleGrid({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const styles = getComputedStyle(document.documentElement);
    const ink = styles.getPropertyValue("--ink-faint").trim() || "#80838e";
    const tone = styles.getPropertyValue("--tone-azure").trim() || "#6c9bff";

    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999 };
    const rings: { x: number; y: number; born: number }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(0);
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      const t = now / 1000;

      for (let i = rings.length - 1; i >= 0; i--) {
        if ((now - rings[i].born) / 1000 > 2.4) rings.splice(i, 1);
      }

      for (let y = GAP / 2; y < height; y += GAP) {
        for (let x = GAP / 2; x < width; x += GAP) {
          /* Slow ambient swell, so the field is alive before anyone touches it. */
          let energy = reduce ? 0 : (Math.sin(x * 0.012 + t * 0.8) + Math.cos(y * 0.015 - t * 0.6)) * 0.08 + 0.08;

          const dist = Math.hypot(x - pointer.x, y - pointer.y);
          if (dist < REACH) energy += (1 - dist / REACH) ** 2;

          for (const ring of rings) {
            const age = (now - ring.born) / 1000;
            const radius = age * RING_SPEED;
            const off = Math.abs(Math.hypot(x - ring.x, y - ring.y) - radius);
            if (off < RING_WIDTH) energy += (1 - off / RING_WIDTH) * Math.max(0, 1 - age / 2.4);
          }

          const e = Math.min(energy, 1.4);
          ctx.globalAlpha = 0.16 + Math.min(e, 1) * 0.7;
          ctx.fillStyle = e > 0.25 ? tone : ink;
          ctx.beginPath();
          ctx.arc(x, y, BASE_R + e * 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      if (visible) draw(now);
      frame = requestAnimationFrame(loop);
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onDown = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (y < 0 || y > rect.height) return;
      rings.push({ x, y, born: performance.now() });
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    if (reduce) return () => resizeObserver.disconnect();

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibility.observe(canvas);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
