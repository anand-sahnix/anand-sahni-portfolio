# spec.md — Anand Kumar Sahni · Developer Portfolio

> **Status:** Draft v1.0 · **Audience:** AI coding agent and human reviewer · **Purpose:** Single source of truth for building the portfolio. The agent must not make major product or design decisions outside this document. Where a decision is missing, follow the documented assumption in §24.

**Requirement ID scheme:** `FR-` functional · `NFR-` non-functional · `MOT-` motion · `CMP-` component · `DAT-` data · `SEO-` · `SEC-` · `A11Y-` · `RSP-` responsive · `TST-` testing · `DEP-` deployment · `AC-` acceptance.
Every requirement lists **Behavior**, **Constraints**, **Acceptance**, and **Depends on** where applicable.

---

## 1. Product Overview

### 1.1 Summary
A dark-first, motion-rich, single-page developer portfolio for **Anand Kumar Sahni**, a 3rd-year B.Tech Computer Science Engineering student, full-stack developer, and AI enthusiast. It must feel like a premium product landing page crossed with an interactive engineering showcase, without being visually overwhelming.

### 1.2 What the site must communicate (in order of priority)
1. Anand can build full-stack web applications.
2. Anand can integrate AI into practical software products.
3. Anand cares about engineering quality, product thinking, and continuous learning.

### 1.3 Identity (initial content, all editable via config)
| Field | Value |
|---|---|
| Name | Anand Kumar Sahni |
| Tagline role | Computer Science Engineering Student · Full-Stack Developer · AI Enthusiast |
| Education | B.Tech, Computer Science Engineering, 3rd year |
| Interests | Full-stack development, Generative AI, AI agents, LLM applications, DSA, quantitative finance, trading technology |
| Tech areas | HTML, CSS, JavaScript, React, Node.js, Express.js, Python, C++, MongoDB, SQL, Git, GitHub, AI integrations |
| GitHub | https://github.com/anand-sahnix |
| LinkedIn | https://www.linkedin.com/in/anand-kumar-sahni |
| Instagram | https://www.instagram.com/anandsahni__/ |
| X | https://x.com/sahni223Anand |
| Email | **Not supplied** → `null` in config (see §24) |
| Resume | **Not supplied** → `null` in config |

### 1.4 Integrity rule (global)
**FR-001 — No fabricated content.**
- Behavior: The site must never display invented achievements, employment, client names, testimonials, certifications, statistics, metrics, URLs, or email addresses.
- Constraints: Any unknown value is `null` in config; UI hides or gracefully degrades the element that depends on it. Placeholders used during development are wrapped in `TODO:` markers and must fail the build in production (see FR-082).
- Acceptance: A repo-wide search for `TODO:` in production content returns zero results; a content reviewer finds no claim not supplied by the owner.

---

## 2. Goals and Non-Goals

### 2.1 Goals
- G1. Make a strong first impression within 5 seconds on desktop and mobile.
- G2. Present 3–5 projects with credible, honest problem/solution framing.
- G3. Demonstrate engineering maturity through architecture, accessibility, performance, and clean code in the portfolio itself.
- G4. Make all content editable in one place without touching components.
- G5. Deploy as a fast static site with no unnecessary backend.
- G6. Respect user preferences (reduced motion, color contrast, keyboard use).

### 2.2 Non-Goals
- NG1. No blog/CMS, authentication, database, or admin dashboard.
- NG2. No light theme at launch (architecture must allow it later; see §7.9).
- NG3. No WebGL/3D scenes requiring heavy libraries (e.g., Three.js) in v1.
- NG4. No fake terminal windows, fake stats, fake logos, fake testimonials.
- NG5. No analytics that collect personal data. Optional privacy-friendly analytics are deferred (§24).
- NG6. No multi-page routing beyond optional project case-study routes (§6.6).

---

## 3. Target Audience

| Audience | Primary need | Where they look |
|---|---|---|
| Recruiters / HR | Quick signal: skills, projects, resume, contact | Hero, Projects, Resume, Contact |
| Technical interviewers | Depth, architecture decisions, code | Deep Dives, GitHub links |
| Hackathon organizers / peers | Project demos, creativity | Projects, live demos |
| Other developers | Ideas, repos, collaboration | Projects, Currently Exploring |
| Mentors / faculty | Learning journey | About, Journey |

---

## 4. User Personas and User Stories

### 4.1 Personas
- **Priya, Technical Recruiter (mobile, 90 seconds).** Wants to confirm skills fit and grab a resume.
- **Marcus, Senior Engineer Interviewer (laptop, 5 minutes).** Wants to read how one project was designed, its trade-offs, and its limitations.
- **Dev, Fellow Student (mobile, casual).** Wants to see demos and follow on GitHub.

### 4.2 User stories
| ID | Story | Acceptance |
|---|---|---|
| US-01 | As a recruiter, I want to see who Anand is and what he builds above the fold. | Name, role, one-line value statement and two CTAs visible at 360×640 without scrolling. |
| US-02 | As a recruiter, I want to download the resume. | Resume button appears only when `resumeUrl` is set; click opens/downloads the file. |
| US-03 | As an interviewer, I want to read a project's architecture and trade-offs. | Featured projects with `caseStudy` data expose an expandable deep-dive. |
| US-04 | As a visitor, I want to filter projects by category. | Filter chips only for categories with ≥1 visible project; results animate smoothly. |
| US-05 | As a visitor, I want to contact Anand. | Email link and/or working form; clear success/error states. |
| US-06 | As a motion-sensitive user, I want reduced motion. | With `prefers-reduced-motion: reduce`, no parallax, no autoplaying motion, only opacity fades ≤150ms. |
| US-07 | As a keyboard user, I want to navigate everything without a mouse. | All interactive elements reachable in logical order with visible focus. |
| US-08 | As the owner, I want to update content without editing components. | Changing only files in `src/content/` updates the site. |

---

## 5. Information Architecture

### 5.1 Page structure (single page, anchored sections)
```
/                      Single-page portfolio
  #home                Hero
  #about               About Me
  #skills              Skills & Technologies
  #projects            Featured Projects (+ filters)
  #deep-dives          Technical Deep Dives
  #journey             Journey & Achievements
  #exploring           Currently Exploring
  #contact             Contact
  footer               Footer
/projects/:slug        OPTIONAL case-study route (Phase 6, flag-controlled)
/404                   Not-found page
```

### 5.2 Navigation order
Home · About · Skills · Projects · Journey · Contact · **[Resume]**
(Deep Dives and Exploring are reachable via in-page links and the footer; they are not in the main nav to keep it minimal.)

### 5.3 Section visibility rules
- Each section has a feature flag (`flags.sections.<name>`).
- A section auto-hides when its data array is empty, even if its flag is `true`.
- Nav links for hidden sections are removed automatically.

---

## 6. Detailed Section Specifications

### 6.1 Navigation (`#nav`)

**FR-010 — Layout.** Fixed top bar, height 64px desktop / 56px mobile. Left: monogram "AS" wordmark linking to `#home`. Center/right: links. Far right: Resume button.
**FR-011 — Scroll behavior.** Transparent at top; after 24px scroll, applies `backdrop-blur-md`, 1px bottom border (`--border-subtle`), and 80% opaque background. On scroll-down past 400px, the bar hides (translateY −100%); on any scroll-up, it reappears. Always visible when focus is inside it.
**FR-012 — Active indicator.** The current section link shows a 2px accent underline/pill that slides between links (shared layout animation, see MOT-040). Active section is determined with IntersectionObserver (`rootMargin: "-45% 0px -50% 0px"`).
**FR-013 — Smooth scroll.** Anchor clicks scroll smoothly with offset equal to nav height. Respect reduced motion (instant jump). URL hash updates without page jump on load. Focus moves to the target section heading (`tabindex=-1`) after scroll.
**FR-014 — Resume button.** Rendered only if `site.resumeUrl` is a non-empty valid URL or relative path. Opens in new tab with `rel="noopener noreferrer"` (or `download` attribute for local PDFs). If null, the button is not rendered anywhere (nav, hero, footer, mobile menu).
**FR-015 — Mobile menu (<768px).** Hamburger button (44×44px) toggles a full-screen overlay. Opening: background fades in (200ms), links stagger up (40ms each). Closing: reverse in 160ms. Body scroll locked while open; Escape closes; focus trapped inside; focus returns to the hamburger on close. Clicking a link closes the menu and scrolls.
- Acceptance: Playwright test opens menu, tabs through all links, presses Escape, verifies focus returns to trigger; scroll lock verified; axe has no violations with menu open.

### 6.2 Hero (`#home`)

**FR-020 — Content.**
- Eyebrow: "Anand Kumar Sahni · CSE Student" (small caps, mono).
- H1 (default, editable): **"Building intelligent products at the intersection of AI and software."**
- Subtext (default): "I'm a Computer Science Engineering student who builds full-stack applications and AI-powered products—from LLM-driven tools to trading analytics. I care about software that is useful, well-engineered, and honest about its limits."
- Primary CTA: **Explore My Projects** → `#projects`.
- Secondary CTA: **Contact Me** → `#contact`.
- Icon links: GitHub, LinkedIn (always shown if URL present).
- Scroll indicator at bottom center: thin vertical line with a traveling dot (decorative; `aria-hidden`).
**FR-021 — Availability indicator.** Rendered only if `site.availability.show === true` AND `site.availability.text` is non-empty. Default config: `show: false`. When shown, a 8px pulsing dot + text (e.g., "Open to internships"). The owner is responsible for accuracy.
**FR-022 — Hero visual: "Signal Graph".** An SVG/Canvas-2D abstract node-and-edge network (see MOT-020). Positioned right on desktop (≈45% width), behind and below the text on mobile at 40% opacity. Decorative (`aria-hidden`, `role="presentation"`).
**FR-023 — Layout.** Desktop: 12-col grid; text spans cols 1–7, visual cols 7–12, with the H1 allowed to overlap the visual slightly. Min height `100svh`. Mobile: single column, text first, visual as a faded backdrop.
**FR-024 — Copy limits.** H1 ≤ 14 words; subtext ≤ 45 words.
- Acceptance: At 360×640 H1, subtext and both CTAs are visible; no horizontal overflow; LCP element is the H1 text (not an image).

