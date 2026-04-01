"use client";

import { useState, useEffect } from "react";

const Footer = () => {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    setLocalTime(new Date().toLocaleTimeString());
  }, []);

  return (
    <footer className="relative z-40 bg-[#DAD5D0] text-[#252423] pt-20 pb-10 px-6 border-t border-[#DAD5D0]/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 mb-20">
          {/* BRANDING COLUMN */}
          <div className="space-y-6">
            <h3 className="magnetic-target text-4xl font-black uppercase italic tracking-tighter">Sufian</h3>
            <p className="max-w-sm opacity-50 leading-relaxed font-medium">
              Software Engineer specializing in the MERN ecosystem. 
              Bridging the gap between structural logic and creative motion.
            </p>
          </div>

          {/* CONTACT / LINKS COLUMN */}
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-500">Socials</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="https://github.com/MuhammadSufian98" className="hover:underline">GitHub</a></li>
                <li><a href="#" className="hover:underline">LinkedIn</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-500">Location</h4>
              <p className="text-sm opacity-80">Multan / Bahawalpur<br/>Punjab, Pakistan</p>
            </div>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="pt-10 border-t border-[#DAD5D0]/5 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-[#ff5500] text-[10px] font-mono tracking-widest opacity-60">
            © 2026 MUHAMMAD SUFIAN — DESIGNED IN BAHALWALPUR
          </p>
          <div className="flex gap-4 opacity-30 text-[10px] font-mono">
             <span>LOCAL TIME: {localTime || "—"}</span>
             <span>//</span>
             <span>BUILT WITH NEXT.JS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
