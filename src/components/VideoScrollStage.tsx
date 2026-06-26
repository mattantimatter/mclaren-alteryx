"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Wraps the hero + first section in a tall scroll range. A fixed full-viewport video
 * sits behind the content while its `currentTime` is scrubbed to scroll progress.
 */
export default function VideoScrollStage({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const exitFadeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const video = videoRef.current;
      const wrapper = wrapperRef.current;
      const stage = stageRef.current;
      if (!video || !wrapper || !stage) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReduced) return;

      const mobileQuery = window.matchMedia("(max-width: 639px)");

      const getFrame = () => {
        const mobile = mobileQuery.matches;
        return {
          heroX: mobile ? 82 : 62,
          heroY: mobile ? 38 : 48,
          statsX: mobile ? 76 : 14,
          statsY: mobile ? 40 : 36,
        };
      };

      video.pause();

      let scrubTrigger: ScrollTrigger | null = null;
      let exitTrigger: ScrollTrigger | null = null;

      const setupExitFade = () => {
        exitTrigger?.kill();

        const storySection = document.querySelector("[data-story-section]");
        const statsPin = document.querySelector("[data-stats-pin]");
        const exitFade = exitFadeRef.current;
        if (!storySection || !exitFade) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: storySection,
            start: "top bottom",
            end: "top 40%",
            scrub: true,
            invalidateOnRefresh: true,
            onLeave: () => gsap.set(stage, { autoAlpha: 0 }),
            onEnterBack: () => gsap.set(stage, { autoAlpha: 1 }),
          },
        });

        tl.to(exitFade, { opacity: 1, ease: "none", duration: 1 }, 0);
        if (statsPin) {
          tl.to(statsPin, { opacity: 0, ease: "none", duration: 1 }, 0);
        }

        exitTrigger = tl.scrollTrigger ?? null;
      };

      const lockLastFrame = () => {
        const duration = video.duration || 8;
        video.currentTime = duration - 0.05;
        const { statsX, statsY } = getFrame();
        video.style.objectPosition = `${statsX}% ${statsY}%`;
      };

      const build = () => {
        scrubTrigger?.kill();

        const duration = video.duration || 8;

        scrubTrigger = ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const t = p * (duration - 0.05);
            if (Math.abs(video.currentTime - t) > 1 / 48) {
              video.currentTime = t;
            }

            const { heroX, heroY, statsX, statsY } = getFrame();
            const mobile = mobileQuery.matches;

            const xProgress = mobile
              ? gsap.utils.clamp(0, 1, (p - 0.4) / 0.4)
              : p;
            const xEase = mobile
              ? gsap.parseEase("power2.inOut")(xProgress)
              : p;
            const x = gsap.utils.interpolate(heroX, statsX, mobile ? xEase : p);

            const yProgress = mobile
              ? gsap.utils.clamp(0, 1, (p - 0.42) / 0.38)
              : p;
            const yEase = mobile
              ? gsap.parseEase("power2.inOut")(yProgress)
              : p;
            const y = gsap.utils.interpolate(heroY, statsY, yEase);

            video.style.objectPosition = `${x}% ${y}%`;
          },
          onLeave: lockLastFrame,
        });

        gsap.set(stage, { autoAlpha: 1 });

        ScrollTrigger.refresh();
      };

      const syncFrame = () => {
        const { heroX, heroY } = getFrame();
        video.style.objectPosition = `${heroX}% ${heroY}%`;
        ScrollTrigger.refresh();
      };

      const onReady = () => {
        build();
        syncFrame();
        ScrollTrigger.refresh();
      };

      setupExitFade();

      mobileQuery.addEventListener("change", syncFrame);
      window.addEventListener("resize", syncFrame);
      window.addEventListener("preloader:complete", onReady);

      if (video.readyState >= 1) onReady();
      else video.addEventListener("loadedmetadata", onReady, { once: true });

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0.35 },
        {
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

      return () => {
        scrubTrigger?.kill();
        exitTrigger?.kill();
        mobileQuery.removeEventListener("change", syncFrame);
        window.removeEventListener("resize", syncFrame);
        window.removeEventListener("preloader:complete", onReady);
        video.removeEventListener("loadedmetadata", onReady);
      };
    },
    { scope: wrapperRef },
  );

  return (
    <div ref={wrapperRef} className="relative" data-video-scroll-stage>
      <div
        ref={stageRef}
        className="pointer-events-none fixed inset-0 z-0 h-[100svh] w-full overflow-hidden"
        aria-hidden
      >
        <video
          ref={videoRef}
          data-hero-video
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "62% 48%" }}
          src="/video/mclaren.mp4"
          poster="/video/mclaren-poster.jpg"
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
        />
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-carbon/55 via-carbon/15 to-carbon/45"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(7,8,12,0.7)_100%)]" />
        <div
          ref={exitFadeRef}
          className="pointer-events-none absolute inset-0 z-20 bg-carbon opacity-0"
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
