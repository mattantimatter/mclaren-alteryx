"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

import { isMobileExperience, shouldReduceMotion } from "@/lib/device";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const root = document.documentElement;
    const body = document.body;
    const hideNativeScrollbar = () => {
      for (const el of [root, body]) {
        el.style.setProperty("scrollbar-width", "none", "important");
        el.style.setProperty("-ms-overflow-style", "none", "important");
        el.style.setProperty("scrollbar-color", "transparent transparent", "important");
      }
    };
    hideNativeScrollbar();

    if (prefersReduced || isMobileExperience()) return;

    const lenis = new Lenis({
      duration: 1.7,
      lerp: 0.07,
      wheelMultiplier: 0.65,
      smoothWheel: true,
    });

    // Keep ScrollTrigger positions in sync with Lenis smooth scroll.
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onRaf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    const observer = new MutationObserver(hideNativeScrollbar);
    observer.observe(root, { attributes: true, attributeFilter: ["class", "style"] });

    const refresh = () => ScrollTrigger.refresh();
    refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("preloader:complete", refresh);

    return () => {
      observer.disconnect();
      window.removeEventListener("load", refresh);
      window.removeEventListener("preloader:complete", refresh);
      gsap.ticker.remove(onRaf);
      lenis.destroy();
      ScrollTrigger.scrollerProxy(document.documentElement, {});
    };
  }, []);

  return <>{children}</>;
}
