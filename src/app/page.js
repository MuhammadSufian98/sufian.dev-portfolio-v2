"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, stagger } from "animejs";
import Layout from "@/components/Layout";

// --- Floating Particles Sub-Component ---
const FloatingParticles = ({ particlesRef }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 120 - 10,
      bgPosX: [0, 50, 100][Math.floor(Math.random() * 3)],
      size: Math.random() * 20 + 20,
      speedX: Math.random() * 0.02 + 0.005,
      speedY: Math.random() * 0.02 + 0.005,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      scrollParallax: Math.random() * 0.05 + 0.02,
      opacity: Math.random() * 0.4 + 0.2,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={p.id}
          ref={(el) => {
            if (particlesRef.current) {
               particlesRef.current[i] = el;
            }
          }}
          className="absolute bg-no-repeat"
          style={{
            left: `${p.x}vw`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundImage: "url('/assets/floating-elements.png')",
            backgroundSize: "300% 100%",
            backgroundPosition: `${p.bgPosX}% 0%`,
            opacity: p.opacity,
          }}
          data-speedx={p.speedX}
          data-speedy={p.speedY}
          data-phasex={p.phaseX}
          data-phasey={p.phaseY}
          data-scrollparallax={p.scrollParallax}
          data-origy={p.y}
        />
      ))}
    </div>
  );
};

