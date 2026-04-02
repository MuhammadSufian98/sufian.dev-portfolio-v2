"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiArrowDownSLine } from "react-icons/ri";
import { LayoutGroup, motion } from "framer-motion";
import SufianLogo from "./LogoSvg";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
    sections: [
      { label: "Origin", id: "origin" },
      { label: "Toolbelt", id: "toolbelt" },
      { label: "Projects", id: "projects" },
      { label: "Quote", id: "quote" },
    ],
  },
  {
    label: "Archive",
    href: "/archive",
    sections: [
      { label: "Overview", id: "archive-overview" },
      { label: "Recent Commits", id: "archive-commits" },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    sections: [
      { label: "Form", id: "contact-form" },
      { label: "Sidebar", id: "contact-sidebar" },
    ],
  },
];

const SHELL_TRANSITION = {
  type: "spring",
  stiffness: 130,
  damping: 24,
  mass: 0.65,
};

const NAME_TRANSITION = {
  type: "spring",
  stiffness: 150,
  damping: 20,
  mass: 0.5,
};

const Header = ({ isBooting = false, onBootComplete = () => {} }) => {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [bootStage, setBootStage] = useState("loading");

  const progressPct = useMemo(() => `${Math.min(progress * 100, 100)}%`, [progress]);

  useEffect(() => {
    if (!isBooting) return;

    let rafId = 0;
    let completionTimer = 0;
    const duration = 2100;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const nextProgress = Math.min(elapsed / duration, 1);
      setProgress(nextProgress);

      if (nextProgress < 1) {
        rafId = window.requestAnimationFrame(tick);
        return;
      }

      setBootStage("moving");
      completionTimer = window.setTimeout(() => {
        onBootComplete();
      }, 720);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      if (completionTimer) window.clearTimeout(completionTimer);
    };
  }, [isBooting, onBootComplete]);

  const getSectionHref = (pageHref, sectionId) => {
    if (pathname === pageHref) return `#${sectionId}`;
    return `${pageHref}#${sectionId}`;
  };

  const showHeaderContent = !isBooting;
  const showHeaderShell = !isBooting || bootStage === "moving";
  const showLoader = isBooting && bootStage === "loading";

  return (
    <LayoutGroup id="boot-header">
      <nav className="fixed top-0 w-full z-130 px-6 py-4">
        {showHeaderShell ? (
          <motion.div
            layoutId="header-shell"
            transition={SHELL_TRANSITION}
            className="max-w-7xl mx-auto flex justify-between items-center backdrop-blur-md bg-[#252423]/40 border border-[#DAD5D0]/10 px-8 py-4 rounded-full"
          >
            <Link href="/" className="magnetic-target flex items-center gap-3">
              <motion.div layoutId="boot-logo" transition={NAME_TRANSITION}>
                <SufianLogo size={44} />
              </motion.div>
              <motion.span
                layoutId="boot-name"
                transition={NAME_TRANSITION}
                className="font-mono text-sm tracking-[0.3em] uppercase font-bold text-[#DAD5D0]"
              >
                SUFIAN.DEV
              </motion.span>
            </Link>

            {/* NAV BUTTONS + SECTION DROPDOWNS */}
            <div className="hidden md:flex gap-5 font-mono text-[10px] uppercase tracking-widest">
              {showHeaderContent
                ? NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                      <div key={item.href} className="relative group">
                        <Link
                          href={item.href}
                          className={`magnetic-target inline-flex items-center gap-1 rounded-full border px-4 py-2 transition-colors ${
                            isActive
                              ? "text-amber-500 border-amber-500/40 bg-amber-500/10"
                              : "text-[#DAD5D0] border-[#DAD5D0]/20 hover:text-amber-500 hover:border-amber-500/40"
                          }`}
                        >
                          {item.label}
                          {item.sections?.length ? (
                            <RiArrowDownSLine
                              className="text-sm opacity-80"
                              aria-hidden
                            />
                          ) : null}
                        </Link>

                        {item.sections?.length ? (
                          <div className="pointer-events-none invisible opacity-0 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100 absolute left-0 top-full min-w-48 rounded-2xl border border-[#DAD5D0]/15 bg-[#1A1A1A] p-2 shadow-[0_12px_30px_rgba(0,0,0,0.45)] transition-all duration-200 z-120">
                            {item.sections.map((section) => (
                              <Link
                                key={section.id}
                                href={getSectionHref(item.href, section.id)}
                                className="block rounded-xl px-3 py-2 text-[#DAD5D0]/80 hover:text-amber-500 hover:bg-[#DAD5D0]/5 transition-colors"
                              >
                                {section.label}
                              </Link>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    );
                  })
                : null}
            </div>

            {/* STATUS INDICATOR */}
            <div className="magnetic-target flex items-center gap-2">
              {showHeaderContent ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] text-[#DAD5D0] font-mono uppercase opacity-50">
                    Available for Hire
                  </span>
                </>
              ) : null}
            </div>
          </motion.div>
        ) : (
          <div className="max-w-7xl mx-auto h-18" aria-hidden />
        )}
      </nav>

      {showLoader ? (
        <div className="fixed inset-0 z-140 pointer-events-none">
          <motion.div
            layoutId="header-shell"
            transition={SHELL_TRANSITION}
            className="absolute inset-0 bg-[#323130] flex items-center justify-center"
          >
            <div className="w-full max-w-md px-8 flex flex-col items-center gap-6">
              <div className="flex items-center gap-4">
                <motion.div layoutId="boot-logo" transition={NAME_TRANSITION}>
                  <SufianLogo size={88} />
                </motion.div>
                <motion.span
                  layoutId="boot-name"
                  transition={NAME_TRANSITION}
                  className="font-mono text-[clamp(1.6rem,3.8vw,2.8rem)] tracking-[0.35em] uppercase font-bold text-[#DAD5D0]"
                >
                  SUFIAN.DEV
                </motion.span>
              </div>

              <div className="w-full h-1.5 rounded-full bg-[#DAD5D0]/20 overflow-hidden">
                <motion.div
                  className="h-full bg-amber-500"
                  style={{ width: progressPct }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </LayoutGroup>
  );
};

export default Header;
