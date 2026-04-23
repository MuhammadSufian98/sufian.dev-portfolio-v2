"use client";

import React from "react";
import Link from "next/link";
import {
  RiBookletLine,
  RiCodeSSlashLine,
  RiTerminalWindowLine,
  RiUser4Line,
  RiArrowLeftLine,
} from "react-icons/ri";

export default function HistoryPage() {
  const journey = [
    {
      year: "2022",
      title: "The Binary Spark",
      location: "IUB - Computer Science",
      description:
        "Commenced 7th Semester at The Islamia University of Bahawalpur. Initialized core understanding of Compiler Construction and Operating Systems.",
      icon: <RiBookletLine />,
      tags: ["C++", "Data Structures", "Logic Design"],
    },
    {
      year: "2023",
      title: "MERN Specialization",
      location: "Remote / Freelance",
      description:
        "Shifted focus to the Full-Stack ecosystem. Mastered MongoDB, Express, React, and Node.js. Developed the first iteration of personal architecture.",
      icon: <RiCodeSSlashLine />,
      tags: ["MERN", "JavaScript", "REST APIs"],
    },
    {
      year: "2024",
      title: "Professional Deployment",
      location: "Fiverr / Global",
      description:
        "Scaled operations as a Freelance Software Engineer. Delivered high-stakes web solutions and optimized UI/UX protocols for international clients.",
      icon: <RiTerminalWindowLine />,
      tags: ["Next.js", "Fiverr", "Client Relations"],
    },
    {
      year: "2025-26",
      title: "NexusNode & AI Research",
      location: "Active Lab",
      description:
        "Developing NexusNode AI and ASEA. Focusing on Multimodal RAG systems and autonomous software engineering agents.",
      icon: <RiUser4Line />,
      tags: ["AI", "RAG", "Vector DBs"],
    },
  ];

  return (
    <main className="min-h-screen theme-bg-primary theme-text-primary font-sans pb-32">
      {/* Background Rail Overlay */}
      <div
        className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 pt-24 relative z-10">
        {/* Navigation */}
        <Link
          href="/"
          className="group inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.4em] uppercase text-white/30 hover:text-amber-500 transition-all mb-20"
        >
          <RiArrowLeftLine className="group-hover:-translate-x-1 transition-transform" />
          <span>Exit_To_Hero</span>
        </Link>

        {/* Page Header */}
        <header className="mb-32 border-l-4 border-amber-500 pl-8">
          <p className="font-mono text-amber-500 text-[10px] uppercase tracking-[0.5em] mb-4">
            Historical_Data_Log
          </p>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none italic">
            Root
            <br />
            <span className="text-white/20">Sequence.</span>
          </h1>
        </header>

        {/* THE TIMELINE RAIL */}
        <div className="relative">
          {/* THE JOINING LINE: Runs through the entire section */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-500 via-amber-500/20 to-transparent z-0" />

          <div className="space-y-32">
            {journey.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center gap-12 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* 1. Year Marker (The Connector) */}
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                  <div className="w-10 h-10 bg-[#080808] border-2 border-amber-500 rounded-full flex items-center justify-center text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                    {item.icon}
                  </div>
                  <span className="font-mono text-[10px] font-bold text-amber-500 mt-4 bg-[#080808] px-2 py-1 border border-amber-500/20">
                    {item.year}
                  </span>
                </div>

                {/* 2. Content Card */}
                <div className="w-full md:w-[45%] pl-16 md:pl-0">
                  <div className="bg-[#0C0C0C] border border-white/5 p-8 rounded-sm hover:border-amber-500/30 transition-all group">
                    <div className="flex flex-col gap-2 mb-6">
                      <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">
                        Node_{index + 1}
                      </p>
                      <h3 className="text-3xl font-bold uppercase tracking-tighter italic text-white group-hover:text-amber-500 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-amber-500/60 font-mono text-[10px] uppercase">
                        {item.location}
                      </p>
                    </div>

                    <p className="text-white/50 leading-relaxed mb-8 font-light italic">
                      &quot;{item.description}&quot;
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-white/5 border border-white/5 px-3 py-1 text-[9px] font-mono uppercase text-white/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Empty Spacer for Desktop Symmetry */}
                <div className="hidden md:block w-[45%]" />
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM TERMINAL FOOTER */}
        <section className="mt-48 text-center border-t border-white/5 pt-20">
          <div className="inline-block p-12 bg-[#0C0C0C] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 text-amber-500/20 font-mono text-[8px]">
              END_OF_LINE
            </div>
            <h4 className="text-2xl font-bold uppercase tracking-widest text-white/20 mb-8">
              System_State: Fully_Optimized
            </h4>
            <Link
              href="/contact"
              className="bg-white text-black px-12 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-amber-500 transition-colors"
            >
              Start_New_Transmission
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
