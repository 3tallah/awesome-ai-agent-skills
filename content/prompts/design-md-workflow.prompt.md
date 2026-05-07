---
mode: "agent"
description: "Apply a DESIGN.md design system from awesome-design-md to generate pixel-perfect AEM components with HTL + Tailwind CSS"
---

# DESIGN.md Workflow Skill

You have access to the **awesome-design-md** collection — a curated library of 58+ DESIGN.md files extracted from real websites (Vercel, Stripe, Linear, Airbnb, Apple, etc.). Each file captures a site's complete visual language in a format you can read and apply directly.

**Source**: https://github.com/VoltAgent/awesome-design-md

## What is DESIGN.md?

DESIGN.md is a plain-text design system document (introduced by Google Stitch) that AI agents read to generate consistent UI. It's a markdown file — no Figma exports, no JSON schemas, no special tooling.

| File | Who reads it | What it defines |
|------|-------------|-----------------|
| `AGENTS.md` | Coding agents | How to build the project |
| `DESIGN.md` | Design agents | How the project should look and feel |

## DESIGN.md Format (9 Sections)

Every DESIGN.md follows this structure:

| # | Section | What it captures |
|---|---------|-----------------|
| 1 | **Visual Theme & Atmosphere** | Mood, density, design philosophy, key characteristics |
| 2 | **Color Palette & Roles** | Semantic name + hex + functional role (primary, accent, neutral, surface, shadow) |
| 3 | **Typography Rules** | Font families, full hierarchy table (role, font, size, weight, line-height, letter-spacing) |
| 4 | **Component Stylings** | Buttons, cards, inputs, navigation with all states (hover, focus, active, disabled) |
| 5 | **Layout Principles** | Spacing scale, grid system, container widths, whitespace philosophy, border-radius scale |
| 6 | **Depth & Elevation** | Shadow system, surface hierarchy, decorative depth |
| 7 | **Do's and Don'ts** | Design guardrails and anti-patterns |
| 8 | **Responsive Behavior** | Breakpoints, touch targets, collapsing strategy, image behavior |
| 9 | **Agent Prompt Guide** | Quick color reference, example component prompts, iteration guide |

## Available Design Systems

### AI & Machine Learning
- **Claude** – Warm terracotta accent, clean editorial layout
- **Cohere** – Vibrant gradients, data-rich dashboard aesthetic
- **ElevenLabs** – Dark cinematic UI, audio-waveform aesthetics
- **Minimax** – Bold dark interface with neon accents
- **Mistral AI** – French-engineered minimalism, purple-toned
- **Ollama** – Terminal-first, monochrome simplicity
- **OpenCode AI** – Developer-centric dark theme
- **Replicate** – Clean white canvas, code-forward
- **RunwayML** – Cinematic dark UI, media-rich layout
- **Together AI** – Technical, blueprint-style design
- **VoltAgent** – Void-black canvas, emerald accent, terminal-native
- **xAI** – Stark monochrome, futuristic minimalism

### Developer Tools & Platforms
- **Cursor** – Sleek dark interface, gradient accents
- **Expo** – Dark theme, tight letter-spacing, code-centric
- **Linear** – Ultra-minimal, precise, purple accent
- **Lovable** – Playful gradients, friendly dev aesthetic
- **Mintlify** – Clean, green-accented, reading-optimized
- **PostHog** – Playful hedgehog branding, developer-friendly dark UI
- **Raycast** – Sleek dark chrome, vibrant gradient accents
- **Resend** – Minimal dark theme, monospace accents
- **Sentry** – Dark dashboard, data-dense, pink-purple accent
- **Supabase** – Dark emerald theme, code-first
- **Superhuman** – Premium dark UI, keyboard-first, purple glow
- **Vercel** – Black and white precision, Geist font
- **Warp** – Dark IDE-like interface, block-based command UI
- **Zapier** – Warm orange, friendly illustration-driven

