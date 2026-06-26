"use client";

import Preloader from "@/components/Preloader";
import StatsSection from "@/components/StatsSection";
import StorySection from "@/components/StorySection";
import Footer from "@/components/Footer";

export default function MobileExperience() {
  return (
    <>
      <Preloader />
      <main className="relative w-full bg-carbon">
        <section className="relative min-h-screen overflow-hidden px-6 pb-12 pt-[max(5.5rem,14vh)]">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <img
              data-hero-video
              src="/video/mclaren-poster.jpg"
              alt=""
              className="h-full w-full object-cover"
              style={{ objectPosition: "78% 62%" }}
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-carbon/75 via-carbon/25 to-carbon/40" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(7,8,12,0.55)_0%,transparent_55%)]" />
          </div>

          <div className="relative z-10 flex max-w-3xl flex-col gap-5 text-left">
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/60">
                <span className="text-papaya">McLaren Racing</span>
                <span className="h-3 w-px bg-white/30" />
                <span className="text-alteryx-bright">Alteryx</span>
              </div>
              <span className="inline-block w-fit rounded-full border border-papaya/40 bg-papaya/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-papaya">
                Customer Story
              </span>
            </div>

            <h1 className="font-display text-3xl font-semibold leading-[1.05] tracking-tight text-white">
              <span className="block">Fast-Tracking Data</span>
              <span className="block text-papaya">in the Race to Accelerate</span>
            </h1>

            <p className="max-w-md text-sm leading-relaxed text-white/80">
              Over 20 race weekends. 1.5 TB of data each. McLaren Racing uses
              Alteryx to collect, process, and act on it all — accelerating
              strategic decisions on and off the track.
            </p>
          </div>
        </section>

        <StatsSection />

        <StorySection mobileLayout />

        <section className="bg-carbon px-6 pb-24 pt-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-papaya">
              MCL38 · 2024 Season
            </span>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white">
              Explore the car in 3D
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/60">
              Every surface on the McLaren MCL38 is shaped by data. View the full
              interactive 3D experience on desktop.
            </p>
            <div className="relative mx-auto mt-10 aspect-[16/10] max-w-2xl overflow-hidden rounded-2xl border border-white/10">
              <img
                src="/video/mclaren-poster.jpg"
                alt="McLaren MCL38"
                className="h-full w-full object-cover"
                style={{ objectPosition: "50% 45%" }}
                draggable={false}
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(7,8,12,0.55)_100%)]" />
            </div>
            <p className="mt-8 text-sm text-white/40">
              McLaren Formula 1 Team · Constructors&apos; Champions 2024
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
