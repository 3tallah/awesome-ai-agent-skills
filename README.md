# awesome-ai-agent-skills

## Live Updates

If you want to view all current reboots and the latest starred resources live, use:

https://3tallah.github.io/awesome-ai-agent-skills/

This repository is meant for sharing the best AI agents, skills, prompts, instructions, and MCP-related assets that I have been using so far as an Azure Solution Architect.

It includes:

- my custom prompts and working patterns
- reusable assets adapted from public internet sources
- selected well-known skills and agents that have been active for some time

In many cases, I cloned proven public assets and added my own personality, structure, and execution style on top to fit real project delivery needs.

I am sharing this collection so others can benefit from what is already working in practice.

## Current Asset Inventory

This repository is already more than a frontend shell. It now contains a real working catalog of reusable agent assets under [content](/c:/dev/Labs/awesome-ai-agent-skills/content).

The sections below are the root inventory of what is currently published in this repo so visitors can understand the available capabilities without browsing the folders manually.

### Agents

| Agent | Capability summary | Source |
|---|---|---|
| AEM Front-End Specialist | Builds Adobe Experience Manager components using HTL, Tailwind CSS, Sling models, and Figma-to-code design-system workflows. | [content/agents/aem-frontend-specialist.agent.md](content/agents/aem-frontend-specialist.agent.md) |
| Azure IaC Exporter | Analyzes existing Azure resources and exports them into Bicep, ARM, Terraform, or Pulumi-ready infrastructure definitions. | [content/agents/azure-iac-exporter.agent.md](content/agents/azure-iac-exporter.agent.md) |
| Azure IaC Generator | Central code-generation hub for Bicep, ARM, Terraform, and Pulumi with format-specific best-practice workflows. | [content/agents/azure-iac-generator.agent.md](content/agents/azure-iac-generator.agent.md) |
| Azure MPF Minimum Permissions | Guides Azure IaC minimum-permission analysis using MPF to identify required privileges and map them to RBAC roles. | [content/agents/azure-mpf-minimum-permissions.agent.md](content/agents/azure-mpf-minimum-permissions.agent.md) |
| Azure Principal Architect | Provides Azure Well-Architected architecture guidance with Microsoft documentation grounding and delivery-factory mode for planning artifacts. | [content/agents/azure-principal-architect.agent.md](content/agents/azure-principal-architect.agent.md) |
| Azure SaaS Architect | Focuses on multitenant Azure SaaS design, tenant isolation, B2B/B2C trade-offs, and SaaS Well-Architected principles. | [content/agents/azure-saas-architect.agent.md](content/agents/azure-saas-architect.agent.md) |
| Azure Static Web App | Specializes in building, deploying, integrating APIs, and troubleshooting Azure Static Web Apps projects. | [content/agents/azure-static-web-app.chatmode.md](content/agents/azure-static-web-app.chatmode.md) |
| Azure Verified Modules Terraform | Dedicated mode for creating, updating, or reviewing Azure Terraform using Azure Verified Modules. | [content/agents/azure-verified-modules-terraform.agent.md](content/agents/azure-verified-modules-terraform.agent.md) |
| Microsoft Learn Contributor | Helps contributors write and edit Microsoft Learn content using Microsoft style, accessibility, naming, and PR standards. | [content/agents/microsoft-learn-contributor.agent.md](content/agents/microsoft-learn-contributor.agent.md) |
| Microsoft Study and Learn | Acts as a guided Microsoft and Azure tutor that teaches through questions, practice, and incremental discovery. | [content/agents/microsoft-study-mode.agent.md](content/agents/microsoft-study-mode.agent.md) |
| Senior Cloud Architect | Produces architecture guidance and Mermaid-based design documentation without generating implementation code. | [content/agents/senior-cloud-architect.agent.md](content/agents/senior-cloud-architect.agent.md) |
| Terraform IaC Reviewer | Reviews Terraform for safer infrastructure changes with focus on state safety, least privilege, validation, and rollback discipline. | [content/agents/terraform-iac-reviewer.agent.md](content/agents/terraform-iac-reviewer.agent.md) |

### Prompts

