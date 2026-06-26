"use client";

import { useEffect, useRef, useState } from "react";

const WORDMARK_STYLE = {
  fontSize: "inherit" as const,
  letterSpacing: "0.12em",
  paddingLeft: "0.12em",
};

export default function FooterMcLarenWordmark() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [mask, setMask] = useState({ x: -9999, y: -9999 });
  const targetRef = useRef({ x: -9999, y: -9999 });
  const currentRef = useRef({ x: -9999, y: -9999 });
  const cursorRef = useRef<{ x: number; y: number } | null>(null);
  const lastMoveRef = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const el = sectionRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const h = headingRef.current;
      if (!h) return;
      const rect = h.getBoundingClientRect();
      lastMoveRef.current = performance.now();
      cursorRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      cursorRef.current = null;
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    let raf = 0;
    const start = performance.now();
    const duration = 11000;

    const tick = (t: number) => {
      const h = headingRef.current;
      if (h) {
        const hRect = h.getBoundingClientRect();
        const idle = t - lastMoveRef.current > 700 || !cursorRef.current;

        if (idle) {
          const elapsed = (t - start) % duration;
          const progress = elapsed / duration;
          const eased = 0.5 - 0.5 * Math.cos(progress * Math.PI * 2);
          targetRef.current = { x: eased * hRect.width, y: hRect.height / 2 };
        } else if (cursorRef.current) {
          targetRef.current = cursorRef.current;
        }

        if (currentRef.current.x === -9999) {
          currentRef.current = { ...targetRef.current };
        } else {
          const lerp = 0.08;
          currentRef.current = {
            x:
              currentRef.current.x +
              (targetRef.current.x - currentRef.current.x) * lerp,
            y:
              currentRef.current.y +
              (targetRef.current.y - currentRef.current.y) * lerp,
          };
        }
        setMask({ ...currentRef.current });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const maskImage = `radial-gradient(circle min(42vw, 460px) at ${mask.x}px ${mask.y}px, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.55) 20%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.08) 80%, transparent 100%)`;

  return (
    <div
      ref={sectionRef}
      className="relative mt-16 w-full cursor-default sm:mt-20"
      aria-hidden="true"
      style={{
        fontSize: "min(14.2vw, 210px)",
        height: "0.74em",
        maskImage: "linear-gradient(to bottom, #000 50%, transparent 95%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, #000 50%, transparent 95%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 flex justify-center whitespace-nowrap font-bold uppercase leading-none"
        style={WORDMARK_STYLE}
      >
        <span
          style={{
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(255,128,0,0.55)",
          }}
        >
          McLaren
        </span>
      </div>

      <div
        ref={headingRef}
        className="pointer-events-none absolute inset-0 flex justify-center whitespace-nowrap font-bold uppercase leading-none text-papaya"
        style={{
          ...WORDMARK_STYLE,
          WebkitMaskImage: maskImage,
          maskImage,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        McLaren
      </div>
    </div>
  );
}
