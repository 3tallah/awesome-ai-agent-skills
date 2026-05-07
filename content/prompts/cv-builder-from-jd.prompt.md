---
agent: "agent"
description: "Generate a tailored CV from a source job description using the cv-builder skill and the existing cv-builder Python scripts."
---

Use the `cv-builder` skill for this task.

Inputs:
- Job description source: ${input:jobDescriptionSource:Paste the full job description, or provide a file path or URL}
- Target company: ${input:targetCompany:Company name from the job description}
- Target role: ${input:targetRole:Role title from the job description}
- Repo path: ${input:repoPath:c:\dev\cv-builder}
- New script name: ${input:newScriptName:Example: src\maersk.py or src\head_of_ai_delivery.py}
- New DOCX output name: ${input:newDocxName:Example: Mahmoud_Atallah_Maersk_CV.docx}

Instructions:
1. Read the `cv-builder` skill before making changes.
2. Interpret `Job description source` as the primary source. If it is a file path or URL, read it first. If it is pasted text, analyze that text directly.
3. If the source is a LinkedIn or other protected job URL and the full description is not accessible, do not guess. Use only the visible metadata, state that the description is incomplete, and ask for the pasted job description or an exported text copy before tailoring deeply.
4. Extract the role title, seniority, domain, core responsibilities, must-have skills, preferred skills, business language, and recurring keywords from the job description.
5. Read the source profile content in `src/me.3tallah.com.txt` first, then inspect the existing generator scripts in `src/`.
6. Choose the closest existing generator script as the base pattern. Reuse its layout and code structure instead of inventing a new format.
7. Create a new Python generator script at the requested `New script name` using the existing scripts as the implementation pattern.
8. Tailor the CV content so it aligns with the target role while staying truthful to the source material. Adjust only relevant summary text, competencies, certifications ordering, and experience bullets.
9. Do not fabricate experience, dates, employers, certifications, metrics, or technologies that are not supported by the source profile.
10. Keep the output style consistent with the current repository conventions: `python-docx`, centered header, section headings, concise bullets, and a saved DOCX file.
11. Set the generated script to save the tailored CV using `New DOCX output name`.
12. If the script can be run safely, execute it and confirm whether the DOCX file was generated successfully.
13. If the job description suggests ATS-heavy language, incorporate relevant truthful keywords naturally into the summary and bullets without keyword stuffing.
14. If the job description is weak, incomplete, or ambiguous, state the gaps briefly and make the narrowest safe tailoring choices.
15. Treat any mention of `TV` as `CV` unless the user explicitly says otherwise.
16. End with:
    - the new script path
    - the generated DOCX path or generation status
    - the base script you reused
    - any important gaps between the job description and the source profile