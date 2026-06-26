"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Center,
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import type { Mesh } from "three";
import { isMobileExperience } from "@/lib/device";

const MODEL_URL = "/models/mclaren-mcl-38.glb";

type CarModelViewerProps = {
  variant?: "dark" | "studio" | "showroom";
};

function CarModel() {
  const { scene } = useGLTF(MODEL_URL);

  useEffect(() => {
    scene.traverse((child) => {
      const mesh = child as Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <Center>
      <group scale={1.05}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

function LoadingFallback({ light }: { light: boolean }) {
  return (
    <Html center>
      <span className={`text-sm ${light ? "text-neutral-500" : "text-white/50"}`}>
        Loading 3D model…
      </span>
    </Html>
  );
}

export default function CarModelViewer({
  variant = "studio",
}: CarModelViewerProps) {
  const [interactive, setInteractive] = useState(false);
  const [mobile, setMobile] = useState(true);
  const isShowroom = variant === "showroom";
  const isStudio = variant === "studio";

  useEffect(() => {
    setMobile(isMobileExperience());
    if (!isMobileExperience()) {
      useGLTF.preload(MODEL_URL);
    }
  }, []);

  const bg = isShowroom ? "#f7f7f5" : isStudio ? "#161922" : "#0d0f16";

  return (
    <div className="relative h-full w-full">
      <div className={interactive ? "h-full w-full" : "pointer-events-none h-full w-full"}>
        <Canvas
          shadows={!mobile}
          dpr={mobile ? 1 : [1, 2]}
          camera={{ position: [6.7, 2, 8.8], fov: 35 }}
          gl={{
            antialias: !mobile,
            alpha: true,
            powerPreference: mobile ? "low-power" : "high-performance",
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(bg, 1);
          }}
        >
          <ambientLight intensity={isShowroom ? 0.85 : isStudio ? 0.55 : 0.4} />
          <directionalLight
            position={[10, 14, 8]}
            intensity={isShowroom ? 1.6 : isStudio ? 1.35 : 1.25}
            castShadow={!mobile}
            shadow-mapSize={mobile ? [512, 512] : [1024, 1024]}
          />
          <directionalLight
            position={[-8, 6, -6]}
            intensity={isStudio ? 0.3 : isShowroom ? 0.25 : 0.35}
            color={isShowroom ? "#ffffff" : "#ff8000"}
          />
          {isStudio || isShowroom ? (
            <directionalLight
              position={[0, 8, -10]}
              intensity={isStudio ? 0.35 : 0.5}
              color="#ffffff"
            />
          ) : null}
          <Suspense fallback={<LoadingFallback light={isShowroom} />}>
            <CarModel />
            {!mobile ? (
              <Environment
                preset={isShowroom ? "studio" : isStudio ? "city" : "city"}
              />
            ) : null}
            {!mobile ? (
              <ContactShadows
                position={[0, -0.85, 0]}
                opacity={isShowroom ? 0.28 : isStudio ? 0.38 : 0.45}
                scale={14}
                blur={2.5}
                far={4}
              />
            ) : null}
          </Suspense>
          <OrbitControls
            enableRotate={interactive}
            enableZoom={interactive}
            autoRotate={!interactive}
            autoRotateSpeed={0.45}
            enablePan={false}
            minDistance={5.5}
            maxDistance={18}
            maxPolarAngle={Math.PI / 2 - 0.08}
            target={[0, 0, 0]}
          />
        </Canvas>
      </div>

      {!interactive ? (
        <button
          type="button"
          onClick={() => setInteractive(true)}
          className="absolute inset-0 z-20 flex cursor-pointer flex-col items-center justify-center gap-2 bg-carbon/20 transition-colors hover:bg-carbon/30"
          aria-label="Click to interact with the 3D model"
        >
          <span className="rounded-full border border-white/20 bg-carbon/80 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.35em] text-white/80 backdrop-blur-sm">
            Click to interact
          </span>
        </button>
      ) : (
        <p
          className={`pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.35em] ${
            isShowroom ? "text-neutral-400" : "text-white/35"
          }`}
        >
          Drag to rotate
        </p>
      )}
    </div>
  );
}
