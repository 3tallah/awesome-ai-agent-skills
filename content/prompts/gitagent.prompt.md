---
mode: "agent"
description: "Scaffold, validate, or export a GitAgent-based portable agent definition."
---

Use the `GitAgent Architect` agent and the `gitagent` skill for this task.

Inputs:
- Goal: ${input:goal:scaffold, validate, export, import, or redesign}
- Template level: ${input:templateLevel:minimal, standard, or full}
- Agent name: ${input:agentName:Name of the agent}
- Agent purpose: ${input:agentPurpose:Short description of what the agent should do}
- Target export: ${input:targetExport:system-prompt, claude-code, openai, crewai, cursor, opencode, gemini, openclaw, nanobot, github, git, or none}
- Compliance needs: ${input:complianceNeeds:none, segregation-of-duties, financial-regulatory, or custom policy}
- Repo path: ${input:repoPath:Path to the target repository or agent folder}

Instructions:
1. Use the `gitagent` skill.
2. Start with the minimum required GitAgent files unless the chosen template level requires more.
3. Clearly separate:
   - required files
   - recommended files
   - optional files
4. If the goal is `scaffold`, create a GitAgent-oriented structure appropriate to the chosen template level.
5. If the goal is `validate`, focus on manifest quality, structure correctness, and whether optional files actually add value.
6. If the goal is `export`, prepare the structure so it maps cleanly to the selected target adapter.
7. If the goal is `import`, preserve the identity layer and note what remains runtime-specific.
8. Only add compliance and segregation-of-duties artifacts when the user has actually requested them.
9. End with:
   - current structure status
   - missing files or risks
   - next exact command or file change