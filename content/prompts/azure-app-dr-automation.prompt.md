---
mode: "agent"
description: "Run Azure App DR Automation skill for backup, restore, or DR readiness review across Azure application services."
---

Use the `azure-app-dr-automation` skill for this task.

Inputs:
- Operation: ${input:operation:backup, restore, or dr-readiness-review}
- Module: ${input:module:AISearch, APIM, AutomationAccounts, FunctionApps, LogicApps, or WebApps}
- Source subscription ID: ${input:sourceSubscriptionId:Azure source subscription ID}
- Target subscription ID: ${input:targetSubscriptionId:Optional for cross-subscription restore}
- Source region: ${input:sourceRegion:Primary Azure region}
- Target region: ${input:targetRegion:Optional DR or failover region}
- Resource group: ${input:resourceGroup:Azure resource group name}
- Service name: ${input:serviceName:App or service name}
- Storage account: ${input:storageAccount:Blob storage account for DR artifacts}
- Blob container: ${input:blobContainer:Blob container name}
- Additional context: ${input:notes:Optional constraints, assumptions, or restore goals}

Instructions:
1. Use the `azure-app-dr-automation` skill.
2. Identify the correct module folder first and inspect its module-specific guide before suggesting concrete commands.
3. Validate prerequisites before any execution guidance:
   - Azure CLI installed
   - Azure PowerShell `Az` module installed
   - `az login` completed
   - `Connect-AzAccount` completed
   - Blob storage target exists
   - executing identity has `Storage Blob Data Contributor`
4. Treat the repository content as proof-of-concept guidance, not production-ready automation by default.
5. Clearly separate:
   - repository workflow guidance
   - official Azure platform prerequisites and limits
6. If the request is `backup`, provide the safest backup flow and required validations.
7. If the request is `restore`, call out target-subscription or target-region risks before restore steps.
8. If the request is `dr-readiness-review`, evaluate gaps, prerequisites, permissions, storage design, and operational risks.
9. Do not invent script names or parameters if they are not confirmed in the module documentation.
10. End with:
   - status summary
   - key assumptions
   - main risks
   - next exact action