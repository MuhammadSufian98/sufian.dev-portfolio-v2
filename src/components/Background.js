"use client";

import { useEffect, useRef } from "react";
import useAnime from "@/hooks/useAnime";

const MAX_SHIFT = 15;

const TOPOGRAPHY_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320' fill='none'%3E%3Cg stroke='%23E5E7EB' stroke-opacity='0.05' stroke-width='1.2'%3E%3Cpath d='M-40 60C10 20 90 20 140 60S270 100 360 50'/%3E%3Cpath d='M-40 110C20 70 90 70 150 110S260 150 360 100'/%3E%3Cpath d='M-40 160C20 120 95 120 150 160S260 205 360 150'/%3E%3Cpath d='M-40 210C10 170 90 170 150 210S270 255 360 205'/%3E%3Cpath d='M-40 260C20 220 95 220 160 260S260 305 360 255'/%3E%3Cpath d='M-10 -20C55 30 55 100 -10 150S-75 270 -10 340'/%3E%3Cpath d='M50 -20C115 30 115 100 50 150S-15 270 50 340'/%3E%3Cpath d='M110 -20C175 30 175 100 110 150S45 270 110 340'/%3E%3Cpath d='M170 -20C235 30 235 100 170 150S105 270 170 340'/%3E%3Cpath d='M230 -20C295 30 295 100 230 150S165 270 230 340'/%3E%3Cpath d='M290 -20C355 30 355 100 290 150S225 270 290 340'/%3E%3C/g%3E%3C/svg%3E\")";

export default function Background() {
  const bgRef = useRef(null);
  const activeAnimationRef = useRef(null);
  const { animate, clearAnimations } = useAnime();

  useEffect(() => {
    const onMouseMove = (event) => {
      if (!bgRef.current) return;

      const normalizedX = (event.clientX / window.innerWidth - 0.5) * 2;
      const normalizedY = (event.clientY / window.innerHeight - 0.5) * 2;

      const translateX = -normalizedX * MAX_SHIFT;
      const translateY = -normalizedY * MAX_SHIFT;

      activeAnimationRef.current?.pause?.();
      activeAnimationRef.current = animate(bgRef.current, {
        translateX,
        translateY,
        duration: 450,
        ease: "linear",
      });
    };

    const onMouseLeave = () => {
      if (!bgRef.current) return;

      activeAnimationRef.current?.pause?.();
      activeAnimationRef.current = animate(bgRef.current, {
        translateX: 0,
        translateY: 0,
        duration: 500,
        ease: "linear",
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      activeAnimationRef.current?.pause?.();
      clearAnimations();
    };
  }, [animate, clearAnimations]);

  return (
    <div
      ref={bgRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20"
      style={{
        backgroundColor: "#1F2937",
        backgroundImage: TOPOGRAPHY_PATTERN,
        backgroundSize: "320px 320px",
        backgroundPosition: "center",
        willChange: "transform",
      }}
    />
  );
}
