"use client";

import { useMemo, useState } from "react";
import { formatNumber } from "@/lib/utils";
import {
  RiStarLine,
  RiGitForkLine,
  RiTimeLine,
  RiArrowRightLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
} from "react-icons/ri";

function RepoCard({ repo, idx }) {
  return (
    <article className="group relative flex flex-col bg-[#1A1A1A] border border-[#DAD5D0]/10 rounded-[2rem] p-8 transition-transform duration-500 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Amber Glowing Accent */}
      <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_15px_#f59e0b] opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />

      <div className="absolute top-4 right-8 opacity-10 font-black text-6xl italic text-[#DAD5D0] pointer-events-none">
        {String(idx + 1).padStart(2, "0")}
      </div>
      
      <h3 className="text-2xl font-black uppercase tracking-tight leading-tight mb-4 pr-12 text-[#DAD5D0]">
        {repo.name}
      </h3>
      
      <p className="text-[#DAD5D0]/60 text-sm min-h-16 leading-relaxed mb-6">
        {repo.description || "Repository with active development and commit momentum."}
      </p>
      
      <div className="flex flex-wrap gap-3 text-[10px] font-mono tracking-widest uppercase mb-8">
        <span className="inline-flex items-center gap-1.5 bg-[#DAD5D0]/5 px-3 py-1.5 rounded-full border border-[#DAD5D0]/10 text-amber-500">
          <RiStarLine size={14} /> {formatNumber(repo.stargazers_count)}
        </span>
        <span className="inline-flex items-center gap-1.5 bg-[#DAD5D0]/5 px-3 py-1.5 rounded-full border border-[#DAD5D0]/10 text-[#DAD5D0]">
          <RiGitForkLine size={14} /> {formatNumber(repo.forks_count)}
        </span>
        <span className="inline-flex items-center gap-1.5 bg-[#DAD5D0]/5 px-3 py-1.5 rounded-full border border-[#DAD5D0]/10 text-[#DAD5D0]">
          <RiTimeLine size={14} /> {repo.pushedAgo || "-"}
        </span>
      </div>
      
      <div className="mt-auto">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-amber-500 opacity-80 group-hover:opacity-100 transition-opacity"
        >
          Open Repository <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </article>
  );
}

export default function RepositoriesSection({ activeRepos, allRepos }) {
  const [expanded, setExpanded] = useState(false);

  const reposToShow = useMemo(
    () => (expanded ? allRepos : activeRepos),
    [expanded, activeRepos, allRepos],
  );

  const hiddenCount = Math.max((allRepos?.length || 0) - (activeRepos?.length || 0), 0);

  return (
    <section className="mb-24 relative z-20">
      <div className="flex flex-col items-center mb-16">
        <p className="font-mono text-[10px] tracking-[0.5em] uppercase opacity-40 mb-4 text-[#DAD5D0]">
          System.Data(Repositories)
        </p>
        <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-[#DAD5D0]">
          Active Repositories
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reposToShow.map((repo, idx) => (
          <RepoCard key={repo.id} repo={repo} idx={idx} />
        ))}
      </div>

      {allRepos.length > activeRepos.length && (
        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="inline-flex items-center justify-center gap-3 bg-[#1A1A1A] border border-[#DAD5D0]/10 px-8 py-4 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] text-[#DAD5D0] hover:border-amber-500/50 hover:text-amber-500 transition-colors"
          >
            {expanded ? (
              <>COLLAPSE VIEW <RiArrowUpSLine className="text-lg" /></>
            ) : (
              <>EXPAND ARCHIVE {hiddenCount > 0 ? `(${hiddenCount})` : ""} <RiArrowDownSLine className="text-lg" /></>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