### 6.3 About (`#about`)

**FR-030 — Content blocks.**
1. Section label "01 — About" and heading (e.g., "Learning by building").
2. Biography: 2 short paragraphs (≤120 words total) covering: how Anand got into building software; the shift toward AI-integrated products; the kinds of problems he enjoys (deterministic logic mixed with natural language, trading/risk tooling, developer-facing tools). *Copy is drafted by the agent from facts in §1 only, flagged for owner review (see §24 OQ-4).*
3. "Current focus" card: 3 bullet items sourced from `exploring` data.
4. "Interests" chip row: sourced from `about.interests`.
5. Optional portrait: shown only if `about.photo` is set; else omitted and layout re-centers.
**FR-031 — Layout.** Asymmetric: large heading left (cols 1–5, sticky on desktop), content right (cols 6–12). Mobile stacks.
**FR-032 — Banned phrasing.** Copy must not contain generic phrases ("passionate about technology", "hard-working team player", "quick learner") without specifics.
- Acceptance: Lint script (`scripts/check-copy.ts`) fails on banned phrases listed in `content/banned-phrases.json`.

### 6.4 Skills and Technologies (`#skills`)

**FR-040 — Categories (fixed order).** Frontend Development · Backend Development · Programming Languages · Databases · AI and Generative AI · Developer Tools · Core Computer Science.
**FR-041 — Initial skills (all editable).**
| Category | Skills |
|---|---|
| Frontend | HTML, CSS, JavaScript, React, Tailwind CSS, Vite |
| Backend | Node.js, Express.js, REST APIs |
| Languages | JavaScript, TypeScript*, Python, C++ |
| Databases | MongoDB, SQL |
| AI & GenAI | LLM API integration, Prompt design, Retrieval-Augmented Generation (RAG), AI agents |
| Dev Tools | Git, GitHub, VS Code |
| Core CS | Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks |

\* Only include TypeScript, Vite, Tailwind, REST APIs, Prompt design, VS Code, OOP, DBMS, OS, and CN in the shipped content if the owner confirms them (OQ-5). Default shipped set = items explicitly listed in §1.3 plus those directly implied by the five candidate projects (RAG, LLM integration, AI agents).
**FR-042 — Presentation.** Each category is a compact group: category title, short one-line descriptor (optional), then tech "chips" (icon + label, 36px height). No percentage bars, star ratings, or "expert/advanced" labels.
**FR-043 — Layout.** Desktop: bento-style grid (3 columns; AI and Frontend groups span wider). Tablet: 2 columns. Mobile: single column, groups collapsible only if total height > 1.5 viewports (default expanded).
**FR-044 — Easy editing.** Adding a skill = one object appended to `skills.ts`. Icons resolved from a `iconMap`; missing icon falls back to a generic Lucide `Code2` glyph.
**FR-045 — Optional evidence link.** A skill may have `evidenceProjectSlugs`; if present, hovering/focusing the chip shows a tooltip "Used in: X, Y". Must also be accessible via keyboard (focus) and not hover-only for essential info.
- Acceptance: No element in the section matches `/\d+%/`; adding a skill object renders a chip with no other code change.

### 6.5 Featured Projects (`#projects`)

**FR-050 — Data-driven cards.** Cards render from `projects.ts`. Only projects with `visibility: "public"` render. `"hidden"` and `"draft"` do not render in production; `"draft"` renders in dev with a "Draft" badge.
**FR-051 — Card content fields.**
| Field | Required | Missing-value behavior |
|---|---|---|
| `title` | yes | Build fails (schema validation) |
| `problem` (≤140 chars) | yes | Build fails |
| `solution` (≤200 chars) | yes | Build fails |
| `stack[]` | yes (≥1) | Build fails |
| `category[]` | yes (≥1) | Build fails |
| `featured` | no | Defaults false |
| `image` | no | Renders **generated visual fallback** (see FR-052) |
| `repoUrl` | no | GitHub button not rendered |
| `liveUrl` | no | "Live demo" button not rendered |
| `status` | no | One of `concept`, `in-progress`, `prototype`, `completed`; badge shown if set |
| `caseStudy` | no | "Read deep dive" link not rendered |
**FR-052 — Fallback visual.** When `image` is null, render a deterministic abstract SVG/CSS pattern seeded by the project slug (grid + gradient + mono title initials). No stock photos, no broken image icon, no layout shift (fixed 16:10 aspect).
**FR-053 — Status honesty.** Candidate projects ship with conservative defaults: Red Thread = `concept` or `in-progress`, AI Mystery Room = `in-progress`, others = `in-progress` until the owner updates. Cards must never say "production", "deployed", or "used by N users".
**FR-054 — Initial candidate projects (content seeds).**
| Slug | Title | Problem (draft) | Solution (draft) | Categories | Suggested stack (confirm) |
|---|---|---|---|---|---|
| `ai-mock-interview` | AI Powered Mock Interview Platform | Interview practice rarely gives structured, immediate feedback. | Conducts AI-assisted mock interviews and presents feedback on answers. | Full-Stack, AI/ML | React, Node.js, Express, MongoDB, LLM API |
| `red-thread` | Red Thread | Detective games with free-form NPCs often break case logic. | AI detective game concept: deterministic case logic and clue state, with natural-language NPC conversations constrained by what each suspect knows. | AI/ML, Full-Stack | React, Node.js, LLM API |
| `tradeiq` | TradeIQ | Traders need clearer analysis and disciplined risk control. | Trading analysis and risk-management application. | Finance Technology, Full-Stack | Python, React, Node.js (confirm) |
| `hr-knowledge-assistant` | HR Knowledge Assistant | Employees struggle to find accurate HR policy answers. | Retrieval-augmented generation app answering employee questions from HR knowledge sources. | AI/ML | Python, Vector store, LLM API (confirm) |
| `ai-mystery-room` | AI Mystery Room | Investigation games often lack evidence-driven logic. | Interactive mystery experience built around evidence, scenarios, and culprit discovery. | AI/ML, Full-Stack | React, Node.js, LLM API (confirm) |

All stacks, repo URLs, live URLs, statuses are **owner-to-confirm** (OQ-2). The agent must ship these with `repoUrl: null` and `liveUrl: null` unless the owner supplies them.
**FR-055 — Featured layout.** The first `featured` project renders as a large hero card (full-width, split layout: visual left, text right on desktop). Remaining cards render in a 2-column grid (desktop ≥1024px), 2-col tablet (≥768px, compact), 1-col mobile. Maximum 6 cards visible by default; "Show all" reveals the rest if more exist.
**FR-056 — Card anatomy (top→bottom).** Visual (16:10) → status badge + category tags → title → problem (muted) → solution → stack chips (max 5, "+N" overflow) → action row (GitHub, Live demo, Deep dive).
**FR-057 — Filtering.** Chips: `All` plus categories derived at runtime from visible projects only (Full-Stack, AI/ML, Developer Tools, Finance Technology). A category with zero visible projects must not appear. Filter state is reflected in URL query (`?filter=ai-ml`) and announced via `aria-live="polite"` ("Showing 3 projects"). Filtering uses `role="tablist"`-free toggle buttons with `aria-pressed`.
**FR-058 — Filter transitions.** Layout animation (MOT-034): cards that remain slide to new positions; entering cards fade+scale from 0.97; exiting fade out in 150ms. Reduced motion: instant swap with 100ms opacity fade.
**FR-059 — Hover/focus.** See MOT-030–033. Focus-visible gives the same illumination as hover.
- Acceptance: With all five candidates `public`, filters = All, Full-Stack, AI/ML, Finance Technology (no "Developer Tools" chip). Removing TradeIQ removes the Finance Technology chip.

### 6.6 Technical Deep Dives (`#deep-dives`)

**FR-060 — Structure.** An accordion-style editorial list of projects that have `caseStudy`. Each item header: project title, one-line summary, status badge, expand toggle.
**FR-061 — Case study template (fixed sections).**
1. The Problem
2. Why It Matters
3. Architecture & Technical Decisions (diagram slot)
4. Major Challenges
5. How the Solution Works
6. Trade-offs & Limitations
7. Future Improvements
Any section with no content is omitted (heading included). A deep dive with <3 populated sections is not rendered.
**FR-062 — Diagram support.** Accept (a) an imported SVG/PNG/WebP with alt text, or (b) a Mermaid-free hand-authored React SVG component from `src/components/diagrams/`. No runtime diagram library in v1.
**FR-063 — No fabricated outcomes.** Metrics fields (`metrics[]`) are optional; if absent, no metrics block renders. Schema requires `source` or `method` text for every metric entry.
**FR-064 — Interaction.** One item open at a time (desktop); multiple allowed on mobile. Uses `<details>`-equivalent semantics or ARIA disclosure (`aria-expanded`, `aria-controls`). Height animation via `grid-template-rows: 0fr → 1fr` or Motion `layout`; reduced motion: instant.
**FR-065 — Optional routes.** When `flags.caseStudyRoutes` is true, each case study also has `/projects/:slug` with the same content, its own `<title>`, meta description and OG tags (prerendered; see SEO-010).
- Acceptance: A project without `caseStudy` never appears here; deep link `#deep-dives?project=red-thread` opens that item.

