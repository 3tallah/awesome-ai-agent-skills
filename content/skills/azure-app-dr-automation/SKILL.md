---
name: azure-app-dr-automation
description: >-
  Run Azure application disaster recovery backup and restore workflows for Function
  Apps, Logic Apps, Web Apps, APIM, Azure AI Search, and related services with
  cross-region or cross-subscription restore planning. Use this skill when users
  request DR readiness, backup orchestration, restore execution, DR runbooks, or
  recovery verification in Azure app platforms. Triggers include: backup function app,
  restore logic app, APIM DR, cross-region restore, and app DR automation. Do NOT use
  for non-Azure DR tooling, generic data backup without Azure service context, or
  unrelated architecture brainstorming.
license: Proprietary. See repository terms.
compatibility: Requires local filesystem access; tool/runtime requirements vary by skill.
---

# Azure App DR Automation Skill

## Purpose

Use the `utkucgln/azure-app-dr-automation` repository as a reusable workflow reference for Azure application disaster recovery backup and restore operations.

This is best packaged as a skill rather than an agent because the repository provides a specific, modular operational workflow with concrete backup and restore scripts, not a broad autonomous persona.

## What This Toolkit Covers

The repository provides PowerShell-based DR backup and restore workflows for:
- Azure AI Search
- API Management
- Azure Automation Accounts
- Azure Function Apps
- Logic Apps
- Azure Web Apps

Backups are stored in Azure Blob Storage and can be restored into another subscription or region during failover.

## Important Safety Note

The repository README explicitly describes the content as proof-of-concept material. Treat it as a starting point, not production-ready guidance. Before recommending or running any script:
- validate in non-production first
- review permissions and security controls
- confirm restore behavior against the target environment
- align with the organization’s change and DR governance

## Official Prerequisites

Before using this toolkit, verify these prerequisites:
- Azure CLI installed
- Azure PowerShell `Az` module installed
- authenticated Azure session with `az login`
- authenticated Azure PowerShell session with `Connect-AzAccount`
- Azure Storage account and Blob container for DR artifacts
- `Storage Blob Data Contributor` on the target container for the executing identity

Microsoft Learn validation:
- Azure CLI install guidance: https://learn.microsoft.com/cli/azure/install-azure-cli
- Azure PowerShell install guidance: https://learn.microsoft.com/powershell/azure/install-azure-powershell

## Core Characteristics

The toolkit follows these patterns:
- backup artifacts are stored in Blob Storage using timestamped paths
- restore can target another subscription or region
- scripts are designed to be schedulable for ongoing DR sync
- backup scripts emit CSV reporting artifacts
- restore operations create or update resources

## Repository Structure

```text
AISearch/
APIM/
AutomationAccounts/
FunctionApps/
LogicApps/
WebApps/
```

## Recommended Usage Pattern

When using this skill, follow this order:

1. Identify the Azure service module involved.
2. Read the module-specific guide in that folder before recommending commands.
3. Confirm prerequisites, identities, storage account, container, and source/target subscriptions.
4. Run backup first and verify artifacts landed in Blob Storage.
5. Use restore only against the intended target subscription or region.
6. Report assumptions, risks, and any service-specific gaps.

## Module Guidance

### Function Apps

Use this module when the task involves:
- full-subscription Function App DR backup
- single Function App backup or restore
- preserving code ZIPs, configuration, keys, ARM templates, and RBAC metadata

### Web Apps

Use this module when the task involves:
- single Web App backup or restore
- site content backup via VFS or Kudu ZIP
- app settings, connection strings, site config, or deployment slot recovery

### Logic Apps

Use this module when the task involves:
- Logic Apps Consumption or Standard backup
- workflow definitions and parameters
- API connections, managed identity settings, and integration account references

### APIM

Use this module when the task involves:
- API Management configuration extraction
- ApiOps-based backup and restore workflows

### Azure AI Search

Use this module when the task involves:
- search index and skillset backup
- indexer, synonym map, and document export
- remapping data source connection strings during restore

### Automation Accounts

Use this module when the task involves:
- backup and restore of runbooks, schedules, variables, modules, Python packages, credentials, certificates, or connections

## What To Ask For Before Execution

Before giving execution guidance, gather:
- source subscription ID
- target subscription ID if failover is cross-subscription
- source and target regions
- resource group names
- storage account and container name
- service type and service name
- whether the task is backup, restore, or DR readiness review

## How To Use This Skill

Invoke this skill for requests like:
- back up all Function Apps for DR
- restore a Web App to another region
- create a DR runbook for Logic Apps
- review this repo’s APIM DR process
- adapt Azure App DR Automation scripts for my subscription

## Execution Rules

When using this skill:
- do not invent script names or parameters if they are not confirmed in the module docs
- inspect the relevant module folder before proposing concrete commands
- separate repository guidance from official Azure platform guidance
- call out where the repository is using POC patterns versus Microsoft-supported product capabilities

## Source

- Repository: https://github.com/utkucgln/azure-app-dr-automation
- README: https://raw.githubusercontent.com/utkucgln/azure-app-dr-automation/main/README.md