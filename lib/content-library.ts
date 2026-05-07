import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { ContentLibrary, LibraryItem, LibraryKind, LibrarySection } from "@/lib/types";

const repositoryUrl = "https://github.com/3tallah/awesome-ai-agent-skills";
const rootPath = process.cwd();
const contentRoot = "content";

const sectionConfig: Array<{
  kind: LibraryKind;
  title: string;
  description: string;
  relativePath: string;
}> = [
  {
    kind: "agents",
    title: "Agents",
    description: "Role-specific agent definitions and chat modes for Azure, Terraform, architecture, and learning workflows.",
    relativePath: `${contentRoot}/agents`,
  },
  {
    kind: "prompts",
    title: "Prompts",
    description: "Reusable prompt files for automation, reviews, document workflows, and specialized content generation.",
    relativePath: `${contentRoot}/prompts`,
  },
  {
    kind: "instructions",
    title: "Instructions",
    description: "Project-level instruction files that shape behavior, UI quality, and implementation patterns.",
    relativePath: `${contentRoot}/instructions`,
  },
  {
    kind: "skills",
    title: "Skills",
    description: "Packaged skill folders with `SKILL.md` entrypoints so users can pull the latest implementation-ready guidance from GitHub.",
    relativePath: `${contentRoot}/skills`,
  },
];

function toTitleCase(value: string) {
  return value
    .replace(/\.(agent|prompt|instructions|chatmode)$/g, "")
    .replace(/\.md$/g, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function toSourceUrl(relativePath: string) {
  return `${repositoryUrl}/blob/main/${relativePath.replace(/\\/g, "/")}`;
}

function toFolderUrl(relativePath: string) {
  return `${repositoryUrl}/tree/main/${relativePath.replace(/\\/g, "/")}`;
}

function createItem(kind: LibraryKind, relativePath: string, title: string, folderPath: string): LibraryItem {
  return {
    id: `${kind}:${relativePath}`,
    kind,
    title,
    relativePath,
    sourceUrl: toSourceUrl(relativePath),
    folderUrl: toFolderUrl(folderPath),
  };
}

function getSectionItems(kind: LibraryKind, relativePath: string): LibraryItem[] {
  const absolutePath = join(rootPath, relativePath);

  if (kind === "skills") {
    return readdirSync(absolutePath, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => {
        const skillPath = `${relativePath}/${entry.name}/SKILL.md`;
        return createItem(kind, skillPath, toTitleCase(entry.name), `${relativePath}/${entry.name}`);
      })
      .sort((left, right) => left.title.localeCompare(right.title));
  }

  return readdirSync(absolutePath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => createItem(kind, `${relativePath}/${entry.name}`, toTitleCase(entry.name), relativePath))
    .sort((left, right) => left.title.localeCompare(right.title));
}

export function getContentLibrary(): ContentLibrary {
  const sections: LibrarySection[] = sectionConfig.map((section) => {
    const items = getSectionItems(section.kind, section.relativePath);
    return {
      ...section,
      folderUrl: toFolderUrl(section.relativePath),
      count: items.length,
      items,
    };
  });

  return {
    generatedAt: new Date().toISOString(),
    repositoryUrl,
    totalItems: sections.reduce((sum, section) => sum + section.count, 0),
    sections,
  };
}