**Seed deep-dive guidance (agent may scaffold structure but must leave unknown technical details as `null`):**
- *Red Thread:* known facts — deterministic case logic, clues, suspect knowledge, natural-language NPC interaction. Architectural claims (e.g., "state machine", "knowledge graph") must be confirmed by the owner before display.
- *HR Knowledge Assistant:* known fact — RAG over HR sources. Chunking, embedding model, vector store specifics are owner-supplied.

### 6.7 Journey and Achievements (`#journey`)

**FR-070 — Timeline.** Vertical editorial timeline (desktop: alternating left/right on a center line; mobile: single left rail). Each entry: date (month+year, or year), title, organization (optional), 1–2 sentence description, optional link, `type` (`education` | `program` | `hackathon` | `milestone` | `achievement`).
**FR-071 — Seed content.** Only: "B.Tech in Computer Science Engineering — 3rd year (ongoing)". Institution name and start year are `null` until supplied (OQ-3). Hackathons/achievements: none seeded.
**FR-072 — Verification flag.** Every entry has `verified: boolean`; only `verified: true` entries render. Hackathon entries require an `outcome` field (`participated` | `finalist` | `winner` | `other`) displayed verbatim, to prevent implying participation equals winning.
**FR-073 — Date-awareness.** Entries sort by date descending by default (configurable). Ongoing entries show "Present" computed from `endDate: null`. Dates are ISO strings; formatting uses `Intl.DateTimeFormat`.
**FR-074 — Empty state.** If only the education entry exists, render a compact single-card layout instead of a timeline.
- Acceptance: Entry with `verified: false` does not render; hackathon entry without `outcome` fails schema validation.

### 6.8 Currently Exploring (`#exploring`)

**FR-080 — Content.** 4 seed tiles: AI agents and evaluation · Full-stack engineering · Data structures and algorithms · Quantitative finance and trading technology. Each tile: icon, title, ≤25-word note, optional "last updated" month.
**FR-081 — Visual identity.** Distinct from other sections: a horizontal "orbit strip" on desktop (tiles on a subtly rotating, pausable arc—static on reduced motion) and a swipeable snap-scroll row on mobile. Alternative if complexity is high: 2×2 grid with animated outline—agent may choose, but must note the choice in the PR.
**FR-082 — Build guard.** `npm run build` runs `scripts/validate-content.ts` which fails on `TODO:` strings, schema violations, banned phrases and invalid URLs (see §14).
- Acceptance: Section hidden when `exploring` is empty.

### 6.9 Contact (`#contact`)

**FR-090 — Content.** Closing headline (default: "Let's build something useful."), short note (≤30 words), email link (if configured), social links, and the form (if configured).
**FR-091 — Email.** If `site.email` is null, the email element is not rendered and the form (if enabled) is the sole contact path. If both null, show social links only plus heading "Find me on GitHub or LinkedIn."
**FR-092 — Copy-to-clipboard.** Button next to email: uses `navigator.clipboard.writeText`; on success shows inline "Copied" for 2000ms with `aria-live="polite"`; on failure falls back to selecting the text and showing "Press Ctrl/Cmd+C".
**FR-093 — Form (UI requirements, independent of backend).**
- Fields: Name (required, 2–80 chars), Email (required, RFC-valid), Message (required, 20–2000 chars), hidden honeypot field.
- Labels always visible (not placeholder-only). Errors appear on blur and on submit, in text associated by `aria-describedby`; invalid fields get `aria-invalid="true"`. On submit failure focus moves to the first invalid field.
- States: `idle → validating → submitting → success | error`. Submit button shows spinner + disabled during `submitting`. Success replaces the form with a confirmation and a "Send another" action. Error shows a retry button and preserves input.
- Character counter on message (visible, `aria-live="off"`; announces only at limit).
**FR-094 — Form backend integration (separate concern).** Feature flag `flags.contactForm` (default **false**). When true, `VITE_FORM_ENDPOINT` must be set (e.g., Formspree/Web3Forms/Netlify Forms endpoint). The component POSTs JSON with `fetch`, 10s timeout via `AbortController`. If the flag is true but the endpoint is missing, the form does not render and a console warning appears in dev; the build validation fails in production.
**FR-095 — No fake success.** Success state is shown only when the HTTP response is 2xx. Network errors, timeouts, and non-2xx show the error state.
**FR-096 — Spam protection.** Honeypot field + minimum 3s time-on-form check + provider-side captcha (e.g., Turnstile/hCaptcha) if the provider supports it (`VITE_CAPTCHA_SITE_KEY`, optional).
- Acceptance: With flag off, no `<form>` in DOM. With flag on and a mocked 500, error state shown and input preserved. With mocked 200, success state shown.

### 6.10 Footer

**FR-100 — Content.** Monogram + name, nav links (visible sections), social links, "Back to top" button, `© {currentYear} Anand Kumar Sahni`. Year from `new Date().getFullYear()`.
**FR-101 — Back to top.** Button with arrow that lifts 2px on hover; smooth scroll to top (instant on reduced motion); focus moves to `#home` heading.
**FR-102 — Optional line.** "Built with React, TypeScript and Tailwind" (small, mono), shown if `site.showBuildCredit` true.

---

## 7. Visual Design System

### 7.1 Principles
1. **Restraint:** one accent family at a time, glows reserved for 2–3 focal points.
2. **Hierarchy through scale:** oversized display type contrasted with small mono labels.
3. **Structure through lines:** 1px borders, grid lines, numbered section labels.
4. **Honest visuals:** abstract, generated, or real project visuals only.

### 7.2 Color tokens (CSS variables; dark theme)
| Token | Value | Use |
|---|---|---|
| `--bg-base` | `#07090F` | Page background |
| `--bg-raised` | `#0D111B` | Cards, nav surface |
| `--bg-overlay` | `#121827` | Menus, tooltips |
| `--border-subtle` | `rgba(255,255,255,0.08)` | Dividers |
| `--border-strong` | `rgba(255,255,255,0.16)` | Hover borders |
| `--text-primary` | `#F4F6FB` | Headings, body emphasis |
| `--text-secondary` | `#A9B1C6` | Body text |
| `--text-muted` | `#7C86A2` | Captions (≥ 4.5:1 on `--bg-base` required; adjust if not) |
| `--accent-1` | `#5B8CFF` | Electric blue (primary) |
| `--accent-2` | `#8B5CF6` | Violet (secondary, used in gradients only) |
| `--accent-3` | `#22D3EE` | Cyan (highlights, status) |
| `--success` | `#34D399` | Success |
| `--danger` | `#F87171` | Errors |
| `--focus-ring` | `#9DB8FF` | Focus outlines |
Rules: gradient text is allowed **only** on the single hero H1 emphasized phrase ("AI and software") and nowhere else. Accent usage per viewport should stay below ~10% of area.

### 7.3 Typography
- Display/headings: **"Space Grotesk"** (600) or **"Sora"**; fallback `ui-sans-serif, system-ui`.
- Body: **"Inter"** (400/500).
- Mono labels: **"JetBrains Mono"** (400/500).
- Fonts self-hosted (woff2, subset to Latin), `font-display: swap`, preload display + body only.
- Fluid scale (`clamp`):
| Style | Size | Line height | Tracking |
|---|---|---|---|
| Display (H1) | `clamp(2.5rem, 6vw + 1rem, 5.5rem)` | 1.02 | −0.03em |
| H2 | `clamp(2rem, 3.5vw + 1rem, 3.5rem)` | 1.08 | −0.02em |
| H3 | `clamp(1.25rem, 1.2vw + 1rem, 1.75rem)` | 1.25 | −0.01em |
| Body | `1rem`–`1.125rem` | 1.65 | 0 |
| Small | `0.875rem` | 1.5 | 0 |
| Mono label | `0.75rem` | 1.4 | +0.08em, uppercase |
- Minimum body size 16px on mobile; line length 60–75ch.

### 7.4 Spacing, layout, radii, elevation
- 4px base unit; spacing scale 4/8/12/16/24/32/48/64/96/128.
- Container: max-width 1200px; horizontal padding 20px (mobile), 32px (≥768), 48px (≥1280). 12-col grid, 24px gutter (16px mobile).
- Section vertical padding: 96px mobile → 160px desktop.
- Radii: 6px (chips), 10px (buttons, inputs), 14px (cards). **No radius above 16px** (avoid "bubbly" cards).
- Elevation via border + glow, not heavy shadows: card hover = `0 0 0 1px var(--border-strong), 0 12px 40px -12px rgba(91,140,255,.25)`.

### 7.5 Background system
- Fixed subtle grid (1px lines at 4% white, 64px cells) with a radial mask fading to edges.
- One large blurred gradient blob (accent-1 → accent-2, 12% opacity) behind the hero, and one behind the contact section. No others.
- Optional film grain overlay (SVG noise, 2–3% opacity) – static, no animation.

### 7.6 Glassmorphism budget
Permitted **only** on: navigation bar (scrolled), mobile menu overlay, and tooltips. Not on cards or sections.

### 7.7 Iconography and imagery
- Lucide for UI icons (stroke 1.5, 20px default); brand/tech icons via `simple-icons` SVGs inlined at build (tree-shaken), monochrome by default, brand color on hover optional.
- Images: AVIF + WebP with JPEG/PNG fallback via `<picture>`; responsive `srcset` at 480/768/1200/1600; explicit width/height.

### 7.8 Core components (visual rules)
- **Button primary:** accent-1 solid, text `#07090F`, 44px min height, 10px radius; hover: lighten 6% + arrow icon translateX(3px); active: scale 0.98.
- **Button secondary:** transparent, 1px `--border-strong`, text primary; hover: bg `rgba(255,255,255,.05)`.
- **Chip:** 1px border, `--text-secondary`, mono 12px, 6px radius.
- **Section label:** mono, uppercase, prefixed with index, e.g., `03 — Skills`.
- **Focus:** 2px `--focus-ring` outline, 2px offset, on all interactive elements (never removed).

