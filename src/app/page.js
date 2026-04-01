"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, stagger } from "animejs";
import Layout from "@/components/Layout";

export default function HomePage() {
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);
  const lineRef = useRef(null);
  
  // Hero & Origin Scroll Effect Refs
  const heroContainerRef = useRef(null);
  const h1Ref = useRef(null);
  const letterIRef = useRef(null);
  const subtitleRef = useRef(null);
  const originBgRef = useRef(null);
  const originOverlayRef = useRef(null);
  const originContentRef = useRef(null);

  useEffect(() => {
    const loadVanta = async () => {
      if (vantaEffectRef.current || !vantaRef.current) return;

      const THREE = await import("three");
      window.THREE = THREE;
      const { default: RINGS } = await import("vanta/dist/vanta.rings.min.js");

      vantaEffectRef.current = RINGS({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        scale: 1.0,
        backgroundColor: 0x252423,
        color: 0xdad5d0,
      });
    };
    loadVanta();

    const updateTransformOrigin = () => {
      if (!h1Ref.current || !letterIRef.current) return;
      
      const currentTransform = h1Ref.current.style.transform;
      h1Ref.current.style.transform = "none";
      
      const h1Rect = h1Ref.current.getBoundingClientRect();
      const iRect = letterIRef.current.getBoundingClientRect();
      
      const originX = iRect.left + iRect.width / 2 - h1Rect.left;
      const originY = iRect.top + iRect.height / 2 - h1Rect.top;
      
      const originXPercent = (originX / h1Rect.width) * 100;
      const originYPercent = (originY / h1Rect.height) * 100;
      
      h1Ref.current.style.transformOrigin = `${originXPercent}% ${originYPercent}%`;
      h1Ref.current.style.transform = currentTransform;
    };

    updateTransformOrigin();
    window.addEventListener("resize", updateTransformOrigin);
    if (document.fonts) {
      document.fonts.ready.then(updateTransformOrigin);
    }

    const handleScroll = () => {
      const scrollPercent =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);

      const floatingCore = document.querySelector(".floating-core");
      if (floatingCore) {
        animate(floatingCore, {
          translateY: window.scrollY * 0.8,
          rotate: window.scrollY * 0.15,
          duration: 0,
          ease: "linear",
        });
      }

      if (lineRef.current && lineRef.current.getTotalLength) {
        const lineLength = lineRef.current.getTotalLength();
        const draw = lineLength * scrollPercent;
        lineRef.current.style.strokeDashoffset = lineLength - draw;
      }

      // Hero & Origin Zoom Logic
      if (heroContainerRef.current) {
        const rect = heroContainerRef.current.getBoundingClientRect();
        const scrollTop = -rect.top;
        const maxScroll = Math.max(1, rect.height - window.innerHeight);
        
        // Progress goes from 0 to 1
        const progress = Math.max(0, Math.min(1, scrollTop / maxScroll));

        // Part 1: Text Scale (0.0 to 0.25)
        const textProgress = Math.min(1, progress / 0.25);
        const easedTextProgress = Math.pow(textProgress, 4);
        const textScale = 1 + easedTextProgress * 250;
        
        if (h1Ref.current) h1Ref.current.style.transform = `scale(${textScale})`;
        if (subtitleRef.current) subtitleRef.current.style.opacity = 1 - textProgress * 2;

        // Part 2: Background Match Fade In (0.22 to 0.25)
        if (originBgRef.current) {
            const bgProgress = Math.max(0, Math.min(1, (progress - 0.22) / 0.03));
            originBgRef.current.style.opacity = bgProgress;
        }

        // Part 3: Origin Content Reveal & Scale (0.25 to 0.6)
        const originProgress = Math.max(0, Math.min(1, (progress - 0.25) / 0.35));
        if (originOverlayRef.current) {
            originOverlayRef.current.style.opacity = originProgress;
            originOverlayRef.current.style.pointerEvents = originProgress > 0.5 ? 'auto' : 'none';
        }
        if (originContentRef.current) {
            const originScale = 0.8 + originProgress * 0.2;
            originContentRef.current.style.transform = `scale(${originScale})`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      vantaEffectRef.current?.destroy?.();
      vantaEffectRef.current = null;
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateTransformOrigin);
    };
  }, []);

  // Skill Cards IntersectionObserver Animation
  useEffect(() => {
    const skillCards = document.querySelectorAll(".skill-card");
    const observedCards = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !observedCards.has(entry.target)) {
            observedCards.add(entry.target);
            animate(skillCards, {
              opacity: [0, 1],
              translateY: [50, 0],
              rotateX: [45, 0],
              delay: stagger(100),
              ease: "easeOutExpo",
              duration: 1500,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    skillCards.forEach((card) => observer.observe(card));

    return () => {
      skillCards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <Layout>
      <main className="relative bg-[#252423] text-[#DAD5D0] overflow-clip">
        {/* SECTION 1 & 2: HERO & ORIGIN (Zoom Through Text Experience) */}
        <section ref={heroContainerRef} className="relative h-[200vh] z-30">
          <div className="sticky top-0 h-screen overflow-hidden bg-[#252423]">
            {/* Vanta Canvas */}
            <div ref={vantaRef} className="absolute inset-0 z-0" />

            {/* Big Text Layer */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
              <h1 
                ref={h1Ref} 
                className="text-[15vw] font-black uppercase leading-none tracking-tighter flex text-[#DAD5D0] will-change-transform"
              >
                <span>S</span>
                <span>U</span>
                <span>F</span>
                <span ref={letterIRef}>I</span>
                <span>A</span>
                <span>N</span>
              </h1>
              <p 
                ref={subtitleRef} 
                className="font-mono tracking-[1em] opacity-60 text-[#DAD5D0] mt-4 will-change-opacity"
              >
                Full-Stack Architect
              </p>
            </div>

            {/* Section 2 Details */}
            {/* Solid background matching text color, fades in to prevent zooming artifacts */}
            <div 
              ref={originBgRef} 
              className="absolute inset-0 z-[15] bg-[#DAD5D0] opacity-0 pointer-events-none will-change-opacity" 
            />

            {/* Section 2 Content */}
            <div 
              ref={originOverlayRef} 
              className="absolute inset-0 z-20 flex items-center justify-center opacity-0 pointer-events-none text-[#252423] will-change-opacity overflow-hidden"
            >
              <div 
                ref={originContentRef} 
                className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16 px-6 md:px-10 scale-75 will-change-transform"
              >
                <div className="relative w-48 h-48 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-[#252423]/10 flex-shrink-0">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAd2RvRrCj7i4U6QgpVpy1gFmYC0MnggsJbddxo6nlh7zrMQ7PymfZAN6XJe-xRS3esUm90G2tCuBc_tclWv25fZT40uu5rONxPvjgT554f1GEOZy5SuaEolqW61jO0eCQ0XsrABtQi3pDaNtB9bFt8RGkCTLJZCBAkYc4xvJh1P7g8pc_lpMUJXRPMLtN3kumskpOhdWPS2NsZOfKoc2nlXRvFp04lgbyGbRanQ_3oiGUOw5-cUB1oVgaeBRcSY91wtkOENcdljLZ"
                    alt="Sufian"
                    fill
                    sizes="(max-width: 768px) 16rem, 24rem"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 space-y-4 md:space-y-8 text-center md:text-left">
                  <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
                    The Origin
                  </h2>
                  <div className="space-y-4 md:space-y-6 text-lg md:text-2xl leading-relaxed font-medium opacity-90 text-[#252423]">
                    <p>
                      I am a dedicated software engineer with a strong academic
                      foundation from **The Islamia University of Bahawalpur
                      (IUB)**. My journey began with a curiosity for how data flows
                      through the wires, which quickly evolved into a passion for
                      the full JavaScript ecosystem.
                    </p>
                    <p>
                      My approach combines the structural integrity of engineering
                      with the creative flair of a designer. I don't just write
                      code; I sketch out digital systems that are intuitive,
                      performant, and delightful to use.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: TOOLBELT (Redesigned UI) */}
        <section
          id="toolbelt"
          className="relative py-40 z-20 bg-[#252423] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center mb-24">
              <p className="font-mono text-[10px] tracking-[0.5em] uppercase opacity-40 mb-4">
                System.Initialize(Capabilities)
              </p>
              <h2 className="text-5xl font-black uppercase italic tracking-tighter text-[#DAD5D0]">
                The Toolbelt
              </h2>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8"
              style={{ perspective: "2000px" }}
            >
              {[
                {
                  name: "MongoDB",
                  icon: "/icons/mongodb.svg",
                  tag: "DATA_NODE_01",
                  accent: "#10b981",
                  type: "pulse",
                },
                {
                  name: "Express",
                  icon: "/icons/express.svg",
                  tag: "ROUTING_V4",
                  accent: "#fbbf24",
                  type: "scan",
                },
                {
                  name: "React",
                  icon: "/icons/react.svg",
                  tag: "UI_REACTIVE",
                  accent: "#60a5fa",
                  type: "orbit",
                },
                {
                  name: "Node.js",
                  icon: "/icons/nodedotjs.svg",
                  tag: "RUNTIME_ENV",
                  accent: "#4ade80",
                  type: "energy",
                },
                {
                  name: "Next.js",
                  icon: "/icons/nextdotjs.svg",
                  tag: "SSR_ENGINE",
                  accent: "#ffffff",
                  type: "telescope",
                },
              ].map((tech, i) => (
                <div
                  key={tech.name}
                  className="skill-card group relative h-80 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{
                    transform: "rotateY(-15deg) rotateX(10deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Main Card Body */}
                  <div className="magnetic-target absolute inset-0 bg-[#DAD5D0]/5 border border-[#DAD5D0]/10 rounded-[2rem] p-8 flex flex-col items-center justify-center transition-all duration-500 group-hover:bg-[#DAD5D0] group-hover:text-[#252423] group-hover:rotate-0 group-hover:scale-110 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                    {/* 1. Background Unique Animations based on 'type' */}
                    {tech.type === "scan" && (
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/10 to-transparent h-full w-full -translate-y-full group-hover:animate-scan z-0" />
                    )}

                    {tech.type === "orbit" && (
                      <div className="absolute w-40 h-40 border border-[#DAD5D0]/10 rounded-full group-hover:border-[#252423]/20 animate-spin-slow z-0" />
                    )}

                    {/* 2. Content: Icon and Text */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-16 h-16 mb-6 relative group-hover:drop-shadow-xl transition-all duration-500">
                        <Image
                          src={tech.icon}
                          alt={tech.name}
                          fill
                          sizes="4rem"
                          className={`object-contain transition-all duration-500 ${tech.name !== "Next.js" ? "grayscale group-hover:grayscale-0" : ""}`}
                        />
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-widest">
                        {tech.name}
                      </h3>

                      {/* Type Specific Visuals */}
                      {tech.type === "energy" && (
                        <div className="flex gap-1 mt-4">
                          {[1, 2, 3].map((bit) => (
                            <div
                              key={bit}
                              className="w-1.5 h-3 bg-green-500/20 group-hover:bg-[#252423]/40 rounded-full group-hover:animate-bounce"
                              style={{ animationDelay: `${bit * 0.1}s` }}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 3. Footer Metadata */}
                    <div className="absolute bottom-6 flex justify-between w-full px-8 opacity-20 group-hover:opacity-100 transition-opacity">
                      <span className="font-mono text-[9px] font-bold tracking-tighter">
                        {tech.tag}
                      </span>
                      <span className="font-mono text-[9px] font-bold italic">
                        PRO_V26
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: PROJECTS (With Connecting Line) */}
        <section id="projects" className="relative py-60 z-20 bg-[#252423]">
          {/* THE CENTRAL TIMELINE LINE */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#DAD5D0]/20 to-transparent z-0" />

          <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-96">
            {[1, 2].map((proj, i) => (
              <div
                key={proj}
                className={`magnetic-target rounded-2xl group relative flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-24`}
              >
                {/* 1. IMAGE SIDE (The Visual) */}
                <div className="relative w-full md:w-3/5 aspect-video cursor-none overflow-hidden rounded-[2rem] border border-[#DAD5D0]/10 bg-[#1A1A1A]">
                  {/* Custom Floating Cursor (Visible on hover) */}
                  <div className="pointer-events-none absolute z-50 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-500 bg-amber-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center backdrop-blur-sm shadow-[0_0_30px_rgba(245,158,11,0.3)] project-cursor">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">
                      View
                    </span>
                  </div>

                  <Image
                    src="/banner/banner.webp"
                    alt="Project Screenshot"
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover grayscale transition-all duration-[1.5s] ease-out group-hover:grayscale-0 group-hover:scale-110"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#252423] via-transparent to-transparent opacity-60" />
                </div>

                {/* 2. DETAIL SIDE (The Story) */}
                <div
                  className={`w-full md:w-2/5 space-y-8 ${i % 2 === 0 ? "text-left" : "text-right"}`}
                >
                  <div className="inline-block px-4 py-1 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-500 font-mono text-[10px] tracking-[0.2em] uppercase">
                    Project // 0{proj}
                  </div>

                  <h3 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
                    NexusNode{" "}
                    <span className="text-amber-500 font-serif">AI</span>
                  </h3>

                  <div className="relative p-6 bg-[#DAD5D0]/5 border-l-4 border-amber-500 backdrop-blur-sm rounded-r-2xl">
                    <p className="text-lg text-[#DAD5D0]/80 leading-relaxed">
                      A high-performance Neural Retrieval Engine. Bridging the
                      gap between static PDF data and dynamic AI conversations
                      using the MERN ecosystem.
                    </p>
                  </div>

                  <div
                    className={`flex gap-4 ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
                  >
                    {["Next.js", "Tailwind", "Anime.js"].map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono opacity-40 uppercase tracking-widest"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. THE "BRIDGE" CONNECTOR (Anime Line) */}
                <div
                  className={`hidden md:block absolute top-1/2 ${i % 2 === 0 ? "left-[50%] right-[40%]" : "right-[50%] left-[40%]"} h-px bg-gradient-to-r from-amber-500 to-transparent -z-10 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: QUOTE (End of Line) */}
        <section className="relative h-screen flex flex-col items-center justify-center z-30 bg-[#DAD5D0] text-[#252423] rounded-t-[100px]">
          <div className="max-w-4xl text-center px-6">
            <span className="text-6xl text-amber-600 font-serif leading-none">
              “
            </span>
            <blockquote className="text-4xl md:text-7xl font-serif italic leading-tight -mt-4">
              Code is not just logic; it's the rhythm of a digital story.
            </blockquote>
            <p className="mt-12 font-mono text-xs tracking-widest opacity-40 uppercase">
              Sufian // Student @ IUB // Developer
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
