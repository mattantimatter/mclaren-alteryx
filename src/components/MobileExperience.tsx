import Footer from "@/components/Footer";

const STORY_WORDS = [
  "Design",
  "Simulate",
  "Build",
  "Optimize",
  "Race",
  "Accelerate",
];

const STATS = [
  { value: "300M", label: "trackside analytics support 300M race simulations" },
  { value: "11.8B", label: "data points consolidated to optimize race performance" },
  { value: "300", label: "telemetry sensors on each race car generate 100K data parameters" },
] as const;

export default function MobileExperience() {
  return (
    <main className="relative w-full bg-carbon">
      <section className="relative min-h-screen overflow-hidden px-6 pb-12 pt-[max(5.5rem,14vh)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <img
            src="/video/mclaren-poster.jpg"
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: "82% 38%" }}
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-carbon/55 via-carbon/15 to-carbon/45" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(7,8,12,0.7)_100%)]" />
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

          <p className="max-w-md text-sm leading-relaxed text-white/75">
            Over 20 race weekends. 1.5 TB of data each. McLaren Racing uses
            Alteryx to collect, process, and act on it all — accelerating
            strategic decisions on and off the track.
          </p>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-16 pt-8">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white">
            Data-driven decisions at{" "}
            <span className="text-papaya">tremendous speed</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/75">
            Everything across design, build, and race is completely data-driven.
            Advanced analytics with Alteryx underpin McLaren&apos;s competitive
            edge.
          </p>

          <div className="mt-8 flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-carbon/80 shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
            {STATS.map((stat) => (
              <div
                key={stat.value}
                className="flex flex-col gap-2 border-b border-white/10 px-4 py-4 text-left last:border-b-0"
              >
                <div className="font-display text-3xl font-extrabold tracking-tight text-white">
                  <span className="text-papaya">{stat.value}</span>
                </div>
                <p className="text-sm leading-relaxed text-white/85">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-carbon px-6 py-16" data-story-section>
        <div className="mx-auto flex max-w-4xl flex-col gap-10">
          {STORY_WORDS.map((word) => (
            <p
              key={word}
              className="text-center font-display text-4xl font-bold uppercase tracking-tight text-white"
            >
              {word}
            </p>
          ))}
        </div>
      </section>

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
  );
}
