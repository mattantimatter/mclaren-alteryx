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
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000",
  ),
  title: "McLaren Racing x Alteryx | Fast-Tracking Data Analytics",
  description:
    "How McLaren Racing uses Alteryx to fast-track data analytics across design, build, and race — turning 11.8 billion data points into a competitive edge.",
  openGraph: {
    title: "McLaren Racing x Alteryx | Fast-Tracking Data Analytics",
    description:
      "How McLaren Racing uses Alteryx to fast-track data analytics across design, build, and race — turning 11.8 billion data points into a competitive edge.",
    images: [
      {
        url: "/og.jpg",
        width: 1024,
        height: 559,
        alt: "McLaren Racing x Alteryx — Fast-Tracking Data in the Race to Accelerate",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "McLaren Racing x Alteryx | Fast-Tracking Data Analytics",
    description:
      "How McLaren Racing uses Alteryx to fast-track data analytics across design, build, and race — turning 11.8 billion data points into a competitive edge.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
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
