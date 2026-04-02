"use client";

import Image from "next/image";
import { TOOLBELT_ITEMS } from "./constants";

export default function Toolbelt() {
  return (
    <section id="toolbelt" className="relative py-40 z-20 pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 pointer-events-auto">
        <div className="flex flex-col items-center mb-24">
          <p className="font-mono text-[10px] tracking-[0.5em] uppercase opacity-55 mb-4 text-[#DCD7D3]">
            System.Initialize(Capabilities)
          </p>
          <h2 className="text-5xl font-black uppercase italic tracking-tighter text-[#DCD7D3]">
            The Toolbelt
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8" style={{ perspective: "2000px" }}>
          {TOOLBELT_ITEMS.map((tech) => (
            <div
              key={tech.name}
              className="toolbelt-card group relative h-80 opacity-100 will-change-transform"
              style={{ transform: "rotateY(0deg)" }}
            >
              <div className="magnetic-target absolute inset-0 bg-[#252423] border border-[#FFB347]/20 rounded-[2rem] p-8 flex flex-col items-center justify-center transition-all duration-500 overflow-hidden hover:border-[#FFB347]/50 hover:shadow-[0_20px_50px_rgba(212,143,41,0.15)] hover:-translate-y-2">
                <div className="absolute top-6 right-6">
                  <div className="w-3 h-3 rounded-full bg-[#FFB347] animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#FFB347] blur-md opacity-80 animate-pulse" />
                </div>

                <div className="relative z-10 flex flex-col items-center pointer-events-none">
                  <div className="w-16 h-16 mb-6 relative transition-all duration-500">
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      fill
                      sizes="4rem"
                      className={`object-contain transition-all duration-500 ${tech.name !== "Next.js" ? "grayscale group-hover:grayscale-0" : ""}`}
                    />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-widest text-[#DCD7D3]">
                    {tech.name}
                  </h3>
                </div>

                <div className="absolute bottom-6 flex justify-between w-full px-8 opacity-40 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <span className="font-mono text-[9px] font-bold tracking-tighter text-[#DCD7D3]">
                    {tech.tag}
                  </span>
                  <span className="font-mono text-[9px] font-bold tracking-wider text-[#FFB347]">
                    STATUS: ACTIVE
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
