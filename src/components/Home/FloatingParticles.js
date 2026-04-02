"use client";

import { useMemo } from "react";
import { FLOATING_TEXTURE_URL } from "./constants";

export default function FloatingParticles({ particlesRef }) {
  const pseudo = (seed) => {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: pseudo(i + 1) * 100,
      y: pseudo(i + 11) * 120 - 10,
      bgPosX: [0, 50, 100][Math.floor(pseudo(i + 21) * 3)],
      size: pseudo(i + 31) * 20 + 20,
      speedX: pseudo(i + 41) * 0.02 + 0.005,
      speedY: pseudo(i + 51) * 0.02 + 0.005,
      phaseX: pseudo(i + 61) * Math.PI * 2,
      phaseY: pseudo(i + 71) * Math.PI * 2,
      scrollParallax: pseudo(i + 81) * 0.05 + 0.02,
      opacity: pseudo(i + 91) * 0.4 + 0.2,
      })),
    []
  );

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={p.id}
          ref={(el) => {
            if (particlesRef.current) {
              particlesRef.current[i] = el;
            }
          }}
          className="golden-particle absolute bg-no-repeat"
          style={{
            left: `${p.x}vw`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundImage: `url('${FLOATING_TEXTURE_URL}')`,
            backgroundSize: "300% 100%",
            backgroundPosition: `${p.bgPosX}% 0%`,
            opacity: p.opacity,
            top: `${p.y}vh`,
            willChange: "transform, opacity",
          }}
          data-speedx={p.speedX}
          data-speedy={p.speedY}
          data-phasex={p.phaseX}
          data-phasey={p.phaseY}
          data-scrollparallax={p.scrollParallax}
          data-origy={p.y}
          data-baseopacity={p.opacity}
        />
      ))}
    </div>
  );
}