### Infrastructure & Cloud
- **ClickHouse** – Yellow-accented, technical documentation style
- **Composio** – Modern dark with colorful integration icons
- **HashiCorp** – Enterprise-clean, black and white
- **MongoDB** – Green leaf branding, developer documentation focus
- **Sanity** – Red accent, content-first editorial layout
- **Stripe** – Signature purple gradients, weight-300 elegance

### Design & Productivity
- **Airtable** – Colorful, friendly, structured data aesthetic
- **Cal.com** – Clean neutral UI, developer-oriented simplicity
- **Clay** – Organic shapes, soft gradients, art-directed layout
- **Figma** – Vibrant multi-color, playful yet professional
- **Framer** – Bold black and blue, motion-first, design-forward
- **Intercom** – Friendly blue palette, conversational UI patterns
- **Miro** – Bright yellow accent, infinite canvas aesthetic
- **Notion** – Warm minimalism, serif headings, soft surfaces
- **Pinterest** – Red accent, masonry grid, image-first
- **Webflow** – Blue-accented, polished marketing site aesthetic

### Fintech & Crypto
- **Coinbase** – Clean blue identity, trust-focused, institutional feel
- **Kraken** – Purple-accented dark UI, data-dense dashboards
- **Revolut** – Sleek dark interface, gradient cards, fintech precision
- **Wise** – Bright green accent, friendly and clear

### Enterprise & Consumer
- **Airbnb** – Warm coral accent, photography-driven, rounded UI
- **Apple** – Premium white space, SF Pro, cinematic imagery
- **IBM** – Carbon design system, structured blue palette
- **NVIDIA** – Green-black energy, technical power aesthetic
- **SpaceX** – Stark black and white, full-bleed imagery, futuristic
- **Spotify** – Vibrant green on dark, bold type, album-art-driven
- **Uber** – Bold black and white, tight type, urban energy

### Car Brands
- **BMW** – Dark premium surfaces, precise German engineering aesthetic
- **Ferrari** – Chiaroscuro black-white editorial, Ferrari Red with extreme sparseness
- **Lamborghini** – True black cathedral, gold accent, LamboType custom Neo-Grotesk
- **Renault** – Vivid aurora gradients, NouvelR proprietary typeface, zero-radius buttons
- **Tesla** – Radical subtraction, cinematic full-viewport photography, Universal Sans

## Workflow: Fetching & Applying a DESIGN.md

### Step 1 – Fetch the DESIGN.md

When the user requests a design system by name, fetch it from:
```
https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/{site-name}/DESIGN.md
```

Use the `fetch_webpage` tool to retrieve the full DESIGN.md content.

**Folder name mapping** (use lowercase, special cases noted):
- `mistral.ai`, `linear.app`, `together.ai`, `opencode.ai`, `x.ai`, `cal` (for Cal.com)

### Step 2 – Parse Design Tokens

Extract from the DESIGN.md:

1. **Color Palette** → Map hex values to your project's CSS custom properties or Tailwind config
2. **Typography Hierarchy** → Map font sizes, weights, line-heights, letter-spacing to your design system classes (by pixel value, not token name)
3. **Component Specs** → Extract button styles, card patterns, input designs, navigation patterns
4. **Spacing & Layout** → Map spacing scale, grid system, border-radius scale
5. **Shadow System** → Map elevation levels to CSS box-shadow values
6. **Responsive Breakpoints** → Map to your Tailwind breakpoint system

### Step 3 – Map to AEM + Tailwind

Apply the DESIGN.md tokens to AEM component architecture:

```
DESIGN.md Token → Pixel Value / Hex → Tailwind Utility Class or CSS Custom Property
```

**Mapping Rules:**
- Match by **pixel values and font families**, not by token names
- Use existing project design tokens where they match; create new CSS custom properties for gaps
- Prefer Tailwind utility classes over arbitrary values: `bg-[#171717]` only when no token exists
- Apply BEM naming for component structure, Tailwind for styling
- Use PostCSS `@apply` only for complex patterns (pseudo-elements, multi-state hovers)

### Step 4 – Generate AEM Component

Output a complete AEM component with:
- HTL template with BEM + Tailwind classes mapped from the DESIGN.md
- Component-specific PostCSS (if complex patterns needed)
- Component dialog XML (Granite UI) for authorable fields
- Sling Model interface reference

