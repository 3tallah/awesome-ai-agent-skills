"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { dataIndex, formatCompactNumber, formatRelativeDate } from "@/lib/data";
import type { ContentLibrary, LibraryItem, LibrarySection, RepoCategory, RepoItem } from "@/lib/types";

const categories: Array<RepoCategory | "All"> = [
  "All",
  "Agents",
  "Prompt Engineering",
  "Skills",
  "RAG",
  "Azure AI",
  "Security",
  "Automation",
  "DevOps",
];

const sortModes = ["Featured", "Most starred", "Recently updated", "Top score"] as const;

function scoreSearch(repo: RepoItem, query: string): number {
  if (!query) {
    return 1;
  }

  const haystack = [
    repo.name,
    repo.owner,
    repo.description,
    repo.aiSummary,
    repo.category,
    repo.language,
    ...repo.tags,
    ...repo.frameworks,
    ...repo.techStack,
  ]
    .join(" ")
    .toLowerCase();

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  return terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
}

function sortRepositories(repos: RepoItem[], mode: (typeof sortModes)[number]): RepoItem[] {
  const items = [...repos];

  switch (mode) {
    case "Most starred":
      return items.sort((left, right) => right.stars - left.stars);
    case "Recently updated":
      return items.sort(
        (left, right) => new Date(right.lastUpdated).getTime() - new Date(left.lastUpdated).getTime(),
      );
    case "Top score":
      return items.sort((left, right) => right.scores.overall - left.scores.overall);
    default:
      return items.sort((left, right) => {
        const leftFeatured = left.featuredIn.length > 0 ? 1 : 0;
        const rightFeatured = right.featuredIn.length > 0 ? 1 : 0;
        return rightFeatured - leftFeatured || right.scores.overall - left.scores.overall;
      });
  }
}

function getVisibleRepositories(
  searchText: string,
  selectedCategory: RepoCategory | "All",
  azureOnly: boolean,
  sortMode: (typeof sortModes)[number],
) {
  const filtered = dataIndex.repositories.filter((repo) => {
    const matchesCategory = selectedCategory === "All" || repo.category === selectedCategory;
    const matchesAzure = !azureOnly || repo.hasAzure;
    const matchesSearch = scoreSearch(repo, searchText) > 0;
    return matchesCategory && matchesAzure && matchesSearch;
  });

  return sortRepositories(filtered, sortMode).sort((left, right) => {
    const leftScore = scoreSearch(left, searchText);
    const rightScore = scoreSearch(right, searchText);
    return rightScore - leftScore;
  });
}

