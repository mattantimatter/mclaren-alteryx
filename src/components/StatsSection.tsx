"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type Stat = {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
  icon: "simulations" | "data" | "sensors";
};

function StatIcon({ type }: { type: Stat["icon"] }) {
  const cls = "h-5 w-5 shrink-0 text-papaya sm:h-6 sm:w-6";

  if (type === "simulations") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 18V6l8 6 8-6v12"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M12 12v6M8 15h8"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "data") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6"
          stroke="currentColor"
          strokeWidth="1.75"
        />
      </svg>
    );
  }

  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="6.5" stroke="currentColor" strokeWidth="1.75" strokeDasharray="3 3" />
    </svg>
  );
}

const STATS: Stat[] = [
  {
    value: 300,
    suffix: "M",
    label: "trackside analytics support 300M race simulations",
    icon: "simulations",
  },
  {
    value: 11.8,
    decimals: 1,
    suffix: "B",
    label: "data points consolidated to optimize race performance",
    icon: "data",
  },
  {
    value: 300,
    label: "telemetry sensors on each race car generate 100K data parameters",
    icon: "sensors",
  },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pinEl = pinRef.current;
      const videoStage = document.querySelector("[data-video-scroll-stage]");
      const items = gsap.utils.toArray<HTMLDivElement>(
        ".stat-item",
        section,
      );

      ScrollTrigger.matchMedia({
        "(min-width: 640px)": () => {
          if (!section || !pinEl || !videoStage) return;

          const st = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            endTrigger: videoStage,
            end: "bottom bottom",
            pin: pinEl,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          });

          return () => st.kill();
        },
      });

      items.forEach((item) => {
        const numEl = item.querySelector<HTMLElement>(".stat-num");
        const decimals = Number(numEl?.dataset.decimals ?? 0);
        const target = Number(numEl?.dataset.value ?? 0);
        const counter = { v: 0 };
        let started = false;

        const setNum = (n: number) => {
          if (numEl?.firstChild) numEl.firstChild.textContent = n.toFixed(decimals);
        };

        const run = () => {
          if (started) return;
          started = true;
          gsap.to(item, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" });
          gsap.to(counter, {
            v: target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => setNum(counter.v),
            onComplete: () => setNum(target),
          });
        };

        gsap.set(item, { opacity: 0, y: 50 });

        const st = ScrollTrigger.create({
          trigger: item,
          start: "top 88%",
          once: true,
          onEnter: run,
        });

        if (st.isActive || st.progress > 0) run();
      });

      ScrollTrigger.refresh();

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("preloader:complete", refresh);

      return () => {
        window.removeEventListener("preloader:complete", refresh);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-10 min-h-screen w-full px-6 pb-8 pt-24 sm:flex sm:items-end sm:justify-center sm:px-10 sm:pb-20 sm:pt-0 lg:px-20"
    >
      <div
        ref={pinRef}
        data-stats-pin
        className="relative min-h-[calc(100dvh-6rem)] sm:ml-auto sm:min-h-0 sm:w-full sm:max-w-xl sm:text-right"
      >
        <div className="max-w-[18rem] text-left sm:max-w-none">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Data-driven decisions at{" "}
            <span className="text-papaya">tremendous speed</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/75 sm:mt-5 sm:text-base sm:text-white/70 lg:text-lg">
            Everything across design, build, and race is completely data-driven.
            Advanced analytics with Alteryx underpin McLaren&apos;s competitive
            edge.
          </p>
        </div>

        <div className="absolute bottom-8 left-0 z-10 max-w-[15rem] sm:static sm:bottom-auto sm:mt-10 sm:max-w-none">
          <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-carbon/80 shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-md sm:divide-y sm:divide-white/10">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="stat-item flex flex-col gap-2 border-b border-white/10 px-4 py-4 text-left last:border-b-0 sm:items-end sm:gap-3 sm:border-b-0 sm:px-6 sm:py-6 sm:text-right"
            >
              <div className="flex items-center gap-3 sm:justify-end">
                <StatIcon type={stat.icon} />
                <div className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                  <span
                    className="stat-num text-white"
                    data-value={stat.value}
                    data-decimals={stat.decimals ?? 0}
                    data-suffix={stat.suffix ?? ""}
                  >
                    {(0).toFixed(stat.decimals ?? 0)}
                  </span>
                  {stat.suffix ? (
                    <span className="text-papaya">{stat.suffix}</span>
                  ) : null}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white/85 sm:max-w-sm sm:text-[0.9375rem] sm:leading-6">
                {stat.label}
              </p>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