### 7.9 Theming readiness
All colors accessed via CSS variables; Tailwind theme extends them. A future light theme should require adding a `[data-theme="light"]` block only. `color-scheme: dark` set on `:root`.

---

## 8. Motion and Interaction Specification

### 8.1 Global motion tokens (`src/motion/tokens.ts`)
| Token | Value |
|---|---|
| `ease.out` | `[0.22, 1, 0.36, 1]` (expo-out feel) |
| `ease.inOut` | `[0.65, 0, 0.35, 1]` |
| `ease.spring` | `{ type: "spring", stiffness: 260, damping: 28, mass: 0.8 }` |
| `dur.xs / sm / md / lg / xl` | 0.12 / 0.2 / 0.4 / 0.7 / 1.1 s |
| `stagger.text` | 0.03 s per word (0.012 per char only for hero accent) |
| `stagger.cards` | 0.08 s |
| `viewport` | `{ once: true, amount: 0.25, margin: "0px 0px -10% 0px" }` |

### 8.2 Motion policy
**MOT-000 — Reduced motion (global).**
- Behavior: A `useReducedMotionSafe()` hook wraps `useReducedMotion()` and `matchMedia('(prefers-reduced-motion: reduce)')`. Wrap the app in `MotionConfig reducedMotion="user"`. In reduced mode: no translate/scale/parallax/looping/rotation animation; allowed: opacity fades ≤150ms and instant state changes. Canvas/hero visual renders one static frame. Custom cursor disabled. Smooth-scroll disabled.
- Acceptance: With `prefers-reduced-motion: reduce` emulated, E2E test confirms no element has a running CSS animation with `animation-iteration-count: infinite` and no `transform` transitions on scroll reveal.

**MOT-001 — Low-power / mobile tier.** Motion tier computed once: `full` (desktop, `hardwareConcurrency ≥ 6` or unknown, no `saveData`), `lite` (touch devices ≤1024px or `hardwareConcurrency ≤ 4` or `deviceMemory ≤ 4` or `saveData`), `none` (reduced motion). `lite`: parallax off, pointer effects off, hero visual node count −60% and 30fps cap, no blur animations, stagger durations −30%. `none` per MOT-000.
**MOT-002 — Non-blocking.** No animation may delay content visibility beyond 1.2s total, intercept pointer events (use `pointer-events: none` on decorative layers), block text selection, or delay focus/keyboard input. Content must be in the DOM and readable before animation (no `display:none` initial states; SSR/prerender-safe `initial` styles use opacity+transform only).
**MOT-003 — Property whitelist.** Animate only `transform`, `opacity`, and (sparingly) `filter` on small elements. No animating `width/height/top/left/box-shadow` continuously; accordion height uses `grid-template-rows` or Motion layout.
**MOT-004 — One-shot reveals.** Scroll reveals fire once (`viewport.once = true`). Scrolling back does not replay.

### 8.3 Initial page experience
**MOT-010 — Intro sequence ("boot").**
- Trigger: first load of a session (tracked via `sessionStorage` key `intro-seen`); skipped on reload, when `tier = none`, or when the URL has a hash other than `#home`.
- Visual: A full-screen `--bg-base` layer with the "AS" monogram drawing in (SVG stroke-dashoffset, 600ms, `ease.inOut`), a hairline progress line under it (400ms), then the layer wipes up (translateY −100%, 500ms, `ease.inOut`) revealing the hero.
- Duration: ≤ 1.1s total, **never gated on asset loading beyond the critical CSS/font**. Content underneath is already in the DOM.
- Skippable: any click/keypress/scroll ends it immediately.
- Mobile: same, shortened to 0.8s.
- Reduced motion: skipped entirely.
- Acceptance: Time-to-interactive unaffected (Lighthouse run with intro enabled still meets NFR-001); `Tab` focus works during the overlay (overlay is `aria-hidden`, `inert`, and `pointer-events: none`).

**MOT-011 — Hero entrance (staggered).**
- Trigger: after intro completes (or immediately if skipped).
- Sequence (ms from t0): eyebrow fade-up 0 → H1 words masked reveal (each word translateY 100%→0 inside overflow-hidden wrapper, 700ms, `ease.out`, stagger 40ms) from 80 → subtext fade-up at 420 (500ms) → CTAs at 520 (stagger 80ms) → icon links at 640 → hero visual fade-in at 200 (900ms) → scroll indicator at 1000.
- Reduced motion: all elements appear with a single 150ms opacity fade, no stagger.
- Mobile (`lite`): same order, translate distance 12px instead of 24px, total ≤ 900ms.
- Accessibility: H1 is a single text node for screen readers (word spans use `aria-hidden` with a visually-hidden full string, or `aria-label` on the heading).

### 8.4 Hero visual
**MOT-020 — "Signal Graph".**
- Purpose: Evoke AI/agents/interconnected systems; ties to project themes.
- Implementation: Canvas 2D (preferred) or SVG with ≤ 70 nodes (`full`) / ≤ 28 nodes (`lite`). Nodes drift slowly (velocity ≤ 8px/s) within bounds; edges drawn when distance < threshold with opacity falling off; a few "pulse" packets travel along edges every 2–4s (accent-3).
- Pointer response (`full` only): nodes within 140px of the cursor are gently attracted/lifted (≤ 12px displacement), eased with lerp 0.08; parallax of the visual layer ±10px.
- Performance: single `requestAnimationFrame` loop; paused when hero is out of view (IntersectionObserver) or tab hidden (`visibilitychange`); devicePixelRatio capped at 2; `lite` capped at 30fps; no layout reads in loop.
- Fallback: If Canvas unsupported or tier `none`, render a static SVG of the same graph.
- Reduced motion: single static frame.
- Acceptance: Chrome Performance trace on mid-tier laptop shows ≥ 55 fps average in hero; CPU main-thread < 12% idle; loop stops when scrolled past hero (verified via test hook counter).

**MOT-021 — Background gradient drift.** The hero blob moves in a 30s looping translate/scale (transform only, 3% amplitude). Off in `lite`/`none`.
**MOT-022 — Scroll indicator.** A 1px×40px line with a 6px dot traveling top→bottom in 1.6s, `ease.inOut`, infinite with 0.8s pause. Hidden after first scroll > 80px. Off in reduced motion (static line).
**MOT-023 — Availability dot.** Pulse ring scale 1→2.2, opacity .6→0, 2s infinite (CSS keyframes, transform/opacity). Static in reduced motion. Only when FR-021 conditions are met.
**MOT-024 — CTA buttons.** Hover: bg shift (120ms), arrow +3px (200ms `ease.out`); optional magnetic effect (≤6px translate toward cursor) on **desktop `full` tier only**. Press: scale 0.98 (80ms). Focus: ring appears instantly.

### 8.5 Scroll-based motion
**MOT-030 — Section reveal.** Section label, heading, and lead paragraph: opacity 0→1, translateY 24px→0, 600ms, `ease.out`; heading words stagger at `stagger.text`. Trigger via `viewport`. Mobile `lite`: translateY 12px, 450ms.
**MOT-031 — Card/grid reveal.** Children of grids use a parent `staggerChildren: 0.08`; each child opacity+translateY(20px), 500ms. Max stagger group 8 items; later items reveal individually.
**MOT-032 — Parallax (selective).** Allowed on: hero visual (±10px), project featured visual (y: ±24px across viewport traversal, via `useScroll` + `useTransform` with `offset: ["start end","end start"]`), About portrait if present (±16px). Disabled in `lite`/`none`.
**MOT-033 — Scroll progress.** A 2px accent progress bar at the very top of the viewport (scaleX from scroll progress, `transform-origin: left`), hidden in reduced motion. This is the only global scroll-linked indicator.
**MOT-034 — Section transitions.** Between sections, only the hairline separator draws in (scaleX 0→1, 700ms). No full-section wipes/pins. **No scroll-jacking.**
**MOT-035 — Project screenshot entrance.** Image container clip-path/mask reveal: `inset(0 0 100% 0)` → `inset(0)` over 800ms `ease.out` with a 1.06→1 inner image scale; once only. Reduced motion: opacity only.

### 8.6 Project card interactions
**MOT-040 — Card hover/focus.** Border color → `--border-strong` with a pointer-tracked radial highlight (CSS variables `--mx/--my` updated via a throttled `pointermove`, `full` tier only); elevation glow in 200ms; card translateY −4px (200ms, `ease.out`). Touch devices: no hover effects, `:active` scale 0.99.
**MOT-041 — Image zoom.** Visual scale 1→1.04 over 500ms `ease.out` on hover/focus-within. Container `overflow: hidden`.
**MOT-042 — Arrow/icon.** "View" arrow translates (+4px, −4px diagonal for external-link icon) 200ms. Reduced motion: color change only.
**MOT-043 — Project details transition.** Deep-dive link → smooth scroll to accordion item and expand (MOT-051); if route mode on, shared-layout transition of the card image to the case-study hero (Motion `layoutId`, 450ms) with fallback to fade on unsupported/reduced motion.
**MOT-044 — Optional interactive preview.** Only when a project provides `preview` (e.g., embedded sandbox video/GIF or an interactive component). Default: a muted, looping, `playsinline` video (≤ 2MB, WebM/MP4) that plays only while in view and paused on `lite`. Must have a poster image and a visible pause control (WCAG 2.2.2). No autoplay with audio.

### 8.7 Navigation motion
**MOT-050 — Active indicator.** Shared `layoutId="nav-pill"` slides between items with `ease.spring`; reduced motion → instant.
**MOT-051 — Accordion/expand.** 280ms `ease.out` height via `grid-template-rows`; content fades in 160ms delayed 80ms.
**MOT-052 — Mobile menu.** See FR-015: overlay opacity 0→1 (200ms), links y 16→0, opacity, stagger 40ms (`ease.out`), hamburger icon morphs to × (180ms). Reduced motion: opacity only, 100ms.
**MOT-053 — Nav hide/show.** translateY 0 ↔ −100% over 250ms `ease.inOut`.

