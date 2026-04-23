"use client";

import React from "react";

export default function Quote() {
  return (
    <section
      id="quote"
      className="relative flex flex-col items-center justify-center z-30 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-inverse) 100%)",
      }}
    >
      {/* BACKGROUND NARRATIVE TEXT: 
          Now 100% visible but sophisticated using outlines.
          The text is massive and slightly masked behind the foreground.
      */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0">
        <span
          className="text-[20vw] font-black uppercase tracking-[calc(-0.05em)] leading-none opacity-20 transition-opacity"
          style={{
            WebkitTextStroke: "1.5px #A3A3A3",
            color: "transparent",
          }}
        >
          NARRATIVE
        </span>
      </div>

      {/* FOREGROUND CONTENT: Sits above the watermark */}
      <div className="max-w-6xl mx-auto px-8 pt-30 pb-30 text-center relative z-10">
        {/* Terminal Header & Rail Cap */}
        <header className="mb-16 flex flex-col items-center gap-6">
          <div className="border border-black/10 bg-black/5 px-4 py-1.5 rounded-sm">
            <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-black/60">
              System_Output // Closing_Narrative
            </p>
          </div>
        </header>

        {/* QUOTE BLOCK */}
        <blockquote className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.85] uppercase italic text-[#080808]">
          Code is not just <br />
          <span className="text-amber-700 decoration-black/10 decoration-wavy underline underline-offset-8">
            logic;
          </span>
          it’s the <br />
          rhythm of a <br />
          <span className="underline decoration-black/10 underline-offset-[14px]">
            digital
          </span>{" "}
          story.
        </blockquote>

        {/* FOOTER & OPERATOR CREDENTIALS */}
        <footer className="mt-24 space-y-4 flex flex-col items-center">
          <div className="h-px w-16 bg-black/10" />
          <div className="space-y-1">
            <p className="font-mono text-xs font-black tracking-[0.3em] uppercase text-[#080808]">
              Sufian // Architect_098
            </p>
            <p className="font-mono text-[10px] tracking-widest text-black/40 uppercase">
              The Islamia University of Bahawalpur // Core_Sequence
            </p>
          </div>
        </footer>
      </div>

      {/* Decorative Technical Detail for the bottom edges */}
      <div className="absolute bottom-12 left-12 font-mono text-[8px] text-black/20 uppercase tracking-widest">
        Terminating_Sequence... [OK]
      </div>
      <div className="absolute bottom-12 right-12 font-mono text-[8px] text-black/20 uppercase tracking-widest">
        Archive_Stream.01 // v4.0.1
      </div>
    </section>
  );
}