### Step 5 – Validate

- Cross-check hex values against DESIGN.md Section 2 (Color Palette)
- Verify typography sizes/weights against Section 3 hierarchy table
- Confirm component patterns match Section 4 specs
- Check spacing values against Section 5 scale
- Validate shadow values against Section 6 elevation table
- Ensure responsive behavior matches Section 8 breakpoints
- Review against Section 7 Do's and Don'ts

## Example: Applying Vercel DESIGN.md to an AEM Hero Component

```html
<!--/* Hero component styled with Vercel DESIGN.md tokens */-->
<sly data-sly-use.model="com.yourproject.core.models.HeroModel"></sly>
<sly data-sly-use.templates="core/wcm/components/commons/v1/templates.html" />
<sly data-sly-test.hasContent="${model.title || model.description}" />

<section class="cmp-hero bg-white min-h-screen flex flex-col justify-center items-center px-4 py-20 lg:py-32"
         data-component="hero">

  <h1 class="cmp-hero__title text-center max-w-4xl"
      style="font-family: 'Geist', Arial, sans-serif; font-size: 48px; font-weight: 600; line-height: 1.0; letter-spacing: -2.4px; color: #171717;">
    ${model.title}
  </h1>

  <p class="cmp-hero__description text-center max-w-2xl mt-6"
     style="font-family: 'Geist', Arial, sans-serif; font-size: 20px; font-weight: 400; line-height: 1.8; color: #4d4d4d;"
     data-sly-test="${model.description}">
    ${model.description @ context='html'}
  </p>

  <div class="cmp-hero__actions flex flex-col sm:flex-row gap-4 mt-8" data-sly-test="${model.primaryCtaUrl || model.secondaryCtaUrl}">
    <!-- Primary CTA: Vercel Dark Button -->
    <a href="${model.primaryCtaUrl}"
       class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
       style="background: #171717; border-radius: 6px;"
       data-sly-test="${model.primaryCtaUrl}">
      ${model.primaryCtaText}
    </a>
    <!-- Secondary CTA: Vercel Shadow-bordered Button -->
    <a href="${model.secondaryCtaUrl}"
       class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
       style="background: #ffffff; color: #171717; border-radius: 6px; box-shadow: rgb(235, 235, 235) 0px 0px 0px 1px;"
       data-sly-test="${model.secondaryCtaUrl}">
      ${model.secondaryCtaText}
    </a>
  </div>
</section>

<sly data-sly-call="${templates.placeholder @ isEmpty=!hasContent}"></sly>
```

> **Note**: In production, map these inline styles to your project's Tailwind config or CSS custom properties. The example above shows direct DESIGN.md token application for clarity.

## Integration with Existing AEM Front-End Workflow

When a DESIGN.md is active:

1. **Figma MCP + DESIGN.md** → Use DESIGN.md as the source of truth; Figma MCP for layout structure extraction. Cross-validate pixel values between both sources.
2. **Tailwind Config** → Extend `tailwind.config.js` with DESIGN.md color/spacing tokens if they don't exist in the current design system.
3. **PostCSS** → Create component-level `.pcss` files for complex DESIGN.md patterns (multi-layer shadows, pseudo-element overlays, keyframe animations from Section 4).
4. **BEM Structure** → BEM class names remain project-specific. DESIGN.md provides the visual styling, not the naming convention.
5. **Accessibility** → DESIGN.md Section 2 color palette must pass WCAG contrast checks. Validate accent colors against backgrounds before applying.

## Quick Reference Commands

When user says:
- **"Use X design"** or **"Apply X style"** → Fetch that site's DESIGN.md and apply its tokens
- **"Build a component like X"** → Fetch the DESIGN.md, extract relevant Section 4 component patterns, generate AEM component
- **"Show me the X color palette"** → Fetch and display Section 2
- **"What typography does X use?"** → Fetch and display Section 3
- **"Compare X and Y design systems"** → Fetch both DESIGN.md files, create comparison table of colors, typography, spacing