"use client";

import Image from "next/image";
import Link from "next/link";
import { RiArrowRightUpLine } from "react-icons/ri";

export default function Hero({
  heroContainerRef,
  vantaRef,
  h1Ref,
  letterIRef,
  subtitleRef,
  originBgRef,
  originOverlayRef,
  originContentRef,
}) {
  return (
    <section
      id="origin"
      ref={heroContainerRef}
      className="relative h-[200vh] z-30 theme-bg-primary"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background Animation Layer */}
        <div
          ref={vantaRef}
          className="absolute inset-0 z-0 grayscale opacity-40"
        />

        {/* Grid Overlay for Technical Feel */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* INITIAL STATE: SUFIAN Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <h1
            ref={h1Ref}
            className="text-[18vw] font-black uppercase leading-none tracking-[-0.05em] flex text-white will-change-transform italic"
          >
            <span>S</span>
            <span>U</span>
            <span>F</span>
            <span ref={letterIRef} className="text-amber-500">
              I
            </span>
            <span>A</span>
            <span>N</span>
          </h1>
          <div
            ref={subtitleRef}
            className="flex items-center gap-4 mt-4 will-change-opacity"
          >
            <span className="h-[1px] w-12 bg-amber-500/50" />
            <p className="font-mono text-xs tracking-[0.8em] uppercase text-white/40">
              Full-Stack Software Engineer
            </p>
            <span className="h-[1px] w-12 bg-amber-500/50" />
          </div>
        </div>

        {/* TRANSITION LAYER: The Origin Reveal */}
        <div
          ref={originBgRef}
          className="absolute inset-0 z-[15] bg-[#0A0A0A] border-t border-amber-500/20 opacity-0 pointer-events-none will-change-opacity"
        />

        {/* REVEAL STATE: Content */}
        <div
          ref={originOverlayRef}
          className="absolute inset-0 z-20 flex items-center justify-center opacity-0 pointer-events-none text-white will-change-opacity overflow-hidden"
        >
          <div
            ref={originContentRef}
            className="w-full max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center px-4 sm:px-6 md:px-8 scale-90 will-change-transform"
          >
            {/* Left: Avatar with Technical Border */}
            <div className="lg:col-span-5 relative group pointer-events-auto">
              <div className="absolute -inset-4 border border-amber-500/20 rounded-full animate-spin-slow opacity-30" />
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-[8px] sm:border-[12px] border-[#161616] shadow-2xl">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAd2RvRrCj7i4U6QgpVpy1gFmYC0MnggsJbddxo6nlh7zrMQ7PymfZAN6XJe-xRS3esUm90G2tCuBc_tclWv25fZT40uu5rONxPvjgT554f1GEOZy5SuaEolqW61jO0eCQ0XsrABtQi3pDaNtB9bFt8RGkCTLJZCBAkYc4xvJh1P7g8pc_lpMUJXRPMLtN3kumskpOhdWPS2NsZOfKoc2nlXRvFp04lgbyGbRanQ_3oiGUOw5-cUB1oVgaeBRcSY91wtkOENcdljLZ"
                  alt="Sufian"
                  fill
                  sizes="(max-width: 768px) 16rem, 40rem"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              {/* Floating Tag */}
              <div className="absolute top-0 right-0 bg-amber-500 text-black font-mono text-[10px] font-bold px-4 py-1 rotate-12 uppercase tracking-widest">
                Software Engineer
              </div>
            </div>

            {/* Right: Description & Button */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left pointer-events-auto">
              <header className="space-y-2">
                <p className="font-mono text-amber-500 text-[9px] sm:text-[10px] uppercase tracking-[0.4em]">
                  About Me
                </p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.8] italic">
                  The <br /> <span className="text-amber-500">Story</span>
                </h2>
              </header>

              <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg leading-relaxed font-light text-white/70 max-w-2xl mx-auto lg:mx-0">
                <p>
                  I build fast, reliable web products with a focus on clean
                  architecture and thoughtful user experience. My journey began
                  at
                  <span className="text-white font-medium italic px-1 underline decoration-amber-500/50">
                    IUB
                  </span>
                  and has grown through real client projects, product work, and
                  constant iteration.
                </p>
                <p className="font-mono text-xs sm:text-sm uppercase tracking-tight text-white/40">
                  I design software that balances engineering precision with
                  modern visual polish.
                </p>
              </div>

              <div className="pt-6 md:pt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
                <Link
                  href="/origin"
                  className="group relative flex items-center gap-2 sm:gap-4 bg-white text-black px-6 sm:px-10 py-3 sm:py-5 rounded-sm font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-amber-500"
                >
                  <span className="truncate">View Full Story</span>
                  <RiArrowRightUpLine
                    size={16}
                    className="hidden sm:block group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform flex-shrink-0"
                  />
                </Link>

                <div className="flex flex-col items-center sm:items-start font-mono text-[8px] sm:text-[9px] text-white/20 uppercase tracking-widest leading-tight">
                  <span>Background and experience</span>
                  <span className="mt-1">Built with intention and clarity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
