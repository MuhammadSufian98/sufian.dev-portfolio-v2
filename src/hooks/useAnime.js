"use client";

import { useCallback, useEffect, useRef } from "react";
import { animate, createTimeline, stagger } from "animejs";

const DEFAULT_TIMELINE = {
  autoplay: false,
  ease: "linear",
  duration: 1200,
};

export const anime = {
  animate,
  createTimeline,
  stagger,
};

export const timeline = (config = {}) => {
  return createTimeline({
    ...DEFAULT_TIMELINE,
    ...config,
  });
};

export default function useAnime() {
  const timelineRef = useRef(null);
  const activeAnimationsRef = useRef([]);

  useEffect(() => {
    return () => {
      timelineRef.current?.pause();
      activeAnimationsRef.current.forEach((animation) => {
        animation?.pause?.();
      });
      activeAnimationsRef.current = [];
      timelineRef.current = null;
    };
  }, []);

  const createManagedTimeline = useCallback((config = {}) => {
    timelineRef.current?.pause();
    timelineRef.current = timeline(config);
    return timelineRef.current;
  }, []);

  const runAnimation = useCallback((targetsOrConfig, maybeParameters) => {
    let targets = targetsOrConfig;
    let parameters = maybeParameters;

    if (!parameters && targetsOrConfig && typeof targetsOrConfig === "object" && "targets" in targetsOrConfig) {
      const config = targetsOrConfig;
      targets = config.targets;
      parameters = { ...config };
      delete parameters.targets;
    }

    const animation = animate(targets, parameters ?? {});
    activeAnimationsRef.current.push(animation);
    return animation;
  }, []);

  const clearAnimations = useCallback(() => {
    activeAnimationsRef.current.forEach((animation) => {
      animation?.pause?.();
    });
    activeAnimationsRef.current = [];
  }, []);

  return {
    anime,
    timeline: createManagedTimeline,
    animate: runAnimation,
    clearAnimations,
    timelineRef,
  };
}
