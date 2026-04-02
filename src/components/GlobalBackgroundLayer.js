"use client";

import { useEffect, useRef } from "react";

export default function GlobalBackgroundLayer() {
  const layerRef = useRef(null);
  const currentScrollY = useRef(0);
  const targetScrollY = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      targetScrollY.current = window.scrollY || document.documentElement.scrollTop || 0;
    };

    const loop = () => {
      currentScrollY.current += (targetScrollY.current - currentScrollY.current) * 0.175;
      if (layerRef.current) {
        layerRef.current.style.transform = `translateY(${currentScrollY.current * -0.8}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    targetScrollY.current = window.scrollY || 0;
    currentScrollY.current = targetScrollY.current;
    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={layerRef} className="fixed inset-[-190%] z-0 pointer-events-none will-change-transform" aria-hidden>
      <div className="absolute inset-0 bg-[url('/assets/floating-elements.png')] opacity-20 mix-blend-screen" />
    </div>
  );
}
