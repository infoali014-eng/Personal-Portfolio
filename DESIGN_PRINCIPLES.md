# Portfolio OS Design Constitution

This document defines the core principles governing every visual, structural, and interactive decision on the platform. All future developments, pages, and components must align with this constitution.

---

## The Core Principles

### 1. Every page answers one question
A page must have a single, clear objective.
* The **Home** page answers: *Who is Ali, and what has he built?*
* The **Projects** page answers: *What software solutions has he shipped?*
* The **Notes** page answers: *What resources are available for study?*
If a page tries to answer multiple questions, split the content or simplify the routing.

### 2. Every section has one purpose
Within a page, sections must represent single conceptual steps. 
* Do not mix biographical stories with project tech stacks.
* Do not mix contact forms with blog highlights.
Keep content isolated and focused.

### 3. Whitespace is a feature
Whitespace is not empty space; it is active negative space.
* Do not fill gaps with arbitrary dividers, lines, or cards.
* Use generous margins (`space-7` / `space-9`) to separate topics, allowing the visitor's eyes to rest.

### 4. Don't animate for decoration
Motion must support content, not show off Framer Motion.
* Avoid loop rotations, constant bounces, or staggered delay timings exceeding 0.4 seconds.
* Use animations solely to establish route changes, display scroll entries, or provide button hover feedback.

### 5. Maximum of two CTA buttons
A view block or hero section must never display more than two call-to-action buttons.
* Primary CTA: Filled accent button (e.g., "View Work").
* Secondary CTA: Outline/ghost button (e.g., "Explore Deep Code").
Multiple CTAs create decision paralysis.

### 6. Cards must solve a problem
A card container must group highly related data together.
* Do not wrap singular text blocks or simple quotes inside cards.
* Use cards only when combining a title, description, tags list, and call-to-action (e.g., project preview, blog card).

### 7. Never sacrifice readability for aesthetics
Readability is our highest design goal.
* Text columns must never exceed a maximum width of **650px** (65 characters per line).
* Contrast ratios must always meet WCAG AA standards (minimum 4.5:1).
* Fonts must remain simple: Inter for interface text, and JetBrains Mono for system metrics.

### 8. Consistency beats creativity
Familiarity breeds usability.
* Use existing design tokens and component inventory variants instead of designing ad-hoc styles.
* Buttons, inputs, borders, and margins must align precisely across the entire platform.
