# McLaren Racing × Alteryx — Scroll Experience

A cinematic, scroll-driven landing page reimagining the [McLaren x Alteryx customer story](https://www.alteryx.com/resources/customer-story/mclaren-racing-fast-tracks-data-analytics-in-the-race-to-accelerate). The hero and first section share a video background whose playhead is scrubbed by scroll position, fronted by a speedometer-style preloader.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (theme tokens in `src/app/globals.css`)
- **GSAP** + **ScrollTrigger** + `@gsap/react` (`useGSAP`) for scroll animation
- **Lenis** for smooth scrolling
- Fonts: **Sora** (display) + **Inter** (body) via `next/font`

## How it works

- `components/VideoScrollStage.tsx` — full-viewport `sticky` video; a `ScrollTrigger` maps scroll progress to `video.currentTime`, scrubbing the clip as you scroll through the hero + stats.
- `components/Preloader.tsx` — SVG speedometer gauge (arc + needle + counter) that revs up and waits on `document.fonts.ready` + video `canplaythrough` before dismissing.
- `components/Hero.tsx` — headline lockup with intro + parallax.
- `components/StatsSection.tsx` — count-up of `300M / 11.8B / 300` on enter.
- `components/StorySection.tsx` — Design / Build / Race pillars with batched reveals.

Respects `prefers-reduced-motion`: smooth scroll, video scrubbing, and reveals fall back to static content.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

The background video lives at `public/video/mclaren.mp4` with a poster at `public/video/mclaren-poster.jpg`.

> Concept/demo only. Not affiliated with or endorsed by McLaren or Alteryx.