| Prompt | Capability summary | Source |
|---|---|---|
| Azure App DR Automation | Runs the `azure-app-dr-automation` skill for Azure backup, restore, and DR-readiness review workflows. | [content/prompts/azure-app-dr-automation.prompt.md](content/prompts/azure-app-dr-automation.prompt.md) |
| Code Review | Executes a structured pull-request review flow with issue validation and optional inline GitHub comments. | [content/prompts/code-review.prompt.md](content/prompts/code-review.prompt.md) |
| CV Builder From JD | Tailors Mahmoud Atallah CV outputs from a job description using the `cv-builder` skill and existing Python generators. | [content/prompts/cv-builder-from-jd.prompt.md](content/prompts/cv-builder-from-jd.prompt.md) |
| Design MD Workflow | Applies DESIGN.md systems from `awesome-design-md` to generate consistent AEM and frontend experiences. | [content/prompts/design-md-workflow.prompt.md](content/prompts/design-md-workflow.prompt.md) |
| GitAgent | Scaffolds, validates, imports, or exports portable GitAgent-based agent definitions. | [content/prompts/gitagent.prompt.md](content/prompts/gitagent.prompt.md) |
| HTML To PPTX Hybrid | Converts HTML input into editable PowerPoint with structured rendering and fidelity fallback. | [content/prompts/html-to-pptx-hybrid.prompt.md](content/prompts/html-to-pptx-hybrid.prompt.md) |
| MD To PDF | Converts a Markdown document or pack into PDF using the `md-to-pdf` skill and `npx md-to-pdf`. | [content/prompts/md-to-pdf.prompt.md](content/prompts/md-to-pdf.prompt.md) |

### Instructions

| Instruction | Capability summary | Source |
|---|---|---|
| Frontend Design | Enforces bold, production-grade frontend aesthetics and rejects generic AI-looking UI decisions. | [content/instructions/frontend-design.instructions.md](content/instructions/frontend-design.instructions.md) |

### Skills

| Skill | Capability summary | Source |
|---|---|---|
| Azure App DR Automation | Disaster recovery workflow guidance for Azure Function Apps, Logic Apps, Web Apps, APIM, Azure AI Search, and related services. | [content/skills/azure-app-dr-automation/SKILL.md](content/skills/azure-app-dr-automation/SKILL.md) |
| Azure Well-Architected Reliability Assessment | WARA-based reliability assessment workflow for resiliency, availability, and recovery posture in Azure. | [content/skills/azure-well-architected-reliability-assessment/SKILL.md](content/skills/azure-well-architected-reliability-assessment/SKILL.md) |
| BrowserMCP MCP | Browser MCP setup guidance for controlling a real authenticated browser tab through MCP. | [content/skills/browsermcp-mcp/SKILL.md](content/skills/browsermcp-mcp/SKILL.md) |
| CV Builder | CV tailoring, ATS evaluation, and role-targeted resume automation workflows for Mahmoud Atallah content. | [content/skills/cv-builder/SKILL.md](content/skills/cv-builder/SKILL.md) |
| MarkItDown Converter | Predictable file and URL to Markdown conversion workflow using Microsoft MarkItDown and preconfigured local runner assets. | [content/skills/markitdown-converter/SKILL.md](content/skills/markitdown-converter/SKILL.md) |

## Capability Snapshot

As of now, this repository contains:

- 12 agents
- 7 prompts
- 1 instruction file
- 5 packaged skills

Together they cover Azure architecture, IaC generation and export, Terraform review, AEM frontend engineering, documentation workflows, CV automation, Browser MCP setup, DR readiness, and document conversion.

## Planned Direction

This reboot is structured so it can grow into a much smarter platform without needing a backend on day one.

Planned next steps include:

- AI-generated summaries and technical explanations
- automatic category and tag generation
- learning path views
- relationship graph between similar repositories
- better fuzzy search with Fuse.js
- richer scoring models beyond stars
- optional Cloudflare Pages deployment

## Repo Structure

```text
awesome-ai-agent-skills/
|-- app/
|-- components/
|-- content/
|   |-- agents/
|   |-- prompts/
|   |-- instructions/
|   `-- skills/
|-- data/
|   |-- repos.json
|   `-- repos.generated.json
|-- scripts/
|   `-- github-sync.ts
|-- public/
`-- .github/workflows/
```

## Content Folder Strategy

The application now treats these grouped directories as a first-class content library under `content/`:

- [content/agents](/c:/dev/Labs/awesome-ai-agent-skills/content/agents)
- [content/prompts](/c:/dev/Labs/awesome-ai-agent-skills/content/prompts)
- [content/instructions](/c:/dev/Labs/awesome-ai-agent-skills/content/instructions)
- [content/skills](/c:/dev/Labs/awesome-ai-agent-skills/content/skills)

They do not need to be moved under `app` or `public` to make the site work.

Instead, the homepage indexes them at build time and links every asset back to GitHub. That gives you both outcomes you wanted:

- the Next.js application keeps a clean, stable runtime structure
- visitors can open the latest source files directly from GitHub instead of relying on copied static snapshots

Recommended conventions:

- keep agent definitions in `content/agents/*.md`
- keep reusable prompts in `content/prompts/*.prompt.md`
- keep instruction files in `content/instructions/*.instructions.md`
- keep each skill in its own folder as `content/skills/<skill-name>/SKILL.md`

Naming consistency pass applied:

- agent filenames now follow lowercase kebab-case
- chat mode files stay explicit with `.chatmode.md`
- prompt filenames already follow lowercase kebab-case with `.prompt.md`
- skill folders remain lowercase kebab-case with `SKILL.md` as the entrypoint

