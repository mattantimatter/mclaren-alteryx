"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useGLTF } from "@react-three/drei";
import { isMobileExperience } from "@/lib/device";

const MODEL_URL = "/models/mclaren-mcl-38.glb";

const CarModelViewer = dynamic(() => import("@/components/CarModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[420px] items-center justify-center">
      <span className="text-sm text-white/50">Loading 3D model…</span>
    </div>
  ),
});

function preloadDesktopModel() {
  useGLTF.preload(MODEL_URL);
  void import("@/components/CarModelViewer");
}

export function McLarenModelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!isMobileExperience()) {
      const start = () => {
        preloadDesktopModel();
        setShouldLoad(true);
      };

      start();
      window.addEventListener("preloader:complete", start);
      return () => window.removeEventListener("preloader:complete", start);
    }

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-carbon pb-24 pt-0 sm:pb-32"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mx-auto mb-12 max-w-3xl pt-16 text-center sm:pt-20">
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-papaya">
            MCL38 · 2024 Season
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Explore the car in 3D
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
            Every surface on the McLaren MCL38 is shaped by data. Rotate the
            model to see the aerodynamics that turn analytics into lap time.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-5xl">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-carbon-2 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
            <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(7,8,12,0.55)_100%)]" />
            {shouldLoad ? (
              <CarModelViewer variant="studio" />
            ) : (
              <div className="flex h-full min-h-[420px] items-center justify-center">
                <span className="text-sm text-white/50">Loading 3D model…</span>
              </div>
            )}
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-white/40">
          McLaren Formula 1 Team · Constructors&apos; Champions 2024
        </p>
      </div>
    </section>
  );
}
