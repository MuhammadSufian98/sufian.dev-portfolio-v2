"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const rafRef = useRef(null);
  const currentPosRef = useRef({ x: 0, y: 0 });
  const targetPosRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const pathname = usePathname();

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const supportsFinePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!supportsFinePointer) return;

    // Force cursor:none globally dynamically
    document.documentElement.style.setProperty("cursor", "none", "important");
    document.body.style.setProperty("cursor", "none", "important");

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    currentPosRef.current = { x: centerX, y: centerY };
    targetPosRef.current = { x: centerX, y: centerY };
    lastMouseRef.current = { x: centerX, y: centerY };
    
    // Always force cursor visible initially
    cursor.style.transform = `translate3d(${centerX}px, ${centerY}px, 0) translate(-50%, -50%)`;
    cursor.style.opacity = "1";

    const tick = () => {
      const current = currentPosRef.current;
      const target = targetPosRef.current;

      current.x += (target.x - current.x) * 0.22;
      current.y += (target.y - current.y) * 0.22;

      cursor.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      // Ensure cursor never accidentally disappears across navigations
      if (cursor.style.opacity !== "1") cursor.style.opacity = "1";
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const applyDefaultCursorStyle = () => {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      cursor.style.borderRadius = "50%";
      cursor.style.borderWidth = "1px";
      cursor.style.borderStyle = "solid";
      cursor.style.borderColor = "#ffffff";
      cursor.style.background = "rgba(255, 255, 255, 0.06)";
    };

    const updateMagneticStateAtPoint = (x, y) => {
      targetPosRef.current = { x, y };

      try {
        const elementAtPoint = document.elementFromPoint(x, y);
        const target =
          elementAtPoint instanceof Element
            ? elementAtPoint.closest(".magnetic-target")
            : null;

        if (target) {
          const computed = window.getComputedStyle(target);
          const borderWidth = parseFloat(computed.borderWidth || "0");
          const hasVisibleBorder =
            borderWidth > 0 &&
            computed.borderStyle !== "none" &&
            computed.borderStyle !== "hidden";
          const hasRadius = computed.borderRadius && computed.borderRadius !== "0px";

          const rect = target.getBoundingClientRect();
          targetPosRef.current = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };
          cursor.style.width = `${rect.width + 10}px`;
          cursor.style.height = `${rect.height + 10}px`;

          cursor.style.borderRadius = hasRadius ? computed.borderRadius : "14px";
          cursor.style.borderWidth = hasVisibleBorder ? computed.borderWidth : "1px";
          cursor.style.borderStyle = hasVisibleBorder ? computed.borderStyle : "solid";
          cursor.style.borderColor = hasVisibleBorder ? computed.borderColor : "#f59e0b";
          cursor.style.background = "rgba(245, 158, 11, 0.14)";
        } else {
          applyDefaultCursorStyle();
        }
      } catch (e) {
        applyDefaultCursorStyle();
      }
    };

    const onMouseMove = (event) => {
      const { clientX, clientY } = event;
      lastMouseRef.current = { x: clientX, y: clientY };
      updateMagneticStateAtPoint(clientX, clientY);
    };

    const onViewportChange = () => {
      const { x, y } = lastMouseRef.current;
      const clampedX = Math.max(0, Math.min(window.innerWidth - 1, x));
      const clampedY = Math.max(0, Math.min(window.innerHeight - 1, y));
      updateMagneticStateAtPoint(clampedX, clampedY);
    };

    const onMouseLeaveWindow = () => {
      applyDefaultCursorStyle();
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onViewportChange, { passive: true });
    window.addEventListener("resize", onViewportChange);
    window.addEventListener("mouseout", onMouseLeaveWindow);
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onViewportChange);
      window.removeEventListener("resize", onViewportChange);
      window.removeEventListener("mouseout", onMouseLeaveWindow);
      // Clean up body styles robustly
      document.documentElement.style.cursor = "auto";
      document.body.style.cursor = "auto";
    };
  }, [pathname]); // Re-initialize safely on route change

  return (
    <div
      ref={cursorRef}
      className="fixed left-0 top-0 pointer-events-none z-[2147483647] border"
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#ffffff",
        background: "rgba(255, 255, 255, 0.06)",
        transition: "width 220ms ease, height 220ms ease, border-radius 220ms ease, border-color 220ms ease, background-color 220ms ease",
        opacity: 0,
        willChange: "transform, width, height, opacity",
      }}
    />
  );
};

export default CustomCursor;