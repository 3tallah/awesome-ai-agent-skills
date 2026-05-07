---
name: azure-well-architected-reliability-assessment
description: >-
  Assess Azure workloads against Well-Architected Reliability guidance using WARA
  collection, analysis, and action-plan generation for resiliency, availability, and
  recovery posture. Use this skill when users ask to run WARA, evaluate reliability
  risks, prepare reliability findings, or create remediation plans for Azure
  subscriptions. Triggers include: WARA report, reliability assessment, resiliency
  gaps, and recovery risk analysis. Do NOT use for cost-only optimization, non-Azure
  architecture reviews, or unrelated compliance documentation.
license: Proprietary. See repository terms.
compatibility: Requires local filesystem access; tool/runtime requirements vary by skill.
---

# Azure Well-Architected Reliability Assessment Skill

## Purpose

Use this skill to guide users through Microsoft WARA (Well-Architected Reliability Assessment) workflow for Azure workloads.

WARA helps identify reliability, resiliency, availability, and recovery risks across scoped Azure resources and produces action-plan outputs.

## When To Use

Use this skill when the user wants to:
- run a reliability assessment for one or more Azure subscriptions
- collect WARA telemetry and workload scope data
- analyze WARA JSON output into an expert-analysis workbook
- generate executive-ready Excel and PowerPoint reliability reports
- build a reliability remediation backlog aligned to Azure Well-Architected guidance

## Core Workflow

WARA follows a 3-step flow:

1. `Start-WARACollector`
2. `Start-WARAAnalyzer`
3. `Start-WARAReport`

Typical sequence:

```powershell
Install-Module WARA
Import-Module WARA

Start-WARACollector -TenantID "<tenant-guid>" -SubscriptionIds "/subscriptions/<subscription-guid>"
Start-WARAAnalyzer -JSONFile "C:\WARA\WARA_File_yyyy-mm-dd_hh_mm.json"
Start-WARAReport -ExpertAnalysisFile "C:\WARA\Expert-Analysis-v1-yyyy-mm-dd-hh-mm.xlsx"
```

## Requirements

Collector-side baseline requirements from the repository documentation:
- PowerShell 7.4
- Azure PowerShell `Az` module
- `Az.Accounts` module 3.0+
- `Az.ResourceGraph` module 1.0+

Installation examples:

```powershell
Install-Module -Name Az
Install-Module -Name Az.Accounts
Install-Module -Name Az.ResourceGraph
```

## Report Generation Warning

`Start-WARAReport` has desktop application dependency constraints:
- run on a Windows machine
- Microsoft PowerPoint must be installed
- close all Excel and PowerPoint instances before running

## Scoping Patterns

Common collector scopes include:
- specific subscription
- multiple subscriptions
- subscription plus resource group
- scoped collection using tag filters
- config-file-driven scope

Use the least broad scope that satisfies the assessment goal.

## Output Behavior

Output files are generated in the current working directory where each cmdlet is executed.

Practical implication:
- run commands from a dedicated working folder such as `C:\WARA` to keep artifacts organized

## Recommended Execution Guidance

1. Prepare a dedicated working directory.
2. Install and import `WARA` module.
3. Run collector with explicit tenant and scope.
4. Validate generated JSON file.
5. Run analyzer to create the action plan workbook.
6. Review and enrich expert analysis where needed.
7. Run report generation on Windows with PowerPoint.
8. Share Excel and PowerPoint outputs with workload owners and create remediation actions.

## Troubleshooting Checklist

- Module import failure: verify PowerShell version and installed module versions.
- Collector auth or scope issues: verify tenant, subscription IDs, and sign-in context.
- Analyzer input failure: verify JSON file path and filename.
- Report generation failure: verify Windows + PowerPoint requirement and close Office apps.
- Output file confusion: confirm current directory before running each step.

## Source and Canonical Docs

- Repository: https://github.com/Azure/Well-Architected-Reliability-Assessment
- README: https://raw.githubusercontent.com/Azure/Well-Architected-Reliability-Assessment/main/README.md
- Latest WARA tool docs: https://azure.github.io/Azure-Proactive-Resiliency-Library-v2/tools/
