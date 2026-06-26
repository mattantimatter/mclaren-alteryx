"use client";

import { useEffect, useState } from "react";
import { isMobileExperience } from "@/lib/device";
import MobileExperience from "@/components/MobileExperience";
import DesktopExperience from "@/components/DesktopExperience";

export default function HomePage() {
  const [mobile, setMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setMobile(isMobileExperience());
  }, []);

  if (mobile === null) {
    return <div className="min-h-screen bg-carbon" aria-busy="true" />;
  }

  if (mobile) {
    return <MobileExperience />;
  }

  return <DesktopExperience />;
}