export function HomePage({ contentLibrary }: { contentLibrary: ContentLibrary }) {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<RepoCategory | "All">("All");
  const [azureOnly, setAzureOnly] = useState(false);
  const [sortMode, setSortMode] = useState<(typeof sortModes)[number]>("Featured");

  const visibleRepositories = useMemo(
    () => getVisibleRepositories(searchText, selectedCategory, azureOnly, sortMode),
    [azureOnly, searchText, selectedCategory, sortMode],
  );

  const featuredCollections = dataIndex.collections.map((collection) => ({
    ...collection,
    repositories: collection.repoIds
      .map((repoId) => dataIndex.repositories.find((repo) => repo.id === repoId))
      .filter((repo): repo is RepoItem => Boolean(repo)),
  }));

  return (
    <main className="shell px-5 pb-16 pt-5 md:px-8 lg:px-12">
      <div className="h-[4px] bg-gradient-to-r from-[#0066b1] via-[#1c69d4] to-[#e22718]" />
      <section className="mx-auto max-w-7xl rounded-none border border-[#3c3c3c] bg-[#1a1a1a] px-6 py-6 md:px-8 md:py-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex rounded-none border border-[#1c69d4]/20 bg-[#1c69d4]/8 px-3 py-1 text-xs uppercase tracking-[0.3em] text-[#1c69d4]">
              3tallah AI Hub
            </p>
            <h1 className="max-w-4xl text-2xl font-semibold leading-tight md:text-4xl">
              Best AI agents, skills, prompts, and instructions <span className="text-[#1c69d4]">in one place</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#bbbbbb] md:text-base">
              Browse curated assets quickly. Open the source instantly. Reuse what already works.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="#content-library"
                className="rounded-none bg-[#1c69d4] px-4 py-2 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                Explore content library
              </a>
              <a
                href="#repository-index"
                className="rounded-none border border-[#3c3c3c] bg-[#1a1a1a] px-4 py-2 text-sm text-[#bbbbbb] transition-colors hover:bg-[#262626]"
              >
                Browse repository index
              </a>
            </div>
          </div>

          <div className="grid min-w-[220px] gap-2 rounded-none border border-[#3c3c3c] bg-[#1a1a1a] p-2 md:grid-cols-2 lg:min-w-[260px] lg:grid-cols-1">
            <Metric label="Repos indexed" value={String(dataIndex.source.repoCount)} />
            <Metric label="Library assets" value={String(contentLibrary.totalItems)} />
            <Metric label="Last snapshot" value={new Date(dataIndex.generatedAt).toLocaleDateString("en-US")} />
          </div>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-[1.6fr_0.8fr]">
          <div className="rounded-none border border-[#3c3c3c] bg-[#1a1a1a] p-4 md:p-5">
            <label className="mb-2 block text-xs uppercase tracking-[0.28em] text-[#7e7e7e]">Search</label>
            <input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search tags, frameworks, Azure, agents, RAG, skills"
              className="w-full rounded-none border border-[#3c3c3c] bg-[#262626] px-4 py-4 text-sm text-white outline-none placeholder:text-[#7e7e7e] focus:border-[#1c69d4]/50"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={[
                      "rounded-none px-3 py-2 text-sm uppercase tracking-[0.15em] transition-colors",
                      active
                        ? "bg-[#1c69d4] text-white"
                        : "border border-[#3c3c3c] bg-transparent text-[#bbbbbb] hover:bg-[#262626]",
                    ].join(" ")}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-none border border-[#3c3c3c] bg-[#1a1a1a] p-4 md:p-5">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-[#7e7e7e]">Sort</span>
                <select
                  value={sortMode}
                  onChange={(event) => setSortMode(event.target.value as (typeof sortModes)[number])}
                  className="w-full rounded-none border border-[#3c3c3c] bg-[#262626] px-4 py-3 text-sm text-white outline-none focus:border-[#1c69d4]/50"
                >
                  {sortModes.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                onClick={() => setAzureOnly((current) => !current)}
                className={[
                  "rounded-none border px-4 py-3 text-left text-sm transition-colors",
                  azureOnly
                    ? "border-[#1c69d4]/30 bg-[#1c69d4]/15 text-[#1c69d4]"
                    : "border-[#3c3c3c] bg-[#1a1a1a] text-[#bbbbbb] hover:bg-[#262626]",
                ].join(" ")}
              >
                <span className="block text-xs uppercase tracking-[0.28em] text-[#7e7e7e]">Filter</span>
                Azure ecosystem only
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="repository-index" className="mx-auto mt-8 max-w-7xl">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">Repository index</h2>
            <p className="mt-2 text-sm leading-6 text-[#7e7e7e] md:text-base">
              {visibleRepositories.length} results with AI summary, category, heat score, and learnability signals.
            </p>
          </div>
          <p className="text-sm text-[#7e7e7e]">Source list: 3tallah / AI Projects</p>
        </div>

        <div className="card-grid">
          {visibleRepositories.map((repo, index) => (
            <RepoCard key={repo.id} repo={repo} index={index} />
          ))}
        </div>
      </section>

      <section id="content-library" className="mx-auto mt-8 max-w-7xl">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">Content library</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#7e7e7e] md:text-base">
              Keep the app stable while exposing the real source of truth for agents, prompts, instructions, and skills.
              Every item below links back to GitHub so visitors always reach the latest version in the repository.
            </p>
          </div>
          <a
            href={contentLibrary.repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-none border border-[#3c3c3c] bg-[#1a1a1a] px-4 py-2 text-sm text-[#bbbbbb] transition-colors hover:bg-[#262626]"
          >
            Open repository
          </a>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {contentLibrary.sections.map((section, index) => (
            <LibrarySectionCard key={section.kind} section={section} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-none border border-[#303030] bg-[#171717] px-2 py-1.5">
      <p className="text-[10px] uppercase tracking-[0.16em] text-[#7e7e7e]">{label}</p>
      <p className="mt-1 text-base font-medium text-white">{value}</p>
    </div>
  );
}

function RepoCard({ repo, index }: { repo: RepoItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.2), duration: 0.28 }}
      className="rounded-none border border-[#3c3c3c] bg-[#1a1a1a] p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={repo.ownerAvatar}
              alt={`${repo.owner} avatar`}
              className="h-11 w-11 rounded-none border border-[#3c3c3c] object-cover"
            />
            <div>
              <p className="text-sm text-[#7e7e7e]">{repo.owner}</p>
              <h3 className="text-xl font-semibold text-white">{repo.name}</h3>
            </div>
          </div>
        </div>
        <span className="rounded-none border border-[#3c3c3c] bg-[#1a1a1a] px-3 py-1 text-xs text-[#bbbbbb]">{repo.category}</span>
      </div>

      <p className="mt-5 text-sm leading-6 text-[#bbbbbb]">{repo.aiSummary}</p>
      <p className="mt-3 text-sm leading-6 text-[#7e7e7e]">{repo.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {repo.tags.map((tag) => (
          <span key={tag} className="pill rounded-none px-3 py-1 text-xs text-[#1c69d4]">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Stat label="Stars" value={formatCompactNumber(repo.stars)} />
        <Stat label="Updated" value={formatRelativeDate(repo.lastUpdated)} />
        <Stat label="Language" value={repo.language} />
        <Stat label="Difficulty" value={repo.difficulty} />
      </div>

      <div className="mt-6 space-y-3">
        <ScoreBar label="AI value score" value={repo.scores.overall} />
        <ScoreBar label="Learning value" value={repo.scores.learningValue} />
        <ScoreBar label="Production readiness" value={repo.scores.productionReadiness} />
      </div>

      <div className="mt-6 flex flex-wrap gap-2 text-xs text-[#bbbbbb]">
        {repo.techStack.map((item) => (
          <span key={item} className="rounded-none border border-[#3c3c3c] px-3 py-1">
            {item}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="text-sm text-[#7e7e7e]">
          {repo.hasAzure ? "Azure-aware" : "General ecosystem"}
        </div>
        <a
          href={repo.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-none bg-[#1c69d4] px-4 py-2 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
        >
          View repo
        </a>
      </div>
    </motion.article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.24em] text-[#7e7e7e]">{label}</p>
      <p className="mt-2 text-sm font-medium text-[#bbbbbb]">{value}</p>
    </div>
  );
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-[#7e7e7e]">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="heat-bar">
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function LibrarySectionCard({ section, index }: { section: LibrarySection; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.2), duration: 0.3 }}
      className="rounded-none border border-[#3c3c3c] bg-[#1a1a1a] p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#1c69d4]">{section.title}</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{section.count} published assets</h3>
        </div>
        <a
          href={section.folderUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-none border border-[#3c3c3c] bg-[#1a1a1a] px-3 py-2 text-xs text-[#bbbbbb] transition-colors hover:bg-[#262626]"
        >
          Browse folder
        </a>
      </div>

      <p className="mt-3 text-sm leading-6 text-[#7e7e7e]">{section.description}</p>

      <div className="mt-5 space-y-3">
        {section.items.slice(0, 5).map((item) => (
          <LibraryItemRow key={item.id} item={item} />
        ))}
      </div>

      {section.items.length > 5 ? (
        <p className="mt-4 text-xs uppercase tracking-[0.22em] text-[#7e7e7e]">
          +{section.items.length - 5} more in this folder
        </p>
      ) : null}
    </motion.article>
  );
}

function LibraryItemRow({ item }: { item: LibraryItem }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-none border border-[#3c3c3c] bg-[#262626] px-4 py-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-[#bbbbbb]">{item.title}</p>
        <p className="truncate text-xs text-[#7e7e7e]">{item.relativePath}</p>
      </div>
      <a
        href={item.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="shrink-0 rounded-none bg-[#1c69d4] px-3 py-2 text-xs font-medium text-white transition-transform hover:-translate-y-0.5"
      >
        Latest file
      </a>
    </div>
  );
}