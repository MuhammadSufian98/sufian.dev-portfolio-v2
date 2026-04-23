"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import Hero from "@/components/Home/Hero";
import Toolbelt from "@/components/Home/Toolbelt";
import Projects from "@/components/Home/Projects";
import Quote from "@/components/Home/Quote";
import { useTheme } from "@/context/ThemeProvider";

export default function HomePage() {
  const { activeTheme, themeId } = useTheme();
  const targetScrollY = useRef(0);
  const currentScrollY = useRef(0);
  const timeRef = useRef(0);
  const rafId = useRef(null);
  
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  // Hero Refs
  const heroContainerRef = useRef(null);
  const h1Ref = useRef(null);
  const letterIRef = useRef(null);
  const subtitleRef = useRef(null);
  const originBgRef = useRef(null);
  const originOverlayRef = useRef(null);
  const originContentRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    let retryTimeoutId = null;
    let initAttempts = 0;
    const MAX_INIT_ATTEMPTS = 20;

    const hasValidSize = (el) => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return (
        Number.isFinite(rect.width) &&
        Number.isFinite(rect.height) &&
        rect.width > 1 &&
        rect.height > 1
      );
    };

    const loadVanta = async () => {
      if (vantaEffectRef.current || !vantaRef.current) return;

      // Vanta/Three can produce NaN geometry when initialized against a zero-sized target.
      if (!hasValidSize(vantaRef.current)) {
        if (mounted && initAttempts < MAX_INIT_ATTEMPTS) {
          initAttempts += 1;
          retryTimeoutId = setTimeout(loadVanta, 120);
        }
        return;
      }

      try {
        const THREE = await import("three");
        window.THREE = THREE.default || THREE;
        
        // Dynamically load Vanta ring if it hasn't mapped to window already
        if (!window.VANTA || !window.VANTA.RINGS) {
           await import("vanta/dist/vanta.rings.min.js");
        }
        
        // Vanta might take a tick to register
        if (mounted && window.VANTA && window.VANTA.RINGS && hasValidSize(vantaRef.current)) {
          vantaEffectRef.current = window.VANTA.RINGS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            scale: 1.0,
            backgroundColor: activeTheme.colors.vanta.background,
            color: activeTheme.colors.vanta.color,
          });
        }
      } catch (e) {
        console.warn("Vanta.js initialization safely bypassed.", e);
      }
    };
    requestAnimationFrame(() => {
      if (mounted) loadVanta();
    });

    return () => {
      mounted = false;
      if (retryTimeoutId) {
        clearTimeout(retryTimeoutId);
      }
      if (vantaEffectRef.current && vantaEffectRef.current.destroy) {
        try {
          vantaEffectRef.current.destroy();
        } catch(e) {}
      }
      vantaEffectRef.current = null;
    };
  }, [activeTheme, themeId]);

  useEffect(() => {
    // Transform Origin for Perfect Zoom
    const updateTransformOrigin = () => {
      try {
        if (!h1Ref.current || !letterIRef.current) return;
        const currentTransform = h1Ref.current.style.transform;
        h1Ref.current.style.transform = "none";
        const h1Rect = h1Ref.current.getBoundingClientRect();
        const iRect = letterIRef.current.getBoundingClientRect();
        if (h1Rect.width === 0) return; // Prevent division by zero if unrendered
        
        const originX = iRect.left + iRect.width / 2 - h1Rect.left;
        const originY = iRect.top + iRect.height / 2 - h1Rect.top;
        const originXPercent = (originX / h1Rect.width) * 100;
        const originYPercent = (originY / h1Rect.height) * 100;
        
        if (!isNaN(originXPercent) && !isNaN(originYPercent)) {
          h1Ref.current.style.transformOrigin = `${originXPercent}% ${originYPercent}%`;
        }
        h1Ref.current.style.transform = currentTransform;
      } catch (e) {}
    };

    updateTransformOrigin();
    window.addEventListener("resize", updateTransformOrigin);
    if (document.fonts) document.fonts.ready.then(updateTransformOrigin);

    // Main LERP Smooth Scroll Engine
    const onScroll = () => {
      targetScrollY.current = window.scrollY || document.documentElement.scrollTop || 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Initial sync
    targetScrollY.current = window.scrollY || 0;
    currentScrollY.current = window.scrollY || 0;

    const loop = () => {
      try {
        // Easing function for buttery feel (0.075)
        currentScrollY.current += (targetScrollY.current - currentScrollY.current) * 0.075;
        timeRef.current += 1;

        // Hero Zoom & Origin Reveal
        if (heroContainerRef.current) {
          const containerTop = heroContainerRef.current.offsetTop;
          const containerHeight = heroContainerRef.current.offsetHeight;
          const maxScroll = Math.max(1, containerHeight - window.innerHeight);
          const scrollDistance = currentScrollY.current - containerTop;
          const progress = Math.max(0, Math.min(1, scrollDistance / maxScroll));

          const textProgress = Math.min(1, progress / 0.25);
          const textScale = 1 + Math.pow(textProgress, 4) * 74; 
          
          if (h1Ref.current) h1Ref.current.style.transform = `scale(${textScale})`;
          if (subtitleRef.current) subtitleRef.current.style.opacity = 1 - textProgress * 2;

          if (originBgRef.current) {
              originBgRef.current.style.opacity = Math.max(0, Math.min(1, (progress - 0.22) / 0.03));
          }

          const originProgress = Math.max(0, Math.min(1, (progress - 0.25) / 0.35));
          if (originOverlayRef.current) {
              originOverlayRef.current.style.opacity = originProgress;
              originOverlayRef.current.style.pointerEvents = originProgress > 0.5 ? 'auto' : 'none';
          }
          if (originContentRef.current) {
              const originScale = 0.8 + originProgress * 0.2;
              originContentRef.current.style.transform = `scale(${originScale})`;
          }
        }

      } catch (e) {}

      rafId.current = requestAnimationFrame(loop);
    };

    const ensureLoopIsRunning = () => {
      if (!rafId.current) {
        targetScrollY.current = window.scrollY || document.documentElement.scrollTop || 0;
        currentScrollY.current = targetScrollY.current;
        rafId.current = requestAnimationFrame(loop);
      }
    };

    const onPageShow = () => {
      // Restore animation state when returning from another route or bfcache.
      targetScrollY.current = window.scrollY || document.documentElement.scrollTop || 0;
      currentScrollY.current = targetScrollY.current;
      ensureLoopIsRunning();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        ensureLoopIsRunning();
      }
    };

    ensureLoopIsRunning();
    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("resize", updateTransformOrigin);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, []);

  // Section Intersections
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -100px 0px" };

    // Toolbelt Flip
    const toolbeltCards = Array.from(document.querySelectorAll(".toolbelt-card"));
    const tbObserver = new IntersectionObserver((entries) => {
      const intersecting = entries.filter(e => e.isIntersecting).map(e => e.target);
      if (intersecting.length > 0 && typeof animate !== "undefined") {
        animate(intersecting, {
          rotateY: [90, 0],
          opacity: [0, 1],
          duration: 1200,
          delay: stagger(100),
          ease: "easeOutExpo"
        });
        intersecting.forEach(el => tbObserver.unobserve(el));
      }
    }, observerOptions);
    toolbeltCards.forEach(card => tbObserver.observe(card));

    // Projects Ken Burns Reveal
    const projectCards = Array.from(document.querySelectorAll(".project-card"));
    const projObserver = new IntersectionObserver((entries) => {
      const intersecting = entries.filter(e => e.isIntersecting).map(e => e.target);
      if (intersecting.length > 0 && typeof animate !== "undefined") {
        animate(intersecting, {
          translateY: [100, 0],
          opacity: [0, 1],
          duration: 1500,
          delay: stagger(200),
          ease: "easeOutExpo"
        });
        
        intersecting.forEach(el => {
          const img = el.querySelector(".kb-image");
          if (img) {
            animate(img, {
              scale: [1.16, 1],
              duration: 6000,
              ease: "easeOutQuint"
            });
          }
          projObserver.unobserve(el);
        });
      }
    }, observerOptions);
    projectCards.forEach(card => projObserver.observe(card));

    return () => {
      tbObserver.disconnect();
      projObserver.disconnect();
    };
  }, []);

  return (
    <main className="relative theme-bg-primary theme-text-primary overflow-clip min-h-screen">
      <Hero
        heroContainerRef={heroContainerRef}
        vantaRef={vantaRef}
        h1Ref={h1Ref}
        letterIRef={letterIRef}
        subtitleRef={subtitleRef}
        originBgRef={originBgRef}
        originOverlayRef={originOverlayRef}
        originContentRef={originContentRef}
      />

      <Toolbelt />
      <Projects />
      <Quote />
    </main>
  );
}
