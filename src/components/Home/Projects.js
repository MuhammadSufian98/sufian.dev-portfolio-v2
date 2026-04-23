"use client";

import React from "react";
import { PROJECTS, PROJECT_STACK } from "./constants";
import {
  RiNodeTree,
  RiGitMergeLine,
  RiCodeBoxLine,
  RiFocus2Line,
} from "react-icons/ri";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative theme-bg-primary py-32 overflow-hidden selection:bg-amber-500/30"
    >
      {/* Background Grid & Vertical Rail */}
      <div
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-amber-500 via-amber-500 to-transparent z-0 opacity-50" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-amber-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="flex flex-col items-center mb-48 text-center relative">
          <div className="mb-8 p-4 bg-[#080808] border border-amber-500 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <RiFocus2Line
              className="text-amber-500 animate-spin-slow"
              size={24}
            />
          </div>

          <div className="bg-[#080808] px-4 py-1 border border-white/10 rounded-full mb-6">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase text-white/40">
              Featured Work
            </p>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold uppercase italic tracking-tighter text-white leading-none">
            Featured <br />{" "}
            <span className="text-white/10 font-sans italic">Projects.</span>
          </h2>
        </header>

        <div className="space-y-48">
          {PROJECTS.map((proj, i) => (
            <div
              key={proj}
              className={`relative flex flex-col md:flex-row items-center gap-12 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
            >
              {/* Rail Junction Node */}
              <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 z-20">
                <div className="w-3 h-3 bg-[#080808] border border-amber-500 rotate-45 flex items-center justify-center">
                  <div className="w-1 h-1 bg-amber-500 animate-ping" />
                </div>
              </div>

              {/* PROJECT SCHEMATIC CARD */}
              <div className="w-full md:w-[46%] pl-8 sm:pl-12 md:pl-0">
                <div className="group relative bg-[#0D0D0D] border border-white/5 p-6 sm:p-8 md:p-10 hover:border-amber-500/20 transition-all duration-500">
                  <div className="absolute top-0 right-0 p-8 font-mono text-[80px] font-black text-white/[0.02] leading-none select-none group-hover:text-amber-500/[0.03] transition-colors">
                    0{i + 1}
                  </div>

                  <div className="relative z-10 space-y-8">
                    <header className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <RiCodeBoxLine className="text-amber-500/50" />
                        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
                          Project Overview
                        </span>
                      </div>
                      <RiNodeTree className="text-white/10 group-hover:text-amber-500/40 transition-colors" />
                    </header>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase italic tracking-tighter text-white group-hover:text-amber-500 transition-colors leading-none">
                      {proj}
                    </h3>

                    <div className="py-6 border-y border-white/5 text-sm leading-relaxed text-white/50 font-light italic">
                      &quot;A performance-focused product built with clean
                      components, scalable patterns, and a user-first
                      interface.&quot;
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {PROJECT_STACK.map((tag) => (
                        <div
                          key={tag}
                          className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-white/30"
                        >
                          <span className="w-1 h-1 bg-amber-500" />
                          {tag}
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-white/5">
                      <button className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.4em] text-white/40 hover:text-amber-500 transition-all duration-300 group/btn">
                        <RiGitMergeLine size={14} /> View Source
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block w-[46%]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
