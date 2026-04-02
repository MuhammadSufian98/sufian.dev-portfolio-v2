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
    <main className="min-h-screen bg-[#252423] text-[#DAD5D0] overflow-hidden pt-24 pb-40">
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-[#DAD5D0]/40 hover:text-amber-500 transition-colors mb-20"
          >
            <RiArrowLeftLine /> Back to Engine
          </Link>

          {/* HERO BANNER SECTION */}
          <section
            id="archive-overview"
            className="relative bg-[#1A1A1A] border border-[#DAD5D0]/10 rounded-3xl p-10 md:p-16 overflow-hidden mb-24 shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative z-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
              <div className="space-y-6">
                <div className="inline-block px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-500 font-mono text-[10px] tracking-[0.2em] uppercase">
                  Git Commit Narrative
                </div>

                <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none text-[#DAD5D0]">
                  Muhammad{" "}
                  <span className="text-amber-500 font-serif">Sufian</span>
                </h1>

                <p className="text-xl text-[#DAD5D0]/60 max-w-xl italic leading-relaxed">
                  A real-time engineering manifest. Pulling live architecture
                  blueprints, repository history, and graphite commit smudges
                  via GitHub API.
                </p>

                <div className="flex items-center gap-3 pt-6">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_#f59e0b]" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#DAD5D0]/40">
                    Source: github.com/
                    {error
                      ? process.env.GITHUB_USERNAME || DEFAULT_GITHUB_USERNAME
                      : data?.username}
                  </p>
                </div>
              </div>

              {!error && (
                <div className="flex gap-4">
                  <div className="bg-[#252423] border border-[#DAD5D0]/10 rounded-2xl p-6 text-center min-w-32 flex flex-col justify-center items-center shadow-inner">
                    <span className="block text-5xl font-black text-amber-500 mb-2">
                      {formatNumber(data.totalContributions)}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-[#DAD5D0]/40 uppercase">
                      Contributions
                    </span>
                  </div>
                  <div className="bg-[#252423] border border-[#DAD5D0]/10 rounded-2xl p-6 text-center min-w-32 flex flex-col justify-center items-center shadow-inner">
                    <span className="block text-5xl font-black text-amber-500 mb-2">
                      {formatNumber(data.user.public_repos)}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-[#DAD5D0]/40 uppercase">
                      Repositories
                    </span>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="mt-8 border border-red-500/20 bg-red-500/5 p-6 rounded-2xl text-red-400 font-medium flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                {error}
              </div>
            )}
          </section>

          {!error && (
            <>
              {/* REPOSITORIES VIEW */}
              <RepositoriesSection
                activeRepos={data.activeRepos}
                allRepos={data.allRepos}
              />

              {/* QUICK REACH SECTION */}
              <section className="mb-24">
                <div className="max-w-xl ml-auto bg-amber-500 text-[#252423] rounded-[2.5rem] p-10 flex flex-col justify-between shadow-[0_0_40px_rgba(245,158,11,0.15)] relative overflow-hidden group">
                  <div className="absolute -inset-2 bg-gradient-to-tr from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out -translate-x-[150%] skew-x-12" />

                  <div>
                    <h3 className="text-4xl sm:text-5xl font-black mb-6 uppercase italic tracking-tighter">
                      Commission
                    </h3>
                    <p className="text-[#252423]/70 font-medium leading-relaxed">
                      Seeking complex architectural blueprints and interactive
                      narratives for late 2026. Ready to deploy.
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    className="mt-12 bg-[#252423] text-[#DAD5D0] py-5 px-8 rounded-full text-center font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#1a1918] transition-colors"
                  >
                    <RiGitRepositoryLine size={20} className="text-amber-500" />{" "}
                    Draft a Message
                  </Link>
                </div>
              </section>

              {/* RECENT COMMITS LAYER */}
              <section id="archive-commits" className="mb-12">
                <div className="flex flex-col items-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-[#DAD5D0]">
                    Recent Ink Spills
                  </h2>
                  <p className="font-mono text-[10px] tracking-[0.5em] uppercase opacity-40 mt-4 text-[#DAD5D0]">
                    System.Log(Recent_Commits)
                  </p>
                </div>

                <div className="space-y-4 max-w-4xl mx-auto">
                  {data.commits.length > 0 ? (
                    data.commits.map((commit, idx) => (
                      <div
                        key={`${commit.sha}-${commit.repo}`}
                        className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-[#1A1A1A] border border-[#DAD5D0]/5 rounded-2xl p-6 hover:border-amber-500/30 transition-colors"
                      >
                        <div className="flex items-start md:items-center gap-4">
                          <span className="font-mono text-[10px] font-bold text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-md uppercase">
                            #{commit.sha}
                          </span>
                          <p className="font-medium text-[#DAD5D0]/80">
                            {commit.message}
                          </p>
                        </div>
                        <div className="flex items-center gap-6 shrink-0">
                          <span className="font-mono text-[10px] uppercase text-[#DAD5D0]/40">
                            {commit.repo.split("/")[1]}
                          </span>
                          <p className="font-mono text-[10px] uppercase font-bold text-amber-500 tracking-widest hidden sm:block">
                            {commit.time}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-12 bg-[#1A1A1A] border border-[#DAD5D0]/5 rounded-3xl">
                      <p className="text-[#DAD5D0]/40 italic">
                        No recent public commit events found.
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </>
          )}
        </div>
    </main>
  );
}
