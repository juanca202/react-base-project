---
name: design-system-simple-design-system-community
description: Creates implementation-ready design-system guidance derived from local Figma styles in "Simple Design System (Community)".
---

<!-- TYPEUI_SH_MANAGED_START -->

# Simple Design System (Community)

## Mission

Document and operationalize the Simple Design System (Community) style foundations extracted from Figma so teams can build consistent interfaces quickly.

## Brand

- Product/brand: Simple Design System (Community)
- Audience: Designers and engineers building this product
- Product surface: web app

## Style Foundations

- Visual style: token-driven, expressive, polished, radius Size/Radius/100/Size/Radius/200/Size/Radius/400/Size/Radius/Full
- Typography scale: Title Hero, Title Page, Subtitle, Heading, Subheading, Body Base, Body Strong, Body Emphasis, Body Link, Body Small, Body Small Strong, Body Code, Single Line/Body Base, Single Line/Body Small Strong
- Color palette: Image Placeholder, Color/Background/Default/Default, Color/Background/Default/Secondary, Color/Background/Default/Tertiary, Color/Background/Default/Default Hover, Color/Background/Brand/Default, Color/Background/Brand/Secondary, Color/Background/Brand/Hover, Color/Background/Positive/Default, Color/Background/Positive/Secondary, Color/Background/Positive/Hover, Color/Background/Warning/Default, Color/Background/Warning/Secondary, Color/Background/Warning/Hover
- Spacing scale: Size/Space/100, Size/Space/200, Size/Space/300, Size/Space/400, Size/Space/600, Size/Space/Negative 100, Size/Space/Negative 200, Size/Space/Negative 300, Size/Space/Negative 400, Size/Space/Negative 600, Size/Space/1600, Size/Space/4000, Size/Space/800, Size/Space/1200
- Radius/shadow/motion tokens: Size/Depth/0, Size/Depth/025, Size/Depth/100, Size/Depth/200, Size/Depth/400, Size/Depth/800, Size/Depth/1200, Size/Depth/Negative 025, Size/Depth/Negative 100, Size/Depth/Negative 200, Size/Depth/Negative 400, Size/Depth/Negative 800, Size/Depth/Negative 1200

## Component Families

- buttons
- inputs
- forms
- navigation
- overlays
- feedback
- data display

## Accessibility

- Target: WCAG 2.2 AA
- Keyboard-first interactions required
- Focus-visible rules required
- Contrast constraints required

## Writing Tone

concise, confident, implementation-focused

## Rules: Do

- Use extracted color tokens before introducing one-off values: Image Placeholder
- Color/Background/Default/Default
- Color/Background/Default/Secondary
- Color/Background/Default/Tertiary
- Color/Background/Default/Default Hover
- Color/Background/Brand/Default.
- Use these typography styles consistently: Title Hero
- Title Page
- Subtitle
- Heading
- Subheading
- Body Base.
- Define all interaction states for interactive components: default
- hover
- focus-visible
- active
- disabled
- and loading.

## Rules: Don't

- Do not duplicate existing style tokens with one-off naming.
- Do not remove focus-visible indicators or keyboard support.
- Do not hard-code raw values where local styles or variables already exist.

## Guideline Authoring Workflow

1. Restate design intent in one sentence.
2. Define foundations and tokens.
3. Define component anatomy
4. variants
5. and interactions.
6. Add accessibility acceptance criteria.
7. Add anti-patterns and migration notes.
8. End with QA checklist.

## Required Output Structure

- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations

- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.

## Quality Gates

- Every non-negotiable rule uses "must".
- Every recommendation uses "should".
- Every accessibility rule is testable in implementation.
- Prefer system consistency over local visual exceptions.

## Acceptance Checklist

- Frontmatter exists with valid `name` and `description`.
- Guidance is under 500 lines for `skill.md` when possible.
- Accessibility and interaction states are explicitly documented.
- Rules are concrete, testable, and non-ambiguous.
- Output can be reused in other repositories with only variable replacement.

## TypeUI + Agentic Integration

This `SKILL.md` is intended for `typeui.sh` CLI workflows.
It can later be integrated with agentic tools including Claude Code, OpenCode, Gemini CLI, Cursor, and similar assistants.

<!-- TYPEUI_SH_MANAGED_END -->
