"use client";

import React from "react";
import { TOOLBELT_ITEMS } from "./constants";
import { RiArrowRightLine, RiCheckboxCircleLine } from "react-icons/ri";

export default function Toolbelt() {
  return (
    <section
      id="toolbelt"
      className="relative theme-bg-primary py-32 overflow-hidden selection:bg-amber-500/30"
    >
      {/* Background Grid & Glow */}
      <div
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-amber-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="flex flex-col items-center mb-24 text-center">
          <div className="bg-[#080808] px-4 py-1 border border-white/10 rounded-full mb-6">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase text-white/40">
              Core Skills
            </p>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold uppercase italic tracking-tighter text-white leading-none">
            Tech <span className="text-amber-500">Stack</span>
          </h2>
        </header>

        {/* HORIZONTAL FLOW CONTAINER */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          {TOOLBELT_ITEMS.map((tech, index) => (
            <React.Fragment key={tech.name}>
              {/* Skill Node */}
              <div className="group relative w-full md:w-48 bg-[#0D0D0D] border border-white/5 p-6 hover:border-amber-500/40 transition-all duration-500">
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-[8px] text-white/20 uppercase tracking-tighter">
                    Skill 0{index + 1}
                  </span>
                  <h3 className="text-sm font-bold font-mono text-white group-hover:text-amber-500 transition-colors uppercase">
                    {tech.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <RiCheckboxCircleLine
                      className="text-amber-500/40"
                      size={12}
                    />
                    <span className="font-mono text-[9px] text-white/30 uppercase">
                      {tech.tag}
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-amber-500 group-hover:w-full transition-all duration-500" />
              </div>

              {/* Connector Arrow */}
              {index < TOOLBELT_ITEMS.length - 1 && (
                <div className="hidden md:flex flex-1 items-center justify-center">
                  <div className="h-[1px] w-full bg-gradient-to-r from-amber-500/50 to-transparent relative mx-2">
                    <RiArrowRightLine
                      className="absolute right-0 -top-[6px] text-amber-500 animate-pulse"
                      size={14}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
