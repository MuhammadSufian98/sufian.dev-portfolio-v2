"use client";

export default function Quote() {
  return (
    <section id="quote" className="relative py-40 flex flex-col items-center justify-center z-30 bg-[#DCD7D3] text-[#252423] rounded-t-[100px] mt-20">
      <div className="max-w-4xl text-center px-6 magnetic-target">
        <span className="text-6xl text-[#FFB347] font-serif leading-none">“</span>
        <blockquote className="text-4xl md:text-7xl font-serif italic leading-tight -mt-4">
          Code is not just logic; it&apos;s the rhythm of a digital story.
        </blockquote>
        <p className="mt-12 font-mono text-xs tracking-widest opacity-40 uppercase">
          Sufian // Student @ IUB // Developer
        </p>
      </div>
    </section>
  );
}
