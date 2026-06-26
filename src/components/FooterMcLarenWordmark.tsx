"use client";

import { useEffect, useRef, useState } from "react";
import { isMobileExperience, shouldReduceMotion } from "@/lib/device";

const WORDMARK_STYLE = {
  fontSize: "inherit" as const,
  letterSpacing: "0.12em",
  paddingLeft: "0.12em",
  textShadow:
    "0 -1.5px 0 rgba(255,128,0,0.55), 1.5px 0 0 rgba(255,128,0,0.55), 0 1.5px 0 rgba(255,128,0,0.55), -1.5px 0 0 rgba(255,128,0,0.55), 1px 1px 0 rgba(255,128,0,0.4), -1px -1px 0 rgba(255,128,0,0.4), 1px -1px 0 rgba(255,128,0,0.4), -1px 1px 0 rgba(255,128,0,0.4)",
};

function applyMask(el: HTMLElement, x: number, y: number) {
  const maskImage = `radial-gradient(circle min(42vw, 460px) at ${x}px ${y}px, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.55) 20%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.08) 80%, transparent 100%)`;
  el.style.webkitMaskImage = maskImage;
  el.style.maskImage = maskImage;
}

export default function FooterMcLarenWordmark() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [enableReveal, setEnableReveal] = useState(false);
  const targetRef = useRef({ x: -9999, y: -9999 });
  const currentRef = useRef({ x: -9999, y: -9999 });
  const cursorRef = useRef<{ x: number; y: number } | null>(null);
  const lastMoveRef = useRef(0);

  useEffect(() => {
    setEnableReveal(!isMobileExperience() && !shouldReduceMotion());
  }, []);

  useEffect(() => {
    if (!enableReveal) return;

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
  }, [enableReveal]);

  useEffect(() => {
    if (!enableReveal) return;

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

        applyMask(h, currentRef.current.x, currentRef.current.y);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enableReveal]);

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
        className="pointer-events-none absolute inset-0 flex justify-center whitespace-nowrap font-bold uppercase leading-none text-carbon"
        style={WORDMARK_STYLE}
      >
        McLaren
      </div>

      {enableReveal ? (
        <div
          ref={headingRef}
          className="pointer-events-none absolute inset-0 flex justify-center whitespace-nowrap font-bold uppercase leading-none text-papaya"
          style={{
            ...WORDMARK_STYLE,
            textShadow: "none",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        >
          McLaren
        </div>
      ) : null}
    </div>
  );
}