## Metadata And Enrichment Flow

There are two data layers in the project:

1. [data/repos.json](/c:/dev/Labs/awesome-ai-agent-skills/data/repos.json)
   This is the curated, hand-shaped showcase dataset currently used by the UI.

2. [data/repos.generated.json](/c:/dev/Labs/awesome-ai-agent-skills/data/repos.generated.json)
   This is the generated output from the GitHub GraphQL sync starter.

The intended workflow is:

1. Fetch repositories from GitHub using [scripts/github-sync.ts](/c:/dev/Labs/awesome-ai-agent-skills/scripts/github-sync.ts)
2. Generate AI summaries, categories, tags, and scores
3. Merge the enriched output into the curated data model
4. Rebuild and deploy the site automatically

At the moment, the AI enrichment step is still a placeholder so the project can stay simple while the frontend and automation foundation stabilize.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The site uses static export, so it is suitable for zero-backend hosting.

## Sync GitHub Metadata

The starter script pulls starred repositories through the GitHub GraphQL API.

```bash
set GITHUB_TOKEN=your_token_here
set GITHUB_LOGIN=3tallah
npm run sync:github
```

This writes a generated dataset to [data/repos.generated.json](/c:/dev/Labs/awesome-ai-agent-skills/data/repos.generated.json).

## Deployment

The repository includes:

- [sync.yml](/c:/dev/Labs/awesome-ai-agent-skills/.github/workflows/sync.yml) for scheduled metadata refresh
- [deploy.yml](/c:/dev/Labs/awesome-ai-agent-skills/.github/workflows/deploy.yml) for GitHub Pages publishing

GitHub Pages is the default deployment target because it is free, simple, and works well for a repository-scoped static portal.

## GitHub Pages Status

GitHub Pages is enabled and configured to deploy from GitHub Actions.

Deployment pipeline:

1. Changes are pushed to `main`.
2. [deploy.yml](/c:/dev/Labs/awesome-ai-agent-skills/.github/workflows/deploy.yml) builds and exports the Next.js site.
3. The generated static site is published via GitHub Pages.

## Custom Domain

Custom domain support is ready conceptually, but the repository cannot be configured for a custom domain until you provide the exact domain name.

Once you decide the domain, the next changes are:

1. add `public/CNAME`
2. update DNS to GitHub Pages
3. confirm HTTPS issuance in GitHub Pages settings

## Who This Is For

This reboot is useful for:

- engineers exploring AI agent ecosystems
- developers looking for reusable skills and MCP servers
- Azure practitioners who want a curated AI project hub
- speakers and community leaders building public technical resources
- consultants who need a visible, high-quality showcase of AI delivery patterns

## Recommended Next Enhancements

- integrate GitHub Models, Azure OpenAI, or OpenAI for enrichment
- add Fuse.js-based fuzzy search
- add a detail page per repository
- add filters for frameworks, difficulty, and trending signals
- add curated learning paths and featured journeys

## Contributing

Contributions are welcome for both the portal experience and the asset library.

Primary contribution areas:

- add or improve agents under [content/agents](/c:/dev/Labs/awesome-ai-agent-skills/content/agents)
- add or improve prompts under [content/prompts](/c:/dev/Labs/awesome-ai-agent-skills/content/prompts)
- add or improve instructions under [content/instructions](/c:/dev/Labs/awesome-ai-agent-skills/content/instructions)
- add or improve skills under [content/skills](/c:/dev/Labs/awesome-ai-agent-skills/content/skills)
- improve UI, filtering, and metadata enrichment in the Next.js app

Contribution workflow:

1. Fork the repository.
2. Create a feature branch from `main`.
3. Keep naming consistent:
	- agents: `kebab-case.agent.md` or `kebab-case.chatmode.md`
	- prompts: `kebab-case.prompt.md`
	- instructions: `kebab-case.instructions.md`
	- skills: `content/skills/<kebab-case>/SKILL.md`
4. Run local checks:
	- `npm run dev` for local verification
	- `npm run build` for production/static export validation
5. Open a pull request with:
	- a clear summary of the change
	- affected paths
	- screenshots for UI changes (if applicable)
	- rationale for new/updated agent, prompt, instruction, or skill artifacts

General contribution guidance:

- keep assets practical and implementation-ready
- avoid duplicate or overlapping files when a single reusable asset can be improved instead
- preserve ASCII-only content where possible for consistency across tooling
- keep summaries concise and capability-focused so the root inventory remains readable

## Summary

This reboot is meant to evolve a personal starred list into a curated AI engineering discovery platform.

Its real value is not only the frontend. Its real value comes from enrichment, categorization, scoring, and learning-oriented navigation that help people understand which repositories matter and why.