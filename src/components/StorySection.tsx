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
const END_ROTATION = (SCROLL_WORDS.length - 1) * WORD_GAP;

export default function StorySection() {
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
        items={SCROLL_WORDS}
        scrollDistance="320vh"
        pinStart="top top"
        className="bg-carbon"
        textClassName="font-display text-white"
        fontSize="clamp(3rem, 10vw, 7.5rem)"
        fontWeight={700}
        gap={WORD_GAP}
        radiusOffset={0.43}
        scrubSmoothing={1.5}
        startRotation={0}
        endRotation={END_ROTATION}
      />

    </section>
  );
}
