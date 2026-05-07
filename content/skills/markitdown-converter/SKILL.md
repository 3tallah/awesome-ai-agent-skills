---
name: markitdown-converter
description: >-
  Convert local files and URLs to Markdown using Microsoft MarkItDown with a predictable
  validation, conversion, and reporting flow. Use this skill when users ask to convert
  PDF or DOCX to markdown, and also for PPTX, XLSX, HTML, images, audio, ZIP, EPUB,
  or text-based structured files. Triggers include: pdf to md, docx to md, document to
  markdown, markitdown conversion, and extract markdown from file. Do NOT use for
  semantic rewriting of extracted content, business interpretation, or non-conversion tasks.
license: Proprietary. See repository terms.
compatibility: Requires local filesystem access and Python environment with MarkItDown.
---

# MarkItDown Converter Skill

## Purpose

Provide a skills-first conversion workflow for document-to-Markdown operations with Microsoft MarkItDown.

This skill is preconfigured with local runner assets so agents do not need to repeat manual setup steps each time:
- `c:/dev/.github/skills/markitdown-converter/convert.py`
- `c:/dev/.github/skills/markitdown-converter/doc_config.yml`

Default high-frequency path:
- PDF -> Markdown
- DOCX -> Markdown

## Prerequisites

Install MarkItDown when not already available:

```bash
pip install 'markitdown[all]'
```

Optional selective install:

```bash
pip install 'markitdown[pdf,docx,pptx,xlsx]'
```

Runner config dependency:

```bash
pip install pyyaml
```

## Supported Inputs

- Files: PDF, DOCX, PPTX, XLSX/XLS, HTML, CSV/JSON/XML, EPUB, ZIP, MSG, images, audio
- URLs: YouTube and supported remote content inputs handled by MarkItDown

## Execution Contract

1. Use the preconfigured runner (`convert.py`) with `doc_config.yml` as the default execution path.
2. Validate input path or URL.
3. Detect extension/type and confirm MarkItDown availability.
4. Convert and save output as Markdown.
5. Return structured conversion summary (JSON output from the runner).

## Preconfigured Commands (recommended)

Single file conversion:

```bash
python c:/dev/.github/skills/markitdown-converter/convert.py --config c:/dev/.github/skills/markitdown-converter/doc_config.yml --input "C:/absolute/path/file.pdf"
```

Single file with explicit output folder override:

```bash
python c:/dev/.github/skills/markitdown-converter/convert.py --config c:/dev/.github/skills/markitdown-converter/doc_config.yml --input "C:/absolute/path/file.docx" --output-dir "C:/absolute/path/output"
```

Batch conversion using configured folders:

```bash
python c:/dev/.github/skills/markitdown-converter/convert.py --config c:/dev/.github/skills/markitdown-converter/doc_config.yml --batch
```

## Standard Commands

Single file conversion:

```bash
markitdown "<absolute-input-path>" -o "<absolute-output-path>.md"
```

Alternative stdout redirect:

```bash
markitdown "<absolute-input-path>" > "<absolute-output-path>.md"
```

Python API:

```python
from markitdown import MarkItDown

md = MarkItDown(enable_plugins=False)
result = md.convert("<absolute-input-path>")
print(result.text_content)
```

Use these direct commands only when troubleshooting or when runner customization is explicitly requested.

## Batch Example

```python
import os
from markitdown import MarkItDown

md = MarkItDown(enable_plugins=False)
input_dir = "<absolute-input-dir>"
output_dir = "<absolute-output-dir>"
os.makedirs(output_dir, exist_ok=True)

for filename in os.listdir(input_dir):
    filepath = os.path.join(input_dir, filename)
    if not os.path.isfile(filepath):
        continue
    try:
        result = md.convert(filepath)
        out_file = os.path.join(output_dir, f"{os.path.splitext(filename)[0]}.md")
        with open(out_file, "w", encoding="utf-8") as f:
            f.write(result.text_content)
        print(f"Converted: {filename}")
    except Exception as e:
        print(f"Failed: {filename} - {e}")
```

## Constraints

- Do not fabricate content beyond MarkItDown extraction.
- Do not rewrite extracted markdown unless explicitly requested.
- Prefer absolute paths.
- Report success path or failure details clearly.
- Prefer the preconfigured runner and config over ad-hoc command variations.
