"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const content = contentRef.current;
      const meta = metaRef.current;
      const title = titleRef.current;
      const sub = subRef.current;
      const cue = cueRef.current;
      const section = sectionRef.current;
      if (!content || !meta || !title || !sub || !cue || !section) return;

      gsap.set(content, { opacity: 0, y: 40 });
      gsap.set(cue, { opacity: 0, y: 40 });

      let scrollBuilt = false;

      const buildScrollFade = () => {
        if (scrollBuilt) return;
        scrollBuilt = true;

        gsap.set(content, { opacity: 1, y: 0 });
        gsap.set([meta, title, sub, cue], { opacity: 1 });

        const fade = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });

        fade
          .fromTo(
            title,
            { opacity: 1, y: 0 },
            { opacity: 0, y: -16, ease: "power2.out", duration: 0.28 },
            0,
          )
          .fromTo(
            [meta, sub],
            { opacity: 1 },
            { opacity: 0, ease: "power2.out", duration: 0.22 },
            0.04,
          )
          .fromTo(
            cue,
            { opacity: 1 },
            { opacity: 0, ease: "power2.in", duration: 0.18 },
            0.04,
          );
      };

      const intro = () => {
        gsap.to(content, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          onComplete: buildScrollFade,
        });
        gsap.to(cue, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.35,
        });
      };

      const fallback = window.setTimeout(intro, 4200);
      const onDone = () => {
        window.clearTimeout(fallback);
        intro();
      };
      window.addEventListener("preloader:complete", onDone, { once: true });

      return () => {
        window.clearTimeout(fallback);
        window.removeEventListener("preloader:complete", onDone);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-start px-6 pt-[max(5.5rem,14vh)] sm:items-center sm:px-10 sm:pt-0 lg:px-20"
    >
      <div
        ref={contentRef}
        className="flex max-w-3xl flex-col gap-5 text-left sm:gap-6"
      >
        <div ref={metaRef} className="flex flex-col gap-5 sm:gap-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/60 sm:text-xs sm:tracking-[0.4em]">
            <span className="text-papaya">McLaren Racing</span>
            <span className="h-3 w-px bg-white/30" />
            <span className="text-alteryx-bright">Alteryx</span>
          </div>

          <span className="inline-block w-fit rounded-full border border-papaya/40 bg-papaya/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-papaya">
            Customer Story
          </span>
        </div>

        <h1
          ref={titleRef}
          className="font-display text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl sm:leading-[1.02] lg:text-7xl xl:text-8xl"
        >
          <span className="block sm:whitespace-nowrap">Fast-Tracking Data</span>
          <span className="block text-papaya">in the Race to Accelerate</span>
        </h1>

        <p
          ref={subRef}
          className="max-w-md text-sm leading-relaxed text-white/75 sm:max-w-xl sm:text-base sm:text-white/70 lg:text-lg"
        >
          Over 20 race weekends. 1.5 TB of data each. McLaren Racing uses
          Alteryx to collect, process, and act on it all — accelerating
          strategic decisions on and off the track.
        </p>
      </div>

      <div
        ref={cueRef}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.35em]">
          Scroll
        </span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/30 p-1">
          <span className="h-2 w-1 animate-bounce rounded-full bg-papaya" />
        </span>
      </div>
    </section>
  );
}
