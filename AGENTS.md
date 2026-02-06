# AGENTS instructions

<INSTRUCTIONS>
## Skills
A skill is a set of local instructions to follow that is stored in a `SKILL.md` file. Below is the list of skills that can be used. Each entry includes a name, description, and file path so you can open the source for full instructions when using a specific skill.
### Available skills
- skill-creator: Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Codex's capabilities with specialized knowledge, workflows, or tool integrations. (file: C:/Users/William/.codex/skills/.system/skill-creator/SKILL.md)
- skill-installer: Install Codex skills into $CODEX_HOME/skills from a curated list or a GitHub repo path. Use when a user asks to list installable skills, install a curated skill, or install a skill from another repo (including private repos). (file: C:/Users/William/.codex/skills/.system/skill-installer/SKILL.md)
### How to use skills
- Discovery: The list above is the skills available in this session (name + description + file path). Skill bodies live on disk at the listed paths.
- Trigger rules: If the user names a skill (with `$SkillName` or plain text) OR the task clearly matches a skill's description shown above, you must use that skill for that turn. Multiple mentions mean use them all. Do not carry skills across turns unless re-mentioned.
- Missing/blocked: If a named skill isn't in the list or the path can't be read, say so briefly and continue with the best fallback.
- How to use a skill (progressive disclosure):
  1) After deciding to use a skill, open its `SKILL.md`. Read only enough to follow the workflow.
  2) If `SKILL.md` points to extra folders such as `references/`, load only the specific files needed for the request; do not bulk-load everything.
  3) If `scripts/` exist, prefer running or patching them instead of retyping large code blocks.
  4) If `assets/` or templates exist, reuse them instead of recreating from scratch.
- Coordination and sequencing:
  - If multiple skills apply, choose the minimal set that covers the request and state the order you'll use them.
  - Announce which skill(s) you're using and why (one short line). If you skip an obvious skill, say why.
- Context hygiene:
  - Keep context small: summarize long sections instead of pasting them; only load extra files when needed.
  - Avoid deep reference-chasing: prefer opening only files directly linked from `SKILL.md` unless you're blocked.
  - When variants exist (frameworks, providers, domains), pick only the relevant reference file(s) and note that choice.
- Safety and fallback: If a skill can't be applied cleanly (missing files, unclear instructions), state the issue, pick the next-best approach, and continue.

## Project priorities
- Maintain a stable, accessible PWA for LMIC users (eye/ear/skin health chatbot + guides).
- Prefer small, low-risk maintenance; avoid architectural churn.
- Preserve existing orchestrator/module patterns.

## Where to look for truth
- `memory-bank/activeContext.md`: current focus and recent work.
- `memory-bank/progress.md`: changelog/backlog.
- `memory-bank/systemPatterns.md`: architecture and patterns.
- `memory-bank/techContext.md`: stack details and operational constraints.

## Guardrails
- CSP directives: single source in `config/index.js`.
- Dev serves `public/`; prod serves `dist/` from `npm run build`.
- Use PowerShell (avoid CMD-only syntax). If Git is odd, check `.clinerules/skills/windows-git-sanity/SKILL.md`.
- Request validation lives in `middleware/validation.js`; keep client payloads aligned and omit empty optional fields (ex: `contactInfo`).

## Preferred helpers
- `public/scripts/sw-ready.js` (`whenSwReady`) for SW gating.
- `public/scripts/storage.js` for localStorage access.
- `public/scripts/csrf.js` for client CSRF headers.
- `public/scripts/trusted-html.js` for app-controlled markup.
- `public/scripts/record-info.js` for building/posting `/api/record-info` payloads.

## Docs updates
- Update memory-bank files when changes affect architecture, workflows, or security patterns.
- Keep `README.md`, `tests/README.md`, and `folderList.txt` in sync after significant code/test/documentation changes.
</INSTRUCTIONS>
