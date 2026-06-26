import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "McLaren Racing x Alteryx | Fast-Tracking Data Analytics",
  description:
    "How McLaren Racing uses Alteryx to fast-track data analytics across design, build, and race — turning 11.8 billion data points into a competitive edge.",
  icons: {
    icon: [
      { url: "/favicon-papaya.png" },
      { url: "/favicon.png", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-papaya.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: [
      { url: "/favicon-papaya.png" },
      { url: "/favicon.png", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-papaya.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full overflow-x-hidden antialiased [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        inter.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="min-h-full overflow-x-hidden bg-carbon text-white [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </body>
    </html>
  );
}
