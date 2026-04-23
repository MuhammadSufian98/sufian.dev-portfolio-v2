"use client";

import React, { useState, useEffect } from "react";
import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiInstagramFill,
  RiMapPinLine,
  RiTimeLine,
  RiTerminalBoxLine,
  RiArrowRightUpLine,
} from "react-icons/ri";
import { useTheme } from "@/context/ThemeProvider";

const Footer = () => {
  const [localTime, setLocalTime] = useState("");
  const { activeTheme } = useTheme();

  useEffect(() => {
    // Sync with PKT/Multan time
    const timer = setInterval(() => {
      setLocalTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Karachi",
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const footerVars = {
    backgroundColor: activeTheme.colors.background.inverse,
    color: activeTheme.colors.text.inverse,
    borderColor: activeTheme.colors.border.subtle,
    accent: activeTheme.colors.accent.primary,
    subdued: activeTheme.colors.text.muted,
    raised: activeTheme.colors.background.secondary,
  };

  return (
    <footer
      className="relative z-40 pt-32 pb-12 px-6 overflow-hidden transition-colors"
      style={{
        backgroundColor: footerVars.backgroundColor,
        color: footerVars.color,
      }}
    >
      {/* Subtle Divider */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ backgroundColor: footerVars.borderColor }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 mb-24">
          {/* BRANDING: The Operator Identity */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="text-5xl font-black uppercase italic tracking-tighter leading-none">
                Sufian<span style={{ color: footerVars.accent }}>.</span>
              </h3>
              <p
                className="max-w-sm text-sm font-mono leading-relaxed uppercase tracking-tight"
                style={{ color: footerVars.subdued }}
              >
                Architecting high-fidelity digital systems. <br />
                Bridging structural logic with creative motion.
              </p>
            </div>

            {/* Social Icons - Professional High Contrast */}
            <div className="flex gap-4">
              {[
                {
                  icon: <RiGithubFill size={20} />,
                  href: "https://github.com/MuhammadSufian98",
                },
                { icon: <RiLinkedinBoxFill size={20} />, href: "#" },
                { icon: <RiInstagramFill size={20} />, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-all duration-300"
                  style={{
                    border: `1px solid ${footerVars.borderColor}`,
                    color: footerVars.color,
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* SYSTEM INFO: Metrics & Location */}
          <div
            className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-12 pl-0 lg:pl-12"
            style={{ borderLeft: `1px solid ${footerVars.borderColor}` }}
          >
            {/* Quick Links / Navigation */}
            <div className="space-y-6">
              <h4
                className="font-mono text-[10px] uppercase tracking-[0.4em] font-bold"
                style={{ color: footerVars.accent }}
              >
                Directories
              </h4>
              <ul className="space-y-3">
                {["Archive", "Toolbelt", "NexusProtocols", "Contact"].map(
                  (link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase()}`}
                        className="group flex items-center justify-between text-xs font-mono uppercase tracking-widest transition-colors"
                        style={{ color: footerVars.subdued }}
                      >
                        {link}
                        <RiArrowRightUpLine className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Environmental Data */}
            <div className="space-y-6">
              <h4
                className="font-mono text-[10px] uppercase tracking-[0.4em] font-bold"
                style={{ color: footerVars.accent }}
              >
                Environment
              </h4>
              <div className="space-y-4 font-mono text-[11px] uppercase" style={{ color: footerVars.subdued }}>
                <div className="flex items-center gap-3">
                  <RiMapPinLine style={{ color: footerVars.accent }} />
                  <span>Multan // PK_NODE_01</span>
                </div>
                <div className="flex items-center gap-3">
                  <RiTimeLine style={{ color: footerVars.accent }} />
                  <span>L-TIME: {localTime || "SYNCING..."}</span>
                </div>
                <div className="flex items-center gap-3">
                  <RiTerminalBoxLine style={{ color: footerVars.accent }} />
                  <span>OS: NEXT_JS_ARCHIVE_V4</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM LEGAL STRIP: The Final Hash */}
        <div
          className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8"
          style={{ borderTop: `1px solid ${footerVars.borderColor}` }}
        >
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold" style={{ color: footerVars.subdued }}>
              © 2026 Muhammad Sufian — [ Global_Access_Enabled ]
            </p>
            <p className="text-[8px] font-mono tracking-widest uppercase" style={{ color: footerVars.subdued }}>
              Lat: 30.1575° N // Long: 71.5249° E
            </p>
          </div>

          <div
            className="group flex items-center gap-4 px-6 py-3 rounded-full cursor-default transition-all hover:text-white"
            style={{
              backgroundColor: footerVars.raised,
              border: `1px solid ${footerVars.borderColor}`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: footerVars.accent }} />
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] font-bold">
              System_Status: Optimal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
