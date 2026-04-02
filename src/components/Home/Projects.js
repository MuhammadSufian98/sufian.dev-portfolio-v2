"use client";

import Image from "next/image";
import { PROJECTS, PROJECT_STACK } from "./constants";

export default function Projects() {
  return (
    <section id="projects" className="relative py-40 z-20 pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 relative space-y-40 pointer-events-auto">
        {PROJECTS.map((proj, i) => (
          <div
            key={proj}
            className={`project-card magnetic-target rounded-3xl group relative flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-24 bg-[#252423] border border-[#FFB347]/20 overflow-hidden`}
          >
            <div className="relative w-full md:w-3/5 aspect-video overflow-hidden bg-[#252423] rounded-3xl m-3">
              <Image
                src="/banner/banner.webp"
                alt="Project Screenshot"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="kb-image object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80" />
            </div>

            <div className={`w-full md:w-2/5 p-8 md:p-12 space-y-8 ${i % 2 === 0 ? "text-left" : "text-right"}`}>
              <div className="inline-block px-4 py-1 rounded-full border border-[#FFB347]/40 bg-[#FFB347]/10 text-[#FFB347] font-mono text-[10px] tracking-[0.2em] uppercase">
                Monolith // 0{proj}
              </div>

              <h3 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-[#DCD7D3]">
                NexusNode <span className="text-[#FFB347] font-serif">AI</span>
              </h3>

              <div className={`relative p-6 bg-[#DCD7D3]/5 border-[#FFB347] backdrop-blur-sm ${i % 2 === 0 ? "border-l-4 rounded-r-2xl" : "border-r-4 rounded-l-2xl"}`}>
                <p className="text-lg text-[#DCD7D3]/80 leading-relaxed">
                  A high-performance Neural Retrieval Engine. Bridging the gap between static data and dynamic AI conversations using the MERN ecosystem.
                </p>
              </div>

              <div className={`flex gap-4 ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                {PROJECT_STACK.map((tag) => (
                  <span key={tag} className="text-[10px] font-mono opacity-50 uppercase tracking-widest text-[#DCD7D3]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