### 8.8 Micro-interactions
**MOT-060 — Social icons.** Hover/focus: translateY −2px, color → accent-1, 160ms; label tooltip appears (opacity) after 300ms hover delay or on focus. Touch: none.
**MOT-061 — Copy feedback.** Icon cross-fades copy → check (150ms), "Copied" text slides in (200ms), reverts after 2s.
**MOT-062 — Filter chips.** Active chip uses shared `layoutId="filter-pill"` background (spring); count of results text cross-fades.
**MOT-063 — Form validation.** Error message height/opacity reveal 160ms; field border color transition 120ms; subtle 4px horizontal shake (240ms) on submit failure only when motion is allowed.
**MOT-064 — Back-to-top.** Arrow lifts 2px on hover; no looping animation.
**MOT-065 — Custom cursor (optional, flag `flags.customCursor`, default false).** If enabled: 10px dot + 32px ring following the pointer (lerp 0.18), `mix-blend-mode: difference` avoided; enlarges to 48px over interactive elements; **native cursor is never hidden over text inputs, textareas, or when `pointer: coarse`, `tier != full`, or reduced motion.** `pointer-events: none`. Acceptance: text selection and form input unaffected; disabled when flag false.

### 8.9 Motion implementation rules
- Variants live in `src/motion/variants.ts` (e.g., `fadeUp`, `staggerParent`, `maskWord`, `scaleIn`, `lineDraw`); components import, never inline ad-hoc durations.
- GSAP is **not** included in v1. It may be added only if a specific effect (e.g., SVG path morphing timeline) cannot be achieved with Motion; requires a note in the PR and a bundle-size check.
- Provide a dev-only Motion Debug overlay (query `?motion=off|lite|full`) to force tiers for testing.

---

## 9. Functional Requirements (index)

Detailed section-level requirements are in §6. Cross-cutting functional requirements:

| ID | Requirement | Acceptance |
|---|---|---|
| FR-001 | No fabricated content (§1.4) | See §1.4 |
| FR-110 | **Config-driven content.** All text, links, skills, projects, journey, exploring and flags live in `src/content/*.ts`, validated by Zod schemas at build and dev start. | Changing content files alone updates UI; invalid content fails `npm run validate`. |
| FR-111 | **External links** use `target="_blank"` + `rel="noopener noreferrer"`, show an external-link icon, and include visually-hidden "(opens in new tab)". | Automated test over all `a[target=_blank]`. |
| FR-112 | **URL validation.** Only `https:` (and `mailto:` for email) allowed in config; relative paths allowed for local assets. | Schema rejects `javascript:` and `http:` (except `localhost` in dev). |
| FR-113 | **Missing data degrades gracefully** (hide element, no empty containers, no "undefined"/"null" text). | Snapshot tests with a minimal config render without console errors. |
| FR-114 | **Hash/anchor deep linking** works on load and when navigating back/forward. | E2E test. |
| FR-115 | **404 page** with link back home, styled with the design system. | Visiting an unknown path shows it with HTTP 404 where host supports. |
| FR-116 | **Error boundary** around hero canvas and deep-dive diagrams; failure shows static fallback, never a blank page. | Unit test throws in child; fallback renders. |
| FR-117 | **No-JS baseline.** Prerendered HTML contains all section content and links (progressive enhancement); animations/forms enhance. | Disabling JS still shows content readable (opacity not stuck at 0 — see MOT-002). |
| FR-118 | **Theme-color / color-scheme** meta set to `--bg-base`. | Inspect head. |
| FR-119 | **Copyright year** is dynamic (FR-100). | Unit test with mocked date. |

---

## 10. Non-Functional Requirements

| ID | Requirement | Target / Acceptance |
|---|---|---|
| NFR-001 | **Core Web Vitals** (Lighthouse mobile emulation, throttled, on production build) | LCP ≤ 2.5s, CLS ≤ 0.05, INP ≤ 200ms (lab proxy: TBT ≤ 200ms) |
| NFR-002 | **Lighthouse scores** (production URL or preview) | Performance, Accessibility, Best Practices, SEO each ≥ 90 on mobile and desktop where practical (test targets, not guarantees) |
| NFR-003 | **JS budget** | Initial JS ≤ 180 KB gzip; total CSS ≤ 30 KB gzip; no single dependency > 40 KB gzip unless justified in PR |
| NFR-004 | **Images** | Hero has no raster image; project images ≤ 150 KB each (AVIF/WebP); below-fold images `loading="lazy"` + `decoding="async"` |
| NFR-005 | **Fonts** | ≤ 4 font files total, ≤ 120 KB combined, preloaded: display + body regular |
| NFR-006 | **Layout stability** | All media have intrinsic dimensions/aspect-ratio; fonts use `size-adjust` fallback metrics; CLS ≤ 0.05 |
| NFR-007 | **Animation performance** | Hero ≥ 55 fps avg on mid-tier laptop; ≥ 30 fps on mid-tier Android in `lite`; no long task > 50ms from animation setup |
| NFR-008 | **Code splitting** | Hero canvas, deep dives, and contact form lazy-loaded (`React.lazy`) where below the fold, with skeleton placeholders of exact size |
| NFR-009 | **Browser support** | Last 2 versions of Chrome, Edge, Firefox, Safari (macOS/iOS 16+), Samsung Internet. Graceful degradation (no `backdrop-filter` → solid bg) |
| NFR-010 | **Reliability** | Zero console errors/warnings in production on first load and during a scripted full-page scroll |
| NFR-011 | **Maintainability** | TypeScript `strict: true`; ESLint + Prettier clean; no `any` without justification comment |
| NFR-012 | **Dependency hygiene** | Production dependencies ≤ 10 direct; `npm audit --omit=dev` no high/critical |
| NFR-013 | **Privacy** | No cookies, no third-party trackers by default; fonts self-hosted |
| NFR-014 | **Build reproducibility** | Node version pinned (`.nvmrc`, `engines`); lockfile committed |

---

## 11. Technology Stack and Rationale

| Layer | Choice | Rationale |
|---|---|---|
| Framework | React 18+ | Aligns with owner's skills; strong ecosystem |
| Build tool | Vite | Fast dev, simple static output |
| Language | TypeScript (strict) | Credibility and maintainability |
| Styling | Tailwind CSS v3/v4 + CSS variables for tokens | Rapid, consistent, small CSS output; tokens remain CSS-native for theming |
| Animation | Motion for React (`motion` package) | Declarative variants, layout animations, scroll hooks, reduced-motion support |
| Icons | `lucide-react` (UI) + inlined `simple-icons` (tech logos) | Tree-shakable, consistent |
| Validation | Zod | Content and form schema validation |
| Forms | Native + small custom hook (no heavy form library) | Keeps bundle small |
| Prerendering | `vite-plugin-ssg`/`vite-react-ssg` **or** `react-snap`-style prerender at build (agent selects the one with the smallest footprint and documents it) | SEO and no-JS baseline for a static site |
| Testing | Vitest + React Testing Library; Playwright (E2E + a11y with `@axe-core/playwright`); Lighthouse CI | See §19 |
| Lint/format | ESLint (typescript-eslint, jsx-a11y), Prettier | Quality gates |
| Hosting | **Vercel** (primary) or Netlify/Cloudflare Pages (documented alternates) | Free static hosting, preview deploys |
| Fonts | Fontsource (self-hosted) | Privacy, performance |
| Router | None for v1 (single page). If `caseStudyRoutes` is enabled: `react-router` (lazy, minimal) | Avoid unnecessary dependencies |

**Explicitly excluded:** backend server, database, auth, CMS, GSAP (until justified), Three.js, jQuery, UI kits (MUI/Chakra), CSS-in-JS runtime.

---

## 12. Application Architecture

### 12.1 Principles
Content separated from presentation; presentational components are pure and prop-driven; side effects isolated in hooks; motion centralized; every external dependency (form endpoint, analytics) behind a small adapter.

### 12.2 Folder structure
```
portfolio/
├─ spec.md
├─ index.html
├─ package.json  .nvmrc  tsconfig.json  vite.config.ts  tailwind.config.ts
├─ .env.example
├─ public/
│  ├─ favicon.svg  favicon.ico  apple-touch-icon.png
│  ├─ og-image.png  robots.txt  site.webmanifest
│  └─ resume/            # resume PDF placed here when supplied
├─ scripts/
│  ├─ validate-content.ts     # schema + TODO + URL + banned phrase checks
│  ├─ check-copy.ts
│  └─ generate-sitemap.ts
├─ src/
│  ├─ main.tsx  App.tsx
│  ├─ content/
│  │  ├─ site.ts  about.ts  skills.ts  projects.ts
│  │  ├─ journey.ts  exploring.ts  flags.ts  banned-phrases.json
│  │  └─ schema.ts            # Zod schemas + inferred types
│  ├─ styles/  tokens.css  globals.css
│  ├─ motion/  tokens.ts  variants.ts  useMotionTier.ts  Reveal.tsx
│  ├─ components/
│  │  ├─ layout/    Nav.tsx  MobileMenu.tsx  Footer.tsx  Section.tsx  Container.tsx
│  │  ├─ ui/        Button.tsx  Chip.tsx  IconLink.tsx  Badge.tsx  Tooltip.tsx  CopyButton.tsx
│  │  ├─ hero/      Hero.tsx  SignalGraph.tsx  ScrollIndicator.tsx  Intro.tsx
│  │  ├─ about/     About.tsx
│  │  ├─ skills/    Skills.tsx  SkillGroup.tsx
│  │  ├─ projects/  Projects.tsx  ProjectCard.tsx  ProjectFilter.tsx  ProjectVisualFallback.tsx
│  │  ├─ deepdives/ DeepDives.tsx  CaseStudyItem.tsx  diagrams/
│  │  ├─ journey/   Journey.tsx  TimelineItem.tsx
│  │  ├─ exploring/ Exploring.tsx
│  │  └─ contact/   Contact.tsx  ContactForm.tsx  useContactForm.ts
│  ├─ hooks/  useActiveSection.ts  useScrollDirection.ts  useMediaQuery.ts  useCopy.ts
│  ├─ lib/    cn.ts  url.ts  format.ts  env.ts
│  └─ pages/  NotFound.tsx  CaseStudyPage.tsx (flagged)
├─ tests/  unit/  e2e/  a11y/
└─ .github/workflows/ci.yml
```

