const Header = () => {
  return (
    <nav className="fixed top-0 w-full z-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center backdrop-blur-md bg-[#252423]/40 border border-[#DAD5D0]/10 px-8 py-4 rounded-full">
        {/* LOGO / NAME */}
        <div className="magnetic-target p-2 flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-500 rounded-sm rotate-45 flex items-center justify-center">
            <span className="text-[#252423] font-black -rotate-45 text-xs">
              S
            </span>
          </div>
          <span className="font-mono text-sm tracking-[0.3em] uppercase font-bold text-[#DAD5D0]">
            Sufian.Dev
          </span>
        </div>

        {/* NAV LINKS */}
        <div className="hidden md:flex gap-10 font-mono text-[10px] uppercase tracking-widest opacity-70">
          <a
            href="#origin"
            className="magnetic-target text-[#DAD5D0] hover:text-amber-500 transition-colors"
          >
            Origin
          </a>
          <a
            href="#toolbelt"
            className="magnetic-target text-[#DAD5D0] hover:text-amber-500 transition-colors"
          >
            Toolbelt
          </a>
          <a
            href="#projects"
            className="magnetic-target text-[#DAD5D0] hover:text-amber-500 transition-colors"
          >
            Projects
          </a>
        </div>

        {/* STATUS INDICATOR */}
        <div className="magnetic-target flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] text-[#DAD5D0] font-mono uppercase opacity-50">
            Available for Hire
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
