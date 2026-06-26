"use client";

import React, { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export interface ThreeDTextRevealProps {
  items: string[];
  className?: string;
  textClassName?: string;
  scrollDistance?: string;
  perspective?: number;
  radiusOffset?: number;
  startRotation?: number;
  endRotation?: number;
  scrubSmoothing?: number;
  pinStart?: string;
  fontSize?: string;
  fontWeight?: number;
  gap?: number;
  mobileOptimized?: boolean;
}

const ThreeDTextReveal: React.FC<ThreeDTextRevealProps> = ({
  items = ["Scroll", "To", "Reveal", "3D", "Text"],
  className = "",
  textClassName = "",
  scrollDistance = "300vh",
  perspective = 1000,
  radiusOffset = 0.4,
  startRotation = -80,
  endRotation = 270,
  scrubSmoothing = 1,
  pinStart = "top top",
  fontSize = "clamp(3rem, 9vw, 7rem)",
  fontWeight = 900,
  gap = 15,
  mobileOptimized = false,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!wrapperRef.current || !containerRef.current) return;

      let timeline: gsap.core.Timeline | null = null;

      const updatePositions = () => {
        const radius = window.innerHeight * radiusOffset;

        itemsRef.current.forEach((item, index) => {
          if (!item) return;

          const angleInDegrees = index * gap;
          const angleInRadians = (angleInDegrees * Math.PI) / 180;

          const y = Math.sin(angleInRadians) * radius;
          const z = Math.cos(angleInRadians) * radius;
          const rotation = -angleInDegrees;

          gsap.set(item, {
            y,
            z,
            rotateX: rotation,
            xPercent: -50,
            yPercent: -50,
            transformOrigin: "50% 50%",
            force3D: !mobileOptimized,
          });
        });
      };

      const build = () => {
        updatePositions();

        timeline?.scrollTrigger?.kill();
        timeline?.kill();

        timeline = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: pinStart,
            end: `+=${scrollDistance}`,
            pin: true,
            pinSpacing: true,
            scrub: scrubSmoothing,
            anticipatePin: mobileOptimized ? 0 : 1,
            invalidateOnRefresh: true,
            ...(mobileOptimized ? { pinType: "transform" } : {}),
          },
        });

        timeline.fromTo(
          containerRef.current,
          { rotateX: startRotation },
          { rotateX: endRotation, ease: "none", force3D: !mobileOptimized },
        );

        ScrollTrigger.refresh();
      };

      const refreshHandler = () => updatePositions();
      ScrollTrigger.addEventListener("refresh", refreshHandler);

      if (mobileOptimized) {
        let started = false;
        const start = () => {
          if (started) return;
          started = true;
          build();
        };
        window.addEventListener("preloader:complete", start, { once: true });
        window.setTimeout(start, 2500);
      } else {
        build();
      }

      return () => {
        ScrollTrigger.removeEventListener("refresh", refreshHandler);
        timeline?.scrollTrigger?.kill();
        timeline?.kill();
      };
    },
    {
      dependencies: [
        items,
        scrollDistance,
        radiusOffset,
        startRotation,
        endRotation,
        scrubSmoothing,
        pinStart,
        gap,
        mobileOptimized,
        perspective,
      ],
      scope: wrapperRef,
    },
  );

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden",
        className,
      )}
      style={{
        perspective: `${perspective}px`,
        WebkitPerspective: `${perspective}px`,
        transformStyle: "preserve-3d",
        WebkitTransformStyle: "preserve-3d",
        isolation: mobileOptimized ? "isolate" : undefined,
      }}
    >
      <div
        ref={containerRef}
        className="absolute inset-0 text-center"
        style={{
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
          willChange: mobileOptimized ? "transform" : undefined,
        }}
      >
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            className={cn(
              "absolute top-1/2 left-1/2 whitespace-nowrap font-black uppercase",
              textClassName,
            )}
            style={{
              fontSize,
              fontWeight,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
              WebkitTransformStyle: "preserve-3d",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

ThreeDTextReveal.displayName = "ThreeDTextReveal";

export default ThreeDTextReveal;