### 12.3 Rendering flow
`main.tsx` → `MotionConfig` → `App` → `<Nav/>` + ordered `<Section>`s built from the `sections` registry (filters hidden/empty) → `<Footer/>`. The `sections` registry in `content/flags.ts` defines id, label, component, `showInNav`, and the data accessor used for the empty-check.

### 12.4 State management
Local component state + URL for filters/hash. No global store. Motion tier via a context provider (`MotionTierProvider`).

### 12.5 Error handling
Error boundaries (FR-116); `env.ts` validates `import.meta.env` with Zod at startup.

---

## 13. Component Inventory

| ID | Component | Props (key) | Behavior / Notes |
|---|---|---|---|
| CMP-001 | `Section` | `id, label, title, children` | Renders `<section aria-labelledby>`, section label, reveal motion, hairline |
| CMP-002 | `Reveal` | `variant, delay, as` | Wraps viewport reveal; respects tier |
| CMP-003 | `Button` | `variant: primary\|secondary\|ghost, href?, icon?, external?` | Renders `<a>` or `<button>`; 44px target |
| CMP-004 | `Chip` | `label, icon?` | Non-interactive by default |
| CMP-005 | `IconLink` | `href, label, icon` | Accessible name via `aria-label`; tooltip |
| CMP-006 | `Badge` | `tone` | Status/featured labels |
| CMP-007 | `CopyButton` | `value, label` | FR-092 |
| CMP-008 | `Nav` / `MobileMenu` | — | FR-010–015 |
| CMP-009 | `Intro` | — | MOT-010 |
| CMP-010 | `Hero` + `SignalGraph` | — | FR-020–024, MOT-011/020 |
| CMP-011 | `About` | — | FR-030–032 |
| CMP-012 | `SkillGroup` | `category, skills[]` | FR-040–045 |
| CMP-013 | `ProjectCard` | `project, variant: feature\|standard` | FR-050–059 |
| CMP-014 | `ProjectFilter` | `categories, active, onChange` | FR-057 |
| CMP-015 | `ProjectVisualFallback` | `slug, title` | FR-052 |
| CMP-016 | `CaseStudyItem` | `project` | FR-060–064 |
| CMP-017 | `TimelineItem` | `entry` | FR-070–074 |
| CMP-018 | `ExploringTile` | `item` | FR-080–081 |
| CMP-019 | `ContactForm` | `endpoint` | FR-093–096 |
| CMP-020 | `Footer` | — | FR-100–102 |
| CMP-021 | `ScrollProgress` | — | MOT-033 |
| CMP-022 | `Tooltip` | `content, children` | Hover+focus, `role="tooltip"`, Escape dismiss |
| CMP-023 | `NotFound` | — | FR-115 |

Each component requires: typed props, a unit test, accessible name/role verification, and (for animated ones) a reduced-motion test.

---

## 14. Data Models and Content Configuration

### 14.1 Types (illustrative; implement with Zod and infer TS types)
```ts
type Url = string; // https:// or mailto: or /relative

interface SiteConfig {
  name: "Anand Kumar Sahni";
  shortName: "Anand";
  monogram: "AS";
  role: string;                       // "Computer Science Engineering Student · Full-Stack Developer · AI Enthusiast"
  tagline: string;                    // hero H1
  heroSubtext: string;
  email: string | null;               // NOT supplied → null
  resumeUrl: Url | null;              // NOT supplied → null
  availability: { show: boolean; text: string | null };
  socials: { id: "github" | "linkedin" | "instagram" | "x"; label: string; url: Url; showInHero: boolean; showInFooter: boolean }[];
  siteUrl: Url | null;                // canonical base; null until domain known
  showBuildCredit: boolean;
}

interface AboutConfig {
  heading: string;
  paragraphs: string[];               // ≤ 120 words total
  interests: string[];
  photo: { src: string; alt: string } | null;
}

type SkillCategoryId =
  | "frontend" | "backend" | "languages" | "databases"
  | "ai" | "tools" | "core-cs";

interface Skill {
  id: string; label: string; category: SkillCategoryId;
  icon?: string;                      // key in iconMap
  evidenceProjectSlugs?: string[];
  visible?: boolean;                  // default true
}

type ProjectCategory = "Full-Stack" | "AI/ML" | "Developer Tools" | "Finance Technology";
type ProjectStatus = "concept" | "in-progress" | "prototype" | "completed";

interface Project {
  slug: string;                       // kebab-case, unique
  title: string;
  featured?: boolean;
  visibility: "public" | "hidden" | "draft";
  status?: ProjectStatus;
  category: ProjectCategory[];        // ≥ 1
  problem: string;                    // ≤ 140 chars
  solution: string;                   // ≤ 200 chars
  stack: string[];                    // ≥ 1
  image?: { src: string; alt: string; width: number; height: number } | null;
  repoUrl?: Url | null;
  liveUrl?: Url | null;
  preview?: { type: "video"; src: string; poster: string; alt: string } | null;
  caseStudy?: CaseStudy | null;
  order?: number;
}

interface CaseStudy {
  problem?: string; whyItMatters?: string;
  architecture?: { text: string; diagram?: { src: string; alt: string } | { component: string } };
  challenges?: string[]; howItWorks?: string;
  tradeoffs?: string[]; futureImprovements?: string[];
  metrics?: { label: string; value: string; method: string }[]; // method REQUIRED
}

interface JourneyEntry {
  id: string; type: "education" | "program" | "hackathon" | "milestone" | "achievement";
  title: string; organization?: string | null;
  startDate?: string | null; endDate?: string | null;   // ISO; endDate null = ongoing
  description?: string; link?: Url | null;
  outcome?: "participated" | "finalist" | "winner" | "other";  // required for hackathon
  verified: boolean;                                             // only true renders
}

interface ExploringItem { id: string; title: string; note: string; icon: string; updated?: string }

interface FeatureFlags {
  sections: Record<"about"|"skills"|"projects"|"deepDives"|"journey"|"exploring"|"contact", boolean>;
  contactForm: boolean;      // default false
  caseStudyRoutes: boolean;  // default false
  customCursor: boolean;     // default false
  introAnimation: boolean;   // default true
  scrollProgress: boolean;   // default true
  motionDebug: boolean;      // dev only
}
```

### 14.2 Requirements
**DAT-001** All content files are validated by Zod; failures print file, path, and message and exit non-zero.
**DAT-002** `validate-content.ts` additionally checks: no `TODO:` strings, no duplicate slugs/ids, all internal asset paths exist, all external URLs match allowed schemes, banned phrases, project category list non-empty.
**DAT-003** Initial `site.ts` ships with the four social URLs from §1.3 and `email: null`, `resumeUrl: null`, `siteUrl: null`.
**DAT-004** Derived data (filter categories, nav items, visible sections) computed in pure functions in `lib/` with unit tests.
**DAT-005** Environment variables (`.env.example`): `VITE_FORM_ENDPOINT`, `VITE_CAPTCHA_SITE_KEY` (optional), `VITE_SITE_URL` (optional; overrides `siteUrl`). Only `VITE_`-prefixed public values; **no secrets** in the client bundle.

### 14.3 Seed content notes
- Seed `projects.ts` with the five candidates in FR-054; all `visibility: "draft"` **by default** except those the owner confirms (agent sets the first run so that all five are `public` only in dev; production default is documented in README and OQ-2). *Assumption A-3 (§24): to ship a meaningful first deploy, set `visibility: "public"` for projects the owner explicitly approves; until then the Projects section auto-hides and the nav omits it.*

---

## 15. Responsive Design Rules

### 15.1 Breakpoints
| Name | Range | Representative device |
|---|---|---|
| `xs` | 320–389px | Small phones |
| `sm` | 390–639px | Large phones |
| `md` | 640–1023px | Tablets (portrait) |
| `lg` | 1024–1439px | Laptops, tablets (landscape) |
| `xl` | ≥ 1440px | Large desktops (content max 1200px; background extends) |

### 15.2 Global rules
**RSP-001** No horizontal scroll at any width from 320px to 2560px (`document.scrollingElement.scrollWidth <= innerWidth`).
**RSP-002** Touch targets ≥ 44×44px (WCAG 2.5.5 target; minimum 24px per 2.5.8).
**RSP-003** Body text ≥ 16px; no text below 12px (mono labels only).
**RSP-004** No essential action depends on hover.
**RSP-005** Use `100svh`/`dvh` for hero min-height to avoid mobile browser UI jumps.
**RSP-006** Respect safe-area insets for fixed nav/menu (`env(safe-area-inset-*)`).
**RSP-007** Images responsive via `srcset/sizes`; never upscale.

