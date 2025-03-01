"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    particlesJS: {
      load: (id: string, configPath: string, callback: () => void) => void;
    };
  }
}

export function ParticlesBackground() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.particlesJS) {
      window.particlesJS.load("particles-js", "/particles.json", () => {
        console.log("particles.js loaded - callback");
      });
    }
  }, []);

  return (
    <>
      {/* Load particles.js asynchronously */}
      <Script
        src="/path/to/particles.js" // Replace with the correct path to particles.js
        strategy="lazyOnload"
        onLoad={() => {
          console.log("particles.js script loaded");
        }}
      />
      <div id="particles-js" className="absolute inset-0 z-0" />
    </>
  );
}