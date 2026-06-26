import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";
import VideoScrollStage from "@/components/VideoScrollStage";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import StorySection from "@/components/StorySection";
import { McLarenModelSection } from "@/components/McLarenModelSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll>
        <ScrollProgress />
        <main className="relative w-full">
          <VideoScrollStage>
            <Hero />
            <StatsSection />
          </VideoScrollStage>
          <StorySection />
          <McLarenModelSection />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
