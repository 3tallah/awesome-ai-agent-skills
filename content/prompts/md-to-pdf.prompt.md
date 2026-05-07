---
mode: "agent"
description: "Convert one Markdown file or a merged Markdown pack to PDF using the md-to-pdf skill."
---

Use the `md-to-pdf` skill for this task.

Inputs:
- Source markdown path: ${input:sourceMdPath:Path to .md file}
- Destination PDF path: ${input:destPdfPath:Path to .pdf output}
- Optional stylesheet path: ${input:stylesheetPath:Optional CSS file path (or leave empty)}

Instructions:
1. Validate that the source markdown path exists.
2. Build the conversion command using `npx md-to-pdf`.
3. If stylesheet is provided, include `--stylesheet`.
4. Use `--dest` for output path.
5. Return:
   - command used
   - source file
   - output file
   - any notes on formatting caveats

Command templates:

Without stylesheet:
```bash
npx md-to-pdf "${input:sourceMdPath}" --dest "${input:destPdfPath}"
```

With stylesheet:
```bash
npx md-to-pdf "${input:sourceMdPath}" --stylesheet "${input:stylesheetPath}" --dest "${input:destPdfPath}"
```
