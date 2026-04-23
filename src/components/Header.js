"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiMenu4Line,
  RiCloseLine,
  RiMoonClearLine,
  RiSunLine,
  RiPulseFill,
  RiArrowRightUpLine,
} from "react-icons/ri";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <LayoutGroup id="boot-header">
      <nav
        className="fixed top-0 w-full z-[130] backdrop-blur-md border-b transition-all duration-300"
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
            {/* LEFT: Identity */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3">
                <motion.div layoutId="boot-logo" className="text-amber-500">
                  <SufianLogo size={24} />
                </motion.div>
                <div className="flex flex-col">
                  <motion.span
                    layoutId="boot-name"
                    className="font-mono text-[10px] font-bold tracking-[0.3em]"
                    style={{ color: activeTheme.colors.text.heading }}
                  >
                    SUFIAN.DEV
                  </motion.span>
                </div>
              </Link>
            </div>

            {/* CENTER: Desktop Navigation */}
            <div className="hidden md:flex items-center h-full">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative h-16 flex items-center px-6 font-mono text-[10px] tracking-[0.2em] transition-all"
                    style={{
                      color: isActive
                        ? activeTheme.colors.accent.primary
                        : activeTheme.colors.text.muted,
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

            {/* RIGHT: System Actions */}
            <div className="flex items-center gap-2 md:gap-6">
              <div className="hidden md:flex flex-col items-end border-r border-white/10 pr-6">
                <div className="flex items-center gap-2">
                  <RiPulseFill
                    className="text-amber-500 animate-pulse"
                    size={10}
                  />
                  <span className="font-mono text-[8px] uppercase tracking-widest text-white/40">
                    Available
                  </span>
                </div>
              </div>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-sm text-white/40 hover:text-amber-500 transition-colors"
              >
                {isDark ? (
                  <RiSunLine size={18} />
                ) : (
                  <RiMoonClearLine size={18} />
                )}
              </button>

              {/* MOBILE MENU TOGGLE */}
              <button
                className="md:hidden p-2 text-white/60"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <RiMenu4Line size={24} />
              </button>
            </div>
          </motion.div>
        ) : null}
      </nav>

      {/* MOBILE OVERLAY MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] flex flex-col"
            style={{ backgroundColor: activeTheme.colors.background.primary }}
          >
            <div className="flex items-center justify-between h-16 px-6 border-b border-white/5">
              <span className="font-mono text-[10px] tracking-widest text-white/20 uppercase">
                Navigation_Menu
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white/60 p-2"
              >
                <RiCloseLine size={28} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-8 space-y-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={item.href}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex items-end justify-between border-b border-white/5 pb-4"
                  >
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] text-amber-500 mb-2">
                        {item.id}
                      </span>
                      <span className="text-5xl font-black italic tracking-tighter text-white group-hover:text-amber-500 transition-colors">
                        {item.label}
                      </span>
                    </div>
                    <RiArrowRightUpLine
                      size={32}
                      className="text-white/10 group-hover:text-amber-500"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="p-8 border-t border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.2em]">
                  Multan_Node_Active
                </span>
              </div>
              <p className="font-mono text-[8px] text-white/20 uppercase">
                © 2026 Sufian.Dev // All Systems Operational
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOOT LOADER (Visible only during isBooting stage) */}
      {isBooting && bootStage === "loading" && (
        <div
          className="fixed inset-0 z-[140] flex flex-col items-center justify-center p-6"
          style={{ backgroundColor: activeTheme.colors.background.primary }}
        >
          <motion.div layoutId="header-shell" className="w-full max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end mb-12">
              <div className="space-y-6 text-center md:text-left">
                <motion.div
                  layoutId="boot-logo"
                  className="text-amber-500 flex justify-center md:justify-start"
                >
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
                className="hidden md:block font-mono text-[8px] uppercase space-y-1 text-right"
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
                  <span className="animate-pulse">_</span> Loading Experience
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
                  style={{
                    color:
                      progress > 0.3
                        ? activeTheme.colors.accent.primary
                        : activeTheme.colors.text.muted,
                  }}
                >
                  Interface Ready
                </span>
                <span
                  style={{
                    color:
                      progress > 0.6
                        ? activeTheme.colors.accent.primary
                        : activeTheme.colors.text.muted,
                  }}
                >
                  Data Connected
                </span>
                <span
                  style={{
                    color:
                      progress > 0.9
                        ? activeTheme.colors.accent.primary
                        : activeTheme.colors.text.muted,
                  }}
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
