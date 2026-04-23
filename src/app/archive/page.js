import React from "react";
import Link from "next/link";
import { RiGitRepositoryLine, RiArrowLeftLine } from "react-icons/ri";
import RepositoriesSection from "@/components/RepositoriesSection";
import { formatNumber } from "@/lib/utils";

const GITHUB_API = "https://api.github.com";
const DEFAULT_GITHUB_USERNAME = "MuhammadSufian98";

async function fetchContributionYear(username, year) {
  const from = `${year}-01-01`;
  const to = `${year}-12-31`;

  const res = await fetch(
    `https://github.com/users/${username}/contributions?from=${from}&to=${to}`,
    {
      headers: {
        "User-Agent": "portfolio-archive-page",
      },
      next: { revalidate: 86400 },
    },
  );

  if (!res.ok) return null;

  const raw = await res.text();
  const containerMatch = raw.match(
    /<div class="js-yearly-contributions">[\s\S]*/i,
  );
  const html = containerMatch ? containerMatch[0] : raw;

  const countMatches = [...html.matchAll(/(\d+) contribution(?:s)? on/g)];
  const total = countMatches.reduce((sum, match) => sum + Number(match[1]), 0);

  return { year, html, total };
}

function getGitHubHeaders() {
  const headers = {
    "User-Agent": "portfolio-archive-page",
    Accept: "application/vnd.github+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function ghFetch(path) {
  const res = await fetch(`${GITHUB_API}${path}`, {
    headers: getGitHubHeaders(),
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`GitHub request failed: ${path} (${res.status})`);
  }

  return res.json();
}

function formatRelative(isoTime) {
  const ts = new Date(isoTime).getTime();
  const now = Date.now();
  const diffMs = Math.max(now - ts, 0);
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) return `${Math.max(minutes, 1)}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

async function getArchiveData() {
  const username = process.env.GITHUB_USERNAME || DEFAULT_GITHUB_USERNAME;

  const [user, repos, events, reposForStats] = await Promise.all([
    ghFetch(`/users/${username}`),
    ghFetch(`/users/${username}/repos?sort=updated&per_page=6&type=owner`),
    ghFetch(`/users/${username}/events/public?per_page=25`),
    ghFetch(`/users/${username}/repos?sort=updated&per_page=100&type=owner`),
  ]);

  const allRepos = reposForStats.map((repo) => ({
    ...repo,
    pushedAgo: formatRelative(repo.pushed_at),
  }));
  const activeRepos = allRepos.slice(0, 3);

  const commits = events
    .filter(
      (event) => event.type === "PushEvent" && event.payload?.commits?.length,
    )
    .flatMap((event) =>
      event.payload.commits.map((commit) => ({
        sha: commit.sha.slice(0, 7),
        message: commit.message,
        repo: event.repo?.name,
        time: formatRelative(event.created_at),
      })),
    )
    .slice(0, 6);

  const currentYear = new Date().getFullYear();
  const currentYearData = await fetchContributionYear(username, currentYear);
  const totalContributions = currentYearData?.total || 0;

  return {
    username,
    user,
    allRepos,
    activeRepos,
    commits,
    publicEventsWindow: events.length,
    totalContributions,
  };
}

export const metadata = {
  title: "Archive | Muhammad Sufian",
  description:
    "Live GitHub contributions and commit narrative for Muhammad Sufian",
};

export default async function GitHubArchivePage() {
  let data = null;
  let error = null;

  try {
    data = await getArchiveData();
  } catch (err) {
    error = "Unable to load live GitHub data right now.";
  }

  return (
    <main className="min-h-screen theme-bg-primary theme-text-primary selection:bg-amber-500/30 font-sans">
      {/* Dynamic Grid Overlay */}
      <div
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Background Glows */}
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] bg-amber-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        {/* HEADER: Technical Identity */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-16 md:mb-20 border-l-2 border-amber-500 pl-4 sm:pl-6 md:pl-8">
          <div className="space-y-2">
            <Link
              href="/"
              className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-white/40 hover:text-amber-500 transition-colors inline-flex items-center gap-2 mb-4"
            >
              <RiArrowLeftLine className="flex-shrink-0" /> <span className="truncate">Root_Directory</span>
            </Link>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter uppercase leading-none">
              Sufian<span className="text-amber-500">.</span>Archive
            </h1>
            <p className="text-white/40 font-mono text-[8px] sm:text-xs uppercase tracking-widest">
              Automated Documentation & Git Metrics // Version 2026.4.23
            </p>
          </div>

          {!error && (
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
              <div className="bg-[#111] border border-white/5 p-3 sm:p-4 rounded-sm hover:bg-amber-500 hover:text-black transition-all group cursor-default">
                <p className="text-[8px] sm:text-[9px] font-mono uppercase tracking-tighter opacity-60">
                  Commits_YTD
                </p>
                <p className="text-2xl sm:text-3xl font-bold leading-none">
                  {formatNumber(data.totalContributions)}
                </p>
              </div>
              <div className="bg-[#111] border border-white/5 p-3 sm:p-4 rounded-sm hover:bg-amber-500 hover:text-black transition-all group cursor-default">
                <p className="text-[8px] sm:text-[9px] font-mono uppercase tracking-tighter opacity-60">
                  Repo_Count
                </p>
                <p className="text-2xl sm:text-3xl font-bold leading-none">
                  {formatNumber(data.user.public_repos)}
                </p>
              </div>
            </div>
          )}
        </header>

        {error ? (
          <div className="p-20 border border-dashed border-red-500/30 bg-red-500/5 text-center rounded-lg">
            <span className="font-mono text-red-500">
              ERROR_FETCH_FAILED: Link to GitHub API severed.
            </span>
          </div>
        ) : (
          <div className="space-y-24">
            {/* REPOSITORIES SECTION */}
            <section className="relative">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 bg-gradient-to-r from-amber-500/50 to-transparent" />
                <h2 className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/30 whitespace-nowrap">
                  Deployments & Blueprints
                </h2>
              </div>
              <RepositoriesSection
                activeRepos={data.activeRepos}
                allRepos={data.allRepos}
              />
            </section>

            {/* ACTIVITY LOG: Terminal Style */}
            <section>
              <div className="bg-[#0D0D0D] border border-white/10 rounded-lg overflow-hidden shadow-2xl">
                <div className="bg-[#1A1A1A] px-4 py-2 border-b border-white/10 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">
                    git_activity_stream
                  </span>
                </div>

                <div className="divide-y divide-white/5 font-mono">
                  {data.commits.length > 0 ? (
                    data.commits.map((commit) => (
                      <div
                        key={commit.sha}
                        className="grid grid-cols-12 gap-4 p-5 hover:bg-white/[0.02] transition-colors group"
                      >
                        <div className="col-span-12 md:col-span-2 text-[10px] text-amber-500/50">
                          [{commit.sha}]
                        </div>
                        <div className="col-span-12 md:col-span-6 text-sm text-white/70 group-hover:text-white">
                          {commit.message}
                        </div>
                        <div className="col-span-6 md:col-span-2 text-[9px] uppercase text-white/30 text-right md:text-left">
                          {commit.repo.split("/")[1]}
                        </div>
                        <div className="col-span-6 md:col-span-2 text-[9px] uppercase text-amber-500/80 text-right">
                          {commit.time}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-20 text-center text-xs opacity-20">
                      NO_DATA_LOGGED
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* CTA SECTION: High-Contrast Technical Container */}
            <section className="relative group">
              {/* Outer Glowing Border */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-amber-500/40 via-white/5 to-amber-500/40 rounded-sm opacity-50 group-hover:opacity-100 transition-opacity" />

              <div className="relative bg-[#0C0C0C] rounded-sm p-8 sm:p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 overflow-hidden">
                {/* Background Watermark */}
                <div className="absolute top-0 right-0 text-[100px] sm:text-[160px] leading-none font-black text-white/[0.02] select-none translate-x-1/4 translate-y-[-10%] group-hover:text-amber-500/[0.04] transition-colors font-mono uppercase tracking-tighter">
                  Connect
                </div>

                <div className="relative z-10 space-y-4 sm:space-y-6 max-w-xl text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
                    <span className="w-1.5 h-1.5 bg-amber-500 animate-pulse rounded-full flex-shrink-0" />
                    <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-amber-500 truncate">
                      Status: Accepting Projects
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter uppercase italic leading-[0.85] text-white">
                    Let's Build <br />{" "}
                    <span className="text-amber-500">The Future.</span>
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-white/40 leading-relaxed uppercase tracking-wide">
                    Scaling architecture // AI integration // Full-stack
                    deployment.
                    <br />
                    Secure an engineering slot for Q4 2026.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="relative z-10 h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 lg:h-44 lg:w-44 rounded-full border border-white/10 bg-[#111] text-white flex flex-col items-center justify-center font-mono text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-tighter hover:border-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-500 group-hover:scale-105 shadow-2xl flex-shrink-0"
                >
                  <RiGitRepositoryLine size={24} className="mb-2" />
                  <span>Contact_Op</span>
                  {/* Rotating Orbit effect on hover */}
                  <div className="absolute inset-2 border border-dashed border-white/10 rounded-full group-hover:rotate-180 transition-transform duration-1000" />
                </Link>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
