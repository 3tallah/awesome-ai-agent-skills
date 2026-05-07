---
name: browsermcp-mcp
description: >-
  Install and configure Browser MCP so an agent can control a real browser tab through
  MCP server and extension integration in VS Code workflows. Use this skill when users
  ask to set up browsermcp, connect extension transport, or automate
  already-authenticated browser sessions via MCP. Triggers include: install browsermcp,
  configure @browsermcp/mcp, automate current tab, and Browser MCP setup. Do NOT use
  for non-MCP browser scripting, headless-only automation without extension context, or
  account takeover style automation.
license: Proprietary. See repository terms.
compatibility: Requires local filesystem access; tool/runtime requirements vary by skill.
---

# BrowserMCP Skill

## Purpose

Set up Browser MCP as a workspace skill so AI clients such as VS Code, Claude Desktop, Cursor, and Windsurf can automate your existing browser tab through MCP.

## Important Constraint

The GitHub repository contains the core code, but the project documentation states that the repository cannot currently be built on its own because it depends on internal monorepo packages. For normal use, install the published MCP server package instead of trying to build the repository source.

## What Browser MCP Does

Browser MCP uses:
- an MCP server running locally via Node.js
- a browser extension that connects the currently active tab

This allows automation against your real browser profile, including your existing logged-in sessions.

## Prerequisites

- Node.js installed
- A Chromium-based browser that can install the Browser MCP extension
- An MCP-capable client such as VS Code, Claude Desktop, Cursor, or Windsurf

## MCP Server Configuration

Add this MCP server configuration to your client:

```json
{
  "mcpServers": {
    "browsermcp": {
      "command": "npx",
      "args": ["@browsermcp/mcp@latest"]
    }
  }
}
```

## VS Code Usage

If you are wiring this into a VS Code MCP configuration, use the same server definition:

```json
{
  "mcpServers": {
    "browsermcp": {
      "command": "npx",
      "args": ["@browsermcp/mcp@latest"]
    }
  }
}
```

## Extension Setup

1. Install the Browser MCP browser extension from the Browser MCP install page.
2. Pin the extension in the browser toolbar.
3. Open the extension popup.
4. Click `Connect` to attach the current tab to the MCP server.

All browser actions are performed on the connected tab.

## Quick Test

Once the server and extension are connected, test with a prompt like:

```text
Go to google.com and search for "Browser MCP"
```

## Operational Notes

- Browser MCP runs locally, so browser activity stays on your machine.
- It uses your real browser profile, which helps with authenticated sessions and reduces basic bot-detection issues.
- Because actions happen on a connected tab, you must connect the extension before issuing browser automation requests.

## Sources

- Repository: https://github.com/browsermcp/mcp
- Documentation: https://docs.browsermcp.io/
- Setup server: https://docs.browsermcp.io/setup-server
- Setup extension: https://docs.browsermcp.io/setup-extension
- Start automating: https://docs.browsermcp.io/start-automating