### 15.3 Layout behavior by section
| Section | xs / sm | md | lg / xl |
|---|---|---|---|
| Nav | Wordmark + hamburger; full-screen menu | Hamburger up to 767px; inline links ≥ 768px (icons off) | Inline links + Resume button |
| Hero | Single column; visual as 40% opacity backdrop; H1 `clamp` ~2.5rem; CTAs stacked full-width | Single column, larger type; CTAs inline; visual right-aligned below text | 7/5 split; visual interactive |
| About | Stacked; heading not sticky | Two columns 5/7, no sticky | 5/7 with sticky heading |
| Skills | 1 column groups | 2 columns | 3-col bento |
| Projects | 1 column; feature card stacks visual-above-text; filters horizontally scrollable with scroll-snap and fade edges | 2 columns, feature card split | 2 columns + large feature split |
| Deep dives | Full-width accordion; diagrams scrollable inside own container | Same | Two-column inside expanded item (text + diagram) |
| Journey | Left rail timeline | Left rail | Alternating center timeline |
| Exploring | Snap-scroll horizontal row (peek next card 12%) | 2×2 grid | Orbit strip or 4-column |
| Contact | Stacked: heading → links → form | Same, wider | 5/7 split: left info, right form |
| Footer | Stacked, centered links | Two rows | Single row, three zones |

### 15.4 Motion by viewport
Mobile/tablet touch devices default to `lite` tier (MOT-001): no pointer effects, no parallax, simplified reveal distance, reduced node count in hero graph.

---

## 16. Accessibility Requirements

Target: **WCAG 2.2 AA**.

| ID | Requirement | Acceptance |
|---|---|---|
| A11Y-001 | Landmarks: `<header>` (nav), `<main id="main">`, `<footer>`, each section a `<section aria-labelledby>`. | axe: no landmark violations |
| A11Y-002 | Single `<h1>` (hero). Section headings `<h2>`; card titles `<h3>`; no skipped levels. | Heading outline test |
| A11Y-003 | "Skip to main content" link first in tab order; visible on focus. | E2E: first Tab focuses it |
| A11Y-004 | Visible focus ring on all interactive elements (2px, contrast ≥ 3:1 against adjacent colors). | Visual + axe |
| A11Y-005 | Text contrast ≥ 4.5:1 (normal), ≥ 3:1 (large text/UI components) on all backgrounds including over the grid/gradient. | Automated contrast check; manual spot-check over gradient areas |
| A11Y-006 | All images have meaningful `alt`; decorative visuals `alt=""`/`aria-hidden`. Project visuals' alt describes content (e.g., "Dashboard screen showing …"); generated fallbacks are decorative. | Lint rule + review |
| A11Y-007 | Keyboard: every action available via keyboard; no keyboard traps (menu trap is intentional and escapable). | E2E keyboard walkthrough |
| A11Y-008 | Mobile menu & accordion use correct ARIA (`aria-expanded`, `aria-controls`, `aria-modal` where applicable). | Test + axe |
| A11Y-009 | Form: `<label for>`, `aria-describedby` for hints/errors, `aria-invalid`, error summary focus management, `autocomplete` attributes (`name`, `email`). | E2E |
| A11Y-010 | Live regions for filter result counts, copy feedback, and form status (`role="status"`, `aria-live="polite"`; errors `role="alert"`). | Test |
| A11Y-011 | Reduced motion honored (MOT-000); no content flashes more than 3 times per second. | Emulated test |
| A11Y-012 | Autoplaying motion >5s (e.g., hero graph, preview video) has a pause mechanism or stops/ is non-essential and pausable (a small "Pause animation" toggle in the hero for `full` tier). | Manual + E2E |
| A11Y-013 | Link purposes clear from text or `aria-label` (no bare "click here"/"read more"). | Lint/review |
| A11Y-014 | Language declared (`<html lang="en">`); page `<title>` descriptive. | Lighthouse |
| A11Y-015 | Zoom to 200% and text spacing overrides do not break layout or hide content (reflow at 320 CSS px). | Manual |
| A11Y-016 | Tooltips are not the only way to access information; dismissible, hoverable, persistent per WCAG 1.4.13. | Manual |

---

## 17. SEO Requirements

| ID | Requirement | Acceptance |
|---|---|---|
| SEO-001 | `<title>`: "Anand Kumar Sahni — Full-Stack Developer & AI Enthusiast" (≤ 60 chars). | Head check |
| SEO-002 | Meta description (≤ 155 chars): "Portfolio of Anand Kumar Sahni, a CSE student building full-stack web apps and AI-powered products—LLM tools, RAG, agents, and trading tech." | Head check |
| SEO-003 | Open Graph: `og:title, og:description, og:type=website, og:image (1200×630), og:url (when siteUrl known), og:site_name`. Twitter/X card `summary_large_image`. | Validator tools |
| SEO-004 | Social preview image generated from design system (monogram + name + role); stored at `/og-image.png`; no fake stats. | Visual check |
| SEO-005 | Favicon set: SVG (monogram), ICO fallback, 180×180 apple-touch icon, `site.webmanifest`, `theme-color`. | Lighthouse |
| SEO-006 | **Canonical:** `<link rel="canonical">` rendered only if `siteUrl`/`VITE_SITE_URL` provided. No hardcoded domain. | Build with/without env |
| SEO-007 | `robots.txt` allows all; includes `Sitemap:` line only when `siteUrl` known (generated at build). | Build output |
| SEO-008 | `sitemap.xml` generated at build from visible routes; omitted if `siteUrl` unknown. | Build output |
| SEO-009 | JSON-LD `Person` schema (name, jobTitle, sameAs = social URLs, url if known). No invented `email`, `alumniOf`, or `worksFor`. | Rich Results/Schema validator |
| SEO-010 | Prerendered static HTML includes all visible section content and headings (FR-117). Case-study routes (if enabled) get their own title/description/OG. | `curl` of build output contains H1 text |
| SEO-011 | Semantic structure and internal anchors; image `alt`; meaningful link text. | Lighthouse SEO ≥ 90 |
| SEO-012 | `noindex` is applied on preview/staging deployments (via env `VITE_ENV !== "production"`). | Head check on preview |

---

## 18. Security and Reliability

