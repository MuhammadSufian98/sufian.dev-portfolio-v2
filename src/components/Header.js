"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiMenu4Line,
  RiMoonClearLine,
  RiSunLine,
  RiPulseFill,
} from "react-icons/ri";
import { LayoutGroup, motion } from "framer-motion";
import SufianLogo from "./LogoSvg";
import { useTheme } from "@/context/ThemeProvider";

const NAV_ITEMS = [
  { id: "01", label: "HOME", href: "/" },
  { id: "02", label: "ARCHIVE", href: "/archive" },
  { id: "03", label: "CONTACT", href: "/contact" },
];

const Header = ({ isBooting = false, onBootComplete = () => {} }) => {
  const { toggleTheme, isDark, activeTheme } = useTheme();
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [bootStage, setBootStage] = useState("loading");

  useEffect(() => {
    if (!isBooting) return;
    const duration = 2100;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const nextProgress = Math.min(elapsed / duration, 1);
      setProgress(nextProgress);
      if (nextProgress < 1) window.requestAnimationFrame(tick);
      else {
        setBootStage("moving");
        setTimeout(onBootComplete, 720);
      }
    };
    window.requestAnimationFrame(tick);
  }, [isBooting, onBootComplete]);

  return (
    <LayoutGroup id="boot-header">
      <nav 
        className="fixed top-0 w-full z-[130] backdrop-blur-md border-b"
        style={{
          backgroundColor: `${activeTheme.colors.background.primary}cc`,
          borderColor: activeTheme.colors.border.subtle,
        }}
      >
        {!isBooting || bootStage === "moving" ? (
          <motion.div
            layoutId="header-shell"
            className="flex items-center justify-between h-16 px-6 md:px-12"
          >
            {/* LEFT: Brand Identity */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-4 group">
                <motion.div layoutId="boot-logo" className="text-amber-500">
                  <SufianLogo size={28} />
                </motion.div>
                <div className="hidden md:flex flex-col border-l border-white/10 pl-4">
                  <motion.span
                    layoutId="boot-name"
                    className="font-mono text-[10px] font-bold tracking-[0.3em]"
                    style={{ color: activeTheme.colors.text.heading }}
                  >
                    SUFIAN<span className="text-amber-500">.</span>DEV
                  </motion.span>
                  <span 
                    className="font-mono text-[7px] uppercase mt-0.5"
                    style={{ color: activeTheme.colors.text.muted }}
                  >
                    Software Engineer
                  </span>
                </div>
              </Link>
            </div>

            {/* CENTER: Navigation Clusters */}
            <div className="flex items-center h-full">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative h-16 flex items-center px-6 font-mono text-[10px] tracking-[0.2em] transition-all border-x`}
                    style={{
                      borderColor: isActive ? activeTheme.colors.border.subtle : 'transparent',
                      color: isActive ? activeTheme.colors.accent.primary : activeTheme.colors.text.muted,
                    }}
                  >
                    <span className="mr-2 opacity-20">{item.id}</span>
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-500"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* RIGHT: Availability */}
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-4 border-r border-white/10 pr-6">
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2">
                    <RiPulseFill
                      className="text-amber-500 animate-pulse"
                      size={10}
                    />
                    <span 
                      className="font-mono text-[8px] uppercase tracking-widest"
                      style={{ color: activeTheme.colors.text.muted }}
                    >
                      Available for Hire
                    </span>
                  </div>
                  <span 
                    className="font-mono text-[7px] uppercase"
                    style={{ color: activeTheme.colors.text.muted }}
                  >
                    Multan, Pakistan
                  </span>
                </div>
              </div>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-sm transition-colors"
                style={{
                  color: activeTheme.colors.text.muted,
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = activeTheme.colors.background.secondary;
                  e.currentTarget.style.color = activeTheme.colors.accent.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = activeTheme.colors.text.muted;
                }}
              >
                {isDark ? (
                  <RiSunLine size={16} />
                ) : (
                  <RiMoonClearLine size={16} />
                )}
              </button>
            </div>
          </motion.div>
        ) : null}
      </nav>

      {/* Boot Loader */}
      {isBooting && bootStage === "loading" && (
        <div 
          className="fixed inset-0 z-[140] flex flex-col items-center justify-center p-6"
          style={{ backgroundColor: activeTheme.colors.background.primary }}
        >
          <motion.div layoutId="header-shell" className="w-full max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end mb-12">
              <div className="space-y-6">
                <motion.div layoutId="boot-logo" className="text-amber-500">
                  <SufianLogo size={64} />
                </motion.div>
                <div className="space-y-1">
                  <motion.h2
                    layoutId="boot-name"
                    className="text-3xl font-bold font-mono tracking-tighter uppercase italic"
                    style={{ color: activeTheme.colors.text.heading }}
                  >
                    SUFIAN<span className="text-amber-500">.</span>DEV
                  </motion.h2>
                  <p 
                    className="font-mono text-[9px] uppercase tracking-[0.4em]"
                    style={{ color: activeTheme.colors.text.muted }}
                  >
                    Preparing Portfolio Experience
                  </p>
                </div>
              </div>
              <div 
                className="font-mono text-[8px] uppercase space-y-1 text-right"
                style={{ color: activeTheme.colors.text.muted }}
              >
                <p>Location: Multan, Pakistan</p>
                <p>Focus: Full-Stack Development</p>
                <p>Stack: Next.js, React, Node.js</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between font-mono text-[10px] uppercase">
                <span 
                  className="flex gap-2"
                  style={{ color: activeTheme.colors.accent.primary }}
                >
                  <span className="animate-pulse">_</span>
                  Loading Experience
                </span>
                <span style={{ color: activeTheme.colors.accent.primary }}>
                  {Math.round(progress * 100)}%
                </span>
              </div>
              <div 
                className="h-[1px] w-full relative"
                style={{ backgroundColor: activeTheme.colors.border.subtle }}
              >
                <motion.div
                  className="absolute top-0 left-0 h-full bg-amber-500 shadow-[0_0_10px_#f59e0b]"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 font-mono text-[7px] uppercase pt-2">
                <span 
                  style={{ color: progress > 0.3 ? activeTheme.colors.accent.primary : activeTheme.colors.text.muted }}
                >
                  Interface Ready
                </span>
                <span 
                  style={{ color: progress > 0.6 ? activeTheme.colors.accent.primary : activeTheme.colors.text.muted }}
                >
                  Data Connected
                </span>
                <span 
                  style={{ color: progress > 0.9 ? activeTheme.colors.accent.primary : activeTheme.colors.text.muted }}
                >
                  Visuals Active
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </LayoutGroup>
  );
};

export default Header;
