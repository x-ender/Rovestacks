# Rovestacks Website

The marketing/corporate site for Rovestacks Technologies Limited, built separately from the
Rovenet app's own Next.js project as agreed. Same stack, independent codebase.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript, React 19
- **Styling:** Tailwind CSS v4 (CSS-first config in `app/globals.css`) plus a hand-written design
  system for the bespoke elements (nebula canvas background, phone mockups, legal document
  layout) that don't map cleanly to utility classes
- **Icons:** lucide-react
- **Hosting target:** Vercel (or any Next.js-compatible host)

## Why routes instead of the old single-page version

Every top-level section is now a real route with its own URL, matching the pattern already used
by Rovenet's own site:

| URL | Page |
|---|---|
| `/` | Rovestacks home |
| `/products` | Product portfolio (Rovenet + roadmap) |
| `/rovenet` | Rovenet product page |
| `/legal` | Legal & Policies hub |
| `/privacy-policy` | Privacy Policy (read in-browser, or download the `.docx`) |
| `/terms-and-conditions` | Terms & Conditions |
| `/refund-policy` | Refund Policy |

This is what makes `rovestacks.com/privacy-policy` work directly as a real link, instead of
requiring the visitor to land on the homepage first.

## Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

> **Note:** I wrote every file in this project by hand in a sandboxed environment without
> network access, so I could not run `npm install` or `next build` myself to verify it compiles.
> I type-checked all the TypeScript/JSX manually against stubbed-in React and Next.js types and
> found no real errors, but please run `npm install && npm run build` yourself before deploying,
> and skim through `npm run dev` locally first. If anything doesn't compile, the error Next.js
> gives you will point at the exact line — send it my way and I'll fix it immediately.

## Deploying

Push this to its own GitHub repo and import it into Vercel as a new project (separate from
Rovenet's site project, as you asked). Point `rovestacks.com` at it once you're happy with a
preview deploy.

## Things worth doing before this goes fully live

1. **Waitlist form** (`app/components/WaitlistCTA.tsx`) currently only holds the submitted email
   in local component state — it doesn't send it anywhere. Given you're already using Supabase
   for Rovenet, the natural move is a Supabase `insert` into a `waitlist` table (a small server
   action or API route). Happy to wire that up once you've got a Supabase project/table ready for
   it.
2. **Social links** in the footer (`app/components/Footer.tsx`) are still placeholder `#` hrefs —
   drop in real profile URLs when ready.
3. **`app/lib/legalContent.ts`** is the single source of truth for the Privacy Policy, Terms &
   Conditions, and Refund Policy text shown on the site. The three `.docx` files in
   `public/documents/` are the downloadable versions of the same content. If either one changes,
   remember to update the other so they stay in sync.
4. Screenshots and logos in `public/images/` are the ones from our conversation — swap in fresh
   ones any time the app UI changes.

## Project structure

```
app/
  layout.tsx            Root layout: fonts, Header, Footer, Waitlist CTA band
  globals.css            Tailwind import + full design system
  page.tsx                Home
  products/page.tsx
  rovenet/page.tsx
  legal/page.tsx           Legal hub
  privacy-policy/page.tsx
  terms-and-conditions/page.tsx
  refund-policy/page.tsx
  lib/
    legalContent.ts        Shared data for all three legal documents
  components/
    Header.tsx              (client \u2014 mobile nav, active link state)
    Footer.tsx
    Wordmark.tsx             The ROVEST\u039bCKS logotype
    NebulaCanvas.tsx         (client \u2014 animated particle-network background)
    HexScatter.tsx           Decorative hexagon pattern
    Reveal.tsx               (client \u2014 scroll-reveal animation wrapper)
    PhoneShot.tsx            Phone-frame wrapper for app screenshots
    RovenetShowcase.tsx      (client \u2014 tabbed screenshot showcase)
    LegalLayout.tsx          (client \u2014 sidebar + content layout for legal pages)
    WaitlistCTA.tsx          (client \u2014 waitlist email form)
public/
  images/                   Logos and app screenshots
  documents/                Downloadable Privacy Policy / Terms / Refund Policy .docx files
```
