export type RepoCategory =
  | "Agents"
  | "Prompt Engineering"
  | "Skills"
  | "RAG"
  | "Azure AI"
  | "Security"
  | "Automation"
  | "DevOps";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface RepoScoreSet {
  overall: number;
  learningValue: number;
  productionReadiness: number;
  innovation: number;
}

export interface RepoItem {
  id: string;
  name: string;
  owner: string;
  ownerAvatar: string;
  description: string;
  aiSummary: string;
  category: RepoCategory;
  tags: string[];
  language: string;
  techStack: string[];
  stars: number;
  lastUpdated: string;
  demoUrl?: string;
  repoUrl: string;
  difficulty: Difficulty;
  featuredIn: string[];
  scores: RepoScoreSet;
  hasAzure: boolean;
  frameworks: string[];
}

export interface RepoCollection {
  title: string;
  description: string;
  repoIds: string[];
}

export interface RepoIndex {
  generatedAt: string;
  source: {
    starredListUrl: string;
    repoCount: number;
  };
  collections: RepoCollection[];
  repositories: RepoItem[];
}

export type LibraryKind = "agents" | "prompts" | "instructions" | "skills";

export interface LibraryItem {
  id: string;
  kind: LibraryKind;
  title: string;
  relativePath: string;
  sourceUrl: string;
  folderUrl: string;
}

export interface LibrarySection {
  kind: LibraryKind;
  title: string;
  description: string;
  relativePath: string;
  folderUrl: string;
  count: number;
  items: LibraryItem[];
}

export interface ContentLibrary {
  generatedAt: string;
  repositoryUrl: string;
  totalItems: number;
  sections: LibrarySection[];
}