---
mode: "agent"
description: "Use the html-to-pptx-hybrid skill to convert HTML into editable PPTX with structured mode and smart fidelity fallback."
---

Use the `html-to-pptx-hybrid` skill for this task.

Inputs:
- HTML input (string or URL): ${input:htmlInput:Paste HTML content or HTTP/HTTPS URL}
- Preferred mode: ${input:mode:structured or fidelity}
- Theme: ${input:theme:corporate or modern}
- Slide size: ${input:slideSize:auto, 16:9, or 4:3}
- Optional root selector: ${input:rootSelector:Optional CSS selector for the slide root (or leave empty)}
- Output path: ${input:outputPath:Path to output .pptx file}

Execution requirements:
1. If `htmlInput` is a URL, fetch HTML first.
2. Default to `structured` mode unless user forces `fidelity`.
3. In `fidelity` mode, default `slideSize` to `auto` so the exported PowerPoint page matches the actual rendered HTML slide root.
4. In `structured` mode, map headings, paragraphs, bullet lists, tables, and images using PptxGenJS objects.
5. If complexity is high or structured conversion fails, fallback to `fidelity` mode using dom-to-pptx.
6. Generate editable `.pptx` output at `outputPath`.
7. Return:
   - mode used
   - fallback reason (if any)
  - measured size used when `auto` applies
   - output path
   - command(s) run

Expected API shape:
```ts
convertHtmlToPpt({
  html,
  mode,
  options: {
    theme,
    slideSize,
    rootSelector,
  },
}): Promise<Buffer>
```
