"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import ThreeDTextReveal from "@/components/react-bits/3d-text-reveal";

const SCROLL_WORDS = [
  "Design",
  "Simulate",
  "Build",
  "Optimize",
  "Race",
  "Accelerate",
];

const WORD_GAP = 17;
const MOBILE_WORD_GAP = 12;
const END_ROTATION = (SCROLL_WORDS.length - 1) * WORD_GAP;
const MOBILE_END_ROTATION = (SCROLL_WORDS.length - 1) * MOBILE_WORD_GAP;

type StorySectionProps = {
  mobileLayout?: boolean;
};

export default function StorySection({ mobileLayout = false }: StorySectionProps) {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 200);
    window.addEventListener("preloader:complete", refresh);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("preloader:complete", refresh);
    };
  }, []);

  return (
    <section className="relative z-10 w-full bg-carbon" data-story-section>
      <ThreeDTextReveal
        mobileOptimized={mobileLayout}
        items={SCROLL_WORDS}
        scrollDistance={mobileLayout ? "200vh" : "320vh"}
        pinStart="top top"
        className={mobileLayout ? "bg-carbon px-3" : "bg-carbon"}
        fontSize={
          mobileLayout
            ? "clamp(1.5rem, 7vw, 2.75rem)"
            : "clamp(3rem, 10vw, 7.5rem)"
        }
        fontWeight={700}
        gap={mobileLayout ? MOBILE_WORD_GAP : WORD_GAP}
        radiusOffset={mobileLayout ? 0.32 : 0.43}
        scrubSmoothing={mobileLayout ? 0.5 : 1.5}
        perspective={mobileLayout ? 700 : 1000}
        startRotation={0}
        endRotation={mobileLayout ? MOBILE_END_ROTATION : END_ROTATION}
        textClassName={
          mobileLayout
            ? "font-display text-white tracking-tight"
            : "font-display text-white"
        }
      />
    </section>
  );
}
