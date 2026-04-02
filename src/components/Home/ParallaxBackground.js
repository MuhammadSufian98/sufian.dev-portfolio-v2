"use client";

import Image from "next/image";
import { HERO_BANNER_URL } from "./constants";

export default function ParallaxBackground({ antiGravityLayerRef }) {
  return (
    <div className="fixed inset-[-25%] z-0 pointer-events-none" ref={antiGravityLayerRef}>
      <Image
        src={HERO_BANNER_URL}
        alt="Golden Geometric Banner"
        fill
        sizes="100vw"
        className="object-cover opacity-[0.15]"
      />
    </div>
  );
}
