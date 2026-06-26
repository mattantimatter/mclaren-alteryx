"use client";

import { motion } from "motion/react";
import FooterMcLarenWordmark from "@/components/FooterMcLarenWordmark";

const STORY_URL =
  "https://www.alteryx.com/resources/customer-story/mclaren-racing-fast-tracks-data-analytics-in-the-race-to-accelerate";

const socials = [
  {
    key: "x",
    href: "https://x.com/McLarenF1",
    label: "McLaren on X",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    key: "li",
    href: "https://www.linkedin.com/company/mclaren-racing",
    label: "McLaren on LinkedIn",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zm7 0h3.8v1.7h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.78 2.66 4.78 6.12V21h-4v-5.5c0-1.3-.02-3-1.83-3s-2.11 1.43-2.11 2.9V21h-4z" />
      </svg>
    ),
  },
  {
    key: "yt",
    href: "https://www.youtube.com/c/McLaren",
    label: "McLaren on YouTube",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.4A3 3 0 0 0 .5 6.5C0 8.4 0 12 0 12s0 3.6.5 5.5a3 3 0 0 0 2.1 2.1C4.5 20 12 20 12 20s7.5 0 9.4-.4a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.5.5-5.5s0-3.6-.5-5.5zM9.6 15.6V8.4l6.4 3.6z" />
      </svg>
    ),
  },
];

const cols = [
  {
    title: "Story",
    links: [
      { label: "Read the full story", href: STORY_URL },
      { label: "McLaren Racing", href: "https://www.mclaren.com/racing/" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Alteryx Platform", href: "https://www.alteryx.com/platform" },
      { label: "Customer stories", href: "https://www.alteryx.com/resources/customer-story" },
    ],
  },
  {
    title: "Experience",
    links: [
      { label: "Design · Build · Race", href: "#" },
      { label: "Explore MCL38 in 3D", href: "#" },
    ],
  },
] as const;

export default function Footer8() {
  return (
    <footer className="relative z-10 w-full overflow-hidden bg-carbon px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="relative mx-auto w-full max-w-[1400px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
          >
            <p className="max-w-xs text-sm leading-relaxed text-white/70 sm:text-base">
              McLaren Racing uses Alteryx to fast-track data analytics across
              design, build, and race — turning billions of data points into a
              competitive edge.
            </p>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {cols.map((col, ci) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 + ci * 0.05 }}
              className="flex flex-col gap-2 lg:border-t lg:border-white/10 lg:pt-5"
            >
              <h4 className="text-base font-semibold text-white sm:text-lg">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-1">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-sm text-white/70 transition-colors hover:text-papaya sm:text-base"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <FooterMcLarenWordmark />

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:text-sm">
          <p>
            © {new Date().getFullYear()} Concept experience · Not an official
            McLaren or Alteryx site
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://www.alteryx.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Privacy
            </a>
            <a
              href="https://www.alteryx.com/terms-of-use"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Terms
            </a>
            <a href={STORY_URL} className="transition-colors hover:text-papaya">
              Source story
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
