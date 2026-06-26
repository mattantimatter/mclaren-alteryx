"use client";

import { useEffect, useState } from "react";
import { isMobileExperience } from "@/lib/device";
import MobileExperience from "@/components/MobileExperience";
import DesktopExperience from "@/components/DesktopExperience";

export default function HomePage() {
  const [mobile, setMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const touch = isMobileExperience();
    setMobile(touch);
    if (touch) {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("preloader:complete"));
    }
  }, []);

  if (mobile === null) {
    return <div className="min-h-screen bg-carbon" aria-busy="true" />;
  }

  if (mobile) {
    return <MobileExperience />;
  }

  return <DesktopExperience />;
}
