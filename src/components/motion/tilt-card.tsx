"use client";

import Link from "next/link";
import { useRef } from "react";

const MAX_TILT = 9;

/**
 * A link card that leans toward the pointer in 3D, with a soft highlight
 * following the cursor across its face. Touch and reduced-motion get a plain
 * card: there is no hover to drive it, and the global reduced-motion rule
 * collapses the transition.
 */
export function TiltCard({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const node = ref.current;
    if (!node || event.pointerType !== "mouse") return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    node.style.transform = `perspective(900px) rotateX(${(0.5 - py) * MAX_TILT}deg) rotateY(${(px - 0.5) * MAX_TILT}deg) translateY(-6px)`;
    node.style.setProperty("--glare-x", `${px * 100}%`);
    node.style.setProperty("--glare-y", `${py * 100}%`);
    node.style.setProperty("--glare-o", "1");
  };

  const onLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "";
    node.style.setProperty("--glare-o", "0");
  };

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative overflow-hidden transition-transform duration-300 ease-out [transform-style:preserve-3d] ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: "var(--glare-o, 0)",
          background:
            "radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.32), transparent 55%)",
          mixBlendMode: "soft-light",
        }}
      />
    </Link>
  );
}
