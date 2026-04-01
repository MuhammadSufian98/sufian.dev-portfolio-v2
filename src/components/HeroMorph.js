"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import useAnime from "@/hooks/useAnime";

const BLOB_FILES = [
  "/blobs/blob-scene-haikei.svg",
  "/blobs/blob-scene-haikei (1).svg",
  "/blobs/blob-scene-haikei (2).svg",
];

const ORBIT_ICONS = [
  "/icons/mongodb.svg",
  "/icons/express.svg",
  "/icons/react.svg",
  "/icons/nodedotjs.svg",
  "/icons/nextdotjs.svg",
];

const BASE_BLOB_COLOR = "#a78bfa";

function getOrbitalPosition(index, total, radius) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
}

async function loadBlobPath(url) {
  const response = await fetch(url);
  const svgText = await response.text();
  const svgDoc = new DOMParser().parseFromString(svgText, "image/svg+xml");
  const path = svgDoc.querySelector("g path");
  return path?.getAttribute("d") ?? "";
}

export default function HeroMorph() {
  const [blobPaths, setBlobPaths] = useState([]);
  const blobPathRef = useRef(null);
  const iconRefs = useRef([]);
  const morphTimelineRef = useRef(null);
  const storyAnimationRef = useRef(null);
  const previewCardRef = useRef(null);
  const previewAnimationRef = useRef(null);

  const { anime, timeline, animate, clearAnimations } = useAnime();

  const iconPositions = useMemo(
    () => ORBIT_ICONS.map((_, index) => getOrbitalPosition(index, ORBIT_ICONS.length, 210)),
    [],
  );

  useEffect(() => {
    let isActive = true;

    Promise.all(BLOB_FILES.map((file) => loadBlobPath(file))).then((paths) => {
      if (!isActive) return;
      setBlobPaths(paths.filter(Boolean));
    });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!blobPathRef.current || blobPaths.length < 3) return;

    blobPathRef.current.setAttribute("d", blobPaths[0]);

    const tl = timeline({
      loop: true,
      autoplay: true,
    });

    tl
      .add(blobPathRef.current, {
        d: blobPaths[1],
        ease: "inOutQuad",
        duration: 3000,
      })
      .add(blobPathRef.current, {
        d: blobPaths[2],
        ease: "inOutQuad",
        duration: 3000,
      })
      .add(blobPathRef.current, {
        d: blobPaths[0],
        ease: "inOutQuad",
        duration: 3000,
      });

    morphTimelineRef.current = tl;

    return () => {
      morphTimelineRef.current?.pause?.();
    };
  }, [blobPaths, timeline]);

  useEffect(() => {
    const icons = iconRefs.current.filter(Boolean);
    if (!icons.length) return;

    const floatingAnimation = animate(icons, {
      translateY: [6, -6],
      duration: 2100,
      direction: "alternate",
      loop: true,
      delay: anime.stagger(220),
      ease: "inOutSine",
    });

    return () => {
      floatingAnimation?.pause?.();
    };
  }, [anime, animate]);

  useEffect(() => {
    if (!previewCardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;

        previewAnimationRef.current?.pause?.();
        previewAnimationRef.current = animate(previewCardRef.current, {
          opacity: [0, 1],
          translateY: [40, 0],
          duration: 900,
          ease: "outCubic",
        });

        observer.unobserve(entry.target);
      },
      { threshold: 0.3 },
    );

    observer.observe(previewCardRef.current);

    return () => {
      observer.disconnect();
      previewAnimationRef.current?.pause?.();
    };
  }, [animate]);

  useEffect(() => {
    return () => {
      storyAnimationRef.current?.pause?.();
      clearAnimations();
    };
  }, [clearAnimations]);

  const triggerStory = (section) => {
    if (!blobPathRef.current) return;

    const nextColor = section === "work" ? "#f59e0b" : "#60a5fa";
    const nextScale = section === "work" ? 1.08 : 0.92;

    storyAnimationRef.current?.pause?.();
    storyAnimationRef.current = animate(blobPathRef.current, {
      fill: nextColor,
      scale: nextScale,
      duration: 450,
      ease: "inOutQuad",
    });
  };

  const resetStory = () => {
    if (!blobPathRef.current) return;

    storyAnimationRef.current?.pause?.();
    storyAnimationRef.current = animate(blobPathRef.current, {
      fill: BASE_BLOB_COLOR,
      scale: 1,
      duration: 450,
      ease: "inOutQuad",
    });
  };

  return (
    <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-24 pt-28 text-white">
      <div className="grid items-center gap-14 md:grid-cols-[1.1fr_1fr]">
        <div className="space-y-7">
          <p className="font-mono text-xs uppercase tracking-[0.26em] text-slate-300">
            Sufian • MERN Developer
          </p>
          <h1 className="text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl">
            Storytelling Through Motion-Driven Engineering.
          </h1>
          <p className="max-w-lg text-slate-300">
            A living hero ecosystem where platform skills orbit a breathing identity core.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onMouseEnter={() => triggerStory("about")}
              onMouseLeave={resetStory}
              className="magnetic-target rounded-full border border-slate-500/60 bg-slate-700/40 px-5 py-2 text-xs uppercase tracking-[0.12em]"
            >
              About Trigger
            </button>
            <button
              type="button"
              onMouseEnter={() => triggerStory("work")}
              onMouseLeave={resetStory}
              className="magnetic-target rounded-full border border-amber-400/60 bg-amber-500/10 px-5 py-2 text-xs uppercase tracking-[0.12em]"
            >
              Work Trigger
            </button>
          </div>
        </div>

        <div className="relative mx-auto h-[460px] w-[460px] max-w-full">
          <svg viewBox="0 0 900 600" className="absolute inset-0 h-full w-full" aria-hidden>
            <path
              ref={blobPathRef}
              fill={BASE_BLOB_COLOR}
              opacity="0.86"
              style={{ transformOrigin: "center", transformBox: "fill-box" }}
            />
          </svg>

          {ORBIT_ICONS.map((icon, index) => {
            const position = iconPositions[index];
            return (
              <div
                key={icon}
                ref={(node) => {
                  iconRefs.current[index] = node;
                }}
                className="absolute left-1/2 top-1/2 flex h-14 w-14 items-center justify-center rounded-full border border-slate-500/40 bg-slate-800/70 p-2 shadow-[0_0_28px_rgba(168,85,247,0.2)]"
                style={{
                  transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
                }}
              >
                <Image src={icon} alt="Stack icon" width={34} height={34} />
              </div>
            );
          })}
        </div>
      </div>

      <div
        ref={previewCardRef}
        className="grid gap-6 rounded-3xl border border-slate-500/40 bg-slate-900/70 p-6 opacity-0 md:grid-cols-[1.1fr_1fr] md:p-8"
      >
        <div className="space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-300">Project Preview</p>
          <h2 className="text-3xl font-semibold">Banner Prototype Integration</h2>
          <p className="text-slate-300">
            Shot-based visual proof card that slides up as it enters viewport focus.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-600/60">
          <Image
            src="/banner/banner.webp"
            alt="Project preview banner"
            width={1280}
            height={720}
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
