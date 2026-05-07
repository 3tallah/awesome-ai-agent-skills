---
name: cv-builder
description: >-
  Tailor Mahmoud Atallah CV outputs and resume automation workflows including ATS fit
  checks, role-targeted variants, interview prep artifacts, and related career-ops
  content generation. Use this skill when users ask to customize CVs per role/company,
  compare resume to job description, produce outreach variants, or improve ATS
  compatibility. Triggers include: tailor CV, resume-vs-JD, ATS resume, interview prep
  from CV, and cv-builder enhancement. Do NOT use for unrelated personal branding
  thought pieces, non-resume legal documents, or generic HR policy drafting.
license: Proprietary. See repository terms.
compatibility: Requires local filesystem access; tool/runtime requirements vary by skill.
---

# CV Builder

This skill covers the two real workflows in this repository:

1. Tailored CV generation with `python-docx`
2. Resume-to-job-description analysis with the Streamlit ATS app

It also covers planning and implementing selected future enhancements inspired by `santifer/career-ops`, but those enhancements must be treated as new features unless they already exist in this repository.

## Repository Map

- `src/me.3tallah.com.txt`: Best plain-text source for the candidate profile, achievements, and wording.
- `src/me.3tallah.com.html`: Rich HTML version of the same profile content.
- `src/build-my-cv.py`: Existing DOCX generator pattern for a tailored CV.
- `src/g42.py`: Second tailored DOCX generator pattern.
- `Applicant_Tracking_System_ATS_using_LLM/app.py`: Streamlit ATS reviewer using Gemini.
- `Applicant_Tracking_System_ATS_using_LLM/requirements.txt`: ATS app dependencies.

## CV Tailoring Workflow

Use this flow when the user wants a company-specific CV, a revised resume builder script, or a refreshed DOCX output.

1. Read `src/me.3tallah.com.txt` first. Treat it as the source of truth unless the user gives newer facts.
2. Read the closest existing generator in `src/` and reuse its layout before inventing a new format.
3. Tailor only the wording, summary, competencies, and experience bullets that are relevant to the target role.
4. Do not fabricate employers, dates, certifications, technologies, or outcomes.
5. Prefer measurable achievements and delivery language when the source material supports it.
6. Keep the existing document structure unless the user explicitly asks for a redesign.

## CV Formatting Guardrails

Match the repository's current output style unless asked otherwise:

- Use `python-docx`.
- Keep the centered name, role title, and contact block.
- Keep sectioned headings for summary, competencies, certifications, experience, education, and languages.
- Preserve concise bullets over long paragraphs.
- Save role-specific outputs with clear names in `src/`.

## ATS App Workflow

Use this flow when the user wants resume matching, keyword gap analysis, or prompt improvements for the app.

1. Work in `Applicant_Tracking_System_ATS_using_LLM/app.py`.
2. Preserve the two main user actions: resume review and percentage match.
3. Keep PDF extraction isolated from prompt generation.
4. Never hardcode secrets. The app should continue to use `GOOGLE_API_KEY` from environment variables.
5. If prompts are updated, keep them grounded in the uploaded resume and the supplied job description.
6. Preserve basic validation so the app does not run without both a resume and a job description.

## Additional Features Inspired By Career-Ops

Use this section when the user wants to evolve `cv-builder` beyond simple CV generation and ATS matching.

Treat the following as optional extensions to build deliberately, not as existing behavior:

- Structured job-fit evaluation with weighted dimensions instead of only a plain response.
- Tailored PDF generation per job description, especially ATS-oriented output paths.
- Missing keyword and coverage-gap analysis normalized into reusable sections.
- Interview preparation outputs such as STAR story suggestions, reflection notes, and likely behavioral question support.
- Networking or outreach drafts, for example short LinkedIn or recruiter contact messages.
- Application tracker artifacts, such as CSV, TSV, JSON, or markdown tables for application status.
- Batch review of multiple job descriptions or URLs.
- Single pipeline flow from job description intake to evaluation, tailored CV output, and tracker update.

## Career-Ops-Informed Design Guidance

When implementing any of the above, follow these constraints derived from `santifer/career-ops`:

1. Keep a human in the loop. The system may recommend and draft, but the user should always review final outputs before submission.
2. Do not present scoring as objective truth. Treat it as decision support.
3. Keep personal data local by default and avoid unnecessary persistence of resume or job data.
4. Separate current-source resume content, evaluation outputs, and generated artifacts into distinct files or folders.
5. Prefer explicit pipeline steps: intake, evaluate, tailor, export, track.
6. If batch processing is added, make parallelism optional and keep intermediate outputs inspectable.
7. If job URL ingestion is added later, comply with site terms and avoid building spammy automation.

## Recommended Feature Mapping For This Repo

If the user asks to add career-ops-like capability to `cv-builder`, prefer this mapping:

- `src/` or a new `templates/` folder for resume source transformations and export templates.
- `Applicant_Tracking_System_ATS_using_LLM/` for JD comparison, scoring, and interactive review.
- A new `data/` or `output/` folder for generated reports, trackers, and exported PDFs if the repo grows.
- A new configuration file only when repeated targeting logic is needed across companies or job families.

## Working Conventions

- Prefer editing text sources and Python generators over editing generated `.docx` or `.pdf` files directly.
- If a new tailored CV is needed, duplicate the nearest matching generator and rename the output file clearly.
- When the user asks for ATS improvements, keep changes minimal and testable.
- When the user asks for career-ops-style additions, distinguish clearly between planning a new feature and modifying existing behavior.
- If the repository gains a better master resume source later, update this skill to point to that file first.

## Useful Commands

Run the ATS app:

```powershell
cd c:\dev\cv-builder\Applicant_Tracking_System_ATS_using_LLM
pip install -r requirements.txt
streamlit run app.py
```

Run a CV generator:

```powershell
cd c:\dev\cv-builder\src
python .\build-my-cv.py
python .\g42.py
```

## What This Skill Should Not Do

- Do not invent resume content to improve ATS scores.
- Do not overwrite unrelated generated CV files unless the user asks.
- Do not treat the ATS score as authoritative hiring guidance; it is only a screening aid.
- Do not auto-submit job applications or encourage spam-style application behavior.