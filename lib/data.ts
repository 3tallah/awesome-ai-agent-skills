import repoIndex from "@/data/repos.json";
import type { RepoIndex, RepoItem } from "@/lib/types";

export const dataIndex = repoIndex as RepoIndex;
export const repositories = dataIndex.repositories;

export function getFeaturedRepositories(ids: string[]): RepoItem[] {
  const idSet = new Set(ids);
  return repositories.filter((repo) => idSet.has(repo.id));
}

export function formatRelativeDate(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diffDays = Math.max(1, Math.round((now - then) / (1000 * 60 * 60 * 24)));

  if (diffDays < 30) {
    return `${diffDays}d ago`;
  }

  const diffMonths = Math.round(diffDays / 30);
  if (diffMonths < 12) {
    return `${diffMonths}mo ago`;
  }

  return `${Math.round(diffMonths / 12)}y ago`;
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}