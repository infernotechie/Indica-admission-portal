// src/components/LandingParticles.js
import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function LandingParticles() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
      options={{
        fullScreen: { enable: false },
        background: { color: "transparent" },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" }, // or 'repulse'
            resize: true
          },
        },
        particles: {
          number: { value: 40, density: { enable: true, area: 800 } },
          color: { value: "#4b6cb7" },
          opacity: { value: 0.35 },
          size: { value: 2 },
          move: { enable: true, speed: 0.8, outModes: { default: "out" } },
          links: { enable: false }
        },
        detectRetina: true
      }}
    />
  );
}
