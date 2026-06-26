"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { isMobileExperience } from "@/lib/device";

const SIZE = 200;
const CENTER = SIZE / 2;
const RADIUS = 76;
const SWEEP = 270;
const START_ANGLE = 135;
const CIRC = 2 * Math.PI * RADIUS;
const ARC_VISIBLE = (SWEEP / 360) * CIRC;

function videoReady(timeoutMs = 5000): Promise<void> {
  return new Promise((resolve) => {
    const done = () => resolve();
    const mobile = typeof window !== "undefined" && isMobileExperience();
    const timer = window.setTimeout(done, mobile ? 1200 : timeoutMs);

    if (mobile) {
      const img = document.querySelector<HTMLImageElement>(
        "img[data-hero-video]",
      );
      if (img?.complete) {
        window.clearTimeout(timer);
        done();
        return;
      }
      img?.addEventListener(
        "load",
        () => {
          window.clearTimeout(timer);
          done();
        },
        { once: true },
      );
      return;
    }

    const check = () => {
      const v = document.querySelector<HTMLVideoElement>("video[data-hero-video]");
      if (!v) {
        window.setTimeout(check, 100);
        return;
      }
      if (v.readyState >= 3) {
        window.clearTimeout(timer);
        done();
        return;
      }
      v.addEventListener(
        "canplaythrough",
        () => {
          window.clearTimeout(timer);
          done();
        },
        { once: true },
      );
    };
    check();
  });
}

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<SVGCircleElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const root = document.documentElement;
      root.style.overflow = "hidden";

      const state = { v: 0 };

      const render = () => {
        const p = state.v / 100;
        if (arcRef.current) {
          arcRef.current.style.strokeDashoffset = String(
            ARC_VISIBLE * (1 - p),
          );
        }
        if (numberRef.current) {
          numberRef.current.textContent = String(Math.round(state.v));
        }
      };
      render();

      const finish = () => {
        const tl = gsap.timeline({
          onComplete: () => {
            root.style.overflow = "";
            setHidden(true);
            ScrollTrigger.refresh();
            window.dispatchEvent(new Event("preloader:complete"));
          },
        });
        tl.to(state, { v: 100, duration: 0.4, ease: "power3.out", onUpdate: render })
          .to(rootRef.current, { scale: 1.06, duration: 0.5, ease: "power2.in" }, "<")
          .to(
            rootRef.current,
            { autoAlpha: 0, duration: 0.6, ease: "power2.inOut" },
            "-=0.25",
          );
      };

      const rev = gsap.to(state, {
        v: 92,
        duration: 1.9,
        ease: "power2.out",
        onUpdate: render,
      });

      let ready = false;
      Promise.all([
        document.fonts ? document.fonts.ready : Promise.resolve(),
        videoReady(),
      ]).then(() => {
        ready = true;
        if (!rev.isActive()) finish();
      });

      rev.eventCallback("onComplete", () => {
        if (ready) finish();
        else {
          const wait = setInterval(() => {
            if (ready) {
              clearInterval(wait);
              finish();
            }
          }, 80);
        }
      });

      return () => {
        root.style.overflow = "";
      };
    },
    { scope: rootRef },
  );

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-carbon"
      aria-label="Loading"
      role="status"
    >
      <div className="relative">
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="drop-shadow-[0_0_32px_rgba(255,128,0,0.2)]"
        >
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="#1a1d27"
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray={`${ARC_VISIBLE} ${CIRC}`}
            transform={`rotate(${START_ANGLE} ${CENTER} ${CENTER})`}
          />
          <circle
            ref={arcRef}
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="#ff8000"
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray={`${ARC_VISIBLE} ${CIRC}`}
            strokeDashoffset={ARC_VISIBLE}
            transform={`rotate(${START_ANGLE} ${CENTER} ${CENTER})`}
          />
        </svg>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span
            ref={numberRef}
            className="font-display text-4xl font-medium tabular-nums text-white"
          >
            0
          </span>
        </div>
      </div>
    </div>
  );
}