export default function HomePage() {
  const targetScrollY = useRef(0);
  const currentScrollY = useRef(0);
  const timeRef = useRef(0);
  const rafId = useRef(null);

  const particlesRef = useRef([]);
  const parallaxBgRef = useRef(null);
  
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  // Hero Refs
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

    return () => {
      vantaEffectRef.current?.destroy?.();
      vantaEffectRef.current = null;
    };
  }, []);

  useEffect(() => {
    // Transform Origin for Perfect Zoom
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
    if (document.fonts) document.fonts.ready.then(updateTransformOrigin);

    // Main LERP Smooth Scroll Engine
    const onScroll = () => {
      targetScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Initial sync
    targetScrollY.current = window.scrollY;
    currentScrollY.current = window.scrollY;

    const loop = () => {
      // Easing function for buttery feel (0.075)
      currentScrollY.current += (targetScrollY.current - currentScrollY.current) * 0.075;
      timeRef.current += 1;

      // 1. Deep-Space Parallax (-0.15)
      if (parallaxBgRef.current) {
        parallaxBgRef.current.style.transform = `translateY(${currentScrollY.current * -0.15}px)`;
      }

      // 2. Hero Zoom & Origin Reveal
      if (heroContainerRef.current) {
        const containerTop = heroContainerRef.current.offsetTop;
        const containerHeight = heroContainerRef.current.offsetHeight;
        const maxScroll = Math.max(1, containerHeight - window.innerHeight);
        
        // Progress goes from 0 to 1 based on smooth scroll
        const scrollDistance = currentScrollY.current - containerTop;
        const progress = Math.max(0, Math.min(1, scrollDistance / maxScroll));

        // Text Scale (Scale to 75 as requested)
        const textProgress = Math.min(1, progress / 0.25);
        const textScale = 1 + Math.pow(textProgress, 4) * 74; 
        
        if (h1Ref.current) h1Ref.current.style.transform = `scale(${textScale})`;
        if (subtitleRef.current) subtitleRef.current.style.opacity = 1 - textProgress * 2;

        // Origin Background Coverage
        if (originBgRef.current) {
            originBgRef.current.style.opacity = Math.max(0, Math.min(1, (progress - 0.22) / 0.03));
        }

        // Origin Content Reveal
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

      // 3. Floating Particles Drift
      if (particlesRef.current.length > 0) {
        particlesRef.current.forEach((p) => {
          if (!p) return;
          const speedX = parseFloat(p.dataset.speedx);
          const speedY = parseFloat(p.dataset.speedy);
          const phaseX = parseFloat(p.dataset.phasex);
          const phaseY = parseFloat(p.dataset.phasey);
          const scrollParallax = parseFloat(p.dataset.scrollparallax);
          const origY = parseFloat(p.dataset.origy);
  
          // Math.sin and Math.cos offset independent of scroll
          const driftX = Math.sin(timeRef.current * speedX + phaseX) * 30;
          const driftY = Math.cos(timeRef.current * speedY + phaseY) * 30;
  
          // Scroll offset wraps so particles are infinite
          let yPos = origY - (currentScrollY.current * scrollParallax * 0.1);
          yPos = ((yPos + 20) % 140 + 140) % 140 - 20;
  
          p.style.transform = `translate(${driftX}px, ${driftY}px)`;
          p.style.top = `${yPos}vh`;
        });
      }

      rafId.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", updateTransformOrigin);
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Section Intersections
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -100px 0px" };

    // Toolbelt Flip
    const toolbeltCards = document.querySelectorAll(".toolbelt-card");
    const tbObserver = new IntersectionObserver((entries) => {
      const intersecting = entries.filter(e => e.isIntersecting).map(e => e.target);
      if (intersecting.length > 0) {
        animate(intersecting, {
          rotateY: [90, 0],
          opacity: [0, 1],
          duration: 1200,
          delay: stagger(100),
          ease: "easeOutExpo"
        });
        intersecting.forEach(el => tbObserver.unobserve(el));
      }
    }, observerOptions);
    toolbeltCards.forEach(card => tbObserver.observe(card));

    // Projects Ken Burns Reveal
    const projectCards = document.querySelectorAll(".project-card");
    const projObserver = new IntersectionObserver((entries) => {
      const intersecting = entries.filter(e => e.isIntersecting).map(e => e.target);
      if (intersecting.length > 0) {
        // High contrast card reveal
        animate(intersecting, {
          translateY: [100, 0],
          opacity: [0, 1],
          duration: 1500,
          delay: stagger(200),
          ease: "easeOutExpo"
        });
        
        intersecting.forEach(el => {
          // Ken Burns 'scale-down' animation from 1.2 to 1 on reveal
          const img = el.querySelector(".kb-image");
          if (img) {
            animate(img, {
              scale: [1.2, 1],
              duration: 3000,
              ease: "easeOutQuint"
            });
          }
          projObserver.unobserve(el);
        });
      }
    }, observerOptions);
    projectCards.forEach(card => projObserver.observe(card));

    return () => {
      tbObserver.disconnect();
      projObserver.disconnect();
    };
  }, []);

  return (
    <Layout>
      <main className="relative bg-[#252423] text-[#DAD5D0] overflow-clip min-h-screen">
        
        {/* PARALLAX DEEP SPACE */}
        <div className="fixed inset-[-50%] z-0 pointer-events-none" ref={parallaxBgRef}>
           <Image 
             src="/assests/floating-elements.png"
             alt="Deep Space Background"
             fill
             className="object-cover opacity-10"
           />
        </div>

        {/* ANTI-GRAVITY PARTICLES */}
        <FloatingParticles particlesRef={particlesRef} />

        {/* SECTION 1 & 2: HERO & ORIGIN (The Portal Engine) */}
        <section ref={heroContainerRef} className="relative h-[200vh] z-30">
          <div className="sticky top-0 h-screen overflow-hidden">
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
                <div className="magnetic-target relative w-48 h-48 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-[#252423]/10 flex-shrink-0">
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

        {/* SECTION 3: TOOLBELT (Neo-Terminal UI) */}
        <section id="toolbelt" className="relative py-40 z-20 pointer-events-none">
          {/* Use pointer-events-none on section, auto on content to avoid breaking cursor tracking on parallax layer if any */}
          <div className="max-w-7xl mx-auto px-6 pointer-events-auto">
            <div className="flex flex-col items-center mb-24">
              <p className="font-mono text-[10px] tracking-[0.5em] uppercase opacity-40 mb-4 text-[#DAD5D0]">
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
                { name: "MongoDB", icon: "/icons/mongodb.svg", tag: "DATA_NODE_01" },
                { name: "Express", icon: "/icons/express.svg", tag: "ROUTING_V4" },
                { name: "React", icon: "/icons/react.svg", tag: "UI_REACTIVE" },
                { name: "Node.js", icon: "/icons/nodedotjs.svg", tag: "RUNTIME_ENV" },
                { name: "Next.js", icon: "/icons/nextdotjs.svg", tag: "SSR_ENGINE" },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="toolbelt-card group relative h-80 opacity-0 will-change-transform"
                  style={{ transform: "rotateY(90deg)" }}
                >
                  <div className="magnetic-target absolute inset-0 bg-[#1A1A1A] border border-[#DAD5D0]/10 rounded-[2rem] p-8 flex flex-col items-center justify-center transition-all duration-500 overflow-hidden hover:border-[#DAD5D0]/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-2">
                    
                    {/* Amber LED Glow match floating cubes */}
                    <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-[#f59e0b] shadow-[0_0_15px_#f59e0b] animate-pulse" />

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
                      <h3 className="text-xl font-black uppercase tracking-widest text-[#DAD5D0]">
                        {tech.name}
                      </h3>
                    </div>

                    <div className="absolute bottom-6 flex justify-between w-full px-8 opacity-40 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <span className="font-mono text-[9px] font-bold tracking-tighter text-[#DAD5D0]">
                        {tech.tag}
                      </span>
                      <span className="font-mono text-[9px] font-bold italic text-[#f59e0b]">
                        ACTV
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: PROJECTS (The Monoliths) */}
        <section id="projects" className="relative py-40 z-20 pointer-events-none">
          <div className="max-w-7xl mx-auto px-6 relative space-y-40 pointer-events-auto">
            {[1, 2].map((proj, i) => (
              <div
                key={proj}
                className={`project-card translate-y-24 opacity-0 magnetic-target rounded-3xl group relative flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-24 shadow-2xl bg-[#1A1A1A] border border-[#DAD5D0]/10 overflow-hidden`}
              >
                 {/* High Contrast Reveal Image Box */}
                 <div className="relative w-full md:w-3/5 aspect-video overflow-hidden bg-[#252423]">
                   <Image
                     src="/banner/banner.webp"
                     alt="Project Screenshot"
                     fill
                     sizes="(max-width: 768px) 100vw, 60vw"
                     className="kb-image object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80" />
                 </div>

                 {/* Monolith Details */}
                 <div className={`w-full md:w-2/5 p-8 md:p-12 space-y-8 ${i % 2 === 0 ? "text-left" : "text-right"}`}>
                   <div className="inline-block px-4 py-1 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/5 text-[#f59e0b] font-mono text-[10px] tracking-[0.2em] uppercase">
                     Monolith // 0{proj}
                   </div>
                   
                   <h3 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-[#DAD5D0]">
                     NexusNode <span className="text-[#f59e0b] font-serif">AI</span>
                   </h3>

                   <div className={`relative p-6 bg-[#DAD5D0]/5 border-amber-500 backdrop-blur-sm ${i % 2 === 0 ? "border-l-4 rounded-r-2xl" : "border-r-4 rounded-l-2xl"}`}>
                     <p className="text-lg text-[#DAD5D0]/80 leading-relaxed">
                       A high-performance Neural Retrieval Engine. Bridging the gap between static data and dynamic AI conversations using the MERN ecosystem.
                     </p>
                   </div>

                   <div className={`flex gap-4 ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                     {["Next.js", "Tailwind", "Anime.js"].map((tag) => (
                       <span key={tag} className="text-[10px] font-mono opacity-40 uppercase tracking-widest text-[#DAD5D0]">
                         {tag}
                       </span>
                     ))}
                   </div>
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: FINAL QUOTE */}
        <section className="relative py-40 flex flex-col items-center justify-center z-30 bg-[#DAD5D0] text-[#252423] rounded-t-[100px] mt-20">
          <div className="max-w-4xl text-center px-6 magnetic-target">
            <span className="text-6xl text-[#f59e0b] font-serif leading-none">
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
