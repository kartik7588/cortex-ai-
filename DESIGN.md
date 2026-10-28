---
name: CortexAI Operational Workspace
description: A warm graphite, document-first workspace for sustained AI-assisted thinking and production.
colors:
  workspace-black: "#11110f"
  rail-charcoal: "#171714"
  surface-charcoal: "#1d1d19"
  raised-charcoal: "#24241f"
  hover-charcoal: "#292923"
  soft-white: "#efeee8"
  secondary-stone: "#b4b1a7"
  muted-stone: "#918e84"
  quiet-rule: "#35342e"
  strong-rule: "#49483f"
  mineral-green: "#8fb59d"
  mineral-green-bright: "#b1d1bb"
  mineral-ink: "#0d1a12"
  danger-coral: "#e08a7d"
  warning-ochre: "#d6aa68"
typography:
  display:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.5
  body:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.5
  technical:
    fontFamily: "DM Mono, ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  control: "6px"
  menu: "10px"
  shell: "14px"
spacing:
  hairline: "1px"
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.mineral-green}"
    textColor: "{colors.mineral-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "{colors.mineral-green-bright}"
    textColor: "{colors.mineral-ink}"
    rounded: "{rounded.control}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.secondary-stone}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "40px"
  composer:
    backgroundColor: "{colors.surface-charcoal}"
    textColor: "{colors.soft-white}"
    rounded: "0"
    padding: "0"
  message-user:
    backgroundColor: "{colors.raised-charcoal}"
    textColor: "{colors.soft-white}"
    rounded: "0"
    padding: "12px 16px"
---

# Design System: CortexAI Operational Workspace

## Overview

**Creative North Star: "The Graphite Workbench"**

CortexAI is a warm, near-black operational workspace whose visual authority comes from precision rather than spectacle. The system behaves like a well-made technical workbench: three clear regions, durable rails, quiet one-pixel divisions, and a central document surface where the answer—not its container—holds attention.

The interface is compact but not cramped. Warm charcoal layers separate navigation, conversation, and artifact inspection while soft off-white type maintains a calm hierarchy. Mineral green is deliberately scarce and signals action, selection, focus, progress, or a live system state. It is never ambient decoration.

Assistant responses are document-first: headings, paragraphs, lists, tables, code, links, and generated media form one readable column. User messages remain compact and clearly bounded. Motion is restrained to state feedback and panel transitions, with reduced-motion behavior built in.

**Key Characteristics:**

- Warm graphite surfaces with soft, low-chroma text.
- Three-region desktop workspace: conversation rail, document column, artifact inspector.
- Row and navigation structures instead of floating card grids.
- One-pixel rules and square content containers; small radius only on controls.
- Mineral green reserved for meaningful state and action.
- Manrope for interface prose; DM Mono for technical and metered metadata.

## Colors

The palette is warm and mineral: near-black olive graphites support a soft stone hierarchy, with one restrained green signal color.

### Primary

- **Mineral Green:** The sole action and state accent, used for primary controls, active indicators, focus borders, progress, and small system markers.
- **Bright Mineral Green:** The hover, focus, and linked-text counterpart to the primary accent.
- **Mineral Ink:** High-contrast text placed on filled mineral-green controls.

### Secondary

- **Danger Coral:** Errors, destructive warnings, and live microphone state.
- **Warning Ochre:** Reserved semantic warning color; do not use decoratively.

### Neutral

- **Workspace Black:** The application canvas and conversation background.
- **Rail Charcoal:** The persistent navigation rail and modal drawer surface.
- **Surface Charcoal:** Inputs, code-adjacent containers, and quiet hover structure.
- **Raised Charcoal:** Selected rows, user messages, disabled actions, and nested controls.
- **Hover Charcoal:** Explicit hover feedback for controls.
- **Soft White:** Primary text and highest-emphasis labels.
- **Secondary Stone:** Reading copy and secondary controls.
- **Muted Stone:** Metadata, placeholders, helper text, and tertiary labels.
- **Quiet Rule / Strong Rule:** One-pixel separators; the stronger rule outlines focused composition areas or compact controls.

### Named Rules

**The One Signal Rule.** Mineral green communicates action, selection, focus, progress, or system presence; it never becomes a decorative wash.

**The Warm Black Rule.** Use the graphite neutral family instead of pure black for resting surfaces; reserve black overlays for modal scrims.

## Typography

**Display Font:** Manrope (with ui-sans-serif and system fallbacks)  
**Body Font:** Manrope (with ui-sans-serif and system fallbacks)  
**Label/Mono Font:** DM Mono (with platform monospace fallbacks)

**Character:** Manrope supplies calm, contemporary legibility without turning the workspace into a dashboard. DM Mono makes file names, credit counts, keyboard hints, languages, prices, and indices read as technical instrumentation.

### Hierarchy

- **Display** (500, 2.25rem, 1.1): Empty-state and authentication propositions; tight tracking gives broad statements authority without visual bulk.
- **Headline** (600, 1.5rem, 1.25): Markdown section headings and important document landmarks.
- **Title** (600, 1rem, 1.5): Drawer, artifact, plan, and subsection titles.
- **Body** (400, 0.9375rem, 1.75): Assistant answers in a readable column capped at 820px.
- **Label** (600, 0.75rem, 1.5): Navigation, controls, metadata labels, and compact UI hierarchy.
- **Technical** (400, 0.6875rem, 1.5): File names, counts, plan values, shortcuts, and code-adjacent metadata.

### Named Rules

**The Document Leads Rule.** Assistant prose uses generous leading and semantic Markdown hierarchy; surrounding interface labels stay smaller and denser.

