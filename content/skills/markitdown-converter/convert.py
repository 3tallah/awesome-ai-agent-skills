#!/usr/bin/env python3
"""Preconfigured MarkItDown conversion runner for the markitdown-converter skill."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

try:
    import yaml
except ImportError as exc:
    raise SystemExit(
        "Missing dependency: pyyaml. Install with: pip install pyyaml"
    ) from exc

try:
    from markitdown import MarkItDown
except ImportError as exc:
    raise SystemExit(
        "Missing dependency: markitdown. Install with: pip install 'markitdown[all]'"
    ) from exc


SUPPORTED_EXTENSIONS = {
    ".pdf",
    ".docx",
    ".pptx",
    ".xlsx",
    ".xls",
    ".html",
    ".htm",
    ".csv",
    ".json",
    ".xml",
    ".epub",
    ".zip",
    ".msg",
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".tiff",
    ".wav",
    ".mp3",
}


def load_config(config_path: Path) -> dict[str, Any]:
    if not config_path.exists():
        raise SystemExit(f"Config not found: {config_path}")

    raw = yaml.safe_load(config_path.read_text(encoding="utf-8"))
    if not isinstance(raw, dict):
        raise SystemExit("Invalid config format: expected YAML object at root")
    return raw


def create_client(config: dict[str, Any]) -> MarkItDown:
    kwargs: dict[str, Any] = {
        "enable_plugins": bool(config.get("enable_plugins", False))
    }

    endpoint = config.get("docintel_endpoint")
    if endpoint:
        kwargs["docintel_endpoint"] = str(endpoint)

    return MarkItDown(**kwargs)


def is_supported(path: Path, allowed: set[str]) -> bool:
    return path.suffix.lower() in allowed


def resolve_allowed_extensions(config: dict[str, Any]) -> set[str]:
    cfg_ext = config.get("allowed_extensions")
    if not cfg_ext:
        return set(SUPPORTED_EXTENSIONS)

    parsed: set[str] = set()
    for item in cfg_ext:
        if not isinstance(item, str):
            continue
        ext = item.strip().lower()
        if not ext:
            continue
        parsed.add(ext if ext.startswith(".") else f".{ext}")
    return parsed or set(SUPPORTED_EXTENSIONS)


def convert_file(
    client: MarkItDown,
    input_file: Path,
    output_dir: Path,
    overwrite: bool,
    dry_run: bool,
) -> dict[str, Any]:
    output_file = output_dir / f"{input_file.stem}.md"

    if output_file.exists() and not overwrite:
        return {
            "source": str(input_file),
            "output": str(output_file),
            "status": "skipped",
            "reason": "output_exists",
        }

    if dry_run:
        return {
            "source": str(input_file),
            "output": str(output_file),
            "status": "dry-run",
        }

    result = client.convert(str(input_file))
    output_file.parent.mkdir(parents=True, exist_ok=True)
    output_file.write_text(result.text_content, encoding="utf-8")

    return {
        "source": str(input_file),
        "output": str(output_file),
        "status": "converted",
        "characters": len(result.text_content),
    }


def collect_inputs(
    input_arg: str | None,
    batch: bool,
    input_dir: Path,
    allowed_extensions: set[str],
) -> list[Path]:
    if input_arg:
        input_path = Path(input_arg).expanduser().resolve()
        if not input_path.exists() or not input_path.is_file():
            raise SystemExit(f"Input file not found: {input_path}")
        return [input_path]

    if not batch:
        raise SystemExit("Provide --input <file> or use --batch")

    if not input_dir.exists() or not input_dir.is_dir():
        raise SystemExit(f"Input directory not found: {input_dir}")

    files = []
    for path in sorted(input_dir.iterdir()):
        if path.is_file() and is_supported(path, allowed_extensions):
            files.append(path.resolve())
    return files


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Preconfigured MarkItDown conversion runner"
    )
    parser.add_argument(
        "--config",
        default="doc_config.yml",
        help="Path to YAML config file",
    )
    parser.add_argument("--input", help="Absolute or relative input file path")
    parser.add_argument(
        "--output-dir",
        help="Override output directory from config",
    )
    parser.add_argument(
        "--batch",
        action="store_true",
        help="Convert all supported files from input directory in config",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show planned outputs without writing files",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    config_path = Path(args.config).expanduser().resolve()
    config = load_config(config_path)

    input_dir = Path(config.get("input_dir", "./input")).expanduser().resolve()
    output_dir = (
        Path(args.output_dir).expanduser().resolve()
        if args.output_dir
        else Path(config.get("output_dir", "./output")).expanduser().resolve()
    )

    overwrite = bool(config.get("overwrite", False))
    allowed_extensions = resolve_allowed_extensions(config)
    inputs = collect_inputs(args.input, args.batch, input_dir, allowed_extensions)

    if not inputs:
        raise SystemExit("No matching input files found")

    client = create_client(config)

    summary: dict[str, Any] = {
        "config": str(config_path),
        "mode": "batch" if args.batch and not args.input else "single",
        "output_dir": str(output_dir),
        "files_total": len(inputs),
        "results": [],
    }

    for input_file in inputs:
        if not is_supported(input_file, allowed_extensions):
            summary["results"].append(
                {
                    "source": str(input_file),
                    "status": "skipped",
                    "reason": "unsupported_extension",
                }
            )
            continue

        try:
            result = convert_file(
                client=client,
                input_file=input_file,
                output_dir=output_dir,
                overwrite=overwrite,
                dry_run=args.dry_run,
            )
            summary["results"].append(result)
        except Exception as exc:  # noqa: BLE001
            summary["results"].append(
                {
                    "source": str(input_file),
                    "status": "failed",
                    "reason": str(exc),
                }
            )

    converted = sum(1 for r in summary["results"] if r.get("status") == "converted")
    failed = sum(1 for r in summary["results"] if r.get("status") == "failed")
    summary["files_converted"] = converted
    summary["files_failed"] = failed

    print(json.dumps(summary, indent=2))
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
