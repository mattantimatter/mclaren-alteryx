"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { isMobileExperience } from "@/lib/device";
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
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobileExperience());
  }, []);

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
        scrollDistance={mobile ? "240vh" : "320vh"}
        pinStart="top top"
        className="bg-carbon"
        textClassName="font-display text-white"
        fontSize={mobile ? "clamp(2.5rem, 12vw, 4.5rem)" : "clamp(3rem, 10vw, 7.5rem)"}
        fontWeight={700}
        gap={WORD_GAP}
        radiusOffset={mobile ? 0.38 : 0.43}
        scrubSmoothing={mobile ? 1 : 1.5}
        startRotation={0}
        endRotation={END_ROTATION}
      />

    </section>
  );
}