**The Mono Means Data Rule.** DM Mono identifies technical, metered, indexed, or file-specific information—not general interface copy.

## Layout

Desktop uses a full-height three-region shell. The conversation rail is 272px expanded and 56px collapsed; the center conversation flexes around an 820px reading and composer column; the artifact inspector is 420px expanded and 48px collapsed. Each region is separated by a one-pixel rule rather than detached cards.

The center follows a durable vertical sequence: compact top navigation, independently scrolling conversation, and a professional bottom composer. Assistant responses use 32px vertical separation. Empty states use ruled capability rows, not tiles. The composer and message column share the same maximum width so prompts and responses align as one working document.

Below the large-screen breakpoint, side regions become full-height overlays. The conversation rail is capped at 320px or 88vw, while the artifact inspector becomes a full-screen mobile sheet. Page gutters reduce from 32px to 16px; the layout remains usable at the 320px body minimum and is designed for 360px-class mobile widths.

## Elevation & Depth

The system is flat and tonally layered. It uses no resting box shadows. Depth comes from adjacent charcoal values, one-pixel rules, modal scrims, and panels moving in from the viewport edge. Authentication is a full-canvas takeover; billing and mobile artifact surfaces use a black scrim behind a ruled side sheet.

### Named Rules

**The Rule Before Shadow Rule.** Separate operational regions with tone and one-pixel borders; do not introduce card shadows or floating glass surfaces.

## Shapes

Content surfaces are square and architectural: messages, Markdown tables, code blocks, file attachments, navigation rows, panels, and progress tracks use no rounding. Interactive controls use a restrained 6px radius. Larger menu and shell radii exist in the token vocabulary but are not a license to turn operational content into rounded cards. Brand marks and status signals use compact square geometry.

## Components

### Buttons

- **Shape:** Compact controls use a restrained radius (6px) and a 40px minimum touch height; icon buttons are 40px squares.
- **Primary:** Mineral-green fill, mineral-black text, bold small label, and 16px horizontal padding.
- **Hover / Focus:** Hover brightens to the lighter mineral tone; active moves down by 1px; keyboard focus uses a 2px bright-mineral outline with 2px offset.
- **Secondary / Ghost:** Transparent by default with secondary stone text; hover adds the dedicated charcoal hover fill and restores primary text.
- **Disabled:** Raised charcoal with muted text and no active transform.

### Chips

- **Style:** Agent choice is an embedded transparent select within the composer toolbar, using label typography and a small control radius.
- **State:** Hover adds the hover-charcoal fill; keyboard focus follows the global high-contrast outline.

### Cards / Containers

- **Corner Style:** Square for messages, plans, media, code, and operational containers.
- **Background:** Use the tonal graphite ladder to show containment and selection.
- **Shadow Strategy:** None; see Elevation & Depth.
- **Border:** One-pixel quiet or strong rules.
- **Internal Padding:** 12–16px for compact content; 20–24px for drawers and large regions.

### Inputs / Fields

- **Style:** The composer is a strong-rule rectangular container on a charcoal surface, with the textarea and action toolbar divided by a quiet rule.
- **Focus:** The container border shifts to mineral green through `focus-within`; individual keyboard-focusable controls retain the 2px focus outline.
- **Error / Disabled:** Danger coral is used for concise inline errors; disabled content reduces opacity or adopts raised-charcoal and muted-stone colors.

### Navigation

Conversation navigation is a dense stack of full-width rows. The active row uses raised charcoal and a one-pixel mineral-green leading marker. Hover changes tone and text color without shifting geometry. On mobile, navigation moves into an overlay rail opened from a persistent icon control.

### Assistant Document

Assistant responses are unboxed articles. A small mineral-green square and CortexAI label establish authorship; semantic Markdown supplies hierarchy. Links use bright mineral green, quotes use a one-pixel green leading rule, tables use horizontal rules, and code blocks use a deeper editor surface with an integrated copy action.

### Artifact Inspector

The artifact inspector is an integrated Monaco workspace rather than a separate destination. A compact header, flat file tabs, one-pixel active indicator, and code/preview switch preserve the operational shell. The desktop panel collapses to a narrow labeled rail; mobile uses a full-screen sliding inspector.

### Motion and Accessibility

Panel and scrim transitions use a restrained 220ms emphasized ease. Lightweight state changes use 140ms. Loading uses a single pulsing square rather than decorative choreography. `prefers-reduced-motion` collapses animation and transition duration to near zero. Keyboard focus remains visible on all interactive elements, dialogs support Escape and focus return, and semantic status regions announce sending and copy feedback.

## Do's and Don'ts

### Do:

- **Do** keep the workspace centered on the conversation and the artifact being produced.
- **Do** align the 820px document and composer columns so reading and prompting feel continuous.
- **Do** use one-pixel rules, tonal layers, and full-width rows to organize dense operational content.
- **Do** reserve mineral green for action, selection, focus, progress, links, and small live-state markers.
- **Do** keep assistant answers document-first and user messages compact.
- **Do** preserve visible keyboard focus, semantic dialogs, focus return, and reduced-motion behavior.

### Don't:

- **Don't** introduce indigo or violet gradients, decorative glow, glassmorphism, or generic AI imagery.
- **Don't** convert navigation, plan choices, starter actions, or assistant answers into floating rounded cards.
- **Don't** use shadows where a tonal step and one-pixel rule communicate the structure.
- **Don't** scatter mineral green across large backgrounds or decorative flourishes.
- **Don't** use DM Mono for ordinary prose or large headings.
- **Don't** detach generated code from the conversation; preserve the integrated inspector pattern.
