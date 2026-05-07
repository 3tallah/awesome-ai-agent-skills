import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import repoIndex from "../data/repos.json";

interface GraphQlRepository {
  name: string;
  nameWithOwner: string;
  description: string | null;
  stargazerCount: number;
  updatedAt: string;
  url: string;
  primaryLanguage: { name: string } | null;
  owner: {
    login: string;
    avatarUrl: string;
  };
}

interface GraphQlResponse {
  data?: {
    user: {
      starredRepositories: {
        nodes: GraphQlRepository[];
      };
    };
  };
  errors?: Array<{ message: string }>;
}

const query = `
  query StarredRepositories($login: String!, $count: Int!) {
    user(login: $login) {
      starredRepositories(first: $count, orderBy: {field: STARRED_AT, direction: DESC}) {
        nodes {
          name
          nameWithOwner
          description
          stargazerCount
          updatedAt
          url
          primaryLanguage {
            name
          }
          owner {
            login
            avatarUrl
          }
        }
      }
    }
  }
`;

async function main() {
  const token = process.env.GITHUB_TOKEN;
  const login = process.env.GITHUB_LOGIN ?? "3tallah";
  const count = Number(process.env.GITHUB_SYNC_COUNT ?? "50");

  if (!token) {
    console.error("Missing GITHUB_TOKEN. Set it before running sync:github.");
    process.exitCode = 1;
    return;
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        login,
        count,
      },
    }),
  });

  const payload = (await response.json()) as GraphQlResponse;
  if (!response.ok || payload.errors?.length) {
    console.error("GitHub GraphQL sync failed.");
    console.error(JSON.stringify(payload.errors ?? payload, null, 2));
    process.exitCode = 1;
    return;
  }

  const nodes = payload.data?.user.starredRepositories.nodes ?? [];
  const enriched = nodes.map((node) => ({
    id: node.nameWithOwner.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    name: node.name,
    owner: node.owner.login,
    ownerAvatar: node.owner.avatarUrl,
    description: node.description ?? "",
    aiSummary: "Pending AI enrichment. Replace this placeholder in the metadata pipeline.",
    category: "Automation",
    tags: [],
    language: node.primaryLanguage?.name ?? "Unknown",
    techStack: [node.primaryLanguage?.name ?? "Unknown"],
    stars: node.stargazerCount,
    lastUpdated: node.updatedAt,
    repoUrl: node.url,
    difficulty: "Intermediate",
    featuredIn: [],
    scores: {
      overall: 50,
      learningValue: 50,
      productionReadiness: 50,
      innovation: 50,
    },
    hasAzure: false,
    frameworks: [],
  }));

  const output = {
    ...repoIndex,
    generatedAt: new Date().toISOString(),
    source: {
      starredListUrl: `https://github.com/${login}?tab=stars`,
      repoCount: enriched.length,
    },
    repositories: enriched,
  };

  const outputPath = resolve(process.cwd(), "data", "repos.generated.json");
  await mkdir(resolve(process.cwd(), "data"), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");

  console.log(`Wrote ${enriched.length} repositories to ${outputPath}`);
}

void main();