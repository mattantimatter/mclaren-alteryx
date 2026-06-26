"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export default function ScrollProgress() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useGSAP(() => {
    const fill = fillRef.current;
    const main = document.querySelector("main");
    if (!fill || !main) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const show = () => setVisible(true);
    window.addEventListener("preloader:complete", show, { once: true });
    const fallback = window.setTimeout(show, 4200);

    const update = (progress: number) => {
      gsap.set(fill, {
        scaleY: progress,
        force3D: true,
      });
    };

    const st = ScrollTrigger.create({
      trigger: main,
      start: "top top",
      end: "bottom bottom",
      scrub: prefersReduced ? false : 0.15,
      onUpdate: (self) => update(self.progress),
    });

    update(st.progress);

    const onRefresh = () => update(st.progress);
    ScrollTrigger.addEventListener("refresh", onRefresh);

    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("preloader:complete", show);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      st.kill();
    };
  });

  return (
    <div
      ref={trackRef}
      aria-hidden
      className={`pointer-events-none fixed inset-y-0 right-0 z-50 w-[3px] transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-white/[0.08]" />
      <div
        ref={fillRef}
        className="absolute inset-x-0 top-0 h-full origin-top scale-y-0 bg-papaya shadow-[0_0_12px_rgba(255,128,0,0.65)]"
      />
    </div>
  );
}
