"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiArrowDownSLine } from "react-icons/ri";
import SufianLogo from "./LogoSvg";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
    sections: [
      { label: "Origin", id: "origin" },
      { label: "Toolbelt", id: "toolbelt" },
      { label: "Projects", id: "projects" },
      { label: "Quote", id: "quote" },
    ],
  },
  {
    label: "Archive",
    href: "/archive",
    sections: [
      { label: "Overview", id: "archive-overview" },
      { label: "Recent Commits", id: "archive-commits" },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    sections: [
      { label: "Form", id: "contact-form" },
      { label: "Sidebar", id: "contact-sidebar" },
    ],
  },
];

const Header = () => {
  const pathname = usePathname();

  const getSectionHref = (pageHref, sectionId) => {
    if (pathname === pageHref) return `#${sectionId}`;
    return `${pageHref}#${sectionId}`;
  };

  return (
    <nav className="fixed top-0 w-full z-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center backdrop-blur-md bg-[#252423]/40 border border-[#DAD5D0]/10 px-8 py-4 rounded-full">
        {/* LOGO / NAME */}
        <Link href="/" className="magnetic-target flex items-center gap-3">
          <div className="-m-2">
            <SufianLogo size={44} />
          </div>
          <span className="font-mono text-sm tracking-[0.3em] uppercase font-bold text-[#DAD5D0]">
            Sufian.Dev
          </span>
        </Link>

        {/* NAV BUTTONS + SECTION DROPDOWNS */}
        <div className="hidden md:flex gap-5 font-mono text-[10px] uppercase tracking-widest">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            return (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`magnetic-target inline-flex items-center gap-1 rounded-full border px-4 py-2 transition-colors ${
                    isActive
                      ? "text-amber-500 border-amber-500/40 bg-amber-500/10"
                      : "text-[#DAD5D0] border-[#DAD5D0]/20 hover:text-amber-500 hover:border-amber-500/40"
                  }`}
                >
                  {item.label}
                  {item.sections?.length ? (
                    <RiArrowDownSLine
                      className="text-sm opacity-80"
                      aria-hidden
                    />
                  ) : null}
                </Link>

                {item.sections?.length ? (
                  <div className="pointer-events-none invisible opacity-0 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100 absolute left-0 top-full min-w-48 rounded-2xl border border-[#DAD5D0]/15 bg-[#1A1A1A] p-2 shadow-[0_12px_30px_rgba(0,0,0,0.45)] transition-all duration-200 z-120">
                    {item.sections.map((section) => (
                      <Link
                        key={section.id}
                        href={getSectionHref(item.href, section.id)}
                        className="block rounded-xl px-3 py-2 text-[#DAD5D0]/80 hover:text-amber-500 hover:bg-[#DAD5D0]/5 transition-colors"
                      >
                        {section.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
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