| ID | Requirement | Acceptance |
|---|---|---|
| SEC-001 | No API keys, tokens, or secrets in the repo or client bundle; `.env` gitignored; `.env.example` has placeholders only. | Secret scanner (gitleaks) in CI |
| SEC-002 | Any LLM/AI demo integrated later must call a server-side proxy; keys never in client code. (v1 has no live AI calls.) | Code review |
| SEC-003 | External links use `rel="noopener noreferrer"`; only whitelisted schemes (FR-112). | Unit + E2E |
| SEC-004 | Security headers configured at host (`vercel.json`/`_headers`): `Content-Security-Policy` (default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' (or hashed); img-src 'self' data:; connect-src 'self' + form endpoint origin; frame-ancestors 'none'), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/mic/geolocation off). | securityheaders.com check ≥ A |
| SEC-005 | Contact form: client + provider-side validation; sanitize/escape any echoed user input (React default escaping; never `dangerouslySetInnerHTML` with user data). | Lint rule `react/no-danger` |
| SEC-006 | Spam protection per FR-096. | Test |
| SEC-007 | Data minimization: form collects only name, email, message; no tracking of IP or fingerprints client-side; privacy note near the form ("Used only to reply to your message") **only if accurate for the chosen provider**. | Review |
| SEC-008 | Clear distinction in code and docs between **client-only** features (everything in v1 except form) and **server-backed** (form provider). | README section |
| SEC-009 | Dependency scanning (`npm audit`, Dependabot) enabled. | CI |
| SEC-010 | Reliability: error boundaries (FR-116), timeouts and retry UX for the form, no unhandled promise rejections. | Test |
| SEC-011 | Subresource integrity not needed (no third-party scripts); if any CDN asset is added later, SRI is required. | Review |

---

## 19. Testing Strategy

| ID | Level | Scope | Tooling | Criteria |
|---|---|---|---|---|
| TST-001 | Unit | `lib/` helpers, derived data (filters, nav, visible sections), Zod schemas, date formatting | Vitest | ≥ 90% coverage on `lib/` and `content/schema` |
| TST-002 | Component | Each component in §13: renders with minimal and full data; missing-field behavior; a11y roles; reduced-motion variant | Vitest + RTL, `jest-axe` | All pass |
| TST-003 | Content validation | `npm run validate` in CI; negative fixtures (bad URL, missing `outcome`, `TODO:`) | Vitest + script | Fails as expected |
| TST-004 | E2E | Navigation, anchor scroll, active section, mobile menu, project filtering, deep-dive open/close, copy email, contact form states (mocked endpoint), 404 | Playwright (Chromium, WebKit, Firefox; mobile viewport 390×844; tablet 820×1180) | All green |
| TST-005 | Accessibility | axe scan on every section state (menu open, accordion open, form errors); keyboard-only walkthrough script | `@axe-core/playwright` | 0 serious/critical violations |
| TST-006 | Motion | Emulate `prefers-reduced-motion`; verify MOT-000 assertions; verify tier switching via `?motion=`; verify hero loop pauses off-screen | Playwright | Pass |
| TST-007 | Performance | Lighthouse CI on production preview, mobile + desktop, 3 runs median | `lhci` | NFR-001/002/003 targets |
| TST-008 | Visual regression | Snapshots of each section at 390, 820, 1280, 1920 widths, motion disabled | Playwright screenshots | No unintended diffs |
| TST-009 | Link check | All internal anchors and configured external URLs return success (external check non-blocking, reported) | `lychee` or custom script | Internal 100% |
| TST-010 | Console | Scripted scroll of whole page in production build fails on any console error/warn | Playwright | Zero |
| TST-011 | Manual QA | Real-device check: iOS Safari, Android Chrome; touch, rotate, 200% zoom, screen reader smoke test (VoiceOver or NVDA) | Checklist in `docs/QA.md` | Signed off |

CI (`.github/workflows/ci.yml`): install → lint → typecheck → validate content → unit → build → E2E+a11y against preview → Lighthouse CI.

---

## 20. Deployment Strategy

| ID | Requirement | Acceptance |
|---|---|---|
| DEP-001 | Primary host: **Vercel** (static, framework preset Vite). Alternates documented: Netlify, Cloudflare Pages, GitHub Pages (note: base path handling). | README lists steps for each |
| DEP-002 | `npm run build` outputs static `dist/`; `npm run preview` serves it locally. | Build succeeds in CI |
| DEP-003 | Environments: **local**, **preview** (per PR, `noindex`), **production** (`main` branch). Config via env vars (`VITE_ENV`, `VITE_SITE_URL`, `VITE_FORM_ENDPOINT`). | Env table in README |
| DEP-004 | Domain: default to host-provided subdomain; custom domain optional; **no domain hardcoded** until supplied (OQ-1). | Grep for hardcoded domains returns none |
| DEP-005 | Headers/redirects config file committed (`vercel.json` or `public/_headers`/`_redirects`), including SPA fallback and 404 behavior. | Verified on preview |
| DEP-006 | Caching: hashed assets `Cache-Control: public, max-age=31536000, immutable`; HTML `max-age=0, must-revalidate`. | Response header check |
| DEP-007 | Post-deploy verification checklist (`docs/DEPLOY.md`): load home, check all nav anchors, resume button state, OG preview via a validator, form (if enabled) end-to-end with a real test submission, Lighthouse run, security headers check. | Checklist completed |
| DEP-008 | Rollback: redeploy previous successful deployment via host dashboard; documented. | Documented |
| DEP-009 | Sitemap and canonical generated only when `siteUrl` is known (SEO-006/008). | Build with/without env |

---

## 21. Implementation Phases

Each phase ends with a green CI and a short demo-able increment. The agent must not start a phase until the previous phase's completion criteria pass.

| Phase | Scope | Completion criteria |
|---|---|---|
| **P0 — Foundation** | Vite+React+TS+Tailwind setup, ESLint/Prettier, folder structure, tokens (§7), fonts, `MotionConfig`, `useMotionTier`, content schemas + seed content + `validate-content`, CI skeleton | `npm run build/lint/typecheck/validate` pass; token page (dev-only `/__tokens`) shows colors/type |
| **P1 — Shell & Navigation** | `Section`, `Container`, `Nav`, `MobileMenu`, skip link, active section hook, smooth scroll, `Footer`, 404 | FR-010–015, FR-100–101; A11Y-001–004; keyboard + menu E2E pass |
| **P2 — Hero & Intro** | `Hero`, `SignalGraph`, hero entrance, intro (flagged), scroll indicator, CTA buttons | FR-020–024, MOT-010/011/020–024; NFR-007 hero fps check; reduced-motion test |
| **P3 — About, Skills, Exploring** | Three sections with reveal motion | FR-030–045, FR-080–081, MOT-030/031; empty-state tests |
| **P4 — Projects** | Cards, fallback visual, filters, status badges, hover motions, feature card | FR-050–059, MOT-032/035/040–044, MOT-062; filter derivation tests |
| **P5 — Deep Dives & Journey** | Accordion case studies, diagram slot, timeline | FR-060–065 (without routes), FR-070–074, MOT-051; schema negative tests |
| **P6 — Contact & Micro-interactions** | Email/copy, form UI + hook, endpoint adapter, spam checks, validation motion, back-to-top, scroll progress, optional cursor (flag) | FR-090–096, FR-101; MOT-033/060–065; form state E2E with mocked endpoint |
| **P7 — SEO, Performance, A11y hardening** | Meta, OG image, JSON-LD, sitemap/robots, prerender, code-splitting, image pipeline, headers, axe fixes | SEO-001–012; NFR-001–008; A11Y complete; Lighthouse ≥ 90 targets |
| **P8 — Testing & Deployment** | Full E2E/visual suite, link check, deploy config, docs (`README`, `DEPLOY`, `QA`, `CONTENT_GUIDE`), production deploy + verification | Definition of Done (§23) satisfied |
| **P9 (optional)** | Case-study routes, interactive previews, light theme | Behind flags; not required for v1 |

---

## 22. Acceptance Criteria (release-level)

| ID | Criterion |
|---|---|
| AC-001 | All sections with data render in order; sections with empty data are absent from DOM and nav. |
| AC-002 | With the shipped content, the Resume button is absent everywhere and the email link is absent; adding `resumeUrl`/`email` makes them appear without code changes. |
| AC-003 | No `TODO:`, `null`, `undefined`, or lorem ipsum text appears in the rendered DOM. |
| AC-004 | Project filter chips equal "All" + categories of public projects only; filtering animates and announces count. |
| AC-005 | Missing project image → generated fallback; missing repo/live URL → button hidden; no layout shift. |
| AC-006 | Reduced-motion emulation: no parallax, no looping/infinite animation, no intro, hero graph static, content fully visible. |
| AC-007 | Mobile (390×844): no horizontal overflow, hero CTAs visible without scroll, menu works with touch and keyboard, all targets ≥ 44px. |
| AC-008 | Desktop (1440×900): hero pointer response works; nav active indicator tracks scroll; project hover states match MOT-040/041. |
| AC-009 | Contact: with form flag off, no form in DOM; on with mocked success/failure, correct states; no fake success. |
| AC-010 | Lighthouse mobile & desktop: Performance, Accessibility, Best Practices, SEO ≥ 90 on the preview/production build (target; record actual results in `docs/QA.md`). |
| AC-011 | axe: 0 serious/critical issues across tested states. |
| AC-012 | Production build has zero console errors/warnings during a scripted full scroll. |
| AC-013 | No hardcoded domain; canonical/sitemap appear only when `siteUrl` is provided. |
| AC-014 | All configured external links open safely (`noopener noreferrer`) and resolve. |
| AC-015 | Changing only `src/content/*` can add a skill, add/hide a project, and add a journey entry, with the UI updating correctly. |

---

## 23. Definition of Done

The work is done only when **all** are true:

- [ ] All required sections (§6) implemented, or intentionally auto-hidden due to missing owner data (documented).
- [ ] Responsive behavior verified at 320, 390, 768, 1024, 1440, and 1920px (screenshots in `docs/QA.md`).
- [ ] All major animations (MOT-010, 011, 020, 030–035, 040–044, 050–053, 060–064) implemented and tested in `full` and `lite` tiers.
- [ ] Reduced-motion behavior implemented and covered by automated test (MOT-000).
- [ ] All links and buttons verified (internal automated; external reported).
- [ ] No broken images and **zero console errors/warnings**.
- [ ] Accessibility checks completed: axe automated, keyboard walkthrough, screen-reader smoke test, contrast review.
- [ ] Content validation passes; no placeholders or fabricated claims (FR-001).
- [ ] Unit, component, E2E, a11y, and visual tests pass in CI.
- [ ] Lighthouse results recorded and meeting targets (or deviations documented with reasons).
- [ ] **Production build successful** (`npm run build`) and previewed.
- [ ] Deployment configuration documented (`docs/DEPLOY.md`), headers/redirects committed, env vars listed.
- [ ] `README.md` explains setup, scripts, content editing (`CONTENT_GUIDE.md`), feature flags, and how to enable the contact form and resume.
- [ ] Dependency audit clean for high/critical issues; no secrets in repo.

---

## 24. Assumptions, Dependencies, and Open Questions

### 24.1 Assumptions
| ID | Assumption |
|---|---|
| A-1 | Single-page application with anchored sections; case-study routes are optional (flag, default off). |
| A-2 | Dark theme only at launch. |
| A-3 | The five candidate projects are seed content. They ship `public` only after owner approval; otherwise the Projects section auto-hides (FR-050, AC-001). Statuses are conservative (`in-progress`/`concept`). |
| A-4 | Contact form is disabled by default (`flags.contactForm = false`) until a provider endpoint is supplied; email link used instead once supplied. |
| A-5 | Hero availability badge is off until the owner confirms an accurate status. |
| A-6 | No analytics in v1. |
| A-7 | Typography: Space Grotesk, Inter, JetBrains Mono (open-source, self-hosted). Owner may change via tokens. |
| A-8 | Hosting on Vercel; custom domain optional and later. |
| A-9 | About-section copy is drafted from §1 facts only and flagged for owner review before release. |
| A-10 | Skills shipped = those explicitly listed in §1.3 plus AI items implied by candidate projects (RAG, LLM integration, AI agents); additional items require owner confirmation. |
| A-11 | Project visuals initially use the generated fallback; real screenshots are added as available (preferred, increases perceived quality). |

### 24.2 Dependencies
- Owner-provided: email address, resume file/URL, institution name and education dates, verified achievements/hackathons, project repo/live URLs and screenshots, final copy approvals.
- External: hosting account (Vercel), form provider account (Formspree/Web3Forms/Netlify Forms) if the form is enabled, optional captcha keys.

### 24.3 Open questions
Only genuinely blocking or release-gating items are listed. None blocks starting P0–P3.

| ID | Question | Needed by | Default if unanswered |
|---|---|---|---|
| OQ-1 | What domain (if any) will be used? | P7 | Host subdomain; no canonical/sitemap |
| OQ-2 | Which of the five projects are ready to show, with their repo/live URLs, real statuses, and stacks? | P4 | Projects section hidden / drafts only |
| OQ-3 | Institution name and the start/expected graduation year to show in Journey? | P5 | Show "B.Tech CSE — 3rd year" only |
| OQ-4 | Approve or edit the About paragraphs and hero copy? | P3 | Ship drafted copy (flagged in PR) |
| OQ-5 | Confirm extra skills beyond §1.3 (TypeScript, Tailwind, Vite, REST APIs, DBMS/OS/CN, etc.) | P3 | Only §1.3-listed + implied AI skills |
| OQ-6 | Resume file or URL, and email address for public display? | P6 | Resume button and email hidden |
| OQ-7 | Which form provider (if any) for the contact form? | P6 | Form off; email link only |

---

*End of spec.md*