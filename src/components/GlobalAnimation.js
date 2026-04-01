"use client";

import { useEffect, useRef } from "react";
import useAnime from "@/hooks/useAnime";

function buildPathFromValues(values) {
  return `M ${values[0]} ${values[1]} C ${values[2]} ${values[3]} ${values[4]} ${values[5]} ${values[6]} ${values[7]} C ${values[8]} ${values[9]} ${values[10]} ${values[11]} ${values[12]} ${values[13]} C ${values[14]} ${values[15]} ${values[16]} ${values[17]} ${values[18]} ${values[19]} C ${values[20]} ${values[21]} ${values[22]} ${values[23]} ${values[24]} ${values[25]} Z`;
}

function buildShapes(width, height) {
  const cx = width / 2;
  const cy = height / 2;
  const base = Math.min(width, height) * 0.22;
  const circleK = base * 0.5522847498;

  const circle = buildPathFromValues([
    cx,
    cy - base,
    cx + circleK,
    cy - base,
    cx + base,
    cy - circleK,
    cx + base,
    cy,
    cx + base,
    cy + circleK,
    cx + circleK,
    cy + base,
    cx,
    cy + base,
    cx - circleK,
    cy + base,
    cx - base,
    cy + circleK,
    cx - base,
    cy,
    cx - base,
    cy - circleK,
    cx - circleK,
    cy - base,
    cx,
    cy - base,
  ]);

  const polygonRadius = base * 1.1;
  const polygon = buildPathFromValues([
    cx,
    cy - polygonRadius,
    cx,
    cy - polygonRadius,
    cx + polygonRadius,
    cy,
    cx + polygonRadius,
    cy,
    cx + polygonRadius,
    cy,
    cx,
    cy + polygonRadius,
    cx,
    cy + polygonRadius,
    cx,
    cy + polygonRadius,
    cx - polygonRadius,
    cy,
    cx - polygonRadius,
    cy,
    cx - polygonRadius,
    cy,
    cx,
    cy - polygonRadius,
    cx,
    cy - polygonRadius,
  ]);

  const blobR1 = base * 1.18;
  const blobR2 = base * 0.92;
  const blobR3 = base * 1.1;
  const blobR4 = base * 0.82;
  const blob = buildPathFromValues([
    cx,
    cy - blobR1,
    cx + blobR1 * 0.75,
    cy - blobR1 * 1.05,
    cx + blobR2 * 1.15,
    cy - blobR2 * 0.4,
    cx + blobR2,
    cy + blobR2 * 0.1,
    cx + blobR2 * 0.88,
    cy + blobR2 * 0.92,
    cx + blobR3 * 0.3,
    cy + blobR3 * 1.2,
    cx - blobR3 * 0.15,
    cy + blobR3 * 0.96,
    cx - blobR3 * 0.92,
    cy + blobR3,
    cx - blobR4 * 1.2,
    cy + blobR4 * 0.25,
    cx - blobR4,
    cy - blobR4 * 0.15,
    cx - blobR4 * 0.88,
    cy - blobR4 * 0.96,
    cx - blobR1 * 0.28,
    cy - blobR1 * 1.15,
    cx,
    cy - blobR1,
  ]);

  return { circle, polygon, blob };
}

export default function GlobalAnimation() {
  const svgRef = useRef(null);
  const heroShapeRef = useRef(null);
  const timelineRef = useRef(null);
  const shapesRef = useRef({
    circle: "",
    polygon: "",
    blob: "",
  });
  const resizeRafRef = useRef(null);

  const { timeline } = useAnime();

  useEffect(() => {
    const updateShapeSet = () => {
      const width = window.innerWidth;
      const height = Math.max(window.innerHeight, document.body.scrollHeight);

      if (svgRef.current) {
        svgRef.current.setAttribute("viewBox", `0 0 ${width} ${height}`);
      }

      const nextShapes = buildShapes(width, height);
      shapesRef.current = nextShapes;

      if (heroShapeRef.current) {
        heroShapeRef.current.setAttribute("d", nextShapes.circle);
      }
    };

    const onResize = () => {
      if (resizeRafRef.current) {
        cancelAnimationFrame(resizeRafRef.current);
      }

      resizeRafRef.current = requestAnimationFrame(() => {
        updateShapeSet();
        resizeRafRef.current = null;
      });
    };

    updateShapeSet();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (resizeRafRef.current) {
        cancelAnimationFrame(resizeRafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const target = heroShapeRef.current;
    if (!target) return;

    timelineRef.current?.pause?.();
    const tl = timeline({
      autoplay: true,
      loop: true,
      ease: "inOutSine",
      duration: 900,
    });

    tl.add(
      target,
      {
        d: [
          { value: shapesRef.current.polygon },
          { value: shapesRef.current.blob },
          { value: shapesRef.current.circle },
        ],
        ease: "inOutQuad",
        duration: 4200,
      },
      0,
    );

    tl.add(
      target,
      {
        opacity: [0.28, 0.48],
        alternate: true,
        loop: true,
        ease: "inOutSine",
        duration: 900,
      },
      0,
    );

    timelineRef.current = tl;

    return () => {
      timelineRef.current?.pause?.();
      timelineRef.current = null;
    };
  }, [timeline]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden>
      <svg ref={svgRef} className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="heroMorphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#025169" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#2d8ca8" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#11202c" stopOpacity="0.14" />
          </linearGradient>
        </defs>

        <path ref={heroShapeRef} fill="url(#heroMorphGradient)" opacity="0.36" />
      </svg>
    </div>
  );
}
