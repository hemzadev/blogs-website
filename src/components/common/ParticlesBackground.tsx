'use client';
import { useEffect } from "react"

declare global {
  interface Window {
    particlesJS: any
  }
}

export function ParticlesBackground() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.particlesJS) {
      window.particlesJS.load("particles-js", "/particles.json", () => {
        console.log("particles.js loaded - callback")
      })
    }
  }, [])

  return <div id="particles-js" className="absolute inset-0 z-0" />
}